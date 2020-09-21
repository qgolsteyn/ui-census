import { createAdapter } from "ui-census";
import { Serializeable } from "ui-census/lib/types";

const createDOMAdapter = <
  ElementTypeOut,
  QueryParameters extends Array<any>,
  Queries extends { [key: string]: Serializeable },
  Actions extends {
    [key: string]: (...args: any[]) => any;
  }
>(
  selector: (target: Element, ...args: QueryParameters) => ElementTypeOut[],
  queries: {
    [Key in keyof Queries]: (element: ElementTypeOut) => Queries[Key];
  },
  actions: {
    [Key in keyof Actions]: (element: ElementTypeOut) => Actions[Key];
  }
) => createAdapter(selector, queries, actions);

export default createDOMAdapter;
