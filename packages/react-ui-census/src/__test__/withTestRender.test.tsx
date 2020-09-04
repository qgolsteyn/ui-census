import React from "react";
import { createTestRender } from "..";

const b = createTestRender({
  div: {
    _selector: (target) => {
      let elements = Array.from(target.querySelectorAll("div"));

      return elements;
    },
    text: (element) => element.textContent,
  },
});

test("it handles a basic query", () => {
  const doc = b(<div>Test 1</div>);

  expect(doc.div[0].text).toBe("Test 1");
});

test("it handles a query by prop with mapping", () => {
  const doc = b(
    <>
      <div>1</div>
      <div>2</div>
      <div>3</div>
    </>
  );

  expect(doc.div.map((node) => node.text)).toStrictEqual(["1", "2", "3"]);
});

test("it supports snapshot testing", () => {
  const doc = b(<div id="test">Test 4</div>);

  expect(doc.div).toMatchSnapshot();
});
