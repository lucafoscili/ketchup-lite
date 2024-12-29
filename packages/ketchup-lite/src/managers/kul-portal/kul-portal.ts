import type { KulManager } from "../kul-manager/kul-manager";
import { KulManagerClickCb } from "../kul-manager/kul-manager-declarations";
import {
  KulPortalAnchor,
  KulPortalPlacement,
  KulPortalState,
} from "./kul-portal-declarations";

export class KulPortal {
  #MANAGER: KulManager;
  #PORTAL: HTMLDivElement;
  #STATE = new WeakMap<HTMLElement, KulPortalState>();

  constructor(kulManager: KulManager) {
    this.#MANAGER = kulManager;
    this.#PORTAL = document.createElement("div");
    this.#PORTAL.classList.add("kul-portal");
    document.body.appendChild(this.#PORTAL);
  }

  #clean = (element: HTMLElement) => {
    if (!this.isInPortal(element)) {
      return;
    }

    const { dismissCb, parent } = this.#STATE.get(element);
    this.#MANAGER.removeClickCallback(dismissCb);
    if (parent) {
      parent.appendChild(element);
    }

    this.#STATE.delete(element);
  };

  #isAnchorHTMLElement = (anchor: KulPortalAnchor): anchor is HTMLElement => {
    return (anchor as HTMLElement).tagName !== undefined;
  };

  #resetStyle = (element: HTMLElement) => {
    const { style } = element;

    style.bottom = "";
    style.display = "";
    style.left = "";
    style.right = "";
    style.top = "";
  };

  #run = (element: HTMLElement) => {
    if (!this.isInPortal(element) || !element.isConnected) {
      this.#clean(element);
      return;
    }

    this.#resetStyle(element);
    const { anchor, margin, placement } = this.#STATE.get(element);
    const { clientHeight, clientWidth, offsetHeight, offsetWidth, style } =
      element;

    style.display = "block";

    if (!this.#isAnchorHTMLElement(anchor)) {
      const { x, y } = anchor;

      style.left =
        offsetWidth > window.innerWidth - x ? `${x - offsetWidth}px` : `${x}px`;

      style.top =
        offsetHeight > window.innerHeight - y
          ? `${y - offsetHeight}px`
          : `${y}px`;

      return;
    }

    const { bottom, left, right, top } = anchor.getBoundingClientRect();

    switch (placement) {
      case "t":
      case "tl":
      case "tr":
        style.bottom = `${window.innerHeight - top + margin}px`;
        break;
      case "b":
      case "bl":
      case "br":
        style.top = `${bottom + margin}px`;
        break;
      default:
        style.top =
          clientHeight < top && window.innerHeight - bottom < clientHeight
            ? `${window.innerHeight - top + margin}px`
            : `${bottom + margin}px`;
        break;
    }

    let scrollbarWidth =
      window.innerWidth - document.documentElement.offsetWidth;
    if (scrollbarWidth > 30) scrollbarWidth = 0;

    switch (placement) {
      case "l":
      case "bl":
      case "tl":
        style.left = `${left}px`;
        break;
      case "r":
      case "br":
      case "tr":
        style.right = `${window.innerWidth - scrollbarWidth - right}px`;
        break;
      default:
        style.left =
          clientWidth < right && window.innerWidth - left < clientWidth
            ? `${window.innerWidth - scrollbarWidth - right}px`
            : `${left}px`;
        break;
    }

    requestAnimationFrame(() => this.#run(element));
  };

  //#region open
  open = (
    element: HTMLElement,
    parent: HTMLElement,
    anchor: KulPortalAnchor,
    margin: number = 0,
    placement: KulPortalPlacement = "auto",
  ) => {
    let state = this.#STATE.get(element);
    if (state) {
      if (anchor) {
        state.anchor = anchor;
      }
      if (margin) {
        state.margin = margin;
      }
      if (parent) {
        state.margin = margin;
      }
      if (placement) {
        state.placement = placement;
      }
    } else {
      const dismissCb: KulManagerClickCb = {
        cb: () => {
          this.close(element);
        },
        element,
      };

      this.#STATE.set(element, {
        anchor,
        dismissCb,
        margin,
        parent,
        placement,
      });

      this.#MANAGER.addClickCallback(dismissCb, true);
      this.#PORTAL.appendChild(element);
    }

    this.#run(element);
  };
  //#endregion

  //#region close
  close = (element: HTMLElement) => {
    this.#clean(element);
    this.#resetStyle(element);
  };
  //#endregion

  //#region isInPortal
  isInPortal = (element: HTMLElement) => {
    return this.#STATE.has(element);
  };
  //#endregion
}
