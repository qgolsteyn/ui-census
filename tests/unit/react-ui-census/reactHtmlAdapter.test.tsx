import React from "react";
import fc from "fast-check";
import {
  globalHTMLAttrArb,
  basicHTMLElement,
} from "../__fixtures__/htmlFixtures";
import { htmlTestRender } from "react-ui-census";

describe("html adapter", () => {
  describe.each(basicHTMLElement)("%s - simple queries", (TagName: any) => {
    it("should handle a simple query", () => {
      const component = <TagName id="test"></TagName>;
      const doc = htmlTestRender(component) as any;

      expect(doc[TagName as keyof typeof doc]().single().id).toBe("test");
    });

    it("should matches snapshot", () => {
      const component = <TagName id="test"></TagName>;

      const doc = htmlTestRender(component) as any;

      expect(doc[TagName as keyof typeof doc]().single()).toMatchSnapshot();
    });
  });

  describe.each(basicHTMLElement)("%s - attribute check", (TagName: any) => {
    it("should allow to retrieve attribute data from an HTML element", () => {
      fc.assert(
        fc.property(globalHTMLAttrArb, (attr) => {
          const component = <TagName {...attr} />;

          const doc = htmlTestRender(component) as any;
          expect(doc[TagName as keyof typeof doc]().single()).toMatchObject(
            attr
          );
        })
      );
    });
  });
});
