import type React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";

import createDOMAdapter from "ui-census";
import type { Dict, Selector, CensusResolver } from "ui-census";

const createReactAdapter = <
  Selectors extends Dict<Selector<HTMLElement>>,
  CensusResolvers extends Dict<CensusResolver<HTMLElement>>
>(
  selectors: Selectors,
  props: CensusResolvers
) => {
  const adapter = createDOMAdapter(selectors, props);

  return (reactElement: React.ReactElement, container: HTMLDivElement) => {
    act(() => {
      ReactDOM.render(reactElement, container);
    });

    return adapter(container);
  };
};

export default createReactAdapter;
