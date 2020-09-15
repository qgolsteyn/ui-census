import { Dict } from "../../types";
import { CensusDefinitionsAsync, CensusObjectAsync } from "../types";
import { queryAsync } from "../query/queryAsync";
import { createProxy } from "../utils/proxy";

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
    get: (_, p) => resolvedElement[p],
  };

  return createProxy(
    handler,
    Object.keys(queryResolver),
    Object.keys(combinedResolvers)
  );
};

const createAsyncAdapter = <
  ElementType,
  Definition extends CensusDefinitionsAsync<ElementType>
>(
  definition: Definition
) => (target: ElementType) => {
  const doc: any = {};

  for (const key in definition) {
    doc[key] = (...args: any[]) => {
      const elementResolver = async () => {
        const elements = await definition[key].selector(target, ...args);
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

  return doc as CensusObjectAsync<Definition>;
};

export default createAsyncAdapter;
