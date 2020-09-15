import * as CSS from "csstype";

export type QueryTransform<T extends {}> = {
  [Key in keyof T]: (element: HTMLElement) => T[Key];
};

export interface IGlobalAttributes {
  /**
   * Provides a hint for generating a keyboard shortcut for the current element. This attribute consists of a space-separated list of characters.
   * The browser should use the first one that exists on the computer keyboard layout.
   */
  accessKey: string;
  /**
   * Controls whether and how text input is automatically capitalized as it is entered/edited by the user. It can have the following values:
   * - **off or none**, no autocapitalization is applied (all letters default to lowercase)
   * - **on or sentences**, the first letter of each sentence defaults to a capital letter; all other letters default to lowercase-
   * - **words**, the first letter of each word defaults to a capital letter; all other letters default to lowercase
   * - **characters**, all letters should default to uppercase
   */
  autoCapitalize: "off" | "none" | "on" | "sentences" | "words" | "characters";
  /** List of the classes of the element */
  classNames: string[];
  /**
   * An enumerated attribute indicating if the element should be editable by the user. If so, the browser modifies its widget to allow editing. The attribute must take one of the following values:
   * **true**, which indicates that the element must be editable;
   * **false**, which indicates that the element must not be editable.
   */
  contentEditable: boolean;
  /**
   * Forms a class of attributes, called custom data attributes,
   * that allow proprietary information to be exchanged between the HTML and its DOM representation that may be used by scripts.
   */
  dataAttributes: { [key: string]: string };
  /**
   * An enumerated attribute indicating the directionality of the element's text. It can have the following values:
   * - **ltr**, which means left to right and is to be used for languages that are written from the left to the right (like English);
   * - **rtl**, which means right to left and is to be used for languages that are written from the right to the left (like Arabic);
   * - **auto**, which lets the user agent decide. It uses a basic algorithm as it parses the characters inside the element until it finds a character with a strong directionality, then it applies that directionality to the whole element.
   */
  dir: "ltr" | "rtl" | "auto";
  /**
   * An enumerated attribute indicating whether the element can be dragged, using the Drag and Drop API.
   */
  draggable: boolean;
  /**
   * A Boolean attribute indicates that the element is not yet, or is no longer, relevant. For example, it can be used to hide elements
   * of the page that can't be used until the login process has been completed. The browser won't render such elements. This attribute
   * must not be used to hide content that could legitimately be shown.
   */
  hidden: boolean;
  /**
   * Defines a unique identifier (ID) which must be unique in the whole document.
   * Its purpose is to identify the element when linking (using a fragment identifier), scripting, or styling (with CSS).
   */
  id: string;
  /**
   * Provides a hint to browsers as to the type of virtual keyboard configuration to use when editing this element or its contents.
   * Used primarily on <input> elements, but is usable on any element while in contenteditable mode.
   */
  inputMode: string;
  /**
   * Helps define the language of an element: the language that non-editable elements are in, or the language that editable elements should be written in by the user.
   */
  lang: string;
  /**
   * An enumerated attribute defines whether the element may be checked for spelling errors. It may have the following values:
   * **true**, which indicates that the element should be, if possible, checked for spelling errors;
   * **false**, which indicates that the element should not be checked for spelling errors.
   */
  spellcheck: boolean;
  /**
   * Contains inline CSS styling declarations to be applied to the element.
   */
  style: CSS.Properties;
  /**
   * An integer attribute indicating if the element can take input focus (is focusable), if it should participate to sequential keyboard navigation, and if so, at what position. It can take several values:
   * - **a negative value** means that the element should be focusable, but should not be reachable via sequential keyboard navigation;
   * - **0** means that the element should be focusable and reachable via sequential keyboard navigation, but its relative order is defined by the platform convention;
   * - **a positive value** means that the element should be focusable and reachable via sequential keyboard navigation; the order in which the elements are focused is the increasing value of the tabindex. If several elements share the same tabindex, their relative order follows their relative positions in the document.
   */
  tabIndex: number;
  /**
   * Contains a text representing advisory information related to the element it belongs to. Such information can typically,
   * but not necessarily, be presented to the user as a tooltip.
   */
  title: string;
}

export interface IDomDefinition {
  // DOCUMENT METADATA

