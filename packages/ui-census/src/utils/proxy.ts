import type { Dict, Index } from "../types/helpers";

/**
 * This function generates a generic handler for proxy objects
 * used in this library. It can later be overriden to cover specific
 * behaviour.
 */
export const createBaseProxyHandler = (keys: Index[]): ProxyHandler<Dict> => ({
  ownKeys: () => {
    return keys;
  },
  has: (_, p) => {
    return keys.includes(p as string);
  },
  getOwnPropertyDescriptor: (_, p) => {
    if (keys.includes(p as string)) {
      return {
        enumerable: true,
        configurable: true,
      };
    } else {
      return undefined;
    }
  },
});
