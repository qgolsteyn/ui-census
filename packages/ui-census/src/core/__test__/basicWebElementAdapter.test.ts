import { Builder, By } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";

import createWebElementAdapter from "../createWebElementAdapter";

import "chromedriver";

const b = createWebElementAdapter({
  h1: {
    selector: (target) => target.findElements(By.css("h1")),
    queries: {
      text: (element) => element.getText(),
    },
    actions: {},
  },
  p: {
    selector: (target) => target.findElements(By.css("p")),
    queries: {
      text: (element) => element.getText(),
    },
    actions: {},
  },
});

const options = new chrome.Options();
options.addArguments("headless");

const driver = new Builder()
  .forBrowser("chrome")
  .setChromeOptions(options)
  .build();
driver.get("http://example.com");

const doc = b(driver.findElement(By.css("body")));

afterAll(async () => {
  await driver.quit();
});

test("it handles a basic query", async () => {
  const h1 = await doc.h1().single();
  expect(h1.text).toBe("Example Domain");
});

test("it handles a complex query", async () => {
  const p = await doc.p().all();
  expect(p.map((item) => item.text)).toEqual([
    "This domain is for use in illustrative examples in documents. You may use this domain in literature without prior coordination or asking for permission.",
    "More information...",
  ]);
});

test("it handles a simple query", async () => {
  const match = await doc.h1().contains({ text: "Example Domain" }).single();

  expect(match).toEqual({ text: "Example Domain" });
});
test("it handles snapshot testing", async () => {
  const p = await doc.p().all();
  expect(p).toMatchSnapshot();
});
