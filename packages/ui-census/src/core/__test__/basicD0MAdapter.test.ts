import createDOMAdapter from "../createDOMAdapter";

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

  const divObject = doc.div().single();

  expect(divObject.text).toBe("Test 1");
});

test("it handles a query by prop with mapping", () => {
  for (let i = 1; i <= 3; i++) {
    const div = document.createElement("div");
    div.textContent = String(i);
    document.body.append(div);
  }

  const divObjects = doc.div().all();

  expect(divObjects.map((node) => node.text)).toStrictEqual(["1", "2", "3"]);
});

test("it handles object deep equality", () => {
  const div = document.createElement("div");
  div.id = "test";
  div.textContent = "Test 4";
  document.body.append(div);

  const divObject = doc.div().single();

  expect(Object.keys(divObject)).toStrictEqual(["text"]);
  expect(divObject).toEqual({ text: "Test 4" });
});

test("it supports snapshot testing", () => {
  const div = document.createElement("div");
  div.id = "test";
  div.textContent = "Test 4";
  document.body.append(div);

  expect(doc.div().all()).toMatchSnapshot();
});

test("it handles a simple query", () => {
  for (let i = 1; i <= 3; i++) {
    const div = document.createElement("div");
    div.textContent = String(i);
    document.body.append(div);
  }

  const match = doc.div().contains({ text: "2" }).single();

  expect(match).toEqual({ text: "2" });
});
