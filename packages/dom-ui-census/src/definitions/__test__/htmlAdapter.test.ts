import fc from "fast-check";
import htmlAdapter from "../htmlAdapter";
import { basicHTMLElement, globalHTMLAttrArb } from "./htmlFixtures";

let container: HTMLDivElement;

describe("html adapter", () => {
  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container!);
  });

  afterEach(() => {
    document.body.removeChild(container!);
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
              if (attr[key as keyof typeof attr] !== undefined) {
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
