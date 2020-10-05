import { combineAdapters } from "ui-census";
import { ElementAccessorFactory } from "ui-census/lib/core/types";
import { Dict } from "ui-census/lib/types";

const combineDOMAdapters = <
  M extends Dict<ElementAccessorFactory<Element, any, any, any>>
>(
  adapters: M
) => combineAdapters<Element, M>(adapters);

export default combineDOMAdapters;
