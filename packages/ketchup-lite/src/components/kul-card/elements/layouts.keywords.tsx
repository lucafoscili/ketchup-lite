import { h, VNode } from "@stencil/core";
import { KulButtonEventPayload } from "src/components/kul-button/kul-button-declarations";
import { KulCardAdapter } from "../kul-card-declarations";

export const prepKeywords = (getAdapter: () => KulCardAdapter): VNode => {
  const { controller, elements, handlers } = getAdapter();
  const { refs } = elements;
  const { layouts } = handlers;
  const { compInstance, defaults, manager, shapes } = controller.get;
  const { keywords } = defaults;
  const { data, theme } = manager;
  const { decorate } = data.cell.shapes;
  const { bemClass } = theme;

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
  const hasButton = Boolean(buttons?.element?.length);
  //#endregion

  //#region Chart
  const charts = decorate(
    "chart",
    chart,
    async (e) => compInstance.onKulEvent(e, "kul-event"),
    keywords.chart(),
  );
  const hasChart = Boolean(charts?.element?.length);
  //#endregion

  //#region Chip
  const chips = decorate(
    "chip",
    chip,
    async (e) => compInstance.onKulEvent(e, "kul-event"),
    keywords.chip(),
  );
  const hasChip = Boolean(chips?.element?.length);
  //#endregion

  refs.layouts.keywords.button =
    hasButton && (buttons.ref[0] as HTMLKulButtonElement);
  refs.layouts.keywords.chip = hasChip && (chips.ref[0] as HTMLKulChipElement);

  return (
    <div class={bemClass("card-keywords", null, { keywords: true })}>
      {hasChart && (
        <div class={bemClass("card-keywords", "section-1", { chart: true })}>
          {charts.element[0]}
        </div>
      )}
      {hasButton && (
        <div class={bemClass("card-keywords", "section-2", { chip: true })}>
          {chips.element[0]}
        </div>
      )}
      {hasChip && (
        <div class={bemClass("card-keywords", "section-3", { button: true })}>
          {buttons.element[0]}
        </div>
      )}
    </div>
  );
};
