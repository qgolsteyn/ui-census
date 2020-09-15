import { Dict } from "../../types";
import { CensusObject, CensusDefinitions } from "../types";
import { createProxy } from "../utils/proxy";
import { querySync } from "../query/querySync";

const createQueryProxy = <ElementType>(
  element: ElementType,
  queryResolver: Dict<(element: ElementType) => any>,
  actionResolver: Dict<(element: ElementType) => any>
) => {
  const combinedResolvers = { ...queryResolver, ...actionResolver };
  const handler: ProxyHandler<Dict> = {
    get: (_, p) => {
      if (typeof p === "string" && p in combinedResolvers) {
        return combinedResolvers[p](element);
      } else {
        return undefined;
      }
    },
  };

  return createProxy(
    handler,
    Object.keys(queryResolver),
    Object.keys(combinedResolvers)
  );
};

const createAdapter = <
  ElementType,
  Definition extends CensusDefinitions<ElementType>
>(
  definition: Definition
) => (target: ElementType) => {
  const doc: any = {};

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

  return doc as CensusObject<Definition>;
};

export default createAdapter;
