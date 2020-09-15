import { CensusDefinition, createDefinition } from "ui-census";

const createDOMDefinition = <Definition extends CensusDefinition<HTMLElement>>(
  definition: Definition
) => createDefinition(definition);

export default createDOMDefinition;
