import { Dict, CensusDefinitionAsync, CensusObjectAsync } from "../types";
import { createBaseProxyHandler } from "./utils/proxy";

const createAsyncAdapter = <
  ElementType,
  Definition extends CensusDefinitionAsync<ElementType>
>(
  definition: Definition
) => (target: ElementType) => {
  const handler: ProxyHandler<Dict> = {
    ...createBaseProxyHandler(Reflect.ownKeys(definition)),
    get: async (obj, p) => {
      if (typeof p !== "symbol" && p in definition) {
        return await Promise.all(
          (await definition[p]._selector(target)).map(async (element) => {
            const out: any = {};
            for (const key in definition[p]) {
              if (key[0] === "_") {
                continue;
              } else {
                out[key] = await definition[p][key](element);
              }
            }
            return out;
          })
        );
      } else {
        // @ts-expect-error
        // Typescript does not allow us to index a dict with a symbol. That's
        // not correct.
        return obj[p];
      }
    },
  };

  return new Proxy({} as any, handler) as CensusObjectAsync<Definition>;
};

export default createAsyncAdapter;
