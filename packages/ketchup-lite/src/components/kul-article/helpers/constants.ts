import { KulArticlePropsInterface } from "../kul-article-declarations";

//#region Event
export const KUL_ARTICLE_EVENT = "kul-article-event";
//#endregion

//#region Props
export const KUL_ARTICLE_PROPS: (keyof KulArticlePropsInterface)[] = [
  "kulData",
  "kulStyle",
];
//#endregion
