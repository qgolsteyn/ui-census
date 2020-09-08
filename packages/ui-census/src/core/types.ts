import { Dict } from "../types";
import { QueryAsync } from "./query/queryAsync";
import { QuerySync } from "./query/querySync";

export type Serializeable =
  | string
  | boolean
  | number
  | null
  | undefined
  | SerializeableObject
  | SerializeableArray;
export interface SerializeableObject {
  [key: string]: Serializeable;
}

export interface SerializeableArray extends Array<Serializeable> {}

export type CensusDefinition<ElementType> = Dict<{
  selector: (target: ElementType) => ElementType[];
  actions: {
    [key: string]: (target: ElementType) => (...args: any) => any;
  };
  queries: {
    [key: string]: (target: ElementType) => Serializeable;
  };
}>;

export type CensusDefinitionAsync<ElementType> = Dict<{
  selector: (target: ElementType) => Promise<ElementType[]>;
  actions: {
    [key: string]: (target: ElementType) => (...args: any) => any;
  };
  queries: {
    [key: string]: (
      target: ElementType
    ) => Serializeable | Promise<Serializeable>;
  };
}>;

export type CensusObject<Definition extends CensusDefinition<any>> = {
  [DefinitionKey in keyof Definition]: () => QuerySync<
    {
      [QueryKey in keyof Definition[DefinitionKey]["queries"]]: ReturnType<
        Definition[DefinitionKey]["queries"][QueryKey]
      >;
    },
    {
      [QueryKey in keyof Definition[DefinitionKey]["actions"]]: ReturnType<
        Definition[DefinitionKey]["actions"][QueryKey]
      >;
    }
  >;
};

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;

export type CensusObjectAsync<Definition extends CensusDefinitionAsync<any>> = {
  [DefinitionKey in keyof Definition]: () => QueryAsync<
    {
      [QueryKey in keyof Definition[DefinitionKey]["queries"]]: ThenArg<
        ReturnType<Definition[DefinitionKey]["queries"][QueryKey]>
      >;
    },
    {
      [QueryKey in keyof Definition[DefinitionKey]["actions"]]: ReturnType<
        Definition[DefinitionKey]["actions"][QueryKey]
      >;
    }
  >;
};
