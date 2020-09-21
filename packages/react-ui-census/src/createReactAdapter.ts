import type React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";

import { CombinedElementAdapter, ElementAccessorFactory } from "dom-ui-census";

const createReactAdapter = <
  Adapter extends
    | CombinedElementAdapter<HTMLElement, any>
    | ElementAccessorFactory<HTMLElement, any, any, any>
>(
  adapter: Adapter
) => {
  return (reactElement: React.ReactElement, container: HTMLDivElement) => {
    act(() => {
      ReactDOM.render(reactElement, container);
    });

    return adapter(container) as ReturnType<Adapter>;
  };
};

export default createReactAdapter;
