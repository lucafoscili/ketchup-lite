import { h, VNode } from "@stencil/core";

import { kulManagerSingleton } from "src";
import { KulCardAdapter } from "src/components/kul-card/kul-card-declarations";

//#region Upload layout
export const prepUpload = (adapter: KulCardAdapter): VNode => {
  const { state } = adapter;
  const { get } = state;
  const { compInstance, defaults } = get;
  const { kulLayout } = compInstance;
  const { upload } = defaults;

  const shapes = get.shapes();
  const decorator = kulManagerSingleton.data.cell.shapes.decorate;

  //#region Button
  const buttons = decorator(
    "button",
    shapes.button,
    async (e) => compInstance.onKulEvent(e, "kul-event"),
    upload.button(),
  );
  const hasButton = buttons?.element?.length;
  //#endregion

  //#region Upload
  const uploads = decorator("upload", shapes.upload, async (e) =>
    compInstance.onKulEvent(e, "kul-event"),
  );
  const hasUpload = uploads?.element?.length;
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
