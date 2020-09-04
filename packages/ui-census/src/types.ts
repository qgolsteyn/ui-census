export type Index = string | number | symbol;
export type Dict<Value = any> = { [key in Index]: Value };

export type CensusDefinition<ElementType> = Dict<{
  _selector: (target: ElementType) => ElementType[];
  [key: string]: (target: ElementType) => any;
}>;

export type CensusObject<Definition extends CensusDefinition<any>> = {
  [DefinitionKey in keyof Definition]: Array<
    {
      [QueryKey in Exclude<
        keyof Definition[DefinitionKey],
        "_selector"
      >]: Definition[DefinitionKey][QueryKey];
    }
  >;
};
