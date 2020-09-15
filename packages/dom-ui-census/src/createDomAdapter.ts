import { CensusDefinitions, createAdapter } from "ui-census";

const createDOMAdapter = <Definition extends CensusDefinitions<HTMLElement>>(
  definition: Definition
) => createAdapter<HTMLElement, Definition>(definition);

export default createDOMAdapter;
