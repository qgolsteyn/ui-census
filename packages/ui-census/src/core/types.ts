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

export type CensusDefinition<ElementType> = {
  selector: (target: ElementType, ...args: any[]) => ElementType[];
  actions: {
    [key: string]: (target: ElementType) => (...args: any) => any;
  };
  queries: {
    [key: string]: (target: ElementType) => Serializeable;
  };
};

export type CensusDefinitions<ElementType> = Dict<
  CensusDefinition<ElementType>
>;

export type CensusDefinitionAsync<ElementType> = {
  selector: (target: ElementType, ...args: any[]) => Promise<ElementType[]>;
  actions: {
    [key: string]: (target: ElementType) => (...args: any) => any;
  };
  queries: {
    [key: string]: (
      target: ElementType
    ) => Serializeable | Promise<Serializeable>;
  };
};

export type CensusDefinitionsAsync<ElementType> = Dict<
  CensusDefinitionAsync<ElementType>
>;

type ExtractAdditionalArguments<T extends (...args: any) => any> = T extends (
  a: any,
  ...b: infer I
) => any
  ? I
  : never;

export type CensusObject<Definition extends CensusDefinitions<any>> = {
  [DefinitionKey in keyof Definition]: (
    ...args: ExtractAdditionalArguments<Definition[DefinitionKey]["selector"]>
  ) => QuerySync<
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

export type CensusObjectAsync<
  Definition extends CensusDefinitionsAsync<any>
> = {
  [DefinitionKey in keyof Definition]: (
    ...args: ExtractAdditionalArguments<Definition[DefinitionKey]["selector"]>
  ) => QueryAsync<
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
