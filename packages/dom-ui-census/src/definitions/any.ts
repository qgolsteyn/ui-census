import { IGlobalAttributes, QueryTransform } from "./domDefinition";

const definition: {
  selector: any;
  queries: QueryTransform<IGlobalAttributes>;
} = {
  selector: (target: Element, query: string) =>
    Array.from(target.querySelectorAll(query)),
  queries: {
    accessKey: (element) => element.accessKey,
    autoCapitalize: (element) => element.autocapitalize as any,
    classNames: (element) => Array.from(element.classList),
    contentEditable: (element) => {
      if (element.contentEditable === "false") {
        return false;
      } else {
        return true;
      }
    },
    dataAttributes: (element) => Object(element.dataset),
    dir: (element) => element.dir as any,
    draggable: (element) => element.draggable,
    hidden: (element) => element.hidden,
    id: (element) => element.id,
    inputMode: (element) => element.inputMode,
    lang: (element) => element.lang,
    spellcheck: (element) => element.spellcheck,
    style: (element) => Object(element.style),
    tabIndex: (element) => element.tabIndex,
    title: (element) => element.title,
  },
};
