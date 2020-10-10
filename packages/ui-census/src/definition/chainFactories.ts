import createCensusObjectFactory from "./createCensusObjectFactory";

import {
  CensusObjectFactory,
  CombinedCensusObjectFactory,
  GetCensusObjectOfFactory,
  GetElementTypeOfFactory,
} from "../types/censusObject";
import { Dict, Serializeable } from "../types/helpers";
import {
  ActionFunction,
  GetElementOut,
  SelectorFunction,
  ToActionDefinition,
  ToPropertyDefinition,
} from "../types/primitives";

const chainFactory = <
  Factory extends CensusObjectFactory | CombinedCensusObjectFactory,
  Selector extends SelectorFunction<GetCensusObjectOfFactory<Factory>>,
  Properties extends Dict<Serializeable>,
  Actions extends Dict<ActionFunction>
>(
  factory: Factory,
  selector: Selector,
  properties: ToPropertyDefinition<GetElementOut<Selector>, Properties>,
  actions: ToActionDefinition<GetElementOut<Selector>, Actions>
) => {
  const chainedFactory = createCensusObjectFactory(
    selector,
    properties,
    actions
  );
  return (target: GetElementTypeOfFactory<Factory>) =>
    chainedFactory(factory(target) as any);
};

export default chainFactory;
