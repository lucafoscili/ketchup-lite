import { h, VNode } from "@stencil/core";

import { kulManagerSingleton } from "src";
import { KulButtonEventPayload } from "src/components/kul-button/kul-button-declarations";
import { KulCardAdapter } from "src/components/kul-card/kul-card-declarations";

export const prepKeywords = (adapter: KulCardAdapter): VNode => {
  const { elements, handlers, state } = adapter;
  const { refs } = elements;
  const { layouts } = handlers;
  const { get } = state;
  const { compInstance, defaults } = get;
  const { kulLayout } = compInstance;
  const { keywords } = defaults;

  const shapes = get.shapes();
  const decorator = kulManagerSingleton.data.cell.shapes.decorate;

  //#region Button
  const buttonCb = (e: CustomEvent<KulButtonEventPayload>) => {
    layouts.keywords.button(e);
  };
  const buttons = decorator(
    "button",
    shapes.button,
    async (e) => compInstance.onKulEvent(e, "kul-event"),
    keywords.button(),
    buttonCb,
  );
  const hasButton = buttons?.element?.length;
  //#endregion

  //#region Chart
  const charts = decorator(
    "chart",
    shapes.chart,
    async (e) => compInstance.onKulEvent(e, "kul-event"),
    keywords.chart(),
  );
  const hasChart = charts?.element?.length;
  //#endregion

  //#region Chip
  const chips = decorator(
    "chip",
    shapes.chip,
    async (e) => compInstance.onKulEvent(e, "kul-event"),
    keywords.chip(),
  );
  const hasChip = chips?.element?.length;
  //#endregion

  const className = {
    [`${kulLayout}-layout`]: true,
  };

  refs.layouts.keywords.button = buttons.ref;
  refs.layouts.keywords.chip = chips.ref;

  return (
    <div class={className}>
      {hasChart && <div class="section-1 chart">{charts.element[0]}</div>}
      {hasButton && <div class="section-2 chip">{chips.element[0]}</div>}
      {hasChip && <div class="section-3 button">{buttons.element[0]}</div>}
    </div>
  );
};
