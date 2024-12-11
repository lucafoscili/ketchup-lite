import { KulButtonEventPayload } from "../../kul-button/kul-button-declarations";

//#region Button
export const button = async (
  chip: HTMLKulChipElement,
  e: CustomEvent<KulButtonEventPayload>,
) => {
  const { comp, eventType } = e.detail;

  if (eventType === "pointerdown") {
    comp.setMessage();
    const selectedChips: string[] = [];
    (await chip.getSelectedNodes()).forEach((n) => {
      selectedChips.push(n.id);
    });
    navigator.clipboard.writeText(selectedChips.join(", "));
  }
};
//#endregion
