import { chainAdapter, combineAdapters } from "ui-census";
import userEvent, { IClickOptions } from "@testing-library/user-event";

import baseAdapter, {
  queryElementAdapter,
  queryHTMLElementAdapter,
} from "./baseAdapter";

const createBasicHTMLElementAdapter = (elementName: string) =>
  chainAdapter(
    baseAdapter,
    (target) => target.queryHTML(elementName).all(),
    {
      /**
       * Provides a hint for generating a keyboard shortcut for the current element. This attribute consists of a space-separated list of characters.
       * The browser should use the first one that exists on the computer keyboard layout.
       */
      accessKey: (element) => element.getElement().accessKey,
      /** List of the classes of the element */
      classNames: (element) => Array.from(element.getElement().classList),
      /**
       * An enumerated attribute indicating if the element should be editable by the user. If so, the browser modifies its widget to allow editing. The attribute must take one of the following values:
       * **true**, which indicates that the element must be editable;
       * **false**, which indicates that the element must not be editable.
       */
      contentEditable: (element) =>
        (element.getElement() as HTMLElement).contentEditable,
      /**
       * Forms a class of attributes, called custom data attributes,
       * that allow proprietary information to be exchanged between the HTML and its DOM representation that may be used by scripts.
       */
      dataAttributes: (element) => Object(element.getElement().dataset),
      /**
       * An enumerated attribute indicating the directionality of the element's text. It can have the following values:
       * - **ltr**, which means left to right and is to be used for languages that are written from the left to the right (like English);
       * - **rtl**, which means right to left and is to be used for languages that are written from the right to the left (like Arabic);
       * - **auto**, which lets the user agent decide. It uses a basic algorithm as it parses the characters inside the element until it finds a character with a strong directionality, then it applies that directionality to the whole element.
       */
      dir: (element) => element.getElement().dir as any,
      /**
       * An enumerated attribute indicating whether the element can be dragged, using the Drag and Drop API.
       */
      draggable: (element) => element.getElement().draggable,
      /**
       * A Boolean attribute indicates that the element is not yet, or is no longer, relevant. For example, it can be used to hide elements
       * of the page that can't be used until the login process has been completed. The browser won't render such elements. This attribute
       * must not be used to hide content that could legitimately be shown.
       */
      hidden: (element) => element.getElement().hidden,
      /**
       * Defines a unique identifier (ID) which must be unique in the whole document.
       * Its purpose is to identify the element when linking (using a fragment identifier), scripting, or styling (with CSS).
       */
      id: (element) => element.id,
      /**
       * Provides a hint to browsers as to the type of virtual keyboard configuration to use when editing this element or its contents.
       * Used primarily on <input> elements, but is usable on any element while in contenteditable mode.
       */
      inputMode: (element) => element.getElement().inputMode,
      /**
       * Helps define the language of an element: the language that non-editable elements are in, or the language that editable elements should be written in by the user.
       */
      lang: (element) => element.getElement().lang,
      /**
       * Contains inline CSS styling declarations to be applied to the element.
       */
      style: (element) => Object(element.getElement().style),
      /**
       * An integer attribute indicating if the element can take input focus (is focusable), if it should participate to sequential keyboard navigation, and if so, at what position. It can take several values:
       * - **a negative value** means that the element should be focusable, but should not be reachable via sequential keyboard navigation;
       * - **0** means that the element should be focusable and reachable via sequential keyboard navigation, but its relative order is defined by the platform convention;
       * - **a positive value** means that the element should be focusable and reachable via sequential keyboard navigation; the order in which the elements are focused is the increasing value of the tabindex. If several elements share the same tabindex, their relative order follows their relative positions in the document.
       */
      tabIndex: (element) => element.getElement().tabIndex,
      /**
       * The text contained inside this element and its children
       */
      textContent: (element) => element.getElement().textContent,
      /**
       * Contains a text representing advisory information related to the element it belongs to. Such information can typically,
       * but not necessarily, be presented to the user as a tooltip.
       */
      title: (element) => element.getElement().title,
    },
    {
      click: (element) => (
        mouseEventInit?: MouseEventInit,
        options?: IClickOptions
      ) => userEvent.click(element.getElement(), mouseEventInit, options),
      dblClick: (element) => (
        mouseEventInit?: MouseEventInit,
        options?: IClickOptions
      ) => userEvent.dblClick(element.getElement(), mouseEventInit, options),
      hover: (element) => (mouseEventInit?: MouseEventInit) =>
        userEvent.hover(element.getElement(), mouseEventInit),
      unhover: (element) => (mouseEventInit?: MouseEventInit) =>
        userEvent.unhover(element.getElement(), mouseEventInit),
    }
  );

