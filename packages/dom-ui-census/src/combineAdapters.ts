import { combineAdapters } from "ui-census";
import { ElementAccessorFactory } from "ui-census/lib/core/types";
import { Dict } from "ui-census/lib/types";

const combineDOMAdapters = <
  M extends Dict<ElementAccessorFactory<Element, any, any, any>>
>(
  adapters: M
) => {
  const combinedAdapter = combineAdapters<Element, M>(adapters);
  return (target: Element | { getElement: () => Element }) => {
    if (target instanceof Element) {
      return combinedAdapter(target);
    } else {
      return combinedAdapter(target.getElement());
    }
  };
};

export default combineDOMAdapters;
