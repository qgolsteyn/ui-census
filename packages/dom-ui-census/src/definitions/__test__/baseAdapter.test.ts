import baseAdapter from "../baseAdapter";

let container: HTMLDivElement;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container!);
});

afterEach(() => {
  document.body.removeChild(container!);
});

test("with a simple query", () => {
  const divElement = document.createElement("div");
  divElement.id = "test";
  container.appendChild(divElement);

  const doc = baseAdapter(container);

  expect(doc.query("div").single().isHTMLElement).toBe(true);
  expect(doc.queryHTML("div").single().id).toBe("test");
});

test("with a non HTML element", () => {
  const svgElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  svgElement.id = "test";
  container.appendChild(svgElement);

  const doc = baseAdapter(container);

  expect(doc.query("svg").single().id).toBe("test");
  expect(doc.queryHTML("svg").all()).toEqual([]);
});

test("matches snapshot", () => {
  const divElement = document.createElement("div");
  divElement.id = "test";
  container.appendChild(divElement);

  const doc = baseAdapter(container);

  expect(doc.query("div").single()).toMatchSnapshot();
  expect(doc.queryHTML("div").single()).toMatchSnapshot();
});
