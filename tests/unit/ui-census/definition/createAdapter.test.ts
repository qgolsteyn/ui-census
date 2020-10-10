import createAdapter from "ui-census/src/core/definition/createCensusObjectFactory";

const wordAdapter = createAdapter(
  (target: string) => {
    let elements = target.split(" ");

    return elements;
  },
  {
    text: (element) => element,
    length: (element) => element.length,
  },
  {
    getElement: (element) => () => element,
  }
);

test("it handles a basic query", () => {
  const wordAccessor = wordAdapter("hello");

  const word = wordAccessor().single();

  expect(word.text).toBe("hello");
  expect(word.length).toBe(5);
});

test("it handles a query by prop with mapping", () => {
  const wordAccessor = wordAdapter("this is a test");

  const divObjects = wordAccessor().all();

  expect(divObjects.map((node) => node.text)).toStrictEqual([
    "this",
    "is",
    "a",
    "test",
  ]);
});

test("it handles object deep equality", () => {
  const wordAccessor = wordAdapter("canadian");

  const divObject = wordAccessor().single();

  expect(Object.keys(divObject)).toStrictEqual(["text", "length"]);
  expect(divObject).toEqual({ text: "canadian", length: 8 });
});

test("it supports snapshot testing", () => {
  const wordAccessor = wordAdapter("snapshot testing");

  expect(wordAccessor().all()).toMatchSnapshot();
  expect(wordAccessor().grouped()).toMatchSnapshot();
});

test("it handles a simple filter", () => {
  const wordAccessor = wordAdapter("Lorem ipsum dolor sit amet");

  const match = wordAccessor().contains({ text: "amet" }).single();

  expect(match).toMatchObject({ length: 4 });
});
