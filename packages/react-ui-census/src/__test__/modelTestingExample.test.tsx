import React from "react";
import fc from "fast-check";

import { htmlAdapter } from "dom-ui-census";
import { createTestRender } from "..";

const $ = createTestRender(htmlAdapter);

const CounterComponent = ({ startCount }: { startCount?: number }) => {
  const [count, setCount] = React.useState(startCount || 0);

  return (
    <div>
      <button
        id="minus"
        onClick={() => {
          if (count > -100) setCount(count - 1);
        }}
      >
        -
      </button>
      <span id="count">{count}</span>
      <button
        id="plus"
        onClick={() => {
          if (count < 100) setCount(count + 1);
        }}
      >
        +
      </button>
    </div>
  );
};

type Model = {
  count: number;
};

class IncrementCommand implements fc.Command<Model, ReturnType<typeof $>> {
  check = (m: Model) => m.count < 100;
  run = (m: Model, r: ReturnType<typeof $>) => {
    const button = r.button().contains({ id: "plus" }).single();
    button.click();

    m.count += 1;

    const text = r.span().contains({ id: "count" }).single();

    expect(text.textContent).toBe(String(m.count));
  };
}

class DecrementCommand implements fc.Command<Model, ReturnType<typeof $>> {
  check = (m: Model) => m.count > -100;
  run = (m: Model, r: ReturnType<typeof $>) => {
    const button = r.button().contains({ id: "minus" }).single();
    button.click();

    m.count -= 1;

    const text = r.span().contains({ id: "count" }).single();

    expect(text.textContent).toBe(String(m.count));
  };
}

test("an example model-based test", () => {
  const allCommands = [
    fc.constant(new IncrementCommand()),
    fc.constant(new DecrementCommand()),
  ];

  fc.assert(
    fc.property(
      fc.commands(allCommands, { maxCommands: 10 }),
      fc.integer(),
      (cmds, startNum) => {
        const doc = $(<CounterComponent startCount={startNum} />);

        const s = () => ({
          model: {
            count: Number(
              doc.span().contains({ id: "count" }).single().textContent
            ),
          },
          real: doc,
        });
        fc.modelRun(s, cmds);
      }
    )
  );
});
