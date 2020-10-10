import { ActionFunction } from "./primitives";
import { Query } from "./queries";
import { Dict, Serializeable } from "./helpers";

export type CensusObject<
  SelectorArguments extends any[] = any[],
  Properties extends Dict<Serializeable> = Dict,
  Actions extends Dict<ActionFunction> = Dict
> = (...args: SelectorArguments) => Query<Properties, Actions>;

export type CensusObjectFactory<
  ElementType = any,
  Object extends CensusObject = CensusObject
> = (target: ElementType) => Object;

export type CombinedCensusObjectFactory<
  M extends Dict<CensusObjectFactory | CombinedCensusObjectFactory> = Dict
> = (
  target: GetElementTypeOfFactory<M[keyof M]>
) => { [Key in keyof M]: ReturnType<M[Key]> };

export type GetElementTypeOfFactory<
  Factory extends CensusObjectFactory | CombinedCensusObjectFactory
> = Parameters<Factory>[0];

export type GetCensusObjectOfFactory<
  Factory extends CensusObjectFactory | CombinedCensusObjectFactory
> = ReturnType<Factory>;
