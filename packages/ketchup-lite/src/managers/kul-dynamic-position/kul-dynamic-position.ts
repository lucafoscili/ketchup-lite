import { KUL_DROPDOWN_CLASS_VISIBLE } from '../../variables/GenericVariables';
import type { KulDom } from '../kul-manager/kul-manager-declarations';
import {
    KulDynamicPositionAnchor,
    kulDynamicPositionAnchorAttribute,
    kulDynamicPositionAttribute,
    KulDynamicPositionElement,
} from './kul-dynamic-position-declarations';
import { KulDynamicPositionPlacement } from './kul-dynamic-position-declarations';

export class KulDynamicPosition {
    container: HTMLElement;
    dom: KulDom = document.documentElement as KulDom;
    managedElements: Set<KulDynamicPositionElement>;
    constructor() {
        this.container = document.createElement('div');
        this.container.setAttribute('kul-dynamic-position', '');
        document.body.appendChild(this.container);
        this.managedElements = new Set();
    }
    anchorIsHTMLElement(
        anchor: KulDynamicPositionAnchor
    ): anchor is HTMLElement {
        return (anchor as HTMLElement).tagName !== undefined;
    }
    register(
        el: KulDynamicPositionElement,
        anchorEl: KulDynamicPositionAnchor,
        margin?: number,
        placement?: KulDynamicPositionPlacement,
        detach?: boolean
    ): void {
        if (this.isRegistered(el)) {
            this.changeAnchor(el, anchorEl);
            return;
        }
        el.setAttribute(kulDynamicPositionAttribute, '');
        if (this.anchorIsHTMLElement(anchorEl)) {
            anchorEl.setAttribute(kulDynamicPositionAnchorAttribute, '');
        }
        el.style.zIndex = `calc(var(--kul-header-zindex) + 1)`;
        const originalPath: HTMLElement[] = [];
        if (detach) {
            let currentEl: unknown = el;
            while (currentEl && currentEl !== document.body) {
                currentEl = (currentEl as HTMLElement).parentNode
                    ? (currentEl as HTMLElement).parentNode
                    : (currentEl as ShadowRoot).host;
                originalPath.push(currentEl as HTMLElement);
            }
            el.style.position = 'absolute';
            this.container.appendChild(el);
        } else {
            el.style.position = 'fixed';
        }
        el.kulDynamicPosition = {
            anchor: anchorEl,
            detach: detach ? true : false,
            originalPath: originalPath,
            margin: margin ? margin : 0,
            placement: placement ? placement : KulDynamicPositionPlacement.AUTO,
            rAF: null,
        };
        const mutObserver: MutationObserver = new MutationObserver(function (
            mutations
        ) {
            const target: Node = mutations[0].target;
            if (
                (target as HTMLElement).classList.contains(
                    KUL_DROPDOWN_CLASS_VISIBLE
                )
            ) {
                requestAnimationFrame(function () {
                    this.dom.ketchupLite.dynamicPosition.run(el);
                });
            }
        });
        mutObserver.observe(el, {
            attributes: true,
            attributeFilter: ['class'],
        });
        this.managedElements.add(el);
    }
    changeAnchor(
        el: KulDynamicPositionElement,
        anchorEl: KulDynamicPositionAnchor
    ): void {
        el.kulDynamicPosition.anchor = anchorEl;
    }
    unregister(elements: KulDynamicPositionElement[]): void {
        if (this.managedElements) {
            for (let index = 0; index < elements.length; index++) {
                this.managedElements.delete(elements[index]);
            }
        }
    }
    isRegistered(el: KulDynamicPositionElement): boolean {
        return !this.managedElements ? false : this.managedElements.has(el);
    }
    start(el: KulDynamicPositionElement): void {
        el.classList.add(KUL_DROPDOWN_CLASS_VISIBLE);
    }
    stop(el: KulDynamicPositionElement): void {
        el.classList.remove(KUL_DROPDOWN_CLASS_VISIBLE);
    }
    run(el: KulDynamicPositionElement): void {
        if (!el.isConnected) {
            this.dom.ketchupLite.dynamicPosition.managedElements.delete(el);
            cancelAnimationFrame(el.kulDynamicPosition.rAF);
            return;
        }
        if (!el.classList.contains(KUL_DROPDOWN_CLASS_VISIBLE)) {
            cancelAnimationFrame(el.kulDynamicPosition.rAF);
            return;
        }
        // Reset placement
        el.style.top = '';
        el.style.right = '';
        el.style.bottom = '';
        el.style.left = '';
        // Fixed position (usually from mouse events).
        // When anchor doesn't have the tagName property, anchor is considered as a set of coordinates.
        if (!this.anchorIsHTMLElement(el.kulDynamicPosition.anchor)) {
            const x: number = el.kulDynamicPosition.anchor.x;
            const y: number = el.kulDynamicPosition.anchor.y;
            if (
                el.offsetWidth >
                window.innerWidth - el.kulDynamicPosition.anchor.x
            ) {
                el.style.left = x - el.offsetWidth + 'px';
            } else {
                el.style.left = x + 'px';
            }
            if (
                el.offsetHeight >
                window.innerHeight - el.kulDynamicPosition.anchor.y
            ) {
                el.style.top = y - el.offsetHeight + 'px';
            } else {
                el.style.top = y + 'px';
            }
            return;
        }
        const detached: boolean = !!el.kulDynamicPosition.detach;
        const offsetH: number = el.clientHeight;
        const offsetW: number = el.clientWidth;
        const rect: DOMRect = (
            el.kulDynamicPosition.anchor as HTMLElement
        ).getBoundingClientRect();
        const top: number = detached ? window.pageYOffset + rect.top : rect.top,
            left: number = detached
                ? window.pageXOffset + rect.left
                : rect.left,
            bottom: number = detached
                ? window.pageYOffset + rect.bottom
                : rect.bottom,
            right: number = detached
                ? window.pageXOffset + rect.right
                : rect.right;
        // Vertical position
        if (
            el.kulDynamicPosition.placement ===
                KulDynamicPositionPlacement.TOP ||
            el.kulDynamicPosition.placement ===
                KulDynamicPositionPlacement.TOP_LEFT ||
            el.kulDynamicPosition.placement ===
                KulDynamicPositionPlacement.TOP_RIGHT
        ) {
            el.style.bottom = `${
                window.innerHeight - top + el.kulDynamicPosition.margin
            }px`;
        } else if (
            el.kulDynamicPosition.placement ===
                KulDynamicPositionPlacement.BOTTOM ||
            el.kulDynamicPosition.placement ===
                KulDynamicPositionPlacement.BOTTOM_LEFT ||
            el.kulDynamicPosition.placement ===
                KulDynamicPositionPlacement.BOTTOM_RIGHT
        ) {
            el.style.top = `${bottom + el.kulDynamicPosition.margin}px`;
        } else {
            if (
                offsetH < rect.top &&
                window.innerHeight - rect.bottom < offsetH
            ) {
                el.style.bottom = `${
                    window.innerHeight - top + el.kulDynamicPosition.margin
                }px`;
            } else {
                el.style.top = `${bottom + el.kulDynamicPosition.margin}px`;
            }
        }
        // Horizontal position
        if (
            el.kulDynamicPosition.placement ===
                KulDynamicPositionPlacement.LEFT ||
            el.kulDynamicPosition.placement ===
                KulDynamicPositionPlacement.BOTTOM_LEFT ||
            el.kulDynamicPosition.placement ===
                KulDynamicPositionPlacement.TOP_LEFT
        ) {
            el.style.left = `${left}px`;
        } else if (
            el.kulDynamicPosition.placement ===
                KulDynamicPositionPlacement.RIGHT ||
            el.kulDynamicPosition.placement ===
                KulDynamicPositionPlacement.BOTTOM_RIGHT ||
            el.kulDynamicPosition.placement ===
                KulDynamicPositionPlacement.TOP_RIGHT
        ) {
            let scrollbarWidth: number =
                window.innerWidth - document.documentElement.offsetWidth;
            if (scrollbarWidth > 30) {
                scrollbarWidth = 0;
            }
            el.style.right = `${window.innerWidth - scrollbarWidth - right}px`;
        } else {
            if (
                offsetW < rect.right &&
                window.innerWidth - rect.left < offsetW
            ) {
                let scrollbarWidth: number =
                    window.innerWidth - document.documentElement.offsetWidth;
                if (scrollbarWidth > 30) {
                    scrollbarWidth = 0;
                }
                el.style.right = `${
                    window.innerWidth - scrollbarWidth - right
                }px`;
            } else {
                el.style.left = `${left}px`;
            }
        }
        // Recursive
        if (!el.kulDynamicPosition.detach) {
            el.kulDynamicPosition.rAF = requestAnimationFrame(function () {
                this.dom.ketchupLite.dynamicPosition.run(el);
            });
        } else {
            cancelAnimationFrame(el.kulDynamicPosition.rAF);
            return;
        }
    }
}
