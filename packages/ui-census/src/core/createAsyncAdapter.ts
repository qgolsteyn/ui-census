import { Dict } from "../types";
import { CensusDefinitionAsync, CensusObjectAsync } from "./types";
import { queryAsync } from "./query/queryAsync";
import { createBaseProxyHandler } from "./utils/proxy";

const resolveElement = async <ElementType>(
  element: ElementType,
  queryResolver: Dict<(element: ElementType) => any>,
  actionResolver: Dict<(element: ElementType) => any>
) => {
  const resolvedElement: any = {};

  const combinedResolvers = { ...queryResolver, ...actionResolver };

  for (const key in combinedResolvers) {
    resolvedElement[key] = await combinedResolvers[key](element);
  }

  const handler: ProxyHandler<Dict> = {
    ...createBaseProxyHandler(Object.keys(queryResolver)),
    get: (_, p) => resolvedElement[p],
  };

  return new Proxy({}, handler) as typeof resolvedElement;
};

const createAsyncAdapter = <
  ElementType,
  Definition extends CensusDefinitionAsync<ElementType>
>(
  definition: Definition
) => (target: ElementType) => {
  const doc: CensusObjectAsync<Definition> = {} as any;

  for (const key in definition) {
    doc[key] = () => {
      const elementResolver = async () => {
        const elements = await definition[key].selector(target);
        const resolvedElements = await Promise.all(
          elements.map((element) =>
            resolveElement(
              element,
              definition[key].queries,
              definition[key].actions
            )
          )
        );
        return resolvedElements;
      };
      return queryAsync(elementResolver());
    };
  }

  return doc;
};

export default createAsyncAdapter;