  /** The HTML `<base>` element specifies the base URL to use for all relative URLs in a document. */
  base: IGlobalAttributes & {
    /** The base URL to be used throughout the document for relative URLs. Absolute and relative URLs are allowed. */
    href: string;
    /**
     * A keyword or author-defined name of the default browsing context to show the results of navigation from `<a>`, `<area>`, or `<form>`
     * elements without explicit target attributes.
     *
     * The following keywords have special meanings:
     * - **_self (default):** Show the result in the current browsing context.
     * - **_blank:** Show the result in a new, unnamed browsing context.
     * - **_parent:** Show the result in the parent browsing context of the current one, if the current page is inside a frame. If there is no parent, acts the same as _self.
     * - **_top:** Show the result in the topmost browsing context (the browsing context that is an ancestor of the current one and has no parent). If there is no parent, acts the same as _self.
     */
    target: string;
  };
  /** The HTML `<head>` element contains machine-readable information (metadata) about the document, like its title, scripts, and style sheets. */
  head: IGlobalAttributes & {
    /** Defines the document's title that is shown in a browser's title bar or a page's tab. */
    title: string;
  };
  /**
   * The HTML External Resource Link element (`<link>`) specifies relationships between the current document and an external resource.
   * This element is most commonly used to link to stylesheets, but is also used to establish site icons (both "favicon" style icons and
   * icons for the home screen and apps on mobile devices) among other things.
   */
  link: IGlobalAttributes & {
    /**
     * This attribute is only used when rel="preload" or rel="prefetch" has been set on the <link> element.
     * It specifies the type of content being loaded by the <link>, which is necessary for request matching,
     * application of correct content security policy, and setting of correct Accept request header.
     * Furthermore, rel="preload" uses this as a signal for request prioritization.
     */
    as:
      | "audio"
      | "document"
      | "embed"
      | "fetch"
      | "font"
      | "image"
      | "object"
      | "script"
      | "style"
      | "track"
      | "video"
      | "worker";
    /**
     * This enumerated attribute indicates whether CORS must be used when fetching the resource.
     * CORS-enabled images can be reused in the <canvas> element without being tainted. The allowed values are:
     * - **anonymous** A cross-origin request (i.e. with an Origin HTTP header) is performed, but no credential is sent (i.e. no cookie, X.509 certificate, or HTTP Basic authentication). If the server does not give credentials to the origin site (by not setting the Access-Control-Allow-Origin HTTP header) the resource will be tainted and its usage restricted.
     * - **use-credentials** A cross-origin request (i.e. with an Origin HTTP header) is performed along with a credential sent (i.e. a cookie, certificate, and/or HTTP Basic authentication is performed). If the server does not give credentials to the origin site (through Access-Control-Allow-Credentials HTTP header), the resource will be tainted and its usage restricted.
     *
     * If the attribute is not present, the resource is fetched without a CORS request (i.e. without sending the Origin HTTP header),
     * preventing its non-tainted usage. If invalid, it is handled as if the enumerated keyword anonymous was used
     */
    crossOrigin: "anonymous" | "use-credentials";
    /**
     * For rel="stylesheet" only, the disabled Boolean attribute indicates whether or not the
     * described stylesheet should be loaded and applied to the document. If disabled is specified in the HTML when it is loaded,
     * the stylesheet will not be loaded during page load. Instead, the stylesheet will be loaded on-demand, if and when the disabled
     * attribute is changed to false or removed.
     */
    disabled: boolean;
    /** This attribute specifies the URL of the linked resource. A URL can be absolute or relative. */
    href: string;
    /**
     * This attribute indicates the language of the linked resource. It is purely advisory.
     * Allowed values are determined by BCP47. Use this attribute only if the href attribute is present.
     */
    hrefLang: string;
    /**
     * This attribute specifies the media that the linked resource applies to.
     */
    media: string;
    /**
     * This attribute names a relationship of the linked document to the current document.
     * The attribute must be a space-separated list of link type values.
     */
    rel: string;
    /**
     * This attribute defines the sizes of the icons for visual media contained in the resource. It must be present only if the rel contains a value of icon or a non-standard type such as Apple's apple-touch-icon. It may have the following values:
     * any, meaning that the icon can be scaled to any size as it is in a vector format, like image/svg+xml.
     * a white-space separated list of sizes, each in the format <width in pixels>x<height in pixels> or <width in pixels>X<height in pixels>. Each of these sizes must be contained in the resource.
     */
    sizes: string;
    /**
     * The title attribute has special semantics on the <link> element. When used on a <link rel="stylesheet"> it
     * defines a preferred or an alternate stylesheet. Incorrectly using it may cause the stylesheet to be ignored.
     */
    title: string;
    /**
     * This attribute is used to define the type of the content linked to. The value of the attribute should be a MIME type such as
     * text/html, text/css, and so on. The common use of this attribute is to define the type of stylesheet being referenced
     * (such as text/css).
     */
    type: string;
  };
  /**
   * The HTML <meta> element represents metadata that cannot be represented by other HTML meta-related elements, like
   * `<base>`, `<link>`, `<script>`, `<style>` or `<title>`.
   */
  meta: IGlobalAttributes & {
    /**
     * This attribute declares the document's character encoding. If the attribute is present, its value must be an ASCII case-insensitive match for the string "utf-8", because UTF-8 is the only valid encoding for HTML5 documents.
     * meta elements which declare a character encoding must be located entirely within the first 1024 bytes of the document.
     */
    charset: string;
    /**
     * This attribute contains the value for the http-equiv or name attribute, depending on which is used.
     */
    content: string;
  };
  /** The HTML `<style>` element contains style information for a document, or part of a document. */
  style: IGlobalAttributes & {
    /**
     * This attribute defines which media the style should be applied to. Its value is a media query, which defaults to all if the attribute is missing.
     */
    media: string;
    /** A parsed interpretation of the content of the style element */
    innerParsed: CSS.Properties;
  };
  /** The HTML Title element (`<title>`) defines the document's title that is shown in a browser's title bar or a page's tab. */
  title: IGlobalAttributes;

