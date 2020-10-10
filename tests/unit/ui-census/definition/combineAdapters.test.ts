import combineAdapters from "ui-census/src/definition/combineFactories";
import createAdapter from "ui-census/src/definition/createCensusObjectFactory";

it("should combine two adapters", () => {
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

it("should allow for combined adapters to also be combined", () => {
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

  const overviewAdapter = createAdapter(
    (target: string) => [target],
    {
      characterCount: (element: string) => element.length,
    },
    {
      getElement: (element: string) => () => element,
    }
  );

  const textAdapter = combineAdapters({
    word: wordAdapter,
    sentence: sentenceAdapter,
  });

  const adapter = combineAdapters({
    textInfo: textAdapter,
    overview: overviewAdapter,
  });

  const doc = adapter("This is a sentence. It is a very nice sentence.");

  expect(doc.textInfo.sentence().first().sentenceText).toBe(
    "This is a sentence"
  );
  expect(doc.textInfo.word().last().wordText).toBe("sentence.");
  expect(doc.overview().single().characterCount).toBe(47);
});
