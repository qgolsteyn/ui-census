import React from "react";
import { createTestRender } from "..";

const b = createTestRender(
  {
    div: (target, query: { id?: string } = {}) => {
      const elements = Array.from(target.querySelectorAll("div"));

      return elements.filter((element) => {
        if (query.id !== undefined) {
          return element.id === query.id;
        } else {
          return true;
        }
      });
    },
  },
  {
    div: {
      text: (element) => element.textContent,
    },
  }
);

test("it handles a basic query", () => {
  const doc = b(<div>Test 1</div>);

  expect(doc.div.text).toBe("Test 1");
});

test("it handles a basic query by id", () => {
  const doc = b(<div id="test">Test 2</div>);

  expect(doc.div.q("test").text).toBe("Test 2");
});

test("it handles a basic query by prop", () => {
  const doc = b(<div id="test">Test 3</div>);

  expect(doc.div.q({ id: "test" })[0].text).toBe("Test 3");
});

test("it handles a query by prop with mapping", () => {
  const doc = b(
    <>
      <div>1</div>
      <div>2</div>
      <div>3</div>
    </>
  );

  expect(doc.div.q({}).map((node) => node.text)).toStrictEqual(["1", "2", "3"]);
});

test("it supports snapshot testing", () => {
  const doc = b(<div id="test">Test 4</div>);

  expect(doc.div).toMatchSnapshot();
  expect(doc.div.q("test")).toMatchSnapshot();
  expect(doc.div.q({ id: "test" })).toMatchSnapshot();
});

test("it throws when accessing default query where multiple elements are present", () => {
  const doc = b(
    <>
      <div>1</div>
      <div>2</div>
      <div>3</div>
    </>
  );

  expect(() => doc.div.text).toThrow();
});

test("it throws when accessing id query where multiple elements are present", () => {
  const doc = b(
    <>
      <div>1</div>
      <div>2</div>
      <div>3</div>
    </>
  );

  expect(() => doc.div.q("test").text).toThrow();
});
