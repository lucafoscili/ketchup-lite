import { h, VNode } from "@stencil/core";
import { kulManagerSingleton } from "src/global/global";
import { KulDataCyAttributes } from "src/types/GenericTypes";
import { RIPPLE_SURFACE_CLASS } from "src/utils/constants";
import { KulCardAdapter } from "../kul-card-declarations";

//#region Material layout
export const prepMaterial = (getAdapter: () => KulCardAdapter): VNode => {
  const { bemClass } = kulManagerSingleton.theme;
  const { decorate } = kulManagerSingleton.data.cell.shapes;

  const { compInstance, defaults, shapes } = getAdapter().controller.get;
  const { material } = defaults;

  const { button, image, text } = shapes();

  //#region Button
  const buttons = decorate("button", button, async (e) =>
    compInstance.onKulEvent(e, "kul-event"),
  );
  const hasButton = Boolean(buttons?.element?.length);
  //#endregion

  //#region Image
  const images = decorate(
    "image",
    image,
    async (e) => compInstance.onKulEvent(e, "kul-event"),
    material.image(),
  );
  const hasImage = Boolean(images?.element?.length);
  //#endregion

  //#region Text
  const texts = decorate("text", text, async (e) =>
    compInstance.onKulEvent(e, "kul-event"),
  );
  const hasText = Boolean(texts?.element?.length);
  const title = hasText ? text?.[0]?.value : null;
  const subtitle = hasText ? text?.[1]?.value : null;
  const description = hasText ? text?.[2]?.value : null;
  //#endregion

  return (
    <div class={bemClass("card", null, { "has-action": true, material: true })}>
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
        {hasImage && (
          <div class={bemClass("card", "section-1", { image: true })}>
            {images.element[0]}
          </div>
        )}
        <div class={bemClass("card", "section-2")}>
          {title && (
            <div class={bemClass("card", "sub-2", { title: true })}>
              {title}
            </div>
          )}
          {subtitle && (
            <div class={bemClass("card", "section-1", { subtitle: true })}>
              {subtitle}
            </div>
          )}
          {description && (
            <div class={bemClass("card", "section-1", { description: true })}>
              {description}
            </div>
          )}
        </div>
      </div>
      {hasButton && (
        <div class={bemClass("card", "section-3", { button: true })}>
          {...buttons.element}
        </div>
      )}
    </div>
  );
};
