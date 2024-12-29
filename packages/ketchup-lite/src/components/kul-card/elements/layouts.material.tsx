import { h, VNode } from "@stencil/core";
import { CY_ATTRIBUTES, KUL_ATTRIBUTES } from "src/utils/constants";
import { KulCardAdapter } from "../kul-card-declarations";

//#region Material layout
export const prepMaterial = (getAdapter: () => KulCardAdapter): VNode => {
  const { compInstance, defaults, manager, shapes } =
    getAdapter().controller.get;
  const { material } = defaults;
  const { data, theme } = manager;
  const { decorate } = data.cell.shapes;
  const { bemClass, ripple } = theme;

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
    <div class={bemClass("card-material", null, { "has-action": true })}>
      <div
        data-cy={CY_ATTRIBUTES.ripple}
        data-kul={KUL_ATTRIBUTES.rippleSurface}
        onPointerDown={(e) => {
          ripple.trigger(e as PointerEvent, e.currentTarget as HTMLElement);
        }}
      >
        {hasImage && (
          <div
            class={bemClass("card-material", "cover-section", { image: true })}
          >
            {images.element[0]}
          </div>
        )}
        <div class={bemClass("card-material", "text-section")}>
          {title && (
            <div class={bemClass("text-content", "title")}>{title}</div>
          )}
          {subtitle && (
            <div class={bemClass("text-content", "subtitle")}>{subtitle}</div>
          )}
          {description && (
            <div class={bemClass("text-content", "description")}>
              {description}
            </div>
          )}
        </div>
      </div>
      {hasButton && (
        <div
          class={bemClass("card-material", "actions-section", { button: true })}
        >
          {...buttons.element}
        </div>
      )}
    </div>
  );
};
