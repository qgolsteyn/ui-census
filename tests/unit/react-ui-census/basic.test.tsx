import { createDOMAdapter } from "dom-ui-census";
import React from "react";
import { createReactAdapter } from "react-ui-census";

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

const divReactAdapter = createReactAdapter(adapter);

let container: HTMLDivElement | null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container!);
});

afterEach(() => {
  document.body.removeChild(container!);
  container = null;
});

test("it handles a basic query", () => {
  const divAccessor = divReactAdapter(<div>Test 1</div>, container!);

  expect(divAccessor().single().text).toBe("Test 1");
});

test("it handles a query by prop with mapping", () => {
  const divAccessor = divReactAdapter(
    <>
      <div>1</div>
      <div>2</div>
      <div>3</div>
    </>,
    container!
  );

  expect(
    divAccessor()
      .all()
      .map((node) => node.text)
  ).toStrictEqual(["1", "2", "3"]);
});

test("it supports snapshot testing", () => {
  const divAccessor = divReactAdapter(<div id="test">Test 4</div>, container!);

  expect(divAccessor().all()).toMatchSnapshot();
});

test("it supports snapshot testing with multiple elements", () => {
  const divAccessor = divReactAdapter(
    <>
      <div id="test">Test 1</div>
      <div id="test">Test 2</div>
      <div id="test">
        Test 3 and <div id="test">Test 4</div>
      </div>
    </>,
    container!
  );

  expect(divAccessor().all()).toMatchSnapshot();
});
