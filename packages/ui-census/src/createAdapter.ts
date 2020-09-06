import { Dict, CensusObject, CensusDefinition } from "./types";
import { createBaseProxyHandler } from "./utils/proxy";

const createQueryProxy = <ElementType>(
  element: ElementType,
  queryResolver: Dict<(element: ElementType) => any>
) => {
  const handler: ProxyHandler<Dict> = {
    ...createBaseProxyHandler(
      Reflect.ownKeys(queryResolver).filter(
        (key) => typeof key !== "string" || key[0] != "_"
      )
    ),
    get: (_, p) => {
      if (typeof p === "string" && p[0] !== "_" && p in queryResolver) {
        return queryResolver[p](element);
      } else {
        return undefined;
      }
    },
  };

  return new Proxy({} as any, handler);
};

const createAdapter = <
  ElementType,
  Definition extends CensusDefinition<ElementType>
>(
  definition: Definition
) => (target: ElementType) => {
  const handler: ProxyHandler<Dict> = {
    ...createBaseProxyHandler(Reflect.ownKeys(definition)),
    get: (obj, p) => {
      if (typeof p !== "symbol" && p in definition) {
        return definition[p]
          ._selector(target)
          .map((element) => createQueryProxy(element, definition[p]));
      } else {
        // @ts-expect-error
        // Typescript does not allow us to index a dict with a symbol. That's
        // not correct.
        return obj[p];
      }
    },
  };

  return new Proxy({} as any, handler) as CensusObject<Definition>;
};

export default createAdapter;
