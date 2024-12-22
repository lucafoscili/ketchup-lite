import { h, VNode } from "@stencil/core";
import type { KulManager } from "src/managers/kul-manager/kul-manager";
import {
  GenericObject,
  KulComponent,
  KulComponentName,
  KulComponentRootElement,
  KulDataCyAttributes,
  KulEventPayload,
  KulEventType,
} from "../../../types/GenericTypes";
import {
  KulDataCell,
  KulDataDataset,
  KulDataNode,
  KulDataShapeCallback,
  KulDataShapeEventDispatcher,
  KulDataShapes,
  KulDataShapesMap,
} from "../kul-data-declarations";
import { nodeExists } from "./node";

//#region cellDecorateShapes
export const cellDecorateShapes = <
  C extends KulComponentName,
  S extends KulDataShapes | "text",
>(
  kulManager: KulManager,
  component: C,
  shape: S,
  items: Partial<KulDataCell<S>>[],
  eventDispatcher: KulDataShapeEventDispatcher,
  defaultProps?: Partial<KulDataCell<S>>[],
  defaultCb?: S extends "text" ? never : KulDataShapeCallback<C, S>,
) => {
  const { sanitizeProps } = kulManager;
  const r: {
    element: VNode[];
    ref: Array<HTMLDivElement | KulComponentRootElement<C>>;
  } = { element: [], ref: [] };

  switch (shape) {
    case "number":
    case "text":
      for (let index = 0; items && index < items.length; index++) {
        const props = items[index].value;
        r.element.push(
          <div
            id={`${shape}${index}`}
            ref={(el) => {
              if (el) {
                r.ref.push(el);
              }
            }}
          >
            {props}
          </div>,
        );
      }
      return r;

    default:
      for (let index = 0; items && index < items.length; index++) {
        const props = items[index];
        const toSpread = {};
        if (defaultProps?.[index]) {
          decorateSpreader(
            toSpread,
            defaultProps[index] as Partial<KulDataCell<KulDataShapes>>,
          );
        }
        decorateSpreader(
          toSpread,
          props as Partial<KulDataCell<KulDataShapes>>,
        );

        const TagName = "kul-" + shape;
        const eventHandler = {
          ["onKul-" + shape + "-event"]: (
            e: CustomEvent<KulEventPayload<C, KulEventType<KulComponent<C>>>>,
          ) => {
            if (defaultCb) {
              defaultCb(e);
            }
            eventDispatcher(e);
          },
        };

        r.element.push(
          <TagName
            data-component={component}
            data-cy={KulDataCyAttributes.SHAPE}
            id={`${shape}${index}`}
            ref={(el: KulComponentRootElement<C>) => {
              if (el) {
                r.ref.push(el);
              }
            }}
            {...eventHandler}
            {...sanitizeProps(toSpread, component)}
          ></TagName>,
        );
      }
      break;
  }

  return r;
};
//#endregion

//#region cellExists
export const cellExists = (node: KulDataNode) => {
  return !!(node && node.cells && Object.keys(node.cells).length);
};
//#endregion

//#region cellGetShape
export const cellGetShape = <T extends KulDataShapes>(
  cell: KulDataCell<T>,
  deepCopy: boolean,
) => {
  if (!deepCopy) {
    return cell;
  }
  const prefix = "kul";
  const shapeProps: Partial<KulDataCell<T>> = {};
  for (const prop in cell) {
    switch (prop) {
      case "htmlProps":
        Object.assign(shapeProps, cell[prop]);
        break;
      case "shape":
        break;
      default:
        if (prop.indexOf(prefix) === 0) {
          shapeProps[prop] = cell[prop];
        } else {
          const prefixedProp =
            prefix + prop.charAt(0).toUpperCase() + prop.slice(1);
          if (!shapeProps[prefixedProp]) {
            shapeProps[prefixedProp] = cell[prop];
          }
        }
        break;
    }
  }
  return shapeProps;
};
//#endregion

