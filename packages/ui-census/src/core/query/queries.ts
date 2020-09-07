import { Dict } from "../../types";

export const match = <T extends Dict>(
  elements: T[],
  schema: Partial<T>
): T[] => {
  let filtered = elements;
  for (const key in schema) {
    filtered = filtered.filter((element) => element[key] === schema[key]);
  }
  return filtered;
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
