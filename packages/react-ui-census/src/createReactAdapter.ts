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
  return (
    target: React.ReactElement | Element | { getElement: () => Element },
    container: HTMLElement
  ) => {
    if (target instanceof Element) {
      return adapter(target as any) as ReturnType<Adapter>;
    } else if (
      typeof target === "object" &&
      (target as any).getElement !== undefined
    ) {
      return adapter((target as any).getElement()) as ReturnType<Adapter>;
    } else {
      act(() => {
        ReactDOM.render(target as any, container);
      });

      return adapter(container!) as ReturnType<Adapter>;
    }
  };
};

export default createReactAdapter;
