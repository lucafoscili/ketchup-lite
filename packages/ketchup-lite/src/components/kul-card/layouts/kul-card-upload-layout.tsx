import { h, VNode } from "@stencil/core";

import { kulManagerInstance } from "../../../managers/kul-manager/kul-manager";
import { KulCardAdapter } from "../kul-card-declarations";

//#region Upload layout
export function getUploadLayout(adapter: KulCardAdapter): VNode {
  const { actions, get } = adapter;
  const { dispatchEvent } = actions;
  const { defaults } = get;

  const card = get.card();
  const shapes = get.shapes();

  const decorator = kulManagerInstance().data.cell.shapes.decorate;

  const buttons = decorator(
    "button",
    shapes.button,
    dispatchEvent,
    defaults.upload.button(),
  );
  const uploads = decorator("upload", shapes.upload, dispatchEvent);

  const className = {
    [`${card.kulLayout}-layout`]: true,
  };

  return (
    <div class={className}>
      {uploads?.element?.length && (
        <div class="section-1 upload">{uploads.element[0]}</div>
      )}
      {buttons?.element?.length && (
        <div class="section-2 button">{buttons.element[0]}</div>
      )}
    </div>
  );
}
//#endregion
