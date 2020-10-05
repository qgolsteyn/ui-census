import createDOMAdapter from "./createDomAdapter";
import combineDOMAdapters from "./combineAdapters";
import baseAdapter from "./definitions/baseAdapter";
import htmlAdapter from "./definitions/htmlAdapter";

export {
  ElementAccessor,
  ElementAccessorFactory,
  CombinedElementAdapter,
} from "ui-census";

export { createDOMAdapter, combineDOMAdapters, baseAdapter, htmlAdapter };
