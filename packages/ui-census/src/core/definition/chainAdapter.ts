import { CombinedElementAdapter } from "ui-census/src";
import { Serializeable } from "../../types";
import { ElementAccessorFactory } from "../types";
import createAdapter from "./createAdapter";

const chainAdapter = <
  AccessorFactory extends
    | ElementAccessorFactory<any, any, any, any>
    | CombinedElementAdapter<any, any>,
  ElementTypeOut,
  QueryParameters extends Array<any>,
  Queries extends { [key: string]: Serializeable },
  Actions extends {
    [key: string]: (...args: any[]) => any;
  }
>(
  accessorFactory: AccessorFactory,
  selector: (
    target: ReturnType<AccessorFactory>,
    ...args: QueryParameters
  ) => ElementTypeOut[],
  queries: {
    [Key in keyof Queries]: (element: ElementTypeOut) => Queries[Key];
  },
  actions: {
    [Key in keyof Actions]: (element: ElementTypeOut) => Actions[Key];
  }
) => {
  const chainedFactory = createAdapter(selector, queries, actions);
  return (target: Parameters<AccessorFactory>[0]) =>
    chainedFactory(accessorFactory(target) as any);
};

export default chainAdapter;
