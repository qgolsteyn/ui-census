import createAdapter from "./createAdapter";

import { CensusObject, CensusDefinition } from "../types";

// We re-export the adapter factory with the correct type
// for use with DOM or JSDOM elements.

const createDOMAdapter: <Definition extends CensusDefinition<HTMLElement>>(
  definition: Definition
) => (target: HTMLElement) => CensusObject<Definition> = createAdapter;

export default createDOMAdapter;
