import { h } from "@stencil/core";
import { CY_ATTRIBUTES } from "src/utils/constants";
import {
  KulCanvasAdapter,
  KulCanvasAdapterJsx,
} from "../kul-canvas-declarations";

export const prepCanvasJsx = (
  getAdapter: () => KulCanvasAdapter,
): KulCanvasAdapterJsx => {
  return {
    //#region Board
    board: () => {
      const { controller, elements, handlers } = getAdapter();
      const { refs } = elements;
      const { assignRef, theme } = controller.get.manager;
      const { bemClass } = theme;
      const { onPointerDown, onPointerMove, onPointerOut, onPointerUp } =
        handlers.board;

      return (
        <canvas
          class={bemClass("canvas", "board")}
          data-cy={CY_ATTRIBUTES.canvas}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerOut={onPointerOut}
          onPointerUp={onPointerUp}
          ref={assignRef(refs, "board")}
        ></canvas>
      );
    },
    //#endregion

    //#region Image
    image: () => {
      const { controller, elements } = getAdapter();
      const { refs } = elements;
      const { compInstance, manager } = controller.get;
      const { assignRef, sanitizeProps, theme } = manager;
      const { bemClass } = theme;

      return (
        <kul-image
          class={`${bemClass("canvas", "image")} kul-fit`}
          data-cy={CY_ATTRIBUTES.image}
          {...sanitizeProps(compInstance.kulImageProps, "KulImage")}
          ref={assignRef(refs, "image")}
        ></kul-image>
      );
    },
    //#endregion

    //#region Preview
    preview: () => {
      const { controller, elements } = getAdapter();
      const { assignRef, theme } = controller.get.manager;
      const { refs } = elements;
      const { bemClass } = theme;

      return (
        <canvas
          class={bemClass("canvas", "cursor")}
          data-cy={CY_ATTRIBUTES.canvas}
          ref={assignRef(refs, "preview")}
        ></canvas>
      );
    },
    //#endregion
  };
};
