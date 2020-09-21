import { combineAdapters } from "ui-census";
import { ElementAccessorFactory } from "ui-census/lib/core/types";
import { Dict } from "ui-census/lib/types";

const combineDOMAdapters = <
  M extends Dict<ElementAccessorFactory<HTMLElement, any, any, any>>
>(
  adapters: M
) => combineAdapters<HTMLElement, M>(adapters);

export default combineDOMAdapters;
