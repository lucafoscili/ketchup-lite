import { KulButtonEventPayload } from "src/components/kul-button/kul-button-declarations";
import { KulCardAdapter } from "src/components/kul-card/kul-card-declarations";

export const prepKeywordsHandlers = (adapter: KulCardAdapter) => {
  const { layouts } = adapter.elements.refs;

  return {
    //#region Button
    button: async (e: CustomEvent<KulButtonEventPayload>) => {
      const { comp, eventType } = e.detail;

      const { chip } = layouts.keywords;

      if (!chip) {
        return;
      }

      switch (eventType) {
        case "pointerdown":
          comp.setMessage();
          const selectedChips: string[] = [];
          (await chip.getSelectedNodes()).forEach((n) => {
            selectedChips.push(n.id);
          });
          navigator.clipboard.writeText(selectedChips.join(", "));
          break;
      }
    },
    //#endregion
  };
};
