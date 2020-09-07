import { Dict } from "../types";
import { CensusDefinitionAsync, CensusObjectAsync } from "./types";
import { queryAsync } from "./query/queryAsync";

const resolveElement = async <ElementType>(
  element: ElementType,
  queryResolver: Dict<(element: ElementType) => any>
) => {
  const resolvedElement: any = {};

  for (const key in queryResolver) {
    if (key[0] === "_") continue;
    resolvedElement[key] = await queryResolver[key](element);
  }

  return resolvedElement;
};

const createAsyncAdapter = <
  ElementType,
  Definition extends CensusDefinitionAsync<ElementType>
>(
  definition: Definition
) => (target: ElementType) => {
  const doc: CensusObjectAsync<Definition> = {} as any;

  for (const key in definition) {
    doc[key] = () => {
      const elementResolver = async () => {
        const elements = await definition[key]._selector(target);
        const resolvedElements = await Promise.all(
          elements.map((element) => resolveElement(element, definition[key]))
        );
        return resolvedElements;
      };
      return queryAsync(elementResolver());
    };
  }

  return doc;
};

export default createAsyncAdapter;
