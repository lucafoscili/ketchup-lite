/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { KulImagePropsInterface } from "./components/kul-image/kul-image-declarations";
import { GenericObject, KulEventPayload } from "./types/GenericTypes";
import { KulDebugComponentInfo } from "./managers/kul-debug/kul-debug-declarations";
import { KulButtonEventPayload, KulButtonStates, KulButtonStyling } from "./components/kul-button/kul-button-declarations";
import { KulDataDataset, KulDataShapesMap } from "./managers/kul-data/kul-data-declarations";
import { KulCardFamily } from "./components/kul-card/kul-card-declarations";
import { KulBadgePropsInterface } from "./components/kul-badge/kul-badge-declarations";
export { KulImagePropsInterface } from "./components/kul-image/kul-image-declarations";
export { GenericObject, KulEventPayload } from "./types/GenericTypes";
export { KulDebugComponentInfo } from "./managers/kul-debug/kul-debug-declarations";
export { KulButtonEventPayload, KulButtonStates, KulButtonStyling } from "./components/kul-button/kul-button-declarations";
export { KulDataDataset, KulDataShapesMap } from "./managers/kul-data/kul-data-declarations";
export { KulCardFamily } from "./components/kul-card/kul-card-declarations";
export { KulBadgePropsInterface } from "./components/kul-badge/kul-badge-declarations";
export namespace Components {
    interface KulBadge {
        /**
          * Fetches debug information of the component's current state.
          * @returns A promise that resolves with the debug information object.
         */
        "getDebugInfo": () => Promise<KulDebugComponentInfo>;
        /**
          * Used to retrieve component's props values.
          * @param descriptions - When provided and true, the result will be the list of props with their description.
          * @returns List of props as object, each key will be a prop.
         */
        "getProps": (descriptions?: boolean) => Promise<GenericObject>;
        /**
          * The props of the image displayed inside the badge.
          * @default null
         */
        "kulImageProps": KulImagePropsInterface;
        /**
          * The text displayed inside the badge.
          * @default ""
         */
        "kulLabel": string;
        /**
          * Custom style of the component.
          * @default ""
         */
        "kulStyle": string;
        /**
          * This method is used to trigger a new render of the component.
         */
        "refresh": () => Promise<void>;
        /**
          * Sets the props to the component.
          * @param props - Object containing props that will be set to the component.
         */
        "setProps": (props: GenericObject) => Promise<void>;
    }
    interface KulButton {
        /**
          * Fetches debug information of the component's current state.
          * @returns A promise that resolves with the debug information object.
         */
        "getDebugInfo": () => Promise<KulDebugComponentInfo>;
        /**
          * Used to retrieve component's properties and descriptions.
          * @param descriptions - When true, includes descriptions for each property.
          * @returns Promise resolved with an object containing the component's properties.
         */
        "getProps": (descriptions?: boolean) => Promise<GenericObject>;
        /**
          * Used to retrieve component's current state.
          * @returns Promise resolved with the current state of the component.
         */
        "getValue": () => Promise<KulButtonStates>;
        /**
          * Defaults at false. When set to true, the component is disabled.
          * @default false
         */
        "kulDisabled": boolean;
        /**
          * When set, the button will show this icon.
          * @default ""
         */
        "kulIcon": string;
        /**
          * When set, the icon button off state will show this icon. Otherwise, an outlined version of the icon prop will be displayed.
          * @default ""
         */
        "kulIconOff": string;
        /**
          * When set, the button will show this text.
          * @default ""
         */
        "kulLabel": string;
        /**
          * When set to true, the pointerdown event will trigger a ripple effect.
          * @default false
         */
        "kulRipple": boolean;
        /**
          * When set to true, the button show a spinner received in slot.
          * @default false
         */
        "kulShowSpinner": boolean;
        /**
          * Custom style of the component.
          * @default ""
         */
        "kulStyle": string;
        /**
          * Defines the style of the button. This property controls the visual appearance of the button.
          * @default "raised"
          * @see KulButtonStyling - For a list of available styles.
         */
        "kulStyling": KulButtonStyling;
        /**
          * When set to true, the icon button will be toggable on/off.
          * @default false
         */
        "kulToggable": boolean;
        /**
          * When set, the icon will be shown after the text.
          * @default false
         */
        "kulTrailingIcon": boolean;
        /**
          * Sets the type of the button.
          * @default "button"
         */
        "kulType": | 'button'
        | 'reset'
        | 'submit';
        /**
          * When set to true, the icon button state will be on.
          * @default false
         */
        "kulValue": boolean;
        /**
          * This method is used to trigger a new render of the component.
         */
        "refresh": () => Promise<void>;
        /**
          * Sets the props to the component.
          * @param props - Object containing props that will be set to the component.
         */
        "setProps": (props: GenericObject) => Promise<void>;
        /**
          * Sets the component's state.
          * @param value - The new state to be set on the component.
          * @returns
         */
        "setValue": (value: KulButtonStates) => Promise<void>;
    }
    interface KulCard {
        /**
          * Fetches debug information of the component's current state.
          * @returns A promise that resolves with the debug information object.
         */
        "getDebugInfo": () => Promise<KulDebugComponentInfo>;
        /**
          * Used to retrieve component's props values.
          * @param descriptions - When provided and true, the result will be the list of props with their description.
          * @returns List of props as object, each key will be a prop.
         */
        "getProps": (descriptions?: boolean) => Promise<GenericObject>;
        /**
          * Used to retrieve component's shapes.
          * @returns Map of shapes.
         */
        "getShapes": () => Promise<KulDataShapesMap>;
        /**
          * The actual data of the card.
          * @default null
         */
        "kulData": KulDataDataset;
        /**
          * Sets the type of the card.
          * @default KulCardFamily.STANDARD
         */
        "kulLayoutFamily": KulCardFamily;
        /**
          * Sets the number of the layout.
          * @default 1
         */
        "kulLayoutNumber": number;
        /**
          * The width of the card, defaults to 100%. Accepts any valid CSS format (px, %, vw, etc.).
          * @default "100%"
         */
        "kulSizeX": string;
        /**
          * The height of the card, defaults to 100%. Accepts any valid CSS format (px, %, vh, etc.).
          * @default "100%"
         */
        "kulSizeY": string;
        /**
          * Custom style of the component.
          * @default ""
         */
        "kulStyle": string;
        /**
          * This method is used to trigger a new render of the component.
         */
        "refresh": () => Promise<void>;
        /**
          * Sets the props to the component.
          * @param props - Object containing props that will be set to the component.
         */
        "setProps": (props: GenericObject) => Promise<void>;
    }
    interface KulImage {
        /**
          * Fetches debug information of the component's current state.
          * @returns A promise that resolves with the debug information object.
         */
        "getDebugInfo": () => Promise<KulDebugComponentInfo>;
        /**
          * Used to retrieve component's props values.
          * @param descriptions - When provided and true, the result will be the list of props with their description.
          * @returns List of props as object, each key will be a prop.
         */
        "getProps": (descriptions?: boolean) => Promise<GenericObject>;
        /**
          * This property is used to attach a badge to the component.
          * @default null
         */
        "kulBadgeProps": KulBadgePropsInterface;
        /**
          * Specifies the color of the icon using a CSS variable. This property is used to set the color of the component's icon.
          * @default KulThemeColorValues.ICON
          * @see KulThemeColorValues - For a list of available CSS variable names for color.
         */
        "kulColor": string;
        /**
          * Controls the display of a loading indicator. When enabled, a spinner is shown until the image finishes loading. This property is not compatible with SVG images.
          * @default false
         */
        "kulShowSpinner": boolean;
        /**
          * Sets the width of the icon. This property accepts any valid CSS measurement value (e.g., px, %, vh, etc.) and defaults to 100%.
          * @default '100%'
         */
        "kulSizeX": string;
        /**
          * Sets the height of the icon. This property accepts any valid CSS measurement value (e.g., px, %, vh, etc.) and defaults to 100%.
          * @default '100%'
         */
        "kulSizeY": string;
        /**
          * Customizes the style of the component. This property allows you to apply a custom CSS style to the component.
          * @default ""
         */
        "kulStyle": string;
        /**
          * Defines the source URL of the image. This property is used to set the image resource that the component should display.
          * @default ""
         */
        "kulValue": string;
        /**
          * This method is used to trigger a new render of the component.
         */
        "refresh": () => Promise<void>;
        /**
          * Sets the props to the component.
          * @param props - Object containing props that will be set to the component.
         */
        "setProps": (props: GenericObject) => Promise<void>;
    }
    interface KulShowcase {
        /**
          * Fetches debug information of the component's current state.
          * @returns A promise that resolves with the debug information object.
         */
        "getDebugInfo": () => Promise<KulDebugComponentInfo>;
        /**
          * Used to retrieve component's props values.
          * @param descriptions - When provided and true, the result will be the list of props with their description.
          * @returns List of props as object, each key will be a prop.
         */
        "getProps": (descriptions?: boolean) => Promise<GenericObject>;
        /**
          * Custom style of the component.
          * @default ""
         */
        "kulStyle": string;
        /**
          * This method is used to trigger a new render of the component.
         */
        "refresh": () => Promise<void>;
        /**
          * Sets the props to the component.
          * @param props - Object containing props that will be set to the component.
         */
        "setProps": (props: GenericObject) => Promise<void>;
    }
    interface KulShowcaseBadge {
    }
    interface KulShowcaseButton {
    }
    interface KulSplash {
        /**
          * Retrieves the debug information reflecting the current state of the component.
          * @returns A promise that resolves to a KulDebugComponentInfo object containing debug information.
         */
        "getDebugInfo": () => Promise<KulDebugComponentInfo>;
        /**
          * Retrieves the properties of the component, with optional descriptions.
          * @param descriptions - If true, returns properties with descriptions; otherwise, returns properties only.
          * @returns A promise that resolves to an object where each key is a property name, optionally with its description.
         */
        "getProps": (descriptions?: boolean) => Promise<GenericObject>;
        /**
          * Initial text displayed within the component, typically shown during loading.
          * @default "Loading..." - Indicates that loading or initialization is in progress.
         */
        "kulLabel": string;
        /**
          * Enables customization of the component's style.
          * @default "" - No custom style applied by default.
         */
        "kulStyle": string;
        /**
          * Triggers a re-render of the component to reflect any state changes.
         */
        "refresh": () => Promise<void>;
        /**
          * Assigns a set of properties to the component, triggering updates if necessary.
          * @param props - An object containing properties to be set on the component.
         */
        "setProps": (props: GenericObject) => Promise<void>;
        /**
          * Initiates the unmount sequence, which removes the component from the DOM after a delay.
          * @param ms - Number of milliseconds
         */
        "unmount": (ms?: number) => Promise<void>;
    }
}
export interface KulBadgeCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLKulBadgeElement;
}
export interface KulButtonCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLKulButtonElement;
}
export interface KulCardCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLKulCardElement;
}
export interface KulImageCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLKulImageElement;
}
export interface KulShowcaseCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLKulShowcaseElement;
}
export interface KulSplashCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLKulSplashElement;
}
declare global {
    interface HTMLKulBadgeElementEventMap {
        "kul-badge-event": KulEventPayload;
    }
    interface HTMLKulBadgeElement extends Components.KulBadge, HTMLStencilElement {
        addEventListener<K extends keyof HTMLKulBadgeElementEventMap>(type: K, listener: (this: HTMLKulBadgeElement, ev: KulBadgeCustomEvent<HTMLKulBadgeElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLKulBadgeElementEventMap>(type: K, listener: (this: HTMLKulBadgeElement, ev: KulBadgeCustomEvent<HTMLKulBadgeElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLKulBadgeElement: {
        prototype: HTMLKulBadgeElement;
        new (): HTMLKulBadgeElement;
    };
    interface HTMLKulButtonElementEventMap {
        "kul-button-event": KulButtonEventPayload;
    }
    interface HTMLKulButtonElement extends Components.KulButton, HTMLStencilElement {
        addEventListener<K extends keyof HTMLKulButtonElementEventMap>(type: K, listener: (this: HTMLKulButtonElement, ev: KulButtonCustomEvent<HTMLKulButtonElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLKulButtonElementEventMap>(type: K, listener: (this: HTMLKulButtonElement, ev: KulButtonCustomEvent<HTMLKulButtonElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLKulButtonElement: {
        prototype: HTMLKulButtonElement;
        new (): HTMLKulButtonElement;
    };
    interface HTMLKulCardElementEventMap {
        "kul-card-event": KulEventPayload;
    }
    interface HTMLKulCardElement extends Components.KulCard, HTMLStencilElement {
        addEventListener<K extends keyof HTMLKulCardElementEventMap>(type: K, listener: (this: HTMLKulCardElement, ev: KulCardCustomEvent<HTMLKulCardElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLKulCardElementEventMap>(type: K, listener: (this: HTMLKulCardElement, ev: KulCardCustomEvent<HTMLKulCardElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLKulCardElement: {
        prototype: HTMLKulCardElement;
        new (): HTMLKulCardElement;
    };
    interface HTMLKulImageElementEventMap {
        "kul-image-event": KulEventPayload;
    }
    interface HTMLKulImageElement extends Components.KulImage, HTMLStencilElement {
        addEventListener<K extends keyof HTMLKulImageElementEventMap>(type: K, listener: (this: HTMLKulImageElement, ev: KulImageCustomEvent<HTMLKulImageElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLKulImageElementEventMap>(type: K, listener: (this: HTMLKulImageElement, ev: KulImageCustomEvent<HTMLKulImageElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLKulImageElement: {
        prototype: HTMLKulImageElement;
        new (): HTMLKulImageElement;
    };
    interface HTMLKulShowcaseElementEventMap {
        "kul-showcase-event": KulEventPayload;
    }
    interface HTMLKulShowcaseElement extends Components.KulShowcase, HTMLStencilElement {
        addEventListener<K extends keyof HTMLKulShowcaseElementEventMap>(type: K, listener: (this: HTMLKulShowcaseElement, ev: KulShowcaseCustomEvent<HTMLKulShowcaseElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLKulShowcaseElementEventMap>(type: K, listener: (this: HTMLKulShowcaseElement, ev: KulShowcaseCustomEvent<HTMLKulShowcaseElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLKulShowcaseElement: {
        prototype: HTMLKulShowcaseElement;
        new (): HTMLKulShowcaseElement;
    };
    interface HTMLKulShowcaseBadgeElement extends Components.KulShowcaseBadge, HTMLStencilElement {
    }
    var HTMLKulShowcaseBadgeElement: {
        prototype: HTMLKulShowcaseBadgeElement;
        new (): HTMLKulShowcaseBadgeElement;
    };
    interface HTMLKulShowcaseButtonElement extends Components.KulShowcaseButton, HTMLStencilElement {
    }
    var HTMLKulShowcaseButtonElement: {
        prototype: HTMLKulShowcaseButtonElement;
        new (): HTMLKulShowcaseButtonElement;
    };
    interface HTMLKulSplashElementEventMap {
        "kul-splash-event": KulEventPayload;
    }
    interface HTMLKulSplashElement extends Components.KulSplash, HTMLStencilElement {
        addEventListener<K extends keyof HTMLKulSplashElementEventMap>(type: K, listener: (this: HTMLKulSplashElement, ev: KulSplashCustomEvent<HTMLKulSplashElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLKulSplashElementEventMap>(type: K, listener: (this: HTMLKulSplashElement, ev: KulSplashCustomEvent<HTMLKulSplashElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLKulSplashElement: {
        prototype: HTMLKulSplashElement;
        new (): HTMLKulSplashElement;
    };
    interface HTMLElementTagNameMap {
        "kul-badge": HTMLKulBadgeElement;
        "kul-button": HTMLKulButtonElement;
        "kul-card": HTMLKulCardElement;
        "kul-image": HTMLKulImageElement;
        "kul-showcase": HTMLKulShowcaseElement;
        "kul-showcase-badge": HTMLKulShowcaseBadgeElement;
        "kul-showcase-button": HTMLKulShowcaseButtonElement;
        "kul-splash": HTMLKulSplashElement;
    }
}
declare namespace LocalJSX {
    interface KulBadge {
        /**
          * The props of the image displayed inside the badge.
          * @default null
         */
        "kulImageProps"?: KulImagePropsInterface;
        /**
          * The text displayed inside the badge.
          * @default ""
         */
        "kulLabel"?: string;
        /**
          * Custom style of the component.
          * @default ""
         */
        "kulStyle"?: string;
        /**
          * Describes event emitted for various button interactions like click.
         */
        "onKul-badge-event"?: (event: KulBadgeCustomEvent<KulEventPayload>) => void;
    }
    interface KulButton {
        /**
          * Defaults at false. When set to true, the component is disabled.
          * @default false
         */
        "kulDisabled"?: boolean;
        /**
          * When set, the button will show this icon.
          * @default ""
         */
        "kulIcon"?: string;
        /**
          * When set, the icon button off state will show this icon. Otherwise, an outlined version of the icon prop will be displayed.
          * @default ""
         */
        "kulIconOff"?: string;
        /**
          * When set, the button will show this text.
          * @default ""
         */
        "kulLabel"?: string;
        /**
          * When set to true, the pointerdown event will trigger a ripple effect.
          * @default false
         */
        "kulRipple"?: boolean;
        /**
          * When set to true, the button show a spinner received in slot.
          * @default false
         */
        "kulShowSpinner"?: boolean;
        /**
          * Custom style of the component.
          * @default ""
         */
        "kulStyle"?: string;
        /**
          * Defines the style of the button. This property controls the visual appearance of the button.
          * @default "raised"
          * @see KulButtonStyling - For a list of available styles.
         */
        "kulStyling"?: KulButtonStyling;
        /**
          * When set to true, the icon button will be toggable on/off.
          * @default false
         */
        "kulToggable"?: boolean;
        /**
          * When set, the icon will be shown after the text.
          * @default false
         */
        "kulTrailingIcon"?: boolean;
        /**
          * Sets the type of the button.
          * @default "button"
         */
        "kulType"?: | 'button'
        | 'reset'
        | 'submit';
        /**
          * When set to true, the icon button state will be on.
          * @default false
         */
        "kulValue"?: boolean;
        /**
          * Describes event emitted for various button interactions like click, focus, blur.
         */
        "onKul-button-event"?: (event: KulButtonCustomEvent<KulButtonEventPayload>) => void;
    }
    interface KulCard {
        /**
          * The actual data of the card.
          * @default null
         */
        "kulData"?: KulDataDataset;
        /**
          * Sets the type of the card.
          * @default KulCardFamily.STANDARD
         */
        "kulLayoutFamily"?: KulCardFamily;
        /**
          * Sets the number of the layout.
          * @default 1
         */
        "kulLayoutNumber"?: number;
        /**
          * The width of the card, defaults to 100%. Accepts any valid CSS format (px, %, vw, etc.).
          * @default "100%"
         */
        "kulSizeX"?: string;
        /**
          * The height of the card, defaults to 100%. Accepts any valid CSS format (px, %, vh, etc.).
          * @default "100%"
         */
        "kulSizeY"?: string;
        /**
          * Custom style of the component.
          * @default ""
         */
        "kulStyle"?: string;
        /**
          * Triggered when an event is fired.
         */
        "onKul-card-event"?: (event: KulCardCustomEvent<KulEventPayload>) => void;
    }
    interface KulImage {
        /**
          * This property is used to attach a badge to the component.
          * @default null
         */
        "kulBadgeProps"?: KulBadgePropsInterface;
        /**
          * Specifies the color of the icon using a CSS variable. This property is used to set the color of the component's icon.
          * @default KulThemeColorValues.ICON
          * @see KulThemeColorValues - For a list of available CSS variable names for color.
         */
        "kulColor"?: string;
        /**
          * Controls the display of a loading indicator. When enabled, a spinner is shown until the image finishes loading. This property is not compatible with SVG images.
          * @default false
         */
        "kulShowSpinner"?: boolean;
        /**
          * Sets the width of the icon. This property accepts any valid CSS measurement value (e.g., px, %, vh, etc.) and defaults to 100%.
          * @default '100%'
         */
        "kulSizeX"?: string;
        /**
          * Sets the height of the icon. This property accepts any valid CSS measurement value (e.g., px, %, vh, etc.) and defaults to 100%.
          * @default '100%'
         */
        "kulSizeY"?: string;
        /**
          * Customizes the style of the component. This property allows you to apply a custom CSS style to the component.
          * @default ""
         */
        "kulStyle"?: string;
        /**
          * Defines the source URL of the image. This property is used to set the image resource that the component should display.
          * @default ""
         */
        "kulValue"?: string;
        /**
          * Describes event emitted for various button interactions like click, load.
         */
        "onKul-image-event"?: (event: KulImageCustomEvent<KulEventPayload>) => void;
    }
    interface KulShowcase {
        /**
          * Custom style of the component.
          * @default ""
         */
        "kulStyle"?: string;
        /**
          * Describes event emitted for various button interactions like click.
         */
        "onKul-showcase-event"?: (event: KulShowcaseCustomEvent<KulEventPayload>) => void;
    }
    interface KulShowcaseBadge {
    }
    interface KulShowcaseButton {
    }
    interface KulSplash {
        /**
          * Initial text displayed within the component, typically shown during loading.
          * @default "Loading..." - Indicates that loading or initialization is in progress.
         */
        "kulLabel"?: string;
        /**
          * Enables customization of the component's style.
          * @default "" - No custom style applied by default.
         */
        "kulStyle"?: string;
        /**
          * Describes event emitted for various button interactions like click.
         */
        "onKul-splash-event"?: (event: KulSplashCustomEvent<KulEventPayload>) => void;
    }
    interface IntrinsicElements {
        "kul-badge": KulBadge;
        "kul-button": KulButton;
        "kul-card": KulCard;
        "kul-image": KulImage;
        "kul-showcase": KulShowcase;
        "kul-showcase-badge": KulShowcaseBadge;
        "kul-showcase-button": KulShowcaseButton;
        "kul-splash": KulSplash;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "kul-badge": LocalJSX.KulBadge & JSXBase.HTMLAttributes<HTMLKulBadgeElement>;
            "kul-button": LocalJSX.KulButton & JSXBase.HTMLAttributes<HTMLKulButtonElement>;
            "kul-card": LocalJSX.KulCard & JSXBase.HTMLAttributes<HTMLKulCardElement>;
            "kul-image": LocalJSX.KulImage & JSXBase.HTMLAttributes<HTMLKulImageElement>;
            "kul-showcase": LocalJSX.KulShowcase & JSXBase.HTMLAttributes<HTMLKulShowcaseElement>;
            "kul-showcase-badge": LocalJSX.KulShowcaseBadge & JSXBase.HTMLAttributes<HTMLKulShowcaseBadgeElement>;
            "kul-showcase-button": LocalJSX.KulShowcaseButton & JSXBase.HTMLAttributes<HTMLKulShowcaseButtonElement>;
            "kul-splash": LocalJSX.KulSplash & JSXBase.HTMLAttributes<HTMLKulSplashElement>;
        }
    }
}
