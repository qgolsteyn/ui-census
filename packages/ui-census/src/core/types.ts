import {
  Dict,
  ExtractAdditionalArguments,
  Serializeable,
  ThenArg,
} from "../types";
import { QueryAsync } from "./query/queryAsync";
import { QuerySync } from "./query/querySync";

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
