import createAdapter from "../createAdapter";

const b = createAdapter({
  word: {
    selector: (target: string) => {
      let elements = target.split(" ");

      return elements;
    },
    queries: {
      text: (element: string) => element,
      length: (element: string) => element.length,
    },
    actions: {},
  },
});

test("it handles a basic query", () => {
  const doc = b("hello");

  const word = doc.word().single();

  expect(word.text).toBe("hello");
  expect(word.length).toBe(5);
});

test("it handles a query by prop with mapping", () => {
  const doc = b("this is a test");

  const divObjects = doc.word().all();

  expect(divObjects.map((node) => node.text)).toStrictEqual([
    "this",
    "is",
    "a",
    "test",
  ]);
});

test("it handles object deep equality", () => {
  const doc = b("canadian");

  const divObject = doc.word().single();

  expect(Object.keys(divObject)).toStrictEqual(["text", "length"]);
  expect(divObject).toEqual({ text: "canadian", length: 8 });
});

test("it supports snapshot testing", () => {
  const doc = b("snapshot testing");

  expect(doc.word().all()).toMatchSnapshot();
});

test("it handles a simple query", () => {
  const doc = b("Lorem ipsum dolor sit amet");

  const match = doc.word().contains({ text: "amet" }).single();

  expect(match).toMatchObject({ length: 4 });
});
