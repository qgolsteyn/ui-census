import type React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";

import { createDOMAdapter, CensusDefinition } from "dom-ui-census";

const createTestRender = <Definition extends CensusDefinition<HTMLElement>>(
  definition: Definition
) => {
  const adapter = createDOMAdapter(definition);

  let container: HTMLDivElement | null;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container!);
    container = null;
  });

  return (reactElement: React.ReactElement) => {
    act(() => {
      ReactDOM.render(reactElement, container);
    });

    return adapter(container!);
  };
};

export default createTestRender;
