import { Dict } from "../../types";
import { ElementAccessorFactory, CombinedElementAdapter } from "../types";

const combineAdapters = <
  ElementType,
  M extends Dict<ElementAccessorFactory<ElementType, any, any, any>>
>(
  adapters: M
): CombinedElementAdapter<ElementType, M> => (
  target: ElementType | { getElement: () => ElementType }
) => {
  let targetElement;
  if (typeof target === "object" && (target as any).getElement !== undefined) {
    targetElement = (target as any).getElement();
  } else {
    targetElement = target;
  }

  const combinedAdapter: any = {};

  for (const key in adapters) {
    combinedAdapter[key] = adapters[key](targetElement);
  }

  return combinedAdapter;
};

export default combineAdapters;
