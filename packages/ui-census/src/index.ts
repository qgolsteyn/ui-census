import type { Dict, Selector, CensusResolver, CensusLibrary } from "./types";
import { createBaseProxyHandler } from "./proxy";

export type {
  Dict,
  Selector,
  PropResolver,
  CensusResolver,
  CensusLibrary,
} from "./types";

export interface AdditionalProperties<Library> {
  element: HTMLElement;
  content: Library;
}

const additionalProperties = (
  selectors: Dict<Selector>,
  props: Dict<CensusResolver>
): CensusResolver<HTMLElement> => ({
  element: (element) => element,
  content: createDOMAdapter(selectors, props),
});

const asArray = <P>(element: P | P[]): P[] =>
  Array.isArray(element) ? element : [element];

const guardSingle = <P>(element: P | P[]) => {
  if (Array.isArray(element)) {
    if (element.length === 0) {
      throw new Error("Selector return no elements");
    } else if (element.length > 1) {
      throw new Error("Selector returned more than one element");
    } else {
      return element[0];
    }
  } else {
    return element;
  }
};

const createPropProxy = (
  library: [Dict<Selector>, Dict<CensusResolver>],
  props: CensusResolver<HTMLElement>
) => (element: HTMLElement) => {
  const combinedProps = { ...props, ...additionalProperties(...library) };
  const handler: ProxyHandler<Dict> = {
    ...createBaseProxyHandler(Reflect.ownKeys(props)),
    get: (obj, p) => {
      if (typeof p !== "symbol" && p in combinedProps) {
        return combinedProps[p](element);
      } else {
        // @ts-expect-error
        // Typescript does not allow us to index a dict with a symbol. That's
        // not correct.
        return obj[p];
      }
    },
  };

  return new Proxy({}, handler);
};

const createQuery = (
  library: [Dict<Selector>, Dict<CensusResolver>],
  target: HTMLElement,
  selector: Selector,
  props: CensusResolver<HTMLElement>
) => (query: string | Dict) => {
  if (typeof query === "string") {
    const element = guardSingle(selector(target, { id: query }));
    return createPropProxy(library, props)(element);
  } else if (typeof query === "object" && !Array.isArray(query)) {
    return asArray(selector(target, query)).map((element) =>
      createPropProxy(library, props)(element)
    );
  } else {
    throw new Error("Unexpected query type");
  }
};

const createSelectorProxy = (
  library: [Dict<Selector>, Dict<CensusResolver>],
  selector: Selector,
  props: CensusResolver<HTMLElement>
) => (target: HTMLElement) => {
  const combinedProps = { ...props, ...additionalProperties(...library) };
  const handler: ProxyHandler<Dict> = {
    ...createBaseProxyHandler(Reflect.ownKeys(props)),
    get: (obj, p) => {
      if (p === "q") {
        return createQuery(library, target, selector, props);
      } else if (typeof p !== "symbol" && p in combinedProps) {
        const element = guardSingle(selector(target));
        return combinedProps[p](element);
      } else {
        // @ts-expect-error
        // Typescript does not allow us to index a dict with a symbol. That's
        // not correct.
        return obj[p];
      }
    },
  };

  return new Proxy({} as any, handler);
};

const createDOMAdapter = <
  Selectors extends Dict<Selector<HTMLElement>>,
  CensusResolvers extends Dict<CensusResolver<HTMLElement>>,
  Keys extends keyof Selectors & keyof CensusResolvers
>(
  selectors: Selectors,
  props: CensusResolvers
) => (target: HTMLElement) => {
  type Library = CensusLibrary<
    Selectors,
    CensusResolvers,
    Keys,
    AdditionalProperties<Library>
  >;
  const selectorKeys = Object.keys(selectors);
  const propKeys = Object.keys(props);
  const keys = selectorKeys.filter((key) => propKeys.includes(key));

  const adapter = {} as any;
  for (const key of keys) {
    adapter[key] = createSelectorProxy(
      [selectors, props],
      selectors[key],
      props[key]
    )(target);
  }

  return adapter as Library;
};

export default createDOMAdapter;
