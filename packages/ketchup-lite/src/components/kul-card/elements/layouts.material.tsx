import { h, VNode } from "@stencil/core";
import { kulManagerSingleton } from "src";
import { KulDataCyAttributes } from "src/types/GenericTypes";
import { RIPPLE_SURFACE_CLASS } from "src/variables/GenericVariables";
import { KulCardAdapter, KulCardCSSClasses } from "../kul-card-declarations";

//#region Material layout
export const prepMaterial = (getAdapter: () => KulCardAdapter): VNode => {
  const { decorate } = kulManagerSingleton.data.cell.shapes;

  const { compInstance, defaults, shapes } = getAdapter().controller.get;
  const { kulLayout } = compInstance;
  const { material } = defaults;

  const { button, image, text } = shapes();

  //#region Button
  const buttons = decorate("button", button, async (e) =>
    compInstance.onKulEvent(e, "kul-event"),
  );
  const hasButton = buttons?.element?.length;
  //#endregion

  //#region Image
  const images = decorate(
    "image",
    image,
    async (e) => compInstance.onKulEvent(e, "kul-event"),
    material.image(),
  );
  const hasImage = images?.element?.length;
  //#endregion

  //#region Text
  const texts = decorate("text", text, async (e) =>
    compInstance.onKulEvent(e, "kul-event"),
  );
  const hasText = texts?.element?.length;
  const title = hasText ? text?.[0]?.value : null;
  const subtitle = hasText ? text?.[1]?.value : null;
  const description = hasText ? text?.[2]?.value : null;
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
          kulManagerSingleton.theme.ripple.trigger(
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
      {hasButton && <div class="section-3">{buttons.element}</div>}
    </div>
  );
};
