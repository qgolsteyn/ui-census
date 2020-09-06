import createAsyncAdapter from "./createAsyncAdapter";

import {
  CensusObject,
  CensusDefinitionAsync,
  CensusObjectAsync,
} from "./types";
import { WebElement, By } from "selenium-webdriver";

// We re-export the adapter factory with the correct type
// for use with DOM or JSDOM elements.

const createWebElementAdapter: <Definition extends CensusDefinitionAsync<
  WebElement
>>(
  definition: Definition
) => (target: WebElement) => CensusObjectAsync<Definition> = createAsyncAdapter;

export default createWebElementAdapter;
