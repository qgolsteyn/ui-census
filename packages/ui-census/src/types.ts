export type Index = string | number | symbol;
export type Dict<Value = any> = { [key in Index]: Value };

export type Selector<ElementType = any> = (
  element: ElementType,
  filter?: Dict<string | number | boolean>
) => ElementType | ElementType[];

type GetFilterArg<Selector extends (...args: any) => any> = Parameters<
  Selector
>[1];
type GetFilterOptions<Selector extends (...args: any) => any> = GetFilterArg<
  Selector
> extends {}
  ? GetFilterArg<Selector>
  : {};

export type PropResolver<ElementType = any> = (element: ElementType) => any;
export type CensusResolver<ElementType = any> = Dict<PropResolver<ElementType>>;

type GetPropType<PropResolver extends (...args: any) => any> = ReturnType<
  PropResolver
>;

type QueryById<
  Props extends { [key: string]: any },
  NativeProperties extends Dict
> = {
  q: (id: string) => Props & NativeProperties;
};
type QueryByFilter<
  Filter extends { [key: string]: any },
  Props extends { [key: string]: any },
  NativeProperties extends Dict
> = { q: (filter?: Partial<Filter>) => Array<Props & NativeProperties> };

export type CensusObject<
  Filter extends Dict,
  Props extends Dict,
  NativeProperties extends Dict
> = Props &
  NativeProperties &
  QueryById<Props, NativeProperties> &
  QueryByFilter<Filter, Props, NativeProperties>;

export type CensusLibrary<
  Selectors extends Dict<Selector>,
  CensusResolvers extends Dict<CensusResolver>,
  Keys extends keyof Selectors & keyof CensusResolvers,
  NativeProperties extends Dict = {}
> = {
  [Key in Keys]: CensusObject<
    GetFilterOptions<Selectors[Key]>,
    {
      [PropKey in keyof CensusResolvers[Key]]: GetPropType<
        CensusResolvers[Key][PropKey]
      >;
    },
    NativeProperties
  >;
};
