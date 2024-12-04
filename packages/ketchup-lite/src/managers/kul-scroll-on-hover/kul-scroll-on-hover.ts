import type { KulDom } from "../kul-manager/kul-manager-declarations";
import {
  KulScrollOnHoverElement,
  KulScrollOnHoverPercentages,
  ScrollOnHoverDirection,
} from "./kul-scroll-on-hover-declarations";

export class KulScrollOnHover {
  container: HTMLElement;
  delay: number;
  managedElements: Set<KulScrollOnHoverElement>;
  step: number;
  #arrowsContainer: HTMLElement;
  #DOM: KulDom = document.documentElement as KulDom;
  #leftArrows: HTMLElement[];
  #rightArrows: HTMLElement[];
  #scrollEvent: (event: Event) => void;
  #mousemoveEvent: (event: MouseEvent) => Promise<void>;
  #mouseleaveEvent: (event: MouseEvent) => Promise<void>;
  #rAF: number;
  #timeout: ReturnType<typeof setTimeout>;
  constructor(delay?: number, step?: number) {
    this.delay = delay ? delay : 500;
    this.managedElements = new Set();
    this.step = step ? step : 50;
    this.#mouseleaveEvent = (event: MouseEvent) =>
      this.stop(event.target as KulScrollOnHoverElement);
    this.#mousemoveEvent = (event: MouseEvent) => this.start(event);
    this.#rAF = null;
    this.#scrollEvent = (event: Event) =>
      this.updateChildren(event.target as KulScrollOnHoverElement);
    this.#timeout = null;
  }
  #initArrows() {
    this.#arrowsContainer = document.createElement("div");
    this.#leftArrows = [];
    this.#rightArrows = [];
    this.#arrowsContainer.id = "kul-scrolling-arrows";
    for (let index = 1; index < 4; index++) {
      const arrow: HTMLElement = document.createElement("div");
      arrow.setAttribute(
        "class",
        "kul-left-scrolling-arrow kul-arrow-" + index,
      );
      this.#leftArrows.push(arrow);
    }
    for (let index = 1; index < 4; index++) {
      const arrow: HTMLElement = document.createElement("div");
      arrow.setAttribute(
        "class",
        "kul-right-scrolling-arrow kul-arrow-" + index,
      );
      this.#rightArrows.push(arrow);
    }
    this.#arrowsContainer.append(
      this.#leftArrows[2],
      this.#leftArrows[1],
      this.#leftArrows[0],
      this.#rightArrows[0],
      this.#rightArrows[1],
      this.#rightArrows[2],
    );
    this.container = document.createElement("div");
    this.container.setAttribute("kul-scroll-on-hover", "");
    this.container.appendChild(this.#arrowsContainer);
    document.body.appendChild(this.container);
  }
  register(
    el: KulScrollOnHoverElement,
    vertical?: boolean,
    percentages?: KulScrollOnHoverPercentages,
    step?: number,
  ): void {
    if (!this.#arrowsContainer) {
      this.#initArrows();
    }
    el.style.overflowX = "auto";
    el.scrollOnHover = {
      active: false,
      children: el.querySelectorAll(".hover-scrolling-child"),
      percentages: percentages ? percentages : { back: 0.1, forward: 0.9 },
      rect: null,
      step: step,
      vertical: vertical || null,
      x: 0,
      y: 0,
    };
    if (el.scrollOnHover.children) {
      el.addEventListener("scroll", this.#scrollEvent);
    }
    el.addEventListener("mousemove", this.#mousemoveEvent);
    el.addEventListener("mouseleave", this.#mouseleaveEvent);
    this.managedElements.add(el);
  }
  unregister(el: KulScrollOnHoverElement): void {
    el.removeEventListener("scroll", this.#scrollEvent);
    el.removeEventListener("mousemove", this.#mousemoveEvent);
    el.removeEventListener("mouseleave", this.#mouseleaveEvent);
    if (this.managedElements) {
      this.managedElements.delete(el);
    }
  }
  isRegistered(el: KulScrollOnHoverElement): boolean {
    return !this.managedElements ? false : this.managedElements.has(el);
  }
  async start(event: MouseEvent): Promise<void> {
    const el: KulScrollOnHoverElement =
      event.currentTarget as KulScrollOnHoverElement;
    el.scrollOnHover.rect = el.getBoundingClientRect();
    el.scrollOnHover.x = event.clientX;
    el.scrollOnHover.y = event.clientY;
    this.#arrowsContainer.style.left = event.clientX + "px";
    this.#arrowsContainer.style.top = event.clientY + "px";
    if (el.scrollOnHover.active || this.#timeout) {
      return;
    }
    let trueHeight: number = el.clientHeight;
    if (trueHeight === 0) {
      trueHeight = el.offsetHeight;
    }
    let trueWidth: number = el.clientWidth;
    if (trueWidth === 0) {
      trueWidth = el.offsetWidth;
    }
    if (el.scrollWidth > trueWidth + 10) {
      if (trueWidth !== 0 && !el.scrollOnHover.active) {
        const percRight: number =
          trueWidth - trueWidth * el.scrollOnHover.percentages.back;
        const percLeft: number =
          trueWidth - trueWidth * el.scrollOnHover.percentages.forward;
        const elOffset: number =
          el.scrollOnHover.x - el.scrollOnHover.rect.left;
        const maxScrollLeft: number = el.scrollWidth - trueWidth;
        const direction: ScrollOnHoverDirection =
          elOffset < percLeft && el.scrollLeft !== 0
            ? ScrollOnHoverDirection.LEFT
            : elOffset > percRight && el.scrollLeft !== maxScrollLeft
              ? ScrollOnHoverDirection.RIGHT
              : null;
        if (direction) {
          for (let i = 0; i < 3; i++) {
            if (direction === ScrollOnHoverDirection.LEFT) {
              this.#leftArrows[i].classList.add("kul-activated");
            } else {
              this.#rightArrows[i].classList.add("kul-activated");
            }
          }
          const dom = this.#DOM;
          this.#timeout = setTimeout(() => {
            el.scrollOnHover.active = true;
            this.#rAF = requestAnimationFrame(function () {
              dom.ketchupLite.scrollOnHover.run(
                el,
                maxScrollLeft,
                percRight,
                percLeft,
                direction,
              );
            });
          }, this.delay);
        }
      }
    }
    if (el.scrollOnHover.vertical && el.scrollHeight > trueHeight + 10) {
      if (trueHeight !== 0 && !el.scrollOnHover.active) {
        const percBottom: number =
          trueHeight - trueHeight * el.scrollOnHover.percentages.back;
        const percTop: number =
          trueHeight - trueHeight * el.scrollOnHover.percentages.forward;
        const elOffset: number = el.scrollOnHover.y - el.scrollOnHover.rect.top;
        const maxScrollTop: number = el.scrollHeight - trueHeight;
        const direction: ScrollOnHoverDirection =
          elOffset < percTop && el.scrollTop !== 0
            ? ScrollOnHoverDirection.TOP
            : elOffset > percBottom && el.scrollTop !== maxScrollTop
              ? ScrollOnHoverDirection.BOTTOM
              : null;
        if (direction) {
          const dom = this.#DOM;
          this.#timeout = setTimeout(() => {
            el.scrollOnHover.active = true;
            this.#rAF = requestAnimationFrame(function () {
              dom.ketchupLite.scrollOnHover.run(
                el,
                maxScrollTop,
                percBottom,
                percTop,
                direction,
              );
            });
          }, this.delay);
        }
      }
    }
  }
  async stop(el: KulScrollOnHoverElement): Promise<void> {
    el.scrollOnHover.active = false;
    cancelAnimationFrame(this.#rAF);
    clearTimeout(this.#timeout);
    this.#timeout = null;
    for (let i = 0; i < this.#leftArrows.length; i++) {
      this.#leftArrows[i].classList.remove("kul-activated");
      this.#leftArrows[i].classList.remove("kul-animated");
    }
    for (let i = 0; i < this.#rightArrows.length; i++) {
      this.#rightArrows[i].classList.remove("kul-activated");
      this.#rightArrows[i].classList.remove("kul-animated");
    }
  }
  run(
    el: KulScrollOnHoverElement,
    maxScrollLeft: number,
    percForward: number,
    percBack: number,
    direction: ScrollOnHoverDirection,
  ): void {
    if (!el.scrollOnHover.active) {
      this.stop(el);
      return;
    }
    let offset: number = 0;
    switch (direction) {
      case ScrollOnHoverDirection.BOTTOM:
      case ScrollOnHoverDirection.TOP: {
        offset = el.scrollOnHover.y - el.scrollOnHover.rect.top;
        if (offset > percBack && offset < percForward) {
          this.stop(el);
          return;
        }
        break;
      }
      case ScrollOnHoverDirection.LEFT:
      case ScrollOnHoverDirection.RIGHT: {
        offset = el.scrollOnHover.x - el.scrollOnHover.rect.left;
        if (offset > percBack && offset < percForward) {
          this.stop(el);
          return;
        }
        break;
      }
    }
    if (direction === ScrollOnHoverDirection.RIGHT && percForward > offset) {
      this.stop(el);
      return;
    }
    if (direction === ScrollOnHoverDirection.LEFT && percBack < offset) {
      this.stop(el);
      return;
    }
    if (direction === ScrollOnHoverDirection.TOP && percBack < offset) {
      this.stop(el);
      return;
    }
    if (direction === ScrollOnHoverDirection.BOTTOM && percForward > offset) {
      this.stop(el);
      return;
    }
    if (el.scrollOnHover.children) {
      this.updateChildren(el);
    }
    let arrow: HTMLElement[];
    switch (direction) {
      case ScrollOnHoverDirection.BOTTOM: {
        arrow = [];
        if (el.scrollTop === maxScrollLeft) {
          this.stop(el);
          return;
        }
        el.scrollTop += el.scrollOnHover.step
          ? el.scrollOnHover.step
          : this.step;
        break;
      }
      case ScrollOnHoverDirection.LEFT: {
        arrow = this.#leftArrows;
        if (el.scrollLeft === 0) {
          this.stop(el);
          return;
        }
        el.scrollLeft -= el.scrollOnHover.step
          ? el.scrollOnHover.step
          : this.step;
        break;
      }
      case ScrollOnHoverDirection.RIGHT: {
        arrow = this.#rightArrows;
        if (el.scrollLeft === maxScrollLeft) {
          this.stop(el);
          return;
        }
        el.scrollLeft += el.scrollOnHover.step
          ? el.scrollOnHover.step
          : this.step;
        break;
      }
      case ScrollOnHoverDirection.TOP: {
        arrow = [];
        if (el.scrollTop === 0) {
          this.stop(el);
          return;
        }
        el.scrollTop -= el.scrollOnHover.step
          ? el.scrollOnHover.step
          : this.step;
        break;
      }
    }

    for (let i = 0; i < arrow.length; i++) {
      arrow[i].classList.add("kul-animated");
    }

    const dom = this.#DOM;
    this.#rAF = requestAnimationFrame(function () {
      dom.ketchupLite.scrollOnHover.run(
        el,
        maxScrollLeft,
        percForward,
        percBack,
        direction,
      );
    });
  }
  updateChildren(el: KulScrollOnHoverElement): void {
    for (let i = 0; i < el.scrollOnHover.children.length; i++) {
      el.scrollOnHover.children[i].scrollLeft = el.scrollLeft;
    }
  }
}
