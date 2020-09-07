import React from "react";
import { createReactAdapter } from "..";

const b = createReactAdapter({
  div: {
    _selector: (target) => {
      let elements = Array.from(target.querySelectorAll("div"));

      return elements;
    },
    text: (element) => element.textContent,
  },
});

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
  const doc = b(<div>Test 1</div>, container!);

  expect(doc.div()[0].text).toBe("Test 1");
});

test("it handles a query by prop with mapping", () => {
  const doc = b(
    <>
      <div>1</div>
      <div>2</div>
      <div>3</div>
    </>,
    container!
  );

  expect(doc.div().map((node) => node.text)).toStrictEqual(["1", "2", "3"]);
});

test("it supports snapshot testing", () => {
  const doc = b(<div id="test">Test 4</div>, container!);

  expect(doc.div()).toMatchSnapshot();
});

test("it supports snapshot testing with multiple elements", () => {
  const doc = b(
    <>
      <div id="test">Test 1</div>
      <div id="test">Test 2</div>
      <div id="test">
        Test 3 and <div id="test">Test 4</div>
      </div>
    </>,
    container!
  );

  expect(doc.div()).toMatchSnapshot();
});
