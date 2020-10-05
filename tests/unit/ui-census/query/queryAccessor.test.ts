import { Dict } from "ui-census/src/types";
import { querySync } from "ui-census/src/core/query/querySync";

const inputArrayMulti = [
  { text: "this" },
  { text: "is" },
  { text: "a" },
  { text: "test" },
];

const inputArraySingle = [{ text: "Just one element" }];

const inputArrayNoElements: Dict[] = [];

test("it allows you to access all elements", () => {
  const query = querySync(inputArrayMulti);

  expect(query.all()).toEqual(inputArrayMulti);
});

test("it allows you to access the first element", () => {
  const query = querySync(inputArrayMulti);

  expect(query.first()).toEqual(inputArrayMulti[0]);
});

test("it allows you to access the last element", () => {
  const query = querySync(inputArrayMulti);

  expect(query.last()).toEqual(inputArrayMulti[inputArrayMulti.length - 1]);
});

test("it allows you to assert on the presence of only one element", () => {
  const query = querySync(inputArraySingle);

  expect(query.single()).toEqual(inputArraySingle[0]);
});

test("it throws an error if no elements exist and we are accessing the first element", () => {
  const query = querySync(inputArrayNoElements);

  expect(query.first).toThrow();
});

test("it throws an error if no elements exist and we are accessing the last element", () => {
  const query = querySync(inputArrayNoElements);

  expect(query.first).toThrow();
});

test("it throws an error if no elements exist and we are accessing a single element", () => {
  const query = querySync(inputArrayNoElements);

  expect(query.last).toThrow();
});

test("it throws an error if many elements exist and we are accessing a single element", () => {
  const query = querySync(inputArrayMulti);

  expect(query.single).toThrow();
});
