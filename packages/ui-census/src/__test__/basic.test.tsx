import { createDOMAdapter } from "..";

const b = createDOMAdapter({
  div: {
    _selector: (target) => {
      let elements = Array.from(target.querySelectorAll("div"));

      return elements;
    },
    text: (element) => element.textContent,
  },
});

const doc = b(document.body);

afterEach(() => {
  document.body.innerHTML = "";
});

test("it handles a basic query", () => {
  const div = document.createElement("div");
  div.textContent = "Test 1";
  document.body.append(div);

  expect(doc.div[0].text).toBe("Test 1");
});

test("it handles a query by prop with mapping", () => {
  for (let i = 1; i <= 3; i++) {
    const div = document.createElement("div");
    div.textContent = String(i);
    document.body.append(div);
  }

  expect(doc.div.map((node) => node.text)).toStrictEqual(["1", "2", "3"]);
});

test("it handles object deep equality", () => {
  const div = document.createElement("div");
  div.id = "test";
  div.textContent = "Test 4";
  document.body.append(div);

  expect(Object.keys(doc.div[0])).toStrictEqual(["text"]);
  expect(doc.div[0]).toEqual({ text: "Test 4" });
});

test("it supports snapshot testing", () => {
  const div = document.createElement("div");
  div.id = "test";
  div.textContent = "Test 4";
  document.body.append(div);

  expect(doc.div).toMatchSnapshot();
});
