import { Dict } from "../types";
import { querySync } from "./querySync";
import { queryAsync } from "./queryAsync";

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
