import { h, VNode } from "@stencil/core";
import { KulCanvasAdapter } from "../kul-canvas-declarations";

//#region Board
export const prepBoard = (adapter: KulCanvasAdapter): VNode => {
  const { components, handlers } = adapter;
  const { refs } = components;
  const { board } = handlers;
  const { onPointerDown, onPointerMove, onPointerOut, onPointerUp } = board;

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
  const { components, hooks } = adapter;
  const { refs } = components;
  const { get } = hooks;
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
  const { components } = adapter;
  const { refs } = components;

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
