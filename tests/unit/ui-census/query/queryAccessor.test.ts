import { Dict, UIObject } from "ui-census";
import { querySync } from "ui-census/src/query/querySync";

const inputArrayMulti = [
  { text: "this" },
  { text: "is" },
  { text: "a" },
  { text: "test" },
] as UIObject[];

const inputArraySingle = [{ text: "Just one element" }] as UIObject[];

const inputArrayNoElements: Dict[] = [];

test("it allows you to access all elements", () => {
  const query = querySync(inputArrayMulti, ["text"], []);

  expect(query.all()).toEqual(inputArrayMulti);
});

test("it allows you to access the first element", () => {
  const query = querySync(inputArrayMulti, ["text"], []);

  expect(query.first()).toEqual(inputArrayMulti[0]);
});

test("it allows you to access the last element", () => {
  const query = querySync(inputArrayMulti, ["text"], []);

  expect(query.last()).toEqual(inputArrayMulti[inputArrayMulti.length - 1]);
});

test("it allows you to assert on the presence of only one element", () => {
  const query = querySync(inputArraySingle, ["text"], []);

  expect(query.single()).toEqual(inputArraySingle[0]);
});

test("it throws an error if no elements exist and we are accessing the first element", () => {
  const query = querySync(inputArrayNoElements, ["text"], []);

  expect(query.first).toThrow();
});

test("it throws an error if no elements exist and we are accessing the last element", () => {
  const query = querySync(inputArrayNoElements, ["text"], []);

  expect(query.first).toThrow();
});

test("it throws an error if no elements exist and we are accessing a single element", () => {
  const query = querySync(inputArrayNoElements, ["text"], []);

  expect(query.last).toThrow();
});

test("it throws an error if many elements exist and we are accessing a single element", () => {
  const query = querySync(inputArrayMulti, ["text"], []);

  expect(query.single).toThrow();
});
