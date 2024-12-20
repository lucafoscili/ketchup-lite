import { h, VNode } from "@stencil/core";
import { kulManagerSingleton } from "src/global/global";
import { KulCardAdapter } from "../kul-card-declarations";

export const prepDebug = (getAdapter: () => KulCardAdapter): VNode => {
  const { decorate } = kulManagerSingleton.data.cell.shapes;

  const { controller, elements, handlers } = getAdapter();
  const { refs } = elements;
  const { layouts } = handlers;
  const { compInstance, defaults, shapes } = controller.get;
  const { kulLayout } = compInstance;
  const { debug } = defaults;

  const { button, code, toggle } = shapes();

  //#region Button
  const buttons = decorate(
    "button",
    button,
    async (e) => compInstance.onKulEvent(e, "kul-event"),
    debug.button(),
    layouts.debug.button,
  );
  const hasButton = Boolean(buttons?.element?.length);
  const hasButton2 = Boolean(buttons?.element?.length > 1);
  //#endregion

  //#region Code
  const codes = decorate(
    "code",
    code,
    async (e) => compInstance.onKulEvent(e, "kul-event"),
    debug.code(),
    layouts.debug.code,
  );
  const hasCode = Boolean(codes?.element?.length);
  //#endregion

  //#region Toggle
  const toggles = decorate(
    "toggle",
    toggle,
    async (e) => compInstance.onKulEvent(e, "kul-event"),
    debug.toggle(),
    layouts.debug.toggle,
  );
  const hasToggle = Boolean(toggles?.element?.length);
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
