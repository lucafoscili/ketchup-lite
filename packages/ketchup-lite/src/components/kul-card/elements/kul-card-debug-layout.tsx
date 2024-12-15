import { h, VNode } from "@stencil/core";

import { kulManagerSingleton } from "src";
import { KulCardAdapter } from "src/components/kul-card/kul-card-declarations";

export const prepDebug = (adapter: KulCardAdapter): VNode => {
  const { elements, handlers, state } = adapter;
  const { refs } = elements;
  const { layouts } = handlers;
  const { get } = state;
  const { compInstance, defaults } = get;
  const { kulLayout } = compInstance;
  const { debug } = defaults;

  const shapes = get.shapes();
  const decorator = kulManagerSingleton.data.cell.shapes.decorate;

  //#region Button
  const buttons = decorator(
    "button",
    shapes.button,
    async (e) => compInstance.onKulEvent(e, "kul-event"),
    debug.button(),
    layouts.debug.button,
  );
  const hasButton = buttons?.element?.length;
  const hasButton2 = buttons?.element?.length > 1;
  //#endregion

  //#region Code
  const codes = decorator(
    "code",
    shapes.code,
    async (e) => compInstance.onKulEvent(e, "kul-event"),
    debug.code(),
    layouts.debug.code,
  );
  const hasCode = codes?.element?.length;
  //#endregion

  //#region Toggle
  const toggles = decorator(
    "toggle",
    shapes.toggle,
    async (e) => compInstance.onKulEvent(e, "kul-event"),
    debug.toggle(),
    layouts.debug.toggle,
  );
  const hasToggle = toggles?.element?.length;
  //#endregion

  const className = {
    [`${kulLayout}-layout`]: true,
  };

  refs.layouts.debug.button =
    hasButton && (buttons.ref[0] as HTMLKulButtonElement);
  refs.layouts.debug.code = hasCode && (codes.ref[0] as HTMLKulCodeElement);
  refs.layouts.debug.toggle =
    hasToggle && (toggles.ref[0] as HTMLKulToggleElement);

  return (
    <div class={className}>
      {hasToggle && <div class="section-1 toggle">{toggles.element[0]}</div>}
      {hasCode && <div class="section-2 code">{codes.element[0]}</div>}
      {hasButton && <div class="section-3 button">{buttons.element[0]}</div>}
      {hasButton2 && <div class="section-4 button">{buttons.element[1]}</div>}
    </div>
  );
};
