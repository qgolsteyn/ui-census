import type React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";

import createDOMAdapter from "ui-census";
import type { Dict, Selector, CensusResolver } from "ui-census";

const createTestRender = <
  Selectors extends Dict<Selector<HTMLElement>>,
  CensusResolvers extends Dict<CensusResolver<HTMLElement>>
>(
  selectors: Selectors,
  props: CensusResolvers
) => {
  const adapter = createDOMAdapter(selectors, props);

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
