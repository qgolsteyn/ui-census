import fc from "fast-check";
import baseAdapter from "../baseAdapter";
import { globalHTMLAttrArb } from "./htmlFixtures";

let container: HTMLDivElement;

describe("base adapter", () => {
  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container!);
  });

  afterEach(() => {
    document.body.removeChild(container!);
  });

  describe("simple queries", () => {
    it("should handle a simple query", () => {
      const divElement = document.createElement("div");
      divElement.id = "test";
      container.appendChild(divElement);

      const doc = baseAdapter(container);

      expect(doc.query("div").single().isHTMLElement).toBe(true);
      expect(doc.queryHTML("div").single().id).toBe("test");
    });

    it("should handle a non HTML element", () => {
      const svgElement = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
      );
      svgElement.id = "test";
      container.appendChild(svgElement);

      const doc = baseAdapter(container);

      expect(doc.query("svg").single().id).toBe("test");
      expect(doc.queryHTML("svg").all()).toEqual([]);
    });

    it("should matches snapshot", () => {
      const divElement = document.createElement("div");
      divElement.id = "test";
      container.appendChild(divElement);

      const doc = baseAdapter(container);

      expect(doc.query("div").single()).toMatchSnapshot();
      expect(doc.queryHTML("div").single()).toMatchSnapshot();
    });
  });

  describe("attribute check", () => {
    it("should allow to retrieve attribute data from an HTML element", () => {
      fc.assert(
        fc
          .property(globalHTMLAttrArb, (attr) => {
            const divElement = document.createElement("div");
            for (const key in attr) {
              if (attr[key as keyof typeof attr] === false) {
                divElement.removeAttribute(key.toLowerCase());
              } else if (attr[key as keyof typeof attr] !== undefined) {
                divElement.setAttribute(
                  key.toLowerCase(),
                  String(attr[key as keyof typeof attr])
                );
                expect(divElement.getAttribute(key.toLowerCase())).toBe(
                  String(attr[key as keyof typeof attr])
                );
              }
            }
            container.appendChild(divElement);

            const doc = baseAdapter(container);
            expect(doc.queryHTML("div").single()).toMatchObject(attr);

            divElement.remove();
          })
          .afterEach(() => {
            document.body.removeChild(container!);
            container = document.createElement("div");
            document.body.appendChild(container!);
          })
      );
    });
  });
});
