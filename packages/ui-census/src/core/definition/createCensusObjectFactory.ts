import { querySync } from "../query/querySync";
import { createBaseProxyHandler } from "../utils/proxy";

import { UIObject } from "../types/uiObject";
import {
  ActionFunction,
  GetElementIn,
  GetElementOut,
  SelectorFunction,
  ToActionDefinition,
  ToPropertyDefinition,
  GetSelectorArguments,
} from "../types/primitives";
import { Dict, Serializeable } from "../types/helpers";

const createUIObjectProxy = <
  ElementType,
  Properties extends Dict<Serializeable>,
  Actions extends Dict<ActionFunction>
>(
  element: ElementType,
  propertiesResolver: ToPropertyDefinition<ElementType, Properties>,
  actionResolver: ToActionDefinition<ElementType, Actions>
) => {
  const combinedResolvers = { ...propertiesResolver, ...actionResolver };

  const handler: ProxyHandler<Dict> = {
    get: (obj, p) => {
      if (typeof p === "string" && p in combinedResolvers) {
        return combinedResolvers[p](element);
      } else {
        return obj[p as any];
      }
    },
  };

  return new Proxy(
    {},
    { ...handler, ...createBaseProxyHandler(Object.keys(propertiesResolver)) }
  ) as UIObject<Properties, Actions>;
};

const createCensusObjectFactory = <
  Selector extends SelectorFunction,
  Properties extends Dict<Serializeable>,
  Actions extends Dict<ActionFunction>
>(
  selector: Selector,
  properties: ToPropertyDefinition<GetElementOut<Selector>, Properties>,
  actions: ToActionDefinition<GetElementOut<Selector>, Actions>
) => {
  type ElementIn = GetElementIn<Selector>;
  type SelectorArguments = GetSelectorArguments<Selector>;

  return (target: ElementIn) => (...args: SelectorArguments) => {
    const queryProxies = selector(target, ...args).map((element) =>
      createUIObjectProxy(element, properties, actions)
    );

    return querySync(
      queryProxies,
      Object.keys(properties),
      Object.keys(actions)
    );
  };
};

export default createCensusObjectFactory;
