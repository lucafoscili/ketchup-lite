import { h } from "@stencil/core";
import { kulManagerSingleton } from "src";
import {
  KulCanvasAdapter,
  KulCanvasAdapterJsx,
} from "../kul-canvas-declarations";

export const prepCanvasJsx = (
  getAdapter: () => KulCanvasAdapter,
): KulCanvasAdapterJsx => {
  const { assignRef } = kulManagerSingleton;

  return {
    //#region Board
    board: () => {
      const { elements, handlers } = getAdapter();
      const { refs } = elements;
      const { onPointerDown, onPointerMove, onPointerOut, onPointerUp } =
        handlers.board;

      return (
        <canvas
          class="canvas__board"
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
      const { compInstance } = controller.get;

      return (
        <kul-image
          class="canvas__image kul-fit"
          {...compInstance.kulImageProps}
          ref={assignRef(refs, "image")}
        ></kul-image>
      );
    },
    //#endregion

    //#region Preview
    preview: () => {
      const { elements } = getAdapter();
      const { refs } = elements;

      return (
        <canvas
          class="canvas__cursor"
          ref={assignRef(refs, "preview")}
        ></canvas>
      );
    },
    //#endregion
  };
};