const htmlAdapter = combineAdapters({
  query: queryElementAdapter,
  queryHTML: queryHTMLElementAdapter,
  /**
   * The HTML `<address>` element indicates that the enclosed HTML provides contact information for a person or people, or for an organization.
   */
  address: createBasicHTMLElementAdapter("address"),
  /**
   * The HTML `<article>` element represents a self-contained composition in a document, page, application, or site,
   * which is intended to be independently distributable or reusable (e.g., in syndication).
   */
  article: createBasicHTMLElementAdapter("article"),
  /** The HTML `<aside>` element represents a portion of a document whose content is only indirectly related to the document's main content. */
  aside: createBasicHTMLElementAdapter("aside"),
  /**
   * The HTML `<footer>` element represents a footer for its nearest sectioning content or sectioning root element. A footer typically
   * contains information about the author of the section, copyright data or links to related documents.
   */
  footer: createBasicHTMLElementAdapter("footer"),
  /**
   * The HTML <header> element represents introductory content, typically a group of introductory or navigational aids.
   * It may contain some heading elements but also a logo, a search form, an author name, and other elements.
   */
  header: createBasicHTMLElementAdapter("header"),
  /**
   * The HTML `<h1>` elements represent a section headings.
   */
  h1: createBasicHTMLElementAdapter("h1"),
  /**
   * The HTML `<h2>` elements represent a section headings.
   */
  h2: createBasicHTMLElementAdapter("h2"),
  /**
   * The HTML `<h3>` elements represent a section headings.
   */
  h3: createBasicHTMLElementAdapter("h3"),
  /**
   * The HTML `<h4>` elements represent a section headings.
   */
  h4: createBasicHTMLElementAdapter("h4"),
  /**
   * The HTML `<h5>` elements represent a section headings.
   */
  h5: createBasicHTMLElementAdapter("h5"),
  /**
   * The HTML `<h6>` elements represent a section headings.
   */
  h6: createBasicHTMLElementAdapter("h6"),
  /**
   * The HTML `<hgroup>` element represents a multi-level heading for a section of a document. It groups a set of `<h1>–<h6>` elements.
   */
  hgroup: createBasicHTMLElementAdapter("hgroup"),
  /**
   * The HTML `<main>` element represents the dominant content of the <body> of a document. The main content area consists of
   * content that is directly related to or expands upon the central topic of a document, or the central functionality of an application.
   */
  main: createBasicHTMLElementAdapter("main"),
  /**
   * The HTML `<nav>` element represents a section of a page whose purpose is to provide navigation links, either within the current
   * document or to other documents. Common examples of navigation sections are menus, tables of contents, and indexes.
   */
  nav: createBasicHTMLElementAdapter("nav"),
  /**
   * The HTML `<section>` element represents a standalone section — which doesn't have a more specific
   * semantic element to represent it — contained within an HTML document.
   */
  section: createBasicHTMLElementAdapter("section"),
  /** The HTML `<blockquote>` Element (or HTML Block Quotation Element) indicates that the enclosed text is an extended quotation. */
  blockquote: createBasicHTMLElementAdapter("blockquote"),
  /**
   * The HTML `<dd>` element provides the description, definition, or value for the preceding term (`<dt>`) in a description list (`<dl>`).
   */
  dd: createBasicHTMLElementAdapter("dd"),
  /**
   * The HTML Content Division element (`<div>`) is the generic container for flow content. It has no effect on the content or layout until styled using CSS.
   */
  div: createBasicHTMLElementAdapter("div"),
  /**
   * The HTML `<dl>` element represents a description list. The element encloses a list of groups of terms (specified using the `<dt>` element) and descriptions (provided by `<dd>` elements).
   * Common uses for this element are to implement a glossary or to display metadata (a list of key-value pairs).
   */
  dl: createBasicHTMLElementAdapter("dl"),
  /**
   * The HTML `<dt>` element specifies a term in a description or definition list, and as such must be used inside a `<dl>` element.
   */
  dt: createBasicHTMLElementAdapter("dt"),
  /**
   * The HTML `<figcaption> or Figure Caption element represents a caption or legend describing the rest of the contents of its parent <figure> element.
   */
  figcaption: createBasicHTMLElementAdapter("figcaption"),
  /**
   * The HTML `<figure>` (Figure With Optional Caption) element represents self-contained content, potentially with an optional caption,
   * which is specified using the (<figcaption>) element. The figure, its caption, and its contents are referenced as a single unit.
   */
  figure: createBasicHTMLElementAdapter("figure"),
  /**
   * The HTML `<hr>` element represents a thematic break between paragraph-level elements: for example, a change of scene in a story, or a shift of topic within a section.
   */
  hr: createBasicHTMLElementAdapter("hr"),
  /**
   * The HTML `<li>` element is used to represent an item in a list.
   */
  li: createBasicHTMLElementAdapter("li"),
  /**
   * The HTML `<ol>` element represents an ordered list of items — typically rendered as a numbered list.
   */
  ol: createBasicHTMLElementAdapter("ol"),
  /** The HTML `<p>` element represents a paragraph. */
  p: createBasicHTMLElementAdapter("p"),
  /**
   * The HTML `<pre>` element represents preformatted text which is to be presented exactly as written in the HTML file.
   */
  pre: createBasicHTMLElementAdapter("pre"),
  /**
   * The HTML `<ul>` element represents an unordered list of items, typically rendered as a bulleted list.
   */
  ul: createBasicHTMLElementAdapter("ul"),
  /**
   * The HTML `<a>` element (or anchor element), with its href attribute, creates a hyperlink to web pages, files,
   * email addresses, locations in the same page, or anything else a URL can address.
   */
  a: createBasicHTMLElementAdapter("a"),
  /**
   * The HTML Abbreviation element (`<abbr>`) represents an abbreviation or acronym; the optional title attribute can
   * provide an expansion or description for the abbreviation.
   */
  abbr: createBasicHTMLElementAdapter("abbr"),
  /**
   * The HTML Bring Attention To element (`<b>`) is used to draw the reader's attention to the element's contents,
   * which are not otherwise granted special importance.
   */
  b: createBasicHTMLElementAdapter("b"),
  /**
   * The HTML Bidirectional Isolate element (`<bdi>`)  tells the browser's bidirectional algorithm to treat the text
   * it contains in isolation from its surrounding text.
   */
  bdi: createBasicHTMLElementAdapter("bdi"),
  /**
   * The HTML Bidirectional Text Override element (<bdo>) overrides the current directionality of text, so that the text within
   * is rendered in a different direction.
   */
  bdo: createBasicHTMLElementAdapter("bdo"),
  /**
   * The HTML `<br>` element produces a line break in text (carriage-return). It is useful for writing a poem or an address,
   * where the division of lines is significant.
   */
  br: createBasicHTMLElementAdapter("br"),
  /**
   * The HTML Citation element (`<cite>`) is used to describe a reference to a cited creative work, and must include the title of that work.
   */
  cite: createBasicHTMLElementAdapter("cite"),
  /**
   * The HTML `<code>` element displays its contents styled in a fashion intended to indicate that the text is a short fragment of computer code.
   */
  code: createBasicHTMLElementAdapter("code"),
  /**
   * The HTML `<data>` element links a given piece of content with a machine-readable translation. If the content is time- or date-related, the `<time>` element must be used.
   */
  data: createBasicHTMLElementAdapter("data"),
  /**
   * The HTML Definition element (`<dfn>`) is used to indicate the term being defined within the context of a definition phrase or sentence.
   */
  dfn: createBasicHTMLElementAdapter("dfn"),
  /**
   * The HTML `<em>` element marks text that has stress emphasis. The `<em>` element can be nested, with each level of nesting indicating a greater degree of emphasis.
   */
  em: createBasicHTMLElementAdapter("em"),
  /**
   * 	The HTML Idiomatic Text element (`<i>`) represents a range of text that is set off from the normal text for some reason, such as idiomatic text, technical terms, taxonomical designations, among others.
   */
  i: createBasicHTMLElementAdapter("i"),
  /**
   * The HTML Keyboard Input element (`<kbd>`) represents a span of inline text denoting textual user input from a keyboard, voice input, or any other text entry device.
   */
  kbd: createBasicHTMLElementAdapter("kbd"),
  /**
   * The HTML Mark Text element (`<mark>`) represents text which is marked or highlighted for reference or notation purposes, due to the marked passage's relevance
   * or importance in the enclosing context.
   */
  mark: createBasicHTMLElementAdapter("mark"),
  /**
   * The HTML `<q>` element indicates that the enclosed text is a short inline quotation. Most modern browsers implement this by surrounding the text in quotation marks.
   */
  q: createBasicHTMLElementAdapter("q"),
  /**
   * The HTML `<s>` element renders text with a strikethrough, or a line through it. Use the `<s>` element to represent things that are no longer relevant or no longer accurate.
   * However, `<s>` is not appropriate when indicating document edits; for that, use the `<del>` and `<ins>` elements, as appropriate.
   */
  s: createBasicHTMLElementAdapter("s"),
  /**
   * The HTML Sample Element (`<samp>`) is used to enclose inline text which represents sample (or quoted) output from a computer program.
   */
  samp: createBasicHTMLElementAdapter("samp"),
  /**
   * The HTML `<small>` element represents side-comments and small print, like copyright and legal text, independent of its styled presentation.
   * By default, it renders text within it one font-size smaller, such as from small to x-small.
   */
  small: createBasicHTMLElementAdapter("small"),
  /**
   * The HTML `<span>` element is a generic inline container for phrasing content, which does not inherently represent anything.
   * It can be used to group elements for styling purposes (using the class or id attributes), or because they share attribute values, such as lang.
   */
  span: createBasicHTMLElementAdapter("span"),
  /**
   * The HTML Strong Importance Element (<strong>) indicates that its contents have strong importance, seriousness, or urgency.
   * Browsers typically render the contents in bold type.
   */
  strong: createBasicHTMLElementAdapter("strong"),
  /**
   * The HTML Subscript element (`<sub>`) specifies inline text which should be displayed as subscript for solely typographical reasons.
   */
  sub: createBasicHTMLElementAdapter("sub"),
  /**
   * The HTML Superscript element (`<sup>`) specifies inline text which is to be displayed as superscript for solely typographical reasons.
   */
  sup: createBasicHTMLElementAdapter("sup"),
  /**
   * The HTML `<time>` element represents a specific period in time.
   */
  time: createBasicHTMLElementAdapter("time"),
  /**
   * The HTML Unarticulated Annotation element (`<u>`) represents a span of inline text which should be rendered in a way
   * that indicates that it has a non-textual annotation.
   */
  u: createBasicHTMLElementAdapter("u"),
  /**
   * The HTML Variable element (`<var>`) represents the name of a variable in a mathematical expression or a programming context.
   */
  var: createBasicHTMLElementAdapter("var"),
  /**
   * The HTML `<wbr>` element represents a word break opportunity—a position within text where the browser may optionally break a line,
   * though its line-breaking rules would not otherwise create a break at that location.
   */
  wbr: createBasicHTMLElementAdapter("wbr"),
  /**
   * The HTML `<area>` element defines a hot-spot region on an image, and optionally associates it with a hypertext link. This element
   * is used only within a `<map>` element.
   */
  area: createBasicHTMLElementAdapter("area"),
  /**
   * The HTML `<audio>` element is used to embed sound content in documents. It may contain one or more audio sources,
   * represented using the src attribute or the `<source>` element: the browser will choose the most suitable one.
   * It can also be the destination for streamed media, using a MediaStream.
   */
  audio: createBasicHTMLElementAdapter("audio"),
  /**
   * The HTML `<img>` element embeds an image into the document.
   */
  img: createBasicHTMLElementAdapter("img"),
  /**
   * The HTML `<map>` element is used with `<area>` elements to define an image map (a clickable link area).
   */
  map: createBasicHTMLElementAdapter("map"),
  /**
   * The HTML `<track>` element is used as a child of the media elements, `<audio>` and `<video>`. It lets you specify timed text tracks (or time-based data),
   * for example to automatically handle subtitles.
   */
  track: createBasicHTMLElementAdapter("track"),
  /**
   * The HTML Video element (`<video>`) embeds a media player which supports video playback into the document. You can use `<video>` for audio content as well,
   * but the `<audio>` element may provide a more appropriate user experience.
   */
  video: createBasicHTMLElementAdapter("video"),
  /**
   * The HTML `<embed>` element embeds external content at the specified point in the document. This content is provided by an external application or other
   * source of interactive content such as a browser plug-in.
   */
  embed: createBasicHTMLElementAdapter("embed"),
  /**
   * The HTML Inline Frame element (`<iframe>`) represents a nested browsing context, embedding another HTML page into the current one.
   */
  iframe: createBasicHTMLElementAdapter("iframe"),
  /**
   * The HTML `<object>` element represents an external resource, which can be treated as an image, a nested browsing context, or a resource to be handled by a plugin.
   */
  object: createBasicHTMLElementAdapter("object"),
  /**
   * The HTML `<param>` element defines parameters for an `<object>` element.
   */
  param: createBasicHTMLElementAdapter("param"),
  /**
   * The HTML `<picture>` element contains zero or more `<source>` elements and one `<img>` element to offer alternative versions of an image
   * for different display/device scenarios.
   */
  picture: createBasicHTMLElementAdapter("picture"),
  /**
   * The HTML `<source>` element specifies multiple media resources for the `<picture>`, the `<audio>` element, or the `<video>` element.
   */
  source: createBasicHTMLElementAdapter("source"),
  /**
   * The HTML `<del>` element represents a range of text that has been deleted from a document.
   */
  del: createBasicHTMLElementAdapter("del"),
  /**
   * The HTML `<ins>` element represents a range of text that has been added to a document.
   */
  ins: createBasicHTMLElementAdapter("ins"),
  /**
   * The HTML `<button>` element represents a clickable button, used to submit forms or anywhere
   * in a document for accessible, standard button functionality.
   */
  button: createBasicHTMLElementAdapter("button"),
});

export default htmlAdapter;
