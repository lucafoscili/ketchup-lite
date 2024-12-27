import { KulEventPayload } from "src/types/GenericTypes";

//#region Events
export type KulProgressbarEvent = "ready" | "unmount";
export interface KulProgressbarEventPayload
  extends KulEventPayload<"KulProgressbar", KulProgressbarEvent> {
  isPlaceholder?: boolean;
}
//#endregion

//#region Props
export interface KulProgressbarPropsInterface {
  kulCenteredLabel?: boolean;
  kulIcon?: string;
  kulIsRadial?: boolean;
  kulLabel?: string;
  kulShowLabel?: boolean;
  kulStyle?: string;
  kulValue?: number;
}
//#endregion
