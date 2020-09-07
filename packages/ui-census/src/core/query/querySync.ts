import { Dict } from "../../types";

import { match, apply } from "./queries";

type Operation<T extends Dict> = (elements: T[]) => T[];

export type QuerySync<T extends Dict> = {
  match: (schema: Partial<T>) => QuerySync<T>;
  single: () => T;
  first: () => T;
  last: () => T;
  all: () => T[];
};

export const querySync = <T extends Dict>(
  elements: T[],
  operations: Operation<T>[] = []
) => {
  return {
    match: matchSync(elements, operations),
    single: single(elements, operations),
    first: first(elements, operations),
    last: last(elements, operations),
    all: all(elements, operations),
  };
};

const matchSync = <T extends Dict>(
  elements: T[],
  operations: Operation<T>[]
) => (schema: Partial<T>) => {
  return querySync(elements, [
    ...operations,
    (elements) => match(elements, schema),
  ]);
};

const single = <T extends Dict>(
  elements: Array<T>,
  operations: Operation<T>[]
) => () => {
  const filtered = apply(elements, operations);

  if (filtered.length === 1) {
    return filtered[0];
  } else {
    throw new Error(`Expected 1 element, received ${filtered.length}`);
  }
};

const first = <T extends Dict>(
  elements: Array<T>,
  operations: Operation<T>[]
) => () => {
  const filtered = apply(elements, operations);

  if (filtered.length > 0) {
    return filtered[0];
  } else {
    throw new Error("Expected at least 1 element, received 0");
  }
};

const last = <T extends Dict>(
  elements: Array<T>,
  operations: Operation<T>[]
) => () => {
  const filtered = apply(elements, operations);

  if (filtered.length > 0) {
    return filtered[filtered.length - 1];
  } else {
    throw new Error("Expected at least 1 element, received 0");
  }
};

const all = <T extends Dict>(
  elements: Array<T>,
  operations: Operation<T>[]
) => () => {
  return apply(elements, operations);
};
