import { CensusDefinition } from "ui-census/src";

const createDefinition = <
  ElementType,
  Definition extends CensusDefinition<ElementType>
>(
  definition: Definition
) => definition;

const createAsyncDefinition = <
  ElementType,
  Definition extends CensusDefinition<ElementType>
>(
  definition: Definition
) => definition;

export { createDefinition, createAsyncDefinition };
