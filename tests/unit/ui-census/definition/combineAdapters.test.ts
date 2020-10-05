import combineAdapters from "ui-census/src/core/definition/combineAdapters";
import createAdapter from "ui-census/src/core/definition/createAdapter";

test("it combines two synchronous adapters", () => {
  const wordAdapter = createAdapter(
    (target: string) => {
      let elements = target.split(" ");

      return elements;
    },
    {
      wordText: (element: string) => element,
      length: (element: string) => element.length,
    },
    {
      getElement: (element: string) => () => element,
    }
  );

  const sentenceAdapter = createAdapter(
    (target: string) => {
      let elements = target.split(". ");

      return elements;
    },
    {
      sentenceText: (element: string) => element,
      length: (element: string) => element.length,
    },
    {
      getElement: (element: string) => () => element,
    }
  );

  const adapter = combineAdapters({
    word: wordAdapter,
    sentence: sentenceAdapter,
  });

  const doc = adapter("This is a sentence. It is a very nice sentence.");

  expect(doc.sentence().first().sentenceText).toBe("This is a sentence");
  expect(doc.word().last().wordText).toBe("sentence.");
});
