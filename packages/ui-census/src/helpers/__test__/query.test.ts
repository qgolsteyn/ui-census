import { createDOMAdapter } from "../..";
import { query } from "../query";

const b = createDOMAdapter({
  div: {
    _selector: (target) => {
      let elements = Array.from(target.querySelectorAll("div"));

      return elements;
    },
    id: (element) => element.id,
    classNames: (element) => Array.from(element.classList),
    text: (element) => element.textContent,
  },
});

const doc = b(document.body);

afterEach(() => {
  document.body.innerHTML = "";
});

test("it can find a single element", () => {
  const div = document.createElement("div");
  div.id = "test";
  div.textContent = "Test 1";
  document.body.append(div);

  const match = query(doc.div).match({ id: "test" }).single();

  expect(match.text).toBe("Test 1");
});

test("it can find a multiple element", () => {
  for (let i = 1; i <= 3; i++) {
    const div = document.createElement("div");
    div.textContent = "test";
    document.body.append(div);
  }

  const match = query(doc.div).match({ text: "test" }).all();

  expect(match.map((element) => element.text)).toStrictEqual([
    "test",
    "test",
    "test",
  ]);
});
