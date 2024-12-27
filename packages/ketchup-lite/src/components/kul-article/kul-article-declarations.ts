import {
  KulDataDataset,
  KulDataNode,
} from "src/managers/kul-data/kul-data-declarations";
import { KulEventPayload } from "src/types/GenericTypes";

//#region Dataset
export interface KulArticleDataset extends KulDataDataset {
  nodes?: KulArticleNode[];
}
export interface KulArticleNode extends KulDataNode {
  children?: KulArticleNode[];
  tagName?:
    | "br"
    | "code"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "li"
    | "pre"
    | "strong";
}
//#endregion

//#region Events
export type KulArticleEvent = "kul-event" | "ready" | "unmount";
export interface KulArticleEventPayload
  extends KulEventPayload<"KulArticle", KulArticleEvent> {}
//#endregion

//#region Props
export interface KulArticlePropsInterface {
  kulData?: KulArticleDataset;
  kulEmpty?: string;
  kulStyle?: string;
}
//#endregion
