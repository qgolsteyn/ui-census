import { Dict } from "../../types";
import { ElementAccessorFactory, CombinedElementAdapter } from "../types";

const combineAdapters = <
  ElementType,
  M extends Dict<ElementAccessorFactory<ElementType, any, any, any>>
>(
  adapters: M
): CombinedElementAdapter<ElementType, M> => (target: ElementType) => {
  const combinedAdapter: any = {};

  for (const key in adapters) {
    combinedAdapter[key] = adapters[key](target);
  }

  return combinedAdapter;
};

export default combineAdapters;
