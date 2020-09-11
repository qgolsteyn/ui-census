import { Dict } from "../types";
import { CensusObject, CensusDefinition } from "./types";
import { createBaseProxyHandler } from "./utils/proxy";
import { querySync } from "./query/querySync";

const createQueryProxy = <ElementType>(
  element: ElementType,
  queryResolver: Dict<(element: ElementType) => any>,
  actionResolver: Dict<(element: ElementType) => any>
) => {
  const combinedResolvers = { ...queryResolver, ...actionResolver };
  const handler: ProxyHandler<Dict> = {
    ...createBaseProxyHandler(Reflect.ownKeys(queryResolver)),
    get: (_, p) => {
      if (typeof p === "string" && p in combinedResolvers) {
        return combinedResolvers[p](element);
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
  const doc: CensusObject<Definition> = {} as any;

  for (const key in definition) {
    doc[key] = (...args: any[]) => {
      return querySync(
        definition[key]
          .selector(target, args)
          .map((element) =>
            createQueryProxy(
              element,
              definition[key].queries,
              definition[key].actions
            )
          )
      );
    };
  }

  return doc;
};

export default createAdapter;
