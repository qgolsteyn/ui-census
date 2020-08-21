import type {
  UIAdapterSelectors,
  UIAdapterPropsObjects,
  UIAdapterImplementation,
  UIAdapterProps,
  UIAdapterSelector,
  Props,
} from "./types";

const getPropValue = (
  props: any,
  key: string,
  elements: Element | Element[]
) => {
  if (Array.isArray(elements) && elements.length > 1) {
    throw new Error("Selector returned more than one element");
  } else if (Array.isArray(elements)) {
    if (key === "element") {
      return elements[0];
    } else {
      return props[key](elements[0]);
    }
  } else {
    if (key === "element") {
      return elements;
    } else {
      return props[key](elements);
    }
  }
};

const createPropProxy = <P extends UIAdapterProps<HTMLElement>>(props: P) => (
  element: HTMLElement
) => {
  const handler: ProxyHandler<Props<HTMLElement, P>> = {
    ownKeys: () => {
      return Object.keys(props);
    },
    has(_, p) {
      return p in props;
    },
    getOwnPropertyDescriptor: (_, p) => {
      if (p in props) {
        return {
          enumerable: true,
          configurable: true,
          writable: false,
          value: getPropValue(props, p as string, element),
        };
      }

      return undefined;
    },
    defineProperty: () => {
      return false;
    },
    get: (obj, p) => {
      if (typeof p === "string") {
        if (p in props || p === "element") {
          return getPropValue(props, p, element);
        } else {
          return obj[p];
        }
      } else {
        return undefined;
      }
    },
  };

  return new Proxy({} as any, handler);
};

const createSelectorProxy = <
  S extends UIAdapterSelector<HTMLElement>,
  P extends UIAdapterProps<HTMLElement>
>(
  selector: S,
  props: P
) => (target: HTMLElement) => {
  const handler: ProxyHandler<Props<HTMLElement, P>> = {
    ownKeys: () => {
      return Object.keys(props);
    },
    has: (_, p) => {
      return p in props;
    },
    getOwnPropertyDescriptor: (_, p) => {
      if (p in props) {
        const elements = selector(target);
        return {
          enumerable: true,
          configurable: true,
          value: getPropValue(props, p as string, elements),
        };
      }

      return undefined;
    },
    defineProperty: () => {
      return false;
    },
    get: (obj, p) => {
      if (p === "q") {
        return (query: any) => {
          if (typeof query === "string") {
            const elements = selector(target, { id: query });
            if (Array.isArray(elements) && elements.length > 1) {
              throw new Error("Selector returned more than one element");
            } else if (Array.isArray(elements)) {
              return createPropProxy(props)(elements[0]);
            } else {
              return createPropProxy(props)(elements);
            }
          } else if (typeof query === "object" && !Array.isArray(query)) {
            const elements = selector(target, query);

            if (Array.isArray(elements)) {
              return elements.map((element) => createPropProxy(props)(element));
            } else {
              return [elements].map((element) =>
                createPropProxy(props)(element)
              );
            }
          } else {
            throw new Error("Unexpected query type.");
          }
        };
      } else if (typeof p === "string") {
        if (p in props || p === "element") {
          const elements = selector(target);
          return getPropValue(props, p, elements);
        } else {
          return obj[p];
        }
      } else {
        return obj[p as any];
      }
    },
  };

  return new Proxy({} as any, handler);
};

const createDOMAdapter = <
  S extends UIAdapterSelectors<HTMLElement>,
  P extends UIAdapterPropsObjects<HTMLElement>,
  K extends keyof S & keyof P
>(
  selectors: S,
  props: P
): ((target: HTMLElement) => UIAdapterImplementation<HTMLElement, S, P, K>) => (
  target: HTMLElement
) => {
  const selectorKeys = Object.keys(selectors);
  const propKeys = Object.keys(props);
  const keys = selectorKeys.filter((key) => propKeys.includes(key));

  const adapter = {} as any;
  for (const key of keys) {
    adapter[key] = createSelectorProxy(selectors[key], props[key])(target);
  }

  return adapter;
};

export default createDOMAdapter;
