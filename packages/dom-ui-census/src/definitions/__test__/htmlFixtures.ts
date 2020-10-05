import fc from "fast-check";

export const globalHTMLAttrArb = fc.record(
  {
    accessKey: fc.array(fc.char()).map((arr) => arr.join(" ")),
    // contentEditable is not supported in JSDom, do not comment out the line below if you don't want to waste your time...
    // contentEditable: fc.boolean(),
    dir: fc.constantFrom("ltr", "rtl", "auto"),
    draggable: fc.boolean(),
    hidden: fc.boolean(),
    id: fc.hexaString(),
    lang: fc.constantFrom("en-US", "en-CA", "fr-FR", "de-DE", "de-CH"),
    tabIndex: fc.integer(),
    title: fc.string(),
  },
  { withDeletedKeys: true }
);
