import { combineAdapters, combineAsyncAdapters } from "../combineAdapters";
import createAdapter from "../createAdapter";
import createAsyncAdapter from "../createAsyncAdapter";

test("it combines two synchronous adapters", () => {
  const wordAdapter = createAdapter({
    word: {
      selector: (target: string) => {
        let elements = target.split(" ");

        return elements;
      },
      queries: {
        text: (element: string) => element,
        length: (element: string) => element.length,
      },
      actions: {},
    },
  });

  const sentenceAdapter = createAdapter({
    sentence: {
      selector: (target: string) => {
        let elements = target.split(".");

        return elements;
      },
      queries: {
        text: (element: string) => element,
        length: (element: string) => element.length,
      },
      actions: {},
    },
  });

  const adapter = combineAdapters({
    word: wordAdapter,
    sentence: sentenceAdapter,
  });

  const doc = adapter("This is a sentence. It is a very nice sentence.");

  expect(doc.sentence.sentence().first().text).toBe("This is a sentence");
  expect(doc.word.word().last().text).toBe("sentence.");
});

test("it combines two asynchronous adapters", async () => {
  const wordAdapter = createAsyncAdapter({
    word: {
      selector: async (target: string) => {
        let elements = target.split(" ");

        return elements;
      },
      queries: {
        text: (element: string) => element,
        length: (element: string) => element.length,
      },
      actions: {},
    },
  });

  const sentenceAdapter = createAsyncAdapter({
    sentence: {
      selector: async (target: string) => {
        let elements = target.split(".");

        return elements;
      },
      queries: {
        text: (element: string) => element,
        length: (element: string) => element.length,
      },
      actions: {},
    },
  });

  const adapter = combineAsyncAdapters({
    word: wordAdapter,
    sentence: sentenceAdapter,
  });

  const doc = adapter("This is a sentence. It is a very nice sentence.");

  expect((await doc.sentence.sentence().first()).text).toBe(
    "This is a sentence"
  );
  expect((await doc.word.word().last()).text).toBe("sentence.");
});
