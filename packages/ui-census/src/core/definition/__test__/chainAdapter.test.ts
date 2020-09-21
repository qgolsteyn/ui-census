import combineAdapters from "../combineAdapters";
import createAdapter from "../createAdapter";
import chainAdapter from "../chainAdapter";

test("it chains an adapter", () => {
  const sentenceAdapter = createAdapter(
    (target: string) => {
      let elements = target.split(".");

      return elements;
    },
    {
      sentenceText: (element: string) => element,
      length: (element: string) => element.length,
    },
    {}
  );

  const wordAdapter = chainAdapter(
    sentenceAdapter,
    (sentence) => sentence().all(),
    {
      sentenceText: (sentence) => sentence.sentenceText,
      words: (sentence) => sentence.sentenceText.split(" "),
      sentenceLength: (sentence) => sentence.length,
      wordCount: (sentence) => sentence.sentenceText.split(" ").length,
    },
    {}
  );

  const wordAccessor = wordAdapter("This is a sentence");

  expect(wordAccessor().first().wordCount).toBe(4);
  expect(wordAccessor().single().sentenceText).toBe("This is a sentence");
});

test("it chains two adapters", () => {
  const sentenceAdapter = createAdapter(
    (target: string) => {
      let elements = target.split(".");

      return elements;
    },
    {
      sentenceText: (element: string) => element,
      length: (element: string) => element.length,
    },
    {}
  );

  const wordAdapter = chainAdapter(
    sentenceAdapter,
    (sentence) => sentence().all(),
    {
      sentenceText: (sentence) => sentence.sentenceText,
      words: (sentence) => sentence.sentenceText.split(" "),
      sentenceLength: (sentence) => sentence.length,
      wordCount: (sentence) => sentence.sentenceText.split(" ").length,
    },
    {}
  );

  const numberAdapter = chainAdapter(
    wordAdapter,
    (word) => word().all(),
    {
      characterWordCount: (element) => element.words.map((item) => item.length),
    },
    {}
  );

  const numberAccessor = numberAdapter("This is a sentence");

  expect(numberAccessor().first().characterWordCount).toEqual([4, 2, 1, 8]);
});

test("it accepts a combined adapter", () => {
  const wordAdapter = createAdapter(
    (target: string) => {
      let elements = target.split(" ");

      return elements;
    },
    {
      wordText: (element: string) => element,
      length: (element: string) => element.length,
    },
    {}
  );

  const sentenceAdapter = createAdapter(
    (target: string) => {
      let elements = target.split(".");

      return elements;
    },
    {
      sentenceText: (element: string) => element,
      length: (element: string) => element.length,
    },
    {}
  );

  const adapter = combineAdapters({
    word: wordAdapter,
    sentence: sentenceAdapter,
  });

  const globalStatAdapter = chainAdapter(
    adapter,
    (adapter) => [...adapter.sentence().all(), ...adapter.word().all()],
    {
      count: (element) => element.length,
    },
    {}
  );

  const globalStatAccessor = globalStatAdapter("This is fun");

  expect(
    globalStatAccessor()
      .all()
      .map((item) => item.count)
  ).toEqual([11, 4, 2, 3]);
});
