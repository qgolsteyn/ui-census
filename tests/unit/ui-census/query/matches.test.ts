import { matches } from "ui-census/src/query/queries";

describe("matches", () => {
  test("it handles an empty array", () => {
    const result = matches([] as Array<{ test: string }>, { test: "test" });

    expect(result).toEqual([]);
  });

  test("it handles an exact match", () => {
    const testObject = {
      foo: "test",
      bar: 10,
    };

    const testArray = [
      {
        foo: "test",
        bar: 11,
      },
      testObject,
      {
        foo: "4",
        bar: 10,
      },
    ];

    expect(matches(testArray, testObject)).toEqual([testObject]);
  });

  test("it handles multiple matches", () => {
    const testObject = {
      foo: "test",
      bar: 10,
    };

    const testArray = [
      {
        foo: "test",
        bar: 11,
      },
      testObject,
      {
        foo: "4",
        bar: 10,
      },
      testObject,
    ];

    expect(matches(testArray, testObject)).toEqual([testObject, testObject]);
  });

  test("it returns an empty array if the expected object is a superset of the elements present in the array", () => {
    const testObject = {
      foo: "test",
      bar: 10,
    };

    const testArray = [
      {
        foo: "test",
        bar: 11,
      },
      testObject,
      {
        foo: "4",
        bar: 10,
      },
      testObject,
    ];

    // @ts-expect-error
    // Typing should spot that we are providing a property that does not exist
    // in the array elements
    expect(matches(testArray, { ...testObject, additionalProp: true })).toEqual(
      []
    );
  });

  test("it returns an empty array if the expected object is a subset of the elements present in the array", () => {
    const testObject = {
      foo: "test",
      bar: 10,
    };

    const testArray = [
      {
        foo: "test",
        bar: 11,
      },
      testObject,
      {
        foo: "4",
        bar: 10,
      },
      testObject,
    ];

    // @ts-expect-error
    // Typing should spot that we are missing properties that are present
    // in the array elements
    expect(matches(testArray, { foo: "test" })).toEqual([]);
  });
});
