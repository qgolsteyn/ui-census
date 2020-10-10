import { Dict, Serializeable } from "./helpers";

export type SelectorFunction<
  ElementIn = any,
  SelectorArguments extends any[] = any[],
  ElementOut = any
> = (element: ElementIn, ...args: SelectorArguments) => ElementOut[];

export type GetElementIn<
  Selector extends SelectorFunction
> = Selector extends SelectorFunction<infer ElementIn, any, any>
  ? ElementIn
  : unknown;

export type GetSelectorArguments<
  Selector extends SelectorFunction
> = Selector extends SelectorFunction<any, infer Arguments, any>
  ? Arguments
  : [];

export type GetElementOut<
  Selector extends SelectorFunction
> = Selector extends SelectorFunction<any, any, infer ElementOut>
  ? ElementOut
  : unknown;

export type AttributeDefinition<Element, AttributeType> = (
  element: Element
) => AttributeType;

export type PropertyDefinition<
  Element,
  PropertyType extends Serializeable
> = AttributeDefinition<Element, PropertyType>;

export type ActionFunction<
  ActionArguments extends any[] = any[],
  ActionReturnType = void
> = (...args: ActionArguments) => ActionReturnType;

export type GetActionArguments<
  Action extends ActionFunction
> = Action extends ActionFunction<infer Arguments, any> ? Arguments : [];

export type GetActionReturnType<
  Action extends ActionFunction
> = Action extends ActionFunction<any, infer Return> ? Return : void;

export type ActionDefinition<
  Element,
  Action extends ActionFunction
> = AttributeDefinition<Element, Action>;

export type ToPropertyDefinition<
  Element,
  Properties extends Dict<Serializeable>
> = {
  [Key in keyof Properties]: PropertyDefinition<Element, Properties[Key]>;
};

export type ToActionDefinition<
  Element,
  Actions extends Dict<ActionFunction>
> = {
  [Key in keyof Actions]: ActionDefinition<Element, Actions[Key]>;
};
