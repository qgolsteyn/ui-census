import { Dict, CensusObject, CensusDefinition } from "../types";
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
  const doc: CensusObject<Definition> = {} as any;

  for (const key in definition) {
    doc[key] = () => {
      return definition[key]
        ._selector(target)
        .map((element) => createQueryProxy(element, definition[key]));
    };
  }

  return doc;
};

export default createAdapter;
