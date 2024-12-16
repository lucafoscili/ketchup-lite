import { h, VNode } from "@stencil/core";
import { kulManagerSingleton } from "src";
import { KulButtonEventPayload } from "src/components/kul-button/kul-button-declarations";
import { KulCardAdapter } from "../kul-card-declarations";

export const prepKeywords = (getAdapter: () => KulCardAdapter): VNode => {
  const { decorate } = kulManagerSingleton.data.cell.shapes;

  const { controller, elements, handlers } = getAdapter();
  const { refs } = elements;
  const { layouts } = handlers;
  const { compInstance, defaults, shapes } = controller.get;
  const { kulLayout } = compInstance;
  const { keywords } = defaults;

  const { button, chart, chip } = shapes();

  //#region Button
  const buttonCb = (e: CustomEvent<KulButtonEventPayload>) => {
    layouts.keywords.button(e);
  };
  const buttons = decorate(
    "button",
    button,
    async (e) => compInstance.onKulEvent(e, "kul-event"),
    keywords.button(),
    buttonCb,
  );
  const hasButton = buttons?.element?.length;
  //#endregion

  //#region Chart
  const charts = decorate(
    "chart",
    chart,
    async (e) => compInstance.onKulEvent(e, "kul-event"),
    keywords.chart(),
  );
  const hasChart = charts?.element?.length;
  //#endregion

  //#region Chip
  const chips = decorate(
    "chip",
    chip,
    async (e) => compInstance.onKulEvent(e, "kul-event"),
    keywords.chip(),
  );
  const hasChip = chips?.element?.length;
  //#endregion

  const className = {
    [`${kulLayout}-layout`]: true,
  };

  refs.layouts.keywords.button =
    hasButton && (buttons.ref[0] as HTMLKulButtonElement);
  refs.layouts.keywords.chip = hasChip && (chips.ref[0] as HTMLKulChipElement);

  return (
    <div class={className}>
      {hasChart && <div class="section-1 chart">{charts.element[0]}</div>}
      {hasButton && <div class="section-2 chip">{chips.element[0]}</div>}
      {hasChip && <div class="section-3 button">{buttons.element[0]}</div>}
    </div>
  );
};
