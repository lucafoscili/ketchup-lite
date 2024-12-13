import { h, VNode } from "@stencil/core";

import { KulCanvasAdapter } from "src/components/kul-canvas/kul-canvas-declarations";

//#region Board
export const prepBoard = (adapter: KulCanvasAdapter): VNode => {
  const { elements, handlers } = adapter;
  const { refs } = elements;
  const { onPointerDown, onPointerMove, onPointerOut, onPointerUp } = handlers;

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
};
//#endregion

//#region Image
export const prepImage = (adapter: KulCanvasAdapter): VNode => {
  const { elements, state } = adapter;
  const { refs } = elements;
  const { get } = state;
  const { comp } = get;

  return (
    <kul-image
      class="canvas__image kul-fit"
      {...comp.kulImageProps}
      ref={(el) => {
        if (el) {
          refs.image = el;
        }
      }}
    ></kul-image>
  );
};
//#endregion

//#region Preview
export const prepPreview = (adapter: KulCanvasAdapter): VNode => {
  const { elements } = adapter;
  const { refs } = elements;

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
};
//#endregion
