import { KulEventPayload } from "../../types/GenericTypes";

/*-------------------------------------------------*/
/*                   E v e n t s                   */
/*-------------------------------------------------*/
export type KulHeaderEvent = "ready" | "unmount";
export interface KulHeaderEventPayload
  extends KulEventPayload<"KulHeader", KulHeaderEvent> {}
/*-------------------------------------------------*/
/*                    P r o p s                    */
/*-------------------------------------------------*/
export enum KulHeaderProps {
  kulStyle = "Custom style of the component.",
}
export interface KulHeaderPropsInterface {
  kulStyle?: string;
}
