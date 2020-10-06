import fc from "fast-check";
import { htmlAdapter } from "dom-ui-census";
import {
  basicHTMLElement,
  globalHTMLAttrArb,
} from "../__fixtures__/htmlFixtures";

let container: HTMLDivElement;

describe("html adapter", () => {
  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container!);
  });

  afterEach(() => {
    document.body.removeChild(container!);
  });

  describe("base adapter accessors", () => {
    it("should handle a simple query", () => {
      const divElement = document.createElement("div");
      divElement.id = "test";
      container.appendChild(divElement);

      const doc = htmlAdapter(container);

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

      const doc = htmlAdapter(container);

      expect(doc.query("svg").single().id).toBe("test");
      expect(doc.queryHTML("svg").all()).toEqual([]);
    });

    it("should matches snapshot", () => {
      const divElement = document.createElement("div");
      divElement.id = "test";
      container.appendChild(divElement);

      const doc = htmlAdapter(container);

      expect(doc.query("div").single()).toMatchSnapshot();
      expect(doc.queryHTML("div").single()).toMatchSnapshot();
    });
  });

  describe.each(basicHTMLElement)("%s - simple queries", (tagName) => {
    it("should handle a simple query", () => {
      const divElement = document.createElement(tagName);
      divElement.id = "test";
      container.appendChild(divElement);

      const doc = htmlAdapter(container) as any;

      expect(doc[tagName as keyof typeof doc]().single().id).toBe("test");
    });

    it("should matches snapshot", () => {
      const divElement = document.createElement(tagName);
      divElement.id = "test";
      container.appendChild(divElement);

      const doc = htmlAdapter(container) as any;

      expect(doc[tagName as keyof typeof doc]().single()).toMatchSnapshot();
    });
  });

  describe.each(basicHTMLElement)("%s - attribute check", (tagName) => {
    it("should allow to retrieve attribute data from an HTML element", () => {
      fc.assert(
        fc
          .property(globalHTMLAttrArb, (attr) => {
            const divElement = document.createElement(tagName);
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

            const doc = htmlAdapter(container) as any;
            expect(doc[tagName as keyof typeof doc]().single()).toMatchObject(
              attr
            );
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
