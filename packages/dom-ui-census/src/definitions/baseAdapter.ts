import { chainAdapter } from "ui-census";
import combineDOMAdapters from "../combineAdapters";
import createDOMAdapter from "../createDomAdapter";

export const queryElementAdapter = createDOMAdapter(
  (target: Element, query: string) =>
    Array.from(target.querySelectorAll(query)),
  {
    isHTMLElement: (element) => element instanceof HTMLElement,
    /**
     * Defines a unique identifier (ID) which must be unique in the whole document.
     * Its purpose is to identify the element when linking (using a fragment identifier), scripting, or styling (with CSS).
     */
    id: (element) => element.id,
  },
  {}
);

export const queryHTMLElementAdapter = chainAdapter(
  queryElementAdapter,
  (query, queryStr: string) =>
    query(queryStr).contains({ isHTMLElement: true }).all(),
  {
    /**
     * Provides a hint for generating a keyboard shortcut for the current element. This attribute consists of a space-separated list of characters.
     * The browser should use the first one that exists on the computer keyboard layout.
     */
    accessKey: (element) => (element.getElement() as HTMLElement).accessKey,
    /**
     * Controls whether and how text input is automatically capitalized as it is entered/edited by the user. It can have the following values:
     * - **off or none**, no autocapitalization is applied (all letters default to lowercase)
     * - **on or sentences**, the first letter of each sentence defaults to a capital letter; all other letters default to lowercase-
     * - **words**, the first letter of each word defaults to a capital letter; all other letters default to lowercase
     * - **characters**, all letters should default to uppercase
     */
    autoCapitalize: (element) =>
      (element.getElement() as HTMLElement).autocapitalize as any,
    /** List of the classes of the element */
    classNames: (element) =>
      Array.from((element.getElement() as HTMLElement).classList),
    /**
     * An enumerated attribute indicating if the element should be editable by the user. If so, the browser modifies its widget to allow editing. The attribute must take one of the following values:
     * **true**, which indicates that the element must be editable;
     * **false**, which indicates that the element must not be editable.
     */
    contentEditable: (element) => {
      if ((element.getElement() as HTMLElement).contentEditable === "false") {
        return false;
      } else {
        return true;
      }
    },
    /**
     * Forms a class of attributes, called custom data attributes,
     * that allow proprietary information to be exchanged between the HTML and its DOM representation that may be used by scripts.
     */
    dataAttributes: (element) =>
      Object((element.getElement() as HTMLElement).dataset),
    /**
     * An enumerated attribute indicating the directionality of the element's text. It can have the following values:
     * - **ltr**, which means left to right and is to be used for languages that are written from the left to the right (like English);
     * - **rtl**, which means right to left and is to be used for languages that are written from the right to the left (like Arabic);
     * - **auto**, which lets the user agent decide. It uses a basic algorithm as it parses the characters inside the element until it finds a character with a strong directionality, then it applies that directionality to the whole element.
     */
    dir: (element) => (element.getElement() as HTMLElement).dir as any,
    /**
     * An enumerated attribute indicating whether the element can be dragged, using the Drag and Drop API.
     */
    draggable: (element) => (element.getElement() as HTMLElement).draggable,
    /**
     * A Boolean attribute indicates that the element is not yet, or is no longer, relevant. For example, it can be used to hide elements
     * of the page that can't be used until the login process has been completed. The browser won't render such elements. This attribute
     * must not be used to hide content that could legitimately be shown.
     */
    hidden: (element) => (element.getElement() as HTMLElement).hidden,
    /**
     * Defines a unique identifier (ID) which must be unique in the whole document.
     * Its purpose is to identify the element when linking (using a fragment identifier), scripting, or styling (with CSS).
     */
    id: (element) => element.id,
    /**
     * Provides a hint to browsers as to the type of virtual keyboard configuration to use when editing this element or its contents.
     * Used primarily on <input> elements, but is usable on any element while in contenteditable mode.
     */
    inputMode: (element) => (element.getElement() as HTMLElement).inputMode,
    /**
     * Helps define the language of an element: the language that non-editable elements are in, or the language that editable elements should be written in by the user.
     */
    lang: (element) => (element.getElement() as HTMLElement).lang,
    /**
     * An enumerated attribute defines whether the element may be checked for spelling errors. It may have the following values:
     * **true**, which indicates that the element should be, if possible, checked for spelling errors;
     * **false**, which indicates that the element should not be checked for spelling errors.
     */
    spellcheck: (element) => (element.getElement() as HTMLElement).spellcheck,
    /**
     * Contains inline CSS styling declarations to be applied to the element.
     */
    style: (element) => Object((element.getElement() as HTMLElement).style),
    /**
     * An integer attribute indicating if the element can take input focus (is focusable), if it should participate to sequential keyboard navigation, and if so, at what position. It can take several values:
     * - **a negative value** means that the element should be focusable, but should not be reachable via sequential keyboard navigation;
     * - **0** means that the element should be focusable and reachable via sequential keyboard navigation, but its relative order is defined by the platform convention;
     * - **a positive value** means that the element should be focusable and reachable via sequential keyboard navigation; the order in which the elements are focused is the increasing value of the tabindex. If several elements share the same tabindex, their relative order follows their relative positions in the document.
     */
    tabIndex: (element) => (element.getElement() as HTMLElement).tabIndex,
    /**
     * Contains a text representing advisory information related to the element it belongs to. Such information can typically,
     * but not necessarily, be presented to the user as a tooltip.
     */
    title: (element) => (element.getElement() as HTMLElement).title,
  },
  {
    getElement: (element) => () => element.getElement() as HTMLElement,
  }
);

const baseAdapter = combineDOMAdapters({
  query: queryElementAdapter,
  queryHTML: queryHTMLElementAdapter,
});

export default baseAdapter;
