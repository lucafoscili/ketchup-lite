import { KulCodePropsInterface } from "../kul-code-declarations";
import { KUL_CODE_CSS } from "./language.css";
import { KUL_CODE_JAVASCRIPT } from "./language.javascript";
import { KUL_CODE_JSON } from "./language.json";
import { KUL_CODE_JSX } from "./language.jsx";
import { KUL_CODE_MARKDOWN } from "./language.markdown";
import { KUL_CODE_MARKUP } from "./language.markup";
import { KUL_CODE_PYTHON } from "./language.python";
import { KUL_CODE_REGEX } from "./language.regex";
import { KUL_CODE_SCSS } from "./language.scss";
import { KUL_CODE_TSX } from "./language.tsx";
import { KUL_CODE_TYPESCRIPT } from "./language.typescript";

//#region Props
export const KUL_CODE_PROPS: (keyof KulCodePropsInterface)[] = [
  "kulFormat",
  "kulLanguage",
  "kulPreserveSpaces",
  "kulStyle",
  "kulValue",
];
//#endregion

//#region Languages
export const STATIC_LANGUAGES = {
  css: KUL_CODE_CSS,
  javascript: KUL_CODE_JAVASCRIPT,
  json: KUL_CODE_JSON,
  jsx: KUL_CODE_JSX,
  markdown: KUL_CODE_MARKDOWN,
  markup: KUL_CODE_MARKUP,
  python: KUL_CODE_PYTHON,
  regex: KUL_CODE_REGEX,
  scss: KUL_CODE_SCSS,
  tsx: KUL_CODE_TSX,
  typescript: KUL_CODE_TYPESCRIPT,
};
//#endregion
