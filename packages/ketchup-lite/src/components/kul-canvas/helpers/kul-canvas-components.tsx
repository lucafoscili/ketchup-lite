import { h, VNode } from "@stencil/core";

import {
  KulCanvasAdapter,
  KulCanvasAdapterComponents,
} from "../kul-canvas-declarations";
import { addPoint, draw } from "./kul-canvas-helpers";

export const createComponents: (
  adapter: KulCanvasAdapter,
) => KulCanvasAdapterComponents = (adapter) => {
  return {
    jsx: {
      board: prepBoard(adapter),
      image: prepImage(adapter),
      preview: prepPreview(adapter),
    },
    refs: {
      board: null,
      image: null,
      preview: null,
    },
  };
};

//#region Board
export const prepBoard = (adapter: KulCanvasAdapter): VNode => {
  const handlers = {
    onPointerDown: (e: PointerEvent) => {
      e.preventDefault();

      const { components, set } = adapter;
      const { refs } = components;

      refs.board.setPointerCapture(e.pointerId);
      requestAnimationFrame(() => {
        set.state.isPainting(true);
        set.state.points([]);
        addPoint(adapter, e);
      });
    },
    onPointerMove: (e: PointerEvent) => {
      e.preventDefault();

      const { isPainting } = adapter.get.state;

      if (!isPainting()) {
        draw.brush.cursor(adapter, e);
        return;
      }

      addPoint(adapter, e);
      adapter.actions.preview.redraw();
    },
    onPointerOut: (e: PointerEvent) => {
      const { isPainting } = adapter.get.state;
      const { endCapture } = adapter.actions;

      if (isPainting()) {
        endCapture(e);
      }
    },
    onPointerUp: (e: PointerEvent) => {
      const { endCapture } = adapter.actions;

      endCapture(e);
    },
  };
  return (
    <canvas
      class="canvas__board"
      {...handlers}
      ref={(el) => {
        if (el) {
          adapter.components.refs.board = el;
        }
      }}
    ></canvas>
  );
};
//#endregion

//#region Image
export const prepImage = (adapter: KulCanvasAdapter): VNode => {
  const { get } = adapter;
  const { canvas } = get;

  return (
    <kul-image
      class="canvas__image kul-fit"
      {...canvas.kulImageProps}
      ref={(el) => {
        if (el) {
          adapter.components.refs.image = el;
        }
      }}
    ></kul-image>
  );
};
//#endregion

//#region Preview
export const prepPreview = (adapter: KulCanvasAdapter): VNode => {
  return (
    <canvas
      class="canvas__cursor"
      ref={(el) => {
        if (el) {
          adapter.components.refs.preview = el;
        }
      }}
    ></canvas>
  );
};
//#endregion
