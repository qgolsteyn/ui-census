import React from "react";
import fc from "fast-check";
import { globalHTMLAttrArb } from "../__fixtures__/htmlFixtures";
import { baseTestRender } from "react-ui-census";

describe("base adapter", () => {
  describe("simple queries", () => {
    it("should handle a simple query", () => {
      const component = <div id="test"></div>;
      const doc = baseTestRender(component);

      expect(doc.query("div").single().isHTMLElement).toBe(true);
      expect(doc.queryHTML("div").single().id).toBe("test");
    });

    it("should handle a non HTML element", () => {
      const component = <svg id="test"></svg>;

      const doc = baseTestRender(component);

      expect(doc.query("svg").single().id).toBe("test");
      expect(doc.queryHTML("svg").all()).toEqual([]);
    });

    it("should matches snapshot", () => {
      const component = <div id="test"></div>;

      const doc = baseTestRender(component);

      expect(doc.query("div").single()).toMatchSnapshot();
      expect(doc.queryHTML("div").single()).toMatchSnapshot();
    });
  });

  describe("attribute check", () => {
    it("should allow to retrieve attribute data from an HTML element", () => {
      fc.assert(
        fc.property(globalHTMLAttrArb, (attr) => {
          const component = <div {...attr} />;

          const doc = baseTestRender(component);
          expect(doc.queryHTML("div").single()).toMatchObject(attr);
        })
      );
    });
  });
});