//#region cellGetAllShapes
export const cellGetAllShapes = (dataset: KulDataDataset, deepCopy = true) => {
  if (!nodeExists(dataset)) {
    return;
  }

  const shapes: KulDataShapesMap = {
    badge: [],
    button: [],
    card: [],
    chart: [],
    chat: [],
    chip: [],
    code: [],
    image: [],
    number: [],
    toggle: [],
    text: [],
    upload: [],
  };
  const nodes = dataset.nodes;

  const browseCells = (node: KulDataNode) => {
    if (!cellExists(node)) {
      return;
    }
    const cells = node.cells;
    for (const key in cells) {
      if (Object.prototype.hasOwnProperty.call(cells, key)) {
        const cell = cells[key];
        const extracted = cellGetShape(cell, deepCopy);
        switch (cell.shape) {
          case "badge":
            shapes.badge.push(extracted as KulDataCell<"badge">);
            break;
          case "button":
            shapes.button.push(extracted as KulDataCell<"button">);
            break;
          case "card":
            shapes.card.push(extracted as KulDataCell<"card">);
            break;
          case "chart":
            shapes.chart.push(extracted as KulDataCell<"chart">);
            break;
          case "chat":
            shapes.chat.push(extracted as KulDataCell<"chat">);
            break;
          case "chip":
            shapes.chip.push(extracted as KulDataCell<"chip">);
            break;
          case "code":
            shapes.code.push(extracted as KulDataCell<"code">);
            break;
          case "image":
            shapes.image.push(extracted as KulDataCell<"image">);
            break;
          case "toggle":
            shapes.toggle.push(extracted as KulDataCell<"toggle">);
            break;
          case "number":
            shapes.number.push(cell as KulDataCell<"number">);
            break;
          case "upload":
            shapes.upload.push(extracted as KulDataCell<"upload">);
            break;
          case "text":
          default:
            shapes.text.push(cell);
            break;
        }
      }
    }
  };
  const recursive = (node: KulDataNode) => {
    for (
      let index = 0;
      node.children && index < node.children.length;
      index++
    ) {
      recursive(node.children[index]);
    }
  };
  for (let index = 0; index < nodes.length; index++) {
    const node = nodes[index];
    browseCells(node);
    recursive(node);
  }
  return shapes;
};
//#endregion

//#region cellStringify
export const cellStringify = (value: KulDataCell<KulDataShapes>["value"]) => {
  if (value === null || value === undefined) {
    return String(value).valueOf();
  } else if (value instanceof Date) {
    return value.toISOString();
  } else if (typeof value === "object") {
    try {
      return JSON.stringify(value, null, 2);
    } catch (error) {
      console.error("Failed to stringify object:", error);
      return "[object Object]";
    }
  } else {
    return String(value).valueOf();
  }
};
//#endregion

const decorateSpreader = (
  toSpread: GenericObject,
  props: Partial<KulDataCell<KulDataShapes>> & {
    htmlProps?: Record<string, any>;
  },
) => {
  const clean = () => {
    if (toSpread["value"] && !toSpread["kulValue"]) {
      toSpread["kulValue"] = toSpread["value"];
    } else if (toSpread["kulValue"] && !toSpread["value"]) {
      toSpread["value"] = toSpread["kulValue"];
    }
    delete toSpread["htmlProps"];
    delete toSpread["shape"];
    delete toSpread["value"];
  };
  if (props.htmlProps) {
    for (const key in props.htmlProps) {
      const prop = props.htmlProps[key];
      if (key === "className") {
        toSpread["class"] = prop;
      } else {
        toSpread[key] = prop;
      }
      if (key === "dataset") {
        for (const k in prop) {
          toSpread[`data-${k}`] = prop[k];
        }
      }
    }
  }
  for (const key in props) {
    const prop = props[key];
    toSpread[key] = prop;
  }

  clean();
};
