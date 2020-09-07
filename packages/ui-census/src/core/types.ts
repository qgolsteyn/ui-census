import { Dict } from "../types";
import { QueryAsync } from "./query/queryAsync";
import { QuerySync } from "./query/querySync";

export type CensusDefinition<ElementType> = Dict<{
  _selector: (target: ElementType) => ElementType[];
  [key: string]: (target: ElementType) => any;
}>;

export type CensusDefinitionAsync<ElementType> = Dict<{
  _selector: (target: ElementType) => Promise<ElementType[]>;
  [key: string]: (target: ElementType) => any;
}>;

export type CensusObject<Definition extends CensusDefinition<any>> = {
  [DefinitionKey in keyof Definition]: () => QuerySync<
    {
      [QueryKey in Exclude<
        keyof Definition[DefinitionKey],
        "_selector"
      >]: ReturnType<Definition[DefinitionKey][QueryKey]>;
    }
  >;
};

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;

export type CensusObjectAsync<Definition extends CensusDefinitionAsync<any>> = {
  [DefinitionKey in keyof Definition]: () => QueryAsync<
    {
      [QueryKey in Exclude<
        keyof Definition[DefinitionKey],
        "_selector"
      >]: ThenArg<ReturnType<Definition[DefinitionKey][QueryKey]>>;
    }
  >;
};
