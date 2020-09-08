import { contains } from "../queries";

describe("contains", () => {
  test("it handles an empty array", () => {
    //@ts-expect-error
    const result = contains([], { test: "test" });

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

    expect(contains(testArray, testObject)).toEqual([testObject]);
  });

  test("it handles an subset match", () => {
    const testObject1 = {
      foo: "test",
      bar: 10,
    };

    const testObject2 = {
      foo: "test",
      bar: 11,
    };

    const testArray = [
      testObject1,
      testObject2,
      {
        foo: "4",
        bar: 10,
      },
    ];

    expect(contains(testArray, { foo: "test" })).toEqual([
      testObject1,
      testObject2,
    ]);
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

    expect(
      // @ts-expect-error
      // Typing should spot that we are providing a property that does not exist
      // in the array elements
      contains(testArray, { ...testObject, additionalProp: true })
    ).toEqual([]);
  });
});
