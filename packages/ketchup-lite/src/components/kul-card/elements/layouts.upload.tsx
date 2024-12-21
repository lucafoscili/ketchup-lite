import { h, VNode } from "@stencil/core";
import { kulManagerSingleton } from "src/global/global";
import { KulCardAdapter } from "../kul-card-declarations";

//#region Upload layout
export const prepUpload = (getAdapter: () => KulCardAdapter): VNode => {
  const { bemClass } = kulManagerSingleton.theme;
  const decorator = kulManagerSingleton.data.cell.shapes.decorate;

  const { compInstance, defaults, shapes } = getAdapter().controller.get;

  const { button, upload } = shapes();

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

  return (
    <div class={bemClass("card", null, { upload: true })}>
      {hasUpload && (
        <div class={bemClass("card", "section-1", { upload: true })}>
          {uploads.element[0]}
        </div>
      )}
      {hasButton && (
        <div class={bemClass("card", "section-2", { button: true })}>
          {buttons.element[0]}
        </div>
      )}
    </div>
  );
};
//#endregion
