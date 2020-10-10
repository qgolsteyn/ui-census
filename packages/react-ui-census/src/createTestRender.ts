import type React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { CensusObjectFactory, CombinedCensusObjectFactory } from "ui-census";

const createTestRender = <
  Factory extends CombinedCensusObjectFactory | CensusObjectFactory
>(
  adapter: Factory
) => {
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
    target: React.ReactElement | Element | { getElement: () => Element }
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

export default createTestRender;
