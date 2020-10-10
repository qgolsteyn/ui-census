import {
  ActionFunction,
  GetActionArguments,
  GetActionReturnType,
} from "./primitives";
import { UIObject } from "./uiObject";
import { Dict, Serializeable } from "./helpers";

type GroupProperties<Properties extends Dict<Serializeable>> = {
  [Key in keyof Properties]: Array<Properties[Key]>;
};

type GroupActions<Actions extends Dict<ActionFunction>> = {
  [Key in keyof Actions]: (
    ...args: GetActionArguments<Actions[Key]>
  ) => Array<GetActionReturnType<Actions[Key]>>;
};

export type Query<
  Properties extends Dict<Serializeable>,
  Actions extends Dict<ActionFunction>
> = {
  matches: (schema: Properties) => Query<Properties, Actions>;
  contains: (schema: Partial<Properties>) => Query<Properties, Actions>;
  single: () => UIObject<Properties, Actions>;
  first: () => UIObject<Properties, Actions>;
  last: () => UIObject<Properties, Actions>;
  all: () => Array<UIObject<Properties, Actions>>;
  grouped: () => UIObject<GroupProperties<Properties>, GroupActions<Actions>>;
};
