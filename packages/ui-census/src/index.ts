import {
  CensusObject,
  CensusObjectAsync,
  CensusDefinition,
  CensusDefinitions,
  CensusDefinitionAsync,
  CensusDefinitionsAsync,
} from "./core/types";

import createAdapter from "./core/definition/createAdapter";
import createAsyncAdapter from "./core/definition/createAsyncAdapter";
import {
  combineAdapters,
  combineAsyncAdapters,
} from "./core/definition/combineAdapters";
import {
  createDefinition,
  createAsyncDefinition,
} from "./core/definition/createDefinition";

export {
  CensusObject,
  CensusObjectAsync,
  CensusDefinition,
  CensusDefinitions,
  CensusDefinitionAsync,
  CensusDefinitionsAsync,
};

export {
  createAdapter,
  createAsyncAdapter,
  combineAdapters,
  combineAsyncAdapters,
  createDefinition,
  createAsyncDefinition,
};
