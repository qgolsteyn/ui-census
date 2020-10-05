import { createDOMAdapter, htmlAdapter } from "dom-ui-census";
import React from "react";
import { createTestRender } from "..";

const adapter = createDOMAdapter(
  (target) => {
    let elements = Array.from(target.querySelectorAll("div"));

    return elements;
  },
  {
    text: (element) => element.textContent,
  },
  {}
);

const divReactAdapter = createTestRender(adapter);

const $ = createTestRender(htmlAdapter);

test("it handles a basic query", () => {
  const divAccessor = divReactAdapter(<div>Test 1</div>);

  expect(divAccessor().single().text).toBe("Test 1");
});

test("it handles a query by prop with mapping", () => {
  const divAccessor = divReactAdapter(
    <>
      <div>1</div>
      <div>2</div>
      <div>3</div>
    </>
  );

  expect(
    divAccessor()
      .all()
      .map((node) => node.text)
  ).toStrictEqual(["1", "2", "3"]);
});

test("it supports snapshot testing", () => {
  const divAccessor = divReactAdapter(<div id="test">Test 4</div>);

  expect(divAccessor().all()).toMatchSnapshot();
});
