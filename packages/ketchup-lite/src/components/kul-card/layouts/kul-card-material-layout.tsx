import { h, VNode } from "@stencil/core";

import { kulManagerInstance } from "../../../managers/kul-manager/kul-manager";
import { KulDataCyAttributes } from "../../../types/GenericTypes";
import { RIPPLE_SURFACE_CLASS } from "../../../variables/GenericVariables";
import { KulCardAdapter, KulCardCSSClasses } from "../kul-card-declarations";

//#region Material layout
export function getMaterialLayout(adapter: KulCardAdapter): VNode {
  const { actions, get } = adapter;
  const { dispatchEvent } = actions;
  const { defaults } = get;

  const card = get.card();
  const shapes = get.shapes();

  const decorator = kulManagerInstance().data.cell.shapes.decorate;

  const buttons = decorator("button", shapes.button, dispatchEvent);
  const images = decorator(
    "image",
    shapes.image,
    dispatchEvent,
    defaults.material.image(),
  );
  const texts = decorator("text", shapes.text, dispatchEvent);

  const coverIndex = 0;
  const cover: VNode = images.element?.length
    ? images.element[coverIndex]
    : null;

  const titleIndex = 0;
  const title = texts.element?.length ? shapes.text[titleIndex].value : null;

  const subtitleIndex = 1;
  const subtitle =
    texts.element?.length > subtitleIndex
      ? shapes.text[subtitleIndex].value
      : null;

  const descriptionIndex = 2;
  const description =
    texts.element?.length > descriptionIndex
      ? shapes.text[descriptionIndex].value
      : undefined;

  const className = {
    [`${card.kulLayout}-layout`]: true,
    [KulCardCSSClasses.HAS_ACTIONS]: !!buttons.element?.length,
  };

  return (
    <div class={className}>
      <div
        class={RIPPLE_SURFACE_CLASS}
        data-cy={KulDataCyAttributes.RIPPLE}
        onPointerDown={(e) => {
          kulManagerInstance().theme.ripple.trigger(
            e as PointerEvent,
            e.currentTarget as HTMLElement,
          );
        }}
      >
        <div class="section-1">{cover}</div>
        <div class="section-2">
          <div class="sub-2 title">{title}</div>
          <div class="sub-2 subtitle">{subtitle}</div>
          <div class="sub-2 description">{description}</div>
        </div>
      </div>
      {buttons.element?.length ? (
        <div class="section-3">{buttons.element}</div>
      ) : null}
    </div>
  );
}
//#endregion
