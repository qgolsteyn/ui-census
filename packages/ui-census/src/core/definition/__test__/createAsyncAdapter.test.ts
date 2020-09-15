import createAsyncAdapter from "../createAsyncAdapter";

const b = createAsyncAdapter({
  word: {
    selector: async (target: string) => {
      let elements = target.split(" ");

      return elements;
    },
    queries: {
      text: async (element: string) => element,
      length: async (element: string) => element.length,
    },
    actions: {},
  },
});

test("it handles a basic query", async () => {
  const doc = b("hello");

  const word = await doc.word().single();

  expect(word.text).toBe("hello");
  expect(word.length).toBe(5);
});

test("it handles a query by prop with mapping", async () => {
  const doc = b("this is a test");

  const divObjects = await doc.word().all();

  expect(divObjects.map((node) => node.text)).toStrictEqual([
    "this",
    "is",
    "a",
    "test",
  ]);
});

test("it handles object deep equality", async () => {
  const doc = b("canadian");

  const divObject = await doc.word().single();

  expect(Object.keys(divObject)).toStrictEqual(["text", "length"]);
  expect(divObject).toEqual({ text: "canadian", length: 8 });
});

test("it supports snapshot testing", async () => {
  const doc = b("snapshot testing");

  expect(await doc.word().all()).toMatchSnapshot();
});

test("it handles a simple query", async () => {
  const doc = b("Lorem ipsum dolor sit amet");

  const match = await doc.word().contains({ text: "amet" }).single();

  expect(match).toMatchObject({ length: 4 });
});
