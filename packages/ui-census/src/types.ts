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

export type Index = string | number | symbol;
export type Dict<Value = any> = { [key in Index]: Value };

export type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;

export type ExtractAdditionalArguments<
  T extends (...args: any) => any
> = T extends (a: any, ...b: infer I) => any ? I : never;

export type ReduceFunction<T extends (...args: any) => any> = ReturnType<
  T
> extends undefined
  ? T
  : (...args: Parameters<T>) => Array<ReturnType<T>>;

export type ReduceArray<T extends Dict<any>> = {
  [Key in keyof T]: T[Key] extends (...args: any) => any
    ? ReduceFunction<T[Key]>
    : Array<T[Key]>;
};
