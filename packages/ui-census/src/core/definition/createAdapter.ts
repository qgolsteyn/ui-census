import { Dict, Serializeable } from "../../types";
import { ElementAccessor } from "../types";
import { createProxy } from "../utils/proxy";
import { querySync } from "../query/querySync";

const createQueryProxy = <
  ElementType,
  Queries extends { [key: string]: (element: ElementType) => Serializeable },
  Actions extends {
    [key: string]: (element: ElementType) => (...args: any[]) => any;
  }
>(
  element: ElementType,
  queryResolver: Queries,
  actionResolver: Actions
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
  ) as { [Key in keyof Queries]: ReturnType<Queries[Key]> } &
    { [Key in keyof Actions]: ReturnType<Actions[Key]> };
};

const createAdapter = <
  ElementTypeIn,
  ElementTypeOut,
  QueryParameters extends Array<any>,
  Queries extends { [key: string]: Serializeable },
  Actions extends {
    [key: string]: (...args: any[]) => any;
  }
>(
  selector: (
    target: ElementTypeIn,
    ...args: QueryParameters
  ) => ElementTypeOut[],
  queries: {
    [Key in keyof Queries]: (element: ElementTypeOut) => Queries[Key];
  },
  actions: {
    [Key in keyof Actions]: (element: ElementTypeOut) => Actions[Key];
  }
) => (
  target: ElementTypeIn
): ElementAccessor<QueryParameters, Queries, Actions> => (
  ...args: QueryParameters
) =>
  querySync(
    selector(target, ...args).map((element) =>
      createQueryProxy(element, queries, actions)
    )
  );

export default createAdapter;
