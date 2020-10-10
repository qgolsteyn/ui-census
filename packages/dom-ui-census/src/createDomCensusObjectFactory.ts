import {
  ActionFunction,
  createCensusObjectFactory,
  Dict,
  SelectorFunction,
  Serializeable,
  GetElementOut,
  ToActionDefinition,
  ToPropertyDefinition,
} from "ui-census";

const createDOMCensusObjectFactory = <
  Selector extends SelectorFunction<Element>,
  Properties extends Dict<Serializeable>,
  Actions extends Dict<ActionFunction>
>(
  selector: Selector,
  properties: ToPropertyDefinition<GetElementOut<Selector>, Properties>,
  actions: ToActionDefinition<GetElementOut<Selector>, Actions>
) => {
  const adapter = createCensusObjectFactory(selector, properties, {
    ...actions,
    getElement: (element) => () => element,
  });

  return (target: Element | { getElement: () => Element }) => {
    if (target instanceof Element) {
      return adapter(target as any);
    } else {
      return adapter(target.getElement() as any);
    }
  };
};

export default createDOMCensusObjectFactory;
