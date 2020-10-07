import { Dict } from "../../types";

import { matches, contains, apply } from "./queries";
import { createBaseProxyHandler } from "../utils/proxy";

type Operation<T extends Dict> = (elements: T[]) => T[];

export type QuerySync<Queries extends Dict, Actions extends Dict> = {
  matches: (schema: Queries) => QuerySync<Queries, Actions>;
  contains: (schema: Partial<Queries>) => QuerySync<Queries, Actions>;
  single: () => Queries & Actions;
  first: () => Queries & Actions;
  last: () => Queries & Actions;
  all: () => Array<Queries & Actions>;
  grouped: () => {
    [Key in keyof Queries]: Array<Queries[Key]>;
  } &
    {
      [Key in keyof Actions]: (
        ...args: Parameters<Actions[Key]>
      ) => Array<ReturnType<Actions[Key]>>;
    };
};

export const querySync = <T extends Dict>(
  elements: T[],
  queryKeys: string[],
  actionKeys: string[],
  operations: Operation<T>[] = []
) => {
  return {
    matches: applyOperation(
      matches,
      elements,
      queryKeys,
      actionKeys,
      operations
    ),
    contains: applyOperation(
      contains,
      elements,
      queryKeys,
      actionKeys,
      operations
    ),
    single: single(elements, operations),
    first: first(elements, operations),
    last: last(elements, operations),
    all: all(elements, operations),
    grouped: grouped(elements, operations, queryKeys, actionKeys),
  };
};

const applyOperation = <T extends Dict, K extends any[]>(
  operation: (elements: T[], ...args: K) => T[],
  elements: T[],
  queryKeys: string[],
  actionKeys: string[],
  operations: Operation<T>[]
) => (...args: K) => {
  return querySync(elements, queryKeys, actionKeys, [
    ...operations,
    (elements) => operation(elements, ...args),
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

const grouped = <T extends Dict>(
  elements: Array<T>,
  operations: Operation<T>[],
  queryKeys: string[],
  actionKeys: string[]
) => () => {
  const filtered = apply(elements, operations);

  const groupedObj: any = {};

  for (const key of queryKeys) {
    groupedObj[key] = () => filtered.map((item) => item[key]);
  }

  for (const key of actionKeys) {
    groupedObj[key] = () => (...args: any[]) =>
      filtered.map((item) => item[key](...args));
  }

  const handler: ProxyHandler<Dict> = {
    get: (obj, p) => {
      if (typeof p === "string" && p in groupedObj) {
        return groupedObj[p]();
      } else {
        return obj[p as any];
      }
    },
  };

  return new Proxy(
    {},
    { ...handler, ...createBaseProxyHandler(queryKeys) }
  ) as any;
};
