import { h, VNode } from "@stencil/core";

import { kulManagerInstance } from "../../../managers/kul-manager/kul-manager";
import { KulButtonEventPayload } from "../../kul-button/kul-button-declarations";
import * as HANDLERS from "../handlers/kul-card-keywords-layout";
import { KulCardAdapter } from "../kul-card-declarations";

export const prepKeywords = (adapter: KulCardAdapter): VNode => {
  const { hooks } = adapter;
  const { get } = hooks;
  const { comp, defaults } = get;
  const { kulLayout } = comp;
  const { keywords } = defaults;

  const shapes = get.shapes();
  const decorator = kulManagerInstance().data.cell.shapes.decorate;

  //#region Button
  const buttonCb = (e: CustomEvent<KulButtonEventPayload>) => {
    const firstChip = chips?.ref?.[0] as HTMLKulChipElement;
    if (firstChip) {
      HANDLERS.button(firstChip, e);
    }
  };
  const buttons = decorator(
    "button",
    shapes.button,
    async (e) => comp.onKulEvent(e, "kul-event"),
    keywords.button(),
    buttonCb,
  );
  const hasButton = buttons?.element?.length;
  //#endregion

  //#region Chart
  const charts = decorator(
    "chart",
    shapes.chart,
    async (e) => comp.onKulEvent(e, "kul-event"),
    keywords.chart(),
  );
  const hasChart = charts?.element?.length;
  //#endregion

  //#region Chip
  const chips = decorator(
    "chip",
    shapes.chip,
    async (e) => comp.onKulEvent(e, "kul-event"),
    keywords.chip(),
  );
  const hasChip = chips?.element?.length;
  //#endregion

  const className = {
    [`${kulLayout}-layout`]: true,
  };

  return (
    <div class={className}>
      {hasChart && <div class="section-1 chart">{charts.element[0]}</div>}
      {hasButton && <div class="section-2 chip">{chips.element[0]}</div>}
      {hasChip && <div class="section-3 button">{buttons.element[0]}</div>}
    </div>
  );
};
