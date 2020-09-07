export type Index = string | number | symbol;
export type Dict<Value = any> = { [key in Index]: Value };
