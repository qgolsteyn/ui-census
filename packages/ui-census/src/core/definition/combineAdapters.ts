import { Dict } from "../../types";
import {
  CensusObject,
  CensusObjectAsync,
  CensusDefinition,
  CensusDefinitionAsync,
} from "../types";

export const combineAsyncAdapters = <
  ElementType,
  M extends Dict<
    (
      target: ElementType
    ) => CensusObjectAsync<Dict<CensusDefinitionAsync<ElementType>>>
  >
>(
  adapters: M
) => {
  return (target: ElementType) => {
    const combinedAdapter = {} as any;
    for (const key in adapters) {
      combinedAdapter[key] = adapters[key](target) as any;
    }
    return combinedAdapter as { [Key in keyof M]: ReturnType<M[Key]> };
  };
};

export const combineAdapters = <
  ElementType,
  M extends Dict<
    (target: ElementType) => CensusObject<Dict<CensusDefinition<ElementType>>>
  >
>(
  adapters: M
) => {
  return (target: ElementType) => {
    const combinedAdapter = {} as any;
    for (const key in adapters) {
      combinedAdapter[key] = adapters[key](target) as any;
    }
    return combinedAdapter as { [Key in keyof M]: ReturnType<M[Key]> };
  };
};
