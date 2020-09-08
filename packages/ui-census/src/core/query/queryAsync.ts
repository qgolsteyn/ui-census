import { Dict } from "../../types";

import { matches, contains, apply } from "./queries";

type Operation<T extends Dict> = (elements: T[]) => T[];

export type QueryAsync<Queries extends Dict, Actions extends Dict> = {
  matches: (schema: Queries) => QueryAsync<Queries, Actions>;
  contains: (schema: Partial<Queries>) => QueryAsync<Queries, Actions>;
  single: () => Promise<Queries & Actions>;
  first: () => Promise<Queries & Actions>;
  last: () => Promise<Queries & Actions>;
  all: () => Promise<Array<Queries & Actions>>;
};

export const queryAsync = <Queries extends Dict, Actions extends Dict>(
  elements: Promise<Queries[]>,
  operations: Operation<Queries>[] = []
) => {
  return {
    matches: applyOperation(matches, elements, operations),
    contains: applyOperation(contains, elements, operations),
    single: single(elements, operations),
    first: first(elements, operations),
    last: last(elements, operations),
    all: all(elements, operations),
  };
};

const applyOperation = <T extends Dict, K extends any[]>(
  operation: (elements: T[], ...args: K) => T[],
  elements: Promise<T[]>,
  operations: Operation<T>[]
) => (...args: K) => {
  return queryAsync(elements, [
    ...operations,
    (elements) => operation(elements, ...args),
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