  // CONTENT SECTIONING
  /**
   * The HTML `<address>` element indicates that the enclosed HTML provides contact information for a person or people, or for an organization.
   */
  address: IGlobalAttributes;
  /**
   * The HTML `<article>` element represents a self-contained composition in a document, page, application, or site,
   * which is intended to be independently distributable or reusable (e.g., in syndication).
   */
  article: IGlobalAttributes;
  /** The HTML `<aside>` element represents a portion of a document whose content is only indirectly related to the document's main content. */
  aside: IGlobalAttributes;
  /**
   * The HTML `<footer>` element represents a footer for its nearest sectioning content or sectioning root element. A footer typically
   * contains information about the author of the section, copyright data or links to related documents.
   */
  footer: IGlobalAttributes;
  /**
   * The HTML <header> element represents introductory content, typically a group of introductory or navigational aids.
   * It may contain some heading elements but also a logo, a search form, an author name, and other elements.
   */
  header: IGlobalAttributes;
  /**
   * The HTML `<h1>–<h6>` elements represent six levels of section headings. `<h1>` is the highest section level and `<h6>` is the lowest.
   */
  h_: IGlobalAttributes;
  /**
   * The HTML `<h1>` elements represent a section headings.
   */
  h1: IGlobalAttributes;
  /**
   * The HTML `<h2>` elements represent a section headings.
   */
  h2: IGlobalAttributes;
  /**
   * The HTML `<h3>` elements represent a section headings.
   */
  h3: IGlobalAttributes;
  /**
   * The HTML `<h4>` elements represent a section headings.
   */
  h4: IGlobalAttributes;
  /**
   * The HTML `<h5>` elements represent a section headings.
   */
  h5: IGlobalAttributes;
  /**
   * The HTML `<h6>` elements represent a section headings.
   */
  h6: IGlobalAttributes;
  /**
   * The HTML `<hgroup>` element represents a multi-level heading for a section of a document. It groups a set of `<h1>–<h6>` elements.
   */
  hgroup: IGlobalAttributes;
  /**
   * The HTML `<main>` element represents the dominant content of the <body> of a document. The main content area consists of
   * content that is directly related to or expands upon the central topic of a document, or the central functionality of an application.
   */
  main: IGlobalAttributes;
  /**
   * The HTML `<nav>` element represents a section of a page whose purpose is to provide navigation links, either within the current
   * document or to other documents. Common examples of navigation sections are menus, tables of contents, and indexes.
   */
  nav: IGlobalAttributes;
  /**
   * The HTML `<section>` element represents a standalone section — which doesn't have a more specific
   * semantic element to represent it — contained within an HTML document.
   */
  section: IGlobalAttributes;

  // TEXT CONTENT

  /** The HTML `<blockquote>` Element (or HTML Block Quotation Element) indicates that the enclosed text is an extended quotation. */
  blockquote: IGlobalAttributes & {
    /**
     * A URL that designates a source document or message for the information quoted.
     * This attribute is intended to point to information explaining the context or the reference for the quote.
     */
    cite: string;
  };
  /**
   * The HTML `<dd>` element provides the description, definition, or value for the preceding term (`<dt>`) in a description list (`<dl>`).
   */
  dd: IGlobalAttributes;
  /**
   * The HTML Content Division element (`<div>`) is the generic container for flow content. It has no effect on the content or layout until styled using CSS.
   */
  div: IGlobalAttributes;
  /**
   * The HTML `<dl>` element represents a description list. The element encloses a list of groups of terms (specified using the `<dt>` element) and descriptions (provided by `<dd>` elements).
   * Common uses for this element are to implement a glossary or to display metadata (a list of key-value pairs).
   */
  dl: IGlobalAttributes & {
    /** A string representation of the title/definition pairs that may be contained inside the description list. */
    innerPairs: [{ title: string; description: string }];
  };
  /**
   * The HTML `<dt>` element specifies a term in a description or definition list, and as such must be used inside a `<dl>` element.
   */
  dt: IGlobalAttributes;
  /**
   * The HTML `<figcaption> or Figure Caption element represents a caption or legend describing the rest of the contents of its parent <figure> element.
   */
  figcaption: IGlobalAttributes;
  /**
   * The HTML `<figure>` (Figure With Optional Caption) element represents self-contained content, potentially with an optional caption,
   * which is specified using the (<figcaption>) element. The figure, its caption, and its contents are referenced as a single unit.
   */
  figure: IGlobalAttributes & {
    /** A text representation of the figure's caption */
    caption: string;
  };
  /**
   * The HTML `<hr>` element represents a thematic break between paragraph-level elements: for example, a change of scene in a story, or a shift of topic within a section.
   */
  hr: IGlobalAttributes;
}
