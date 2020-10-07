import type { Dict, Index } from "../../types";

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
    return keys.includes(p);
  },
  getOwnPropertyDescriptor: (_, p) => {
    if (keys.includes(p)) {
      return {
        enumerable: true,
        configurable: true,
      };
    } else {
      return undefined;
    }
  },
});
