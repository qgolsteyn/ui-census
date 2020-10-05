import { createAdapter } from "ui-census";
import { Serializeable } from "ui-census/lib/types";

const createDOMAdapter = <
  QueryParameters extends Array<any>,
  Queries extends { [key: string]: Serializeable },
  Actions extends {
    [key: string]: (...args: any[]) => any;
  }
>(
  selector: (target: Element, ...args: QueryParameters) => Element[],
  queries: {
    [Key in keyof Queries]: (element: Element) => Queries[Key];
  },
  actions: {
    [Key in keyof Actions]: (element: Element) => Actions[Key];
  }
) =>
  createAdapter(selector, queries, {
    ...actions,
    getElement: (element) => () => element,
  });

export default createDOMAdapter;
