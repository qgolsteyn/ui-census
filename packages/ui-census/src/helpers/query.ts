import { Dict } from "../types";

type QueryAsync<T extends Dict> = {
  match: (schema: Partial<T>) => QueryAsync<T>;
  single: () => Promise<T>;
  all: () => Promise<T[]>;
};

type QuerySync<T extends Dict> = {
  match: (schema: Partial<T>) => QuerySync<T>;
  single: () => T;
  all: () => T[];
};

export function query<T extends Dict>(elements: T[]): QuerySync<T>;
export function query<T extends Dict>(elements: Promise<T[]>): QueryAsync<T>;
export function query<T extends Dict>(elements: T[] | Promise<T[]>) {
  if (Array.isArray(elements)) {
    return querySync(elements);
  } else {
    return queryAsync(elements);
  }
}

export const querySync = <T extends Dict>(elements: T[]) => {
  return {
    match: matchSync(elements),
    single: single(elements),
    all: all(elements),
  };
};

export const queryAsync = <T extends Dict>(elements: Promise<T[]>) => {
  return {
    match: matchAsync(elements),
    single: singleAsync(elements),
    all: allAsync(elements),
  };
};

const match = <T extends Dict>(elements: T[], schema: Partial<T>): T[] => {
  let filtered = elements;
  for (const key in schema) {
    filtered = filtered.filter((element) => element[key] === schema[key]);
  }
  return filtered;
};

const matchSync = <T extends Dict>(elements: T[]) => (schema: Partial<T>) => {
  return querySync(match(elements, schema));
};

const matchAsync = <T extends Dict>(elements: Promise<T[]>) => (
  schema: Partial<T>
) => {
  return queryAsync(elements.then((values) => match(values, schema)));
};

const single = <T extends Dict>(elements: Array<T>) => () => {
  return elements[0];
};

const singleAsync = <T extends Dict>(
  elements: Promise<Array<T>>
) => async () => {
  return (await elements)[0];
};

const all = <T extends Dict>(elements: Array<T>) => () => {
  return elements;
};

const allAsync = <T extends Dict>(elements: Promise<Array<T>>) => async () => {
  return await elements;
};
