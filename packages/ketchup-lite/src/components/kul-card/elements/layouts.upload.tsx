import { h, VNode } from "@stencil/core";
import { kulManagerSingleton } from "src/global/global";
import { KulCardAdapter } from "../kul-card-declarations";

//#region Upload layout
export const prepUpload = (getAdapter: () => KulCardAdapter): VNode => {
  const { compInstance, defaults, shapes } = getAdapter().controller.get;
  const { kulLayout } = compInstance;

  const { button, upload } = shapes();
  const decorator = kulManagerSingleton.data.cell.shapes.decorate;

  //#region Button
  const buttons = decorator(
    "button",
    button,
    async (e) => compInstance.onKulEvent(e, "kul-event"),
    defaults.upload.button(),
  );
  const hasButton = Boolean(buttons?.element?.length);
  //#endregion

  //#region Upload
  const uploads = decorator("upload", upload, async (e) =>
    compInstance.onKulEvent(e, "kul-event"),
  );
  const hasUpload = Boolean(uploads?.element?.length);
  //#endregion

  const className = {
    [`${kulLayout}-layout`]: true,
  };

  return (
    <div class={className}>
      {hasUpload && <div class="section-1 upload">{uploads.element[0]}</div>}
      {hasButton && <div class="section-2 button">{buttons.element[0]}</div>}
    </div>
  );
};
//#endregion
