import { Dict } from "../../types";

export const contains = <T extends Dict>(
  elements: T[],
  schema: Partial<T>
): T[] => {
  let filtered = elements;
  for (const key in schema) {
    filtered = filtered.filter((element) => element[key] === schema[key]);
  }
  return filtered;
};

export const matches = <T extends Dict>(elements: T[], schema: T): T[] => {
  return elements.filter((element) => {
    for (const key in { ...element, ...schema }) {
      if (element[key] !== schema[key]) {
        return false;
      }
    }
    return true;
  });
};

export const apply = <T extends Dict>(
  elements: T[],
  operations: Array<(elements: T[]) => T[]>
) => {
  let filtered = elements;
  for (const operation of operations) {
    filtered = operation(filtered);
  }

  return filtered;
};
