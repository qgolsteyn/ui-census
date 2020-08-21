import createDOMAdapter from "../../src";

const b = createDOMAdapter(
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

const doc = b(document.querySelector("body")!);

afterEach(() => {
  document.body.innerHTML = "";
});

test("it handles a basic query", () => {
  const div = document.createElement("div");
  div.textContent = "Test 1";
  document.body.append(div);

  expect(doc.div.text).toBe("Test 1");
});

test("it handles a basic query by id", () => {
  const div = document.createElement("div");
  div.id = "test";
  div.textContent = "Test 2";
  document.body.append(div);

  expect(doc.div.q("test").text).toBe("Test 2");
});

test("it handles a basic query by prop", () => {
  const div = document.createElement("div");
  div.id = "test";
  div.textContent = "Test 3";
  document.body.append(div);

  expect(doc.div.q({ id: "test" })[0].text).toBe("Test 3");
});

test("it handles a query by prop with mapping", () => {
  for (let i = 1; i <= 3; i++) {
    const div = document.createElement("div");
    div.textContent = String(i);
    document.body.append(div);
  }

  expect(doc.div.q({}).map((node) => node.text)).toStrictEqual(["1", "2", "3"]);
});

test("it handles object deep equality", () => {
  const div = document.createElement("div");
  div.id = "test";
  div.textContent = "Test 4";
  document.body.append(div);

  expect(Object.keys(doc.div)).toStrictEqual(["text"]);
  expect(Object.keys(doc.div.q("test"))).toStrictEqual(["text"]);
  expect(Object.keys(doc.div.q({ id: "test" })[0])).toStrictEqual(["text"]);

  expect(doc.div).toEqual({ text: "Test 4" });
  expect(doc.div.q("test")).toEqual({ text: "Test 4" });
  expect(doc.div.q({ id: "test" })[0]).toEqual({ text: "Test 4" });
});

test("it allows to access the underlying element", () => {
  const div = document.createElement("div");
  div.id = "test";
  div.textContent = "Test 4";
  document.body.append(div);

  expect(doc.div.element).toBe(div);
  expect(doc.div.q("test").element).toBe(div);
  expect(doc.div.q({ id: "test" })[0].element).toBe(div);
});

test("it supports snapshot testing", () => {
  const div = document.createElement("div");
  div.id = "test";
  div.textContent = "Test 4";
  document.body.append(div);

  expect(doc.div).toMatchSnapshot();
  expect(doc.div.q("test")).toMatchSnapshot();
  expect(doc.div.q({ id: "test" })).toMatchSnapshot();
});

test("it throws when accessing default query where multiple elements are present", () => {
  for (let i = 1; i <= 3; i++) {
    const div = document.createElement("div");
    div.textContent = String(i);
    document.body.append(div);
  }

  expect(() => doc.div.text).toThrow();
});

test("it throws when accessing id query where multiple elements are present", () => {
  for (let i = 1; i <= 3; i++) {
    const div = document.createElement("div");
    div.id = "test";
    div.textContent = String(i);
    document.body.append(div);
  }

  expect(() => doc.div.q("test").text).toThrow();
});
