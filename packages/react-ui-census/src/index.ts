import createReactAdapter from "./createReactAdapter";
import createTestRender from "./createTestRender";

export {
  ElementAccessor,
  ElementAccessorFactory,
  CombinedElementAdapter,
  combineDOMAdapters,
  createDOMAdapter,
} from "dom-ui-census";

import { baseAdapter, htmlAdapter } from "dom-ui-census";

const baseReactAdapter = createReactAdapter(baseAdapter);
const baseTestRender = createTestRender(baseAdapter);

const htmlReactAdapter = createTestRender(htmlAdapter);
const htmlTestRender = createTestRender(htmlAdapter);

export {
  createReactAdapter,
  createTestRender,
  baseReactAdapter,
  baseTestRender,
  htmlReactAdapter,
  htmlTestRender,
};
