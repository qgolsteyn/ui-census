import { CensusObject, CensusDefinitions } from "./core/types";

import createAdapter from "./core/definition/createAdapter";
import createAsyncAdapter from "./core/definition/createAsyncAdapter";
import {
  combineAdapters,
  combineAsyncAdapters,
} from "./core/definition/combineAdapters";

export { CensusObject, CensusDefinitions };
export {
  createAdapter,
  createAsyncAdapter,
  combineAdapters,
  combineAsyncAdapters,
};
