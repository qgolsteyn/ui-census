import type React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";

import { createDOMAdapter, CensusDefinitions } from "dom-ui-census";

const createReactAdapter = <Definition extends CensusDefinitions<HTMLElement>>(
  definition: Definition
) => {
  const adapter = createDOMAdapter(definition);

  return (reactElement: React.ReactElement, container: HTMLDivElement) => {
    act(() => {
      ReactDOM.render(reactElement, container);
    });

    return adapter(container);
  };
};

export default createReactAdapter;
