import { h, VNode } from "@stencil/core";

import { kulManagerInstance } from "../../../managers/kul-manager/kul-manager";
import { KulButtonEventPayload } from "../../kul-button/kul-button-declarations";
import { KulCardAdapter } from "../kul-card-declarations";

//#region Keywords layout
export function getKeywordsLayout(adapter: KulCardAdapter): VNode {
  const { actions, get } = adapter;
  const { dispatchEvent } = actions;
  const { defaults } = get;

  const card = get.card();
  const shapes = get.shapes();

  const decorator = kulManagerInstance().data.cell.shapes.decorate;

  const buttonEventHandler = async (e: CustomEvent<KulButtonEventPayload>) => {
    const { comp, eventType } = e.detail;
    const chipEl = chips?.ref?.[0] as HTMLKulChipElement;

    if (chipEl && eventType === "pointerdown") {
      comp.setMessage();
      if (chipEl) {
        const selectedChips: string[] = [];
        (await chipEl.getSelectedNodes()).forEach((n) => {
          selectedChips.push(n.id);
        });
        navigator.clipboard.writeText(selectedChips.join(", "));
      }
    }
  };

  const buttons = decorator(
    "button",
    shapes.button,
    dispatchEvent,
    defaults.keywords.button(),
    buttonEventHandler,
  );
  const charts = decorator(
    "chart",
    shapes.chart,
    dispatchEvent,
    defaults.keywords.chart(),
  );
  const chips = decorator(
    "chip",
    shapes.chip,
    dispatchEvent,
    defaults.keywords.chip(),
  );

  const className = {
    [`${card.kulLayout}-layout`]: true,
  };

  return (
    <div class={className}>
      {charts?.element?.length && (
        <div class="section-1 chart">{charts.element[0]}</div>
      )}
      {chips?.element?.length && (
        <div class="section-2 chip">{chips.element[0]}</div>
      )}
      {buttons?.element?.length && (
        <div class="section-3 button">{buttons.element[0]}</div>
      )}
    </div>
  );
}
//#endregion
