import {
  CensusObjectFactory,
  CombinedCensusObjectFactory,
  GetElementTypeOfFactory,
} from "../types/censusObject";
import { Dict } from "../types/helpers";

const combineFactories = <
  M extends Dict<CensusObjectFactory | CombinedCensusObjectFactory>
>(
  adapters: M
): CombinedCensusObjectFactory<M> => (
  target: GetElementTypeOfFactory<M[keyof M]>
) => {
  const combinedAdapter: any = {};

  for (const key in adapters) {
    combinedAdapter[key] = adapters[key](target);
  }

  return combinedAdapter;
};

export default combineFactories;
