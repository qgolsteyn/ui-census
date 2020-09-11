import { CensusDefinition, createAdapter } from "ui-census";

const createDOMAdapter = <Definition extends CensusDefinition<HTMLElement>>(
  definition: Definition
) => createAdapter<HTMLElement, Definition>(definition);

export default createDOMAdapter;
