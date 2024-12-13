import { h, VNode } from "@stencil/core";

import { kulManagerSingleton } from "src";
import * as HANDLERS from "src/components/kul-card/handlers/kul-card-debug-layout";
import { KulCardAdapter } from "src/components/kul-card/kul-card-declarations";

export const prepDebug = (adapter: KulCardAdapter): VNode => {
  const { state } = adapter;
  const { get } = state;
  const { comp, defaults } = get;
  const { kulLayout } = comp;
  const { debug } = defaults;

  const shapes = get.shapes();
  const decorator = kulManagerSingleton.data.cell.shapes.decorate;

  //#region Button
  const buttons = decorator(
    "button",
    shapes.button,
    async (e) => comp.onKulEvent(e, "kul-event"),
    debug.button(),
    HANDLERS.button,
  );
  const hasButton = buttons?.element?.length;
  const hasButton2 = buttons?.element?.length > 1;
  //#endregion

  //#region Code
  const codes = decorator(
    "code",
    shapes.code,
    async (e) => comp.onKulEvent(e, "kul-event"),
    debug.code(),
    HANDLERS.code,
  );
  const hasCode = codes?.element?.length;
  //#endregion

  //#region Toggle
  const toggles = decorator(
    "toggle",
    shapes.toggle,
    async (e) => comp.onKulEvent(e, "kul-event"),
    debug.toggle(),
    HANDLERS.toggle,
  );
  const hasToggle = toggles?.element?.length;
  //#endregion

  const className = {
    [`${kulLayout}-layout`]: true,
  };

  return (
    <div class={className}>
      {hasToggle && <div class="section-1 toggle">{toggles.element[0]}</div>}
      {hasCode && <div class="section-2 code">{codes.element[0]}</div>}
      {hasButton && <div class="section-3 button">{buttons.element[0]}</div>}
      {hasButton2 && <div class="section-4 button">{buttons.element[1]}</div>}
    </div>
  );
};
