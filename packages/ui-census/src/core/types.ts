import { Dict, ExtractAdditionalArguments, Serializeable } from "../types";
import { QuerySync } from "./query/querySync";

export type ElementAccessor<
  QueryParameters extends Array<any>,
  Queries extends Dict<Serializeable>,
  Actions extends Dict<() => any>
> = (...args: QueryParameters) => QuerySync<Queries, Actions>;

export type ElementAccessorFactory<
  ElementType,
  QueryParameters extends Array<any>,
  Queries extends Dict<Serializeable>,
  Actions extends Dict<() => any>
> = (target: ElementType) => ElementAccessor<QueryParameters, Queries, Actions>;

export type CombinedElementAdapter<
  ElementType,
  M extends Dict<ElementAccessorFactory<ElementType, any, any, any>>
> = (target: ElementType) => { [Key in keyof M]: ReturnType<M[Key]> };
