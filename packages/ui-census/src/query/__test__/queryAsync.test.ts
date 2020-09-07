import { createAsyncAdapter } from "../..";
import { query } from "..";

const b = createAsyncAdapter({
  div: {
    _selector: async (target: HTMLElement) => {
      let elements = Array.from(target.querySelectorAll("div"));

      return elements;
    },
    id: (element: HTMLElement) => element.id,
    classNames: (element: HTMLElement) => Array.from(element.classList),
    text: (element: HTMLElement) => element.textContent,
  },
});

const doc = b(document.body);

afterEach(() => {
  document.body.innerHTML = "";
});

test("it can find a single element", async () => {
  const div = document.createElement("div");
  div.id = "test";
  div.textContent = "Test 1";
  document.body.append(div);

  const match = await query(doc.div).match({ id: "test" }).single();

  expect(match.text).toBe("Test 1");
});

test("it can find a multiple element", async () => {
  for (let i = 1; i <= 3; i++) {
    const div = document.createElement("div");
    div.textContent = "test";
    document.body.append(div);
  }

  const match = await query(doc.div).match({ text: "test" }).all();

  expect(match.map((element) => element.text)).toStrictEqual([
    "test",
    "test",
    "test",
  ]);
});
