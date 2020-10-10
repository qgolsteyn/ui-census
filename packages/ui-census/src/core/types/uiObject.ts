import { ActionFunction } from "./primitives";
import { Dict, Serializeable } from "./helpers";

export type UIObject<
  Properties extends Dict<Serializeable> = Dict,
  Actions extends Dict<ActionFunction> = Dict
> = Properties & Actions;
