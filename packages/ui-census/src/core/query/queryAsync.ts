import { Dict } from "../../types";

import { match } from "./queries";

type Operation<T extends Dict> = (elements: T[]) => T[];

export type QueryAsync<T extends Dict> = {
  match: (schema: Partial<T>) => QueryAsync<T>;
  single: () => Promise<T>;
  all: () => Promise<T[]>;
};

export const queryAsync = <T extends Dict>(
  elements: Promise<T[]>,
  operations: Operation<T>[] = []
) => {
  return {
    match: matchAsync(elements, operations),
    single: singleAsync(elements, operations),
    all: allAsync(elements, operations),
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

const singleAsync = <T extends Dict>(
  elements: Promise<Array<T>>,
  operations: Operation<T>[]
) => async () => {
  let filtered = await elements;
  for (const operation of operations) {
    filtered = operation(filtered);
  }

  return filtered[0];
};

const allAsync = <T extends Dict>(
  elements: Promise<Array<T>>,
  operations: Operation<T>[]
) => async () => {
  let filtered = await elements;
  for (const operation of operations) {
    filtered = operation(filtered);
  }

  return filtered;
};
