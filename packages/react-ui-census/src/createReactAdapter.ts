import type React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { CensusObjectFactory, CombinedCensusObjectFactory } from "ui-census";

const createReactAdapter = <
  Factory extends CensusObjectFactory | CombinedCensusObjectFactory
>(
  adapter: Factory
) => {
  return (
    target: React.ReactElement | Element | { getElement: () => Element },
    container: HTMLElement
  ) => {
    if (target instanceof Element) {
      return adapter(target as any) as ReturnType<Factory>;
    } else if (
      typeof target === "object" &&
      (target as any).getElement !== undefined
    ) {
      return adapter((target as any).getElement()) as ReturnType<Factory>;
    } else {
      act(() => {
        ReactDOM.render(target as any, container);
      });

      return adapter(container!) as ReturnType<Factory>;
    }
  };
};

export default createReactAdapter;
