import type React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";

import createDOMAdapter from "ui-census";
import type {
  UIAdapterSelectors,
  UIAdapterPropsObjects,
  UIAdapterImplementation,
} from "ui-census/lib/types";

const createTestRender = <
  S extends UIAdapterSelectors<HTMLElement>,
  P extends UIAdapterPropsObjects<HTMLElement>,
  K extends keyof S & keyof P
>(
  selectors: S,
  props: P
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

  return (
    reactElement: React.ReactElement
  ): UIAdapterImplementation<HTMLElement, S, P, K> => {
    act(() => {
      ReactDOM.render(reactElement, container);
    });

    return adapter(container!);
  };
};

export default createTestRender;
