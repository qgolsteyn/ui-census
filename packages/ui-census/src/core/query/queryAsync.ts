import { Dict } from "../../types";

import { match, apply } from "./queries";

type Operation<T extends Dict> = (elements: T[]) => T[];

export type QueryAsync<T extends Dict> = {
  match: (schema: Partial<T>) => QueryAsync<T>;
  single: () => Promise<T>;
  first: () => Promise<T>;
  last: () => Promise<T>;
  all: () => Promise<T[]>;
};

export const queryAsync = <T extends Dict>(
  elements: Promise<T[]>,
  operations: Operation<T>[] = []
) => {
  return {
    match: matchAsync(elements, operations),
    single: single(elements, operations),
    first: first(elements, operations),
    last: last(elements, operations),
    all: all(elements, operations),
  };
};

const matchAsync = <T extends Dict>(
  elements: Promise<T[]>,
  operations: Operation<T>[]
) => (schema: Partial<T>) => {
  return queryAsync(elements, [
    ...operations,
    (elements) => match(elements, schema),
  ]);
};

const single = <T extends Dict>(
  elements: Promise<Array<T>>,
  operations: Operation<T>[]
) => async () => {
  const filtered = apply(await elements, operations);

  if (filtered.length === 1) {
    return filtered[0];
  } else {
    throw new Error(`Expected 1 element, received ${filtered.length}`);
  }
};

const first = <T extends Dict>(
  elements: Promise<Array<T>>,
  operations: Operation<T>[]
) => async () => {
  const filtered = apply(await elements, operations);

  if (filtered.length > 0) {
    return filtered[0];
  } else {
    throw new Error("Expected at least 1 element, received 0");
  }
};

const last = <T extends Dict>(
  elements: Promise<Array<T>>,
  operations: Operation<T>[]
) => async () => {
  const filtered = apply(await elements, operations);

  if (filtered.length > 0) {
    return filtered[filtered.length - 1];
  } else {
    throw new Error("Expected at least 1 element, received 0");
  }
};

const all = <T extends Dict>(
  elements: Promise<Array<T>>,
  operations: Operation<T>[]
) => async () => {
  return apply(await elements, operations);
};
