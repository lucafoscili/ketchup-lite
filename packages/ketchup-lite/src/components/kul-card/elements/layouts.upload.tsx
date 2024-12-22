import { h, VNode } from "@stencil/core";
import { KulCardAdapter } from "../kul-card-declarations";

//#region Upload layout
export const prepUpload = (getAdapter: () => KulCardAdapter): VNode => {
  const { compInstance, defaults, manager, shapes } =
    getAdapter().controller.get;
  const { data, theme } = manager;
  const { decorate } = data.cell.shapes;
  const { bemClass } = theme;

  const { button, upload } = shapes();

  //#region Button
  const buttons = decorate(
    "button",
    button,
    async (e) => compInstance.onKulEvent(e, "kul-event"),
    defaults.upload.button(),
  );
  const hasButton = Boolean(buttons?.element?.length);
  //#endregion

  //#region Upload
  const uploads = decorate("upload", upload, async (e) =>
    compInstance.onKulEvent(e, "kul-event"),
  );
  const hasUpload = Boolean(uploads?.element?.length);
  //#endregion

  return (
    <div class={bemClass("card-upload", null, { upload: true })}>
      {hasUpload && (
        <div class={bemClass("card-upload", "section-1", { upload: true })}>
          {uploads.element[0]}
        </div>
      )}
      {hasButton && (
        <div class={bemClass("card-upload", "section-2", { button: true })}>
          {buttons.element[0]}
        </div>
      )}
    </div>
  );
};
//#endregion
