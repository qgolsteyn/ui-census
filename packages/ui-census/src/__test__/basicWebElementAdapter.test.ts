import { Builder, By, Key, until } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";
import { createWebElementAdapter } from "..";

import "chromedriver";

const b = createWebElementAdapter({
  h1: {
    _selector: (target) => target.findElements(By.css("h1")),
    text: (element) => element.getText(),
  },
  p: {
    _selector: (target) => target.findElements(By.css("p")),
    text: (element) => element.getText(),
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
  const h1 = await doc.h1;
  expect(h1[0].text).resolves.toBe("Example Domain");
});

test("it handles a complex query", async () => {
  const p = await doc.p;
  expect(Promise.all(p.map((item) => item.text))).resolves.toEqual([
    "This domain is for use in illustrative examples in documents. You may use this domain in literature without prior coordination or asking for permission.",
    "More information...",
  ]);
});
