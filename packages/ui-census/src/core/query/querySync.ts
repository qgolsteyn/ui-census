import { Dict } from "../../types";

import { match } from "./queries";

type Operation<T extends Dict> = (elements: T[]) => T[];

export type QuerySync<T extends Dict> = {
  match: (schema: Partial<T>) => QuerySync<T>;
  single: () => T;
  all: () => T[];
};

export const querySync = <T extends Dict>(
  elements: T[],
  operations: Operation<T>[] = []
) => {
  return {
    match: matchSync(elements, operations),
    single: single(elements, operations),
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
  let filtered = elements;
  for (const operation of operations) {
    filtered = operation(filtered);
  }

  return filtered[0];
};

const all = <T extends Dict>(
  elements: Array<T>,
  operations: Operation<T>[]
) => () => {
  let filtered = elements;
  for (const operation of operations) {
    filtered = operation(filtered);
  }

  return elements;
};
