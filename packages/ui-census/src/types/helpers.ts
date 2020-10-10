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

export type Index = string;
export type Dict<Value = any> = { [key in Index]: Value };
