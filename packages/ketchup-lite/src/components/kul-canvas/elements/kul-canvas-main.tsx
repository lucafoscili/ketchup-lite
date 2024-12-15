import { h, VNode } from "@stencil/core";

import { KulCanvasAdapter } from "src/components/kul-canvas/kul-canvas-declarations";

export const prepCanvasElements = (adapter: KulCanvasAdapter) => {
  const { elements, handlers, state } = adapter;
  const { refs } = elements;
  const { get } = state;
  const { compInstance } = get;

  return {
    //#region Board
    board: (): VNode => {
      const { onPointerDown, onPointerMove, onPointerOut, onPointerUp } =
        handlers.board;

      return (
        <canvas
          class="canvas__board"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerOut={onPointerOut}
          onPointerUp={onPointerUp}
          ref={(el) => {
            if (el) {
              refs.board = el;
            }
          }}
        ></canvas>
      );
    },
    //#endregion

    //#region Image
    image: (): VNode => {
      return (
        <kul-image
          class="canvas__image kul-fit"
          {...compInstance.kulImageProps}
          ref={(el) => {
            if (el) {
              refs.image = el;
            }
          }}
        ></kul-image>
      );
    },
    //#endregion

    //#region Preview
    preview: (): VNode => {
      return (
        <canvas
          class="canvas__cursor"
          ref={(el) => {
            if (el) {
              refs.preview = el;
            }
          }}
        ></canvas>
      );
    },
    //#endregion
  };
};
