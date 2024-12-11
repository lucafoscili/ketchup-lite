import { h, VNode } from "@stencil/core";

import { kulManagerInstance } from "../../../managers/kul-manager/kul-manager";
import { KulDataCyAttributes } from "../../../types/GenericTypes";
import { RIPPLE_SURFACE_CLASS } from "../../../variables/GenericVariables";
import { KulCardAdapter, KulCardCSSClasses } from "../kul-card-declarations";

//#region Material layout
export const prepMaterial = (adapter: KulCardAdapter): VNode => {
  const { hooks } = adapter;
  const { get } = hooks;
  const { comp, defaults } = get;
  const { kulLayout } = comp;
  const { material } = defaults;

  const shapes = get.shapes();
  const decorator = kulManagerInstance().data.cell.shapes.decorate;

  //#region Button
  const buttons = decorator("button", shapes.button, async (e) =>
    comp.onKulEvent(e, "kul-event"),
  );
  const hasButton = buttons?.element?.length;
  //#endregion

  //#region Image
  const images = decorator(
    "image",
    shapes.image,
    async (e) => comp.onKulEvent(e, "kul-event"),
    material.image(),
  );
  const hasImage = images?.element?.length;
  //#endregion

  //#region Text
  const texts = decorator("text", shapes.text, async (e) =>
    comp.onKulEvent(e, "kul-event"),
  );
  const hasText = texts?.element?.length;
  const title = hasText ? shapes.text?.[0]?.value : null;
  const subtitle = hasText ? shapes.text?.[1]?.value : null;
  const description = hasText ? shapes.text?.[2]?.value : null;
  //#endregion

  const className = {
    [`${kulLayout}-layout`]: true,
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
        {hasImage && <div class="section-1">{images.element[0]}</div>}
        <div class="section-2">
          {title && <div class="sub-2 title">{title}</div>}
          {subtitle && <div class="sub-2 subtitle">{subtitle}</div>}
          {description && <div class="sub-2 description">{description}</div>}
        </div>
      </div>
      {hasButton ? <div class="section-3">{buttons.element}</div> : null}
    </div>
  );
};
