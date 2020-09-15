import { CensusDefinition, CensusObject, combineAdapters } from "ui-census";
import { Dict } from "ui-census/lib/types";

const combineDOMAdapters = <
  M extends Dict<
    (target: HTMLElement) => CensusObject<Dict<CensusDefinition<HTMLElement>>>
  >
>(
  adapters: M
) => combineAdapters<HTMLElement, M>(adapters);

export default combineDOMAdapters;
