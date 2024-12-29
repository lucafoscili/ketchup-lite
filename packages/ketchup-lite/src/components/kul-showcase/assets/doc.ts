import { KulShowcaseDoc } from "../kul-showcase-declarations";
export const KUL_DOC: KulShowcaseDoc = {
  "kul-accordion": {
    methods: [
      {
        name: "getDebugInfo",
        docs: "Fetches debug information of the component's current state.",
        returns: {
          type: "Promise<KulDebugLifecycleInfo>",
          docs: "A promise that resolves with the debug information object.",
        },
        signature: "() => Promise<KulDebugLifecycleInfo>",
      },
      {
        name: "getProps",
        docs: "Used to retrieve component's properties and descriptions.",
        returns: {
          type: "Promise<KulAccordionPropsInterface>",
          docs: "Promise resolved with an object containing the component's properties.",
        },
        signature: "() => Promise<KulAccordionPropsInterface>",
      },
      {
        name: "getSelectedNodes",
        docs: "Returns the selected nodes.",
        returns: {
          type: "Promise<Set<KulDataNode>>",
          docs: "Selected nodes.",
        },
        signature: "() => Promise<Set<KulDataNode>>",
      },
      {
        name: "refresh",
        docs: "This method is used to trigger a new render of the component.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "() => Promise<void>",
      },
      {
        name: "toggleNode",
        docs: "This method activates or deactivates a node.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "(id: string, e?: Event) => Promise<void>",
      },
      {
        name: "unmount",
        docs: "Initiates the unmount sequence, which removes the component from the DOM after a delay.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "(ms?: number) => Promise<void>",
      },
    ],
    props: [
      {
        name: "kulData",
        docs: "Actual data of the accordion.",
        type: "KulDataDataset",
      },
      {
        name: "kulRipple",
        docs: "When set to true, the pointerdown event will trigger a ripple effect.",
        type: "boolean",
      },
      {
        name: "kulStyle",
        docs: "Custom style of the component.",
        type: "string",
      },
    ],
    styles: [
      {
        name: "--kul-accordion-backdrop-filter",
        docs: "Sets the backdrop filter of the accordion. Defaults to blur(3.5px).",
      },
      {
        name: "--kul-accordion-background-color",
        docs: "Sets background of the component. Defaults to var(--kul-background-color).",
      },
      {
        name: "--kul-accordion-background-color-hover",
        docs: "Sets background color of the hover effect. Defaults to rgba(var(--kul-text-color-rgb), 0.175).",
      },
      {
        name: "--kul-accordion-border",
        docs: "Sets borders color of the accordion. Defaults to 1px solid var(--kul-border-color).",
      },
      {
        name: "--kul-accordion-border-radius",
        docs: "Sets border radius of the first and last nodes of the accordion. Defaults to 4px.",
      },
      {
        name: "--kul-accordion-color-hover",
        docs: "Sets text color of the hover effect. Defaults to var(--kul-text-color).",
      },
      {
        name: "--kul-accordion-dropdown-icon-color",
        docs: "Sets color of the dropdown icon. Defaults to var(--kul-text-color).",
      },
      {
        name: "--kul-accordion-font-family",
        docs: "Sets font family of the component. Defaults to var(--kul-font-family).",
      },
      {
        name: "--kul-accordion-font-size",
        docs: "Sets font size of the component. Defaults to var(--kul-font-size).",
      },
      {
        name: "--kul-accordion-padding",
        docs: "Sets padding of the accordion's nodes. Defaults to 1em 1.5em.",
      },
      {
        name: "--kul-accordion-primary-color",
        docs: "Sets primary color of the component. Defaults to var(--kul-primary-color).",
      },
      {
        name: "--kul-accordion-primary-color-rgb",
        docs: "Sets primary color RGB values of the component. Defaults to var(--kul-primary-color-rgb).",
      },
      {
        name: "--kul-accordion-text-color",
        docs: "Sets text color of the component. Defaults to var(--kul-text-color).",
      },
      {
        name: "--kul-accordion-text-on-primary-color",
        docs: "Sets text on primary color of the component. Defaults to var(--kul-text-on-primary-color).",
      },
      {
        name: "--kul-accordion-transition",
        docs: "Sets transition duration for color and background-color. Defaults to 80ms.",
      },
    ],
  },
  "kul-article": {
    methods: [
      {
        name: "getDebugInfo",
        docs: "Retrieves the debug information reflecting the current state of the component.",
        returns: {
          type: "Promise<KulDebugLifecycleInfo>",
          docs: "A promise that resolves to a KulDebugLifecycleInfo object containing debug information.",
        },
        signature: "() => Promise<KulDebugLifecycleInfo>",
      },
      {
        name: "getProps",
        docs: "Used to retrieve component's properties and descriptions.",
        returns: {
          type: "Promise<KulArticlePropsInterface>",
          docs: "Promise resolved with an object containing the component's properties.",
        },
        signature: "() => Promise<KulArticlePropsInterface>",
      },
      {
        name: "refresh",
        docs: "Triggers a re-render of the component to reflect any state changes.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "() => Promise<void>",
      },
      {
        name: "unmount",
        docs: "Initiates the unmount sequence, which removes the component from the DOM after a delay.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "(ms?: number) => Promise<void>",
      },
    ],
    props: [
      {
        name: "kulData",
        docs: "The actual data of the article.",
        type: "KulArticleDataset",
      },
      {
        name: "kulEmpty",
        docs: "Empty text displayed when there is no data.",
        type: "string",
      },
      {
        name: "kulStyle",
        docs: "Enables customization of the component's style.",
        type: "string",
      },
    ],
    styles: [
      {
        name: "--kul-article-content-color",
        docs: "Sets the color for .content elements. Defaults to var(--kul-text-color)",
      },
      {
        name: "--kul-article-content-font-family",
        docs: "Sets the font family for .content elements. Defaults to var(--kul-font-family)",
      },
      {
        name: "--kul-article-content-font-size",
        docs: "Sets the font size for .content elements. Defaults to var(--kul-font-size)",
      },
      {
        name: "--kul-article-h1-color",
        docs: "Sets the color for <h1> elements. Defaults to var(--kul-text-color)",
      },
      {
        name: "--kul-article-h1-font-family",
        docs: "Sets the font family for <h1> elements. Defaults to var(--kul-font-family)",
      },
      {
        name: "--kul-article-h1-font-size",
        docs: "Sets the font size for <h1> elements. Defaults to calc(var(--kul-font-size) * 1.25)",
      },
      {
        name: "--kul-article-h2-color",
        docs: "Sets the color for <h2> elements. Defaults to var(--kul-text-color)",
      },
      {
        name: "--kul-article-h2-font-family",
        docs: "Sets the font family for <h2> elements. Defaults to var(--kul-font-family)",
      },
      {
        name: "--kul-article-h2-font-size",
        docs: "Sets the font size for <h2> elements. Defaults to calc(var(--kul-font-size) * 1.125)",
      },
      {
        name: "--kul-article-h3-color",
        docs: "Sets the color for <h3> elements. Defaults to var(--kul-text-color)",
      },
      {
        name: "--kul-article-h3-font-family",
        docs: "Sets the font family for <h3> elements. Defaults to var(--kul-font-family)",
      },
      {
        name: "--kul-article-h3-font-size",
        docs: "Sets the font size for <h3> elements. Defaults to 1.5em",
      },
      {
        name: "--kul-article-margin",
        docs: "Sets the margin of the article tag. Defaults to automatic.",
      },
      {
        name: "--kul-article-max-width",
        docs: "Sets the max-width of the article tag. Defaults to 1200px.",
      },
      {
        name: "--kul-article-padding",
        docs: "Sets the padding of the article tag. Defaults to 40px.",
      },
    ],
  },
  "kul-badge": {
    methods: [
      {
        name: "getDebugInfo",
        docs: "Fetches debug information of the component's current state.",
        returns: {
          type: "Promise<KulDebugLifecycleInfo>",
          docs: "A promise that resolves with the debug information object.",
        },
        signature: "() => Promise<KulDebugLifecycleInfo>",
      },
      {
        name: "getProps",
        docs: "Used to retrieve component's properties and descriptions.",
        returns: {
          type: "Promise<KulBadgePropsInterface>",
          docs: "Promise resolved with an object containing the component's properties.",
        },
        signature: "() => Promise<KulBadgePropsInterface>",
      },
      {
        name: "refresh",
        docs: "This method is used to trigger a new render of the component.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "() => Promise<void>",
      },
      {
        name: "unmount",
        docs: "Initiates the unmount sequence, which removes the component from the DOM after a delay.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "(ms?: number) => Promise<void>",
      },
    ],
    props: [
      {
        name: "kulImageProps",
        docs: "The props of the image displayed inside the badge.",
        type: "KulImagePropsInterface",
      },
      {
        name: "kulLabel",
        docs: "The text displayed inside the badge.",
        type: "string",
      },
      {
        name: "kulStyle",
        docs: "Custom style of the component.",
        type: "string",
      },
    ],
    styles: [
      {
        name: "--kul-badge-border-radius",
        docs: "Sets the border radius of the badge. Defaults to 30px.",
      },
      {
        name: "--kul-badge-font-family",
        docs: "Sets the font family of the badge. Defaults to var(--kul-font-family).",
      },
      {
        name: "--kul-badge-font-size",
        docs: "Sets the font size of the badge. Defaults to var(--kul-font-size).",
      },
      {
        name: "--kul-badge-min-size",
        docs: "Sets the minimum size of the badge. Defaults to 1.5em.",
      },
      {
        name: "--kul-badge-padding",
        docs: "Sets the padding of the badge. Defaults to 0.25em.",
      },
      {
        name: "--kul-badge-primary-color",
        docs: "Sets the primary color of the badge. Defaults to var(--kul-primary-color).",
      },
      {
        name: "--kul-badge-text-on-primary-color",
        docs: "Sets the text color on the primary color of the badge. Defaults to var(--kul-text-on-primary-color).",
      },
    ],
  },
  "kul-button": {
    methods: [
      {
        name: "getDebugInfo",
        docs: "Fetches debug information of the component's current state.",
        returns: {
          type: "Promise<KulDebugLifecycleInfo>",
          docs: "A promise that resolves with the debug information object.",
        },
        signature: "() => Promise<KulDebugLifecycleInfo>",
      },
      {
        name: "getProps",
        docs: "Used to retrieve component's properties and descriptions.",
        returns: {
          type: "Promise<KulButtonPropsInterface>",
          docs: "Promise resolved with an object containing the component's properties.",
        },
        signature: "() => Promise<KulButtonPropsInterface>",
      },
      {
        name: "getValue",
        docs: "Used to retrieve the component's current state.",
        returns: {
          type: "Promise<KulButtonState>",
          docs: "Promise resolved with the current state of the component.",
        },
        signature: "() => Promise<KulButtonState>",
      },
      {
        name: "refresh",
        docs: "This method is used to trigger a new render of the component.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "() => Promise<void>",
      },
      {
        name: "setMessage",
        docs: "Temporarily sets a different label/icon combination, falling back to their previous value after a timeout.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature:
          "(label?: string, icon?: string, timeout?: number) => Promise<void>",
      },
      {
        name: "setValue",
        docs: "Sets the component's state.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "(value: KulButtonState) => Promise<void>",
      },
      {
        name: "unmount",
        docs: "Initiates the unmount sequence, which removes the component from the DOM after a delay.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "(ms?: number) => Promise<void>",
      },
    ],
    props: [
      {
        name: "kulData",
        docs: "Actual data of the button, used to render dropdown buttons.",
        type: "KulDataDataset",
      },
      {
        name: "kulDisabled",
        docs: "Defaults at false. When set to true, the component is disabled.",
        type: "boolean",
      },
      {
        name: "kulIcon",
        docs: "When set, the button will show this icon.",
        type: "string",
      },
      {
        name: "kulIconOff",
        docs: "When set, the icon button off state will show this icon. Otherwise, an outlined version of the icon prop will be displayed.",
        type: "string",
      },
      {
        name: "kulLabel",
        docs: "When set, the button will show this text.",
        type: "string",
      },
      {
        name: "kulRipple",
        docs: "When set to true, the pointerdown event will trigger a ripple effect.",
        type: "boolean",
      },
      {
        name: "kulShowSpinner",
        docs: "When set to true, the button show a spinner received in slot.",
        type: "boolean",
      },
      {
        name: "kulStyle",
        docs: "Custom style of the component.",
        type: "string",
      },
      {
        name: "kulStyling",
        docs: "Defines the style of the button. This property controls the visual appearance of the button.",
        type: '"flat" | "floating" | "icon" | "outlined" | "raised"',
      },
      {
        name: "kulToggable",
        docs: "When set to true, the icon button will be toggable on/off.",
        type: "boolean",
      },
      {
        name: "kulTrailingIcon",
        docs: "When set, the icon will be shown after the text.",
        type: "boolean",
      },
      {
        name: "kulType",
        docs: "Sets the type of the button.",
        type: '"button" | "reset" | "submit"',
      },
      {
        name: "kulValue",
        docs: "When set to true, the icon button state will be on.",
        type: "boolean",
      },
    ],
    styles: [
      {
        name: "--kul-button-backdrop-filter",
        docs: "Sets the backdrop filter of buttons. Defaults to blur(3.5px).",
      },
      {
        name: "--kul-button-backdrop-filter-hover",
        docs: "Sets the backdrop filter of buttons when hovering. Defaults to blur(5px).",
      },
      {
        name: "--kul-button-border-radius",
        docs: "Sets border radius of the button. Defaults to 4px.",
      },
      {
        name: "--kul-button-disabled-color",
        docs: "Sets disabled color of the button. Defaults to var(--kul-disabled-color).",
      },
      {
        name: "--kul-button-font-family",
        docs: "Sets font family of the button. Defaults to var(--kul-font-family).",
      },
      {
        name: "--kul-button-font-size",
        docs: "Sets font size of the button. Defaults to var(--kul-font-size).",
      },
      {
        name: "--kul-button-font-weight",
        docs: "Sets font weight of the button. Defaults to 400.",
      },
      {
        name: "--kul-button-height",
        docs: "Sets height of the button. Defaults to 3em.",
      },
      {
        name: "--kul-button-padding",
        docs: "Sets padding of the button. Defaults to 0 1.25em.",
      },
      {
        name: "--kul-button-primary-color",
        docs: "Sets the primary color of the button. Defaults to var(--kul-primary-color).",
      },
      {
        name: "--kul-button-primary-color-h",
        docs: "Sets the primary color Hue value of the button (used for focus/hover effects). Defaults to var(--kul-primary-color-h).",
      },
      {
        name: "--kul-button-primary-color-l",
        docs: "Sets the primary color Lightness value of the button (used for focus/hover effects). Defaults to var(--kul-primary-color-l).",
      },
      {
        name: "--kul-button-primary-color-rgb",
        docs: "Sets the primary color RGB values of the button (used for shaders). Defaults to var(--kul-primary-color-rgb).",
      },
      {
        name: "--kul-button-primary-color-s",
        docs: "Sets the primary color Saturation value of the button (used for focus/hover effects). Defaults to var(--kul-primary-color-s).",
      },
      {
        name: "--kul-button-text-on-primary-color",
        docs: "Sets text and icon color for raised buttons. Defaults to var(--kul-text-on-primary-color).",
      },
      {
        name: "--kul-button-text-transform",
        docs: "Set the label case, default is uppercase. Defaults to uppercase.",
      },
      {
        name: "--kul-spinner-color",
        docs: "Sets the spinner color. Defaults to var(--kul-button-primary-color).",
      },
    ],
  },
  "kul-canvas": {
    methods: [
      {
        name: "clearCanvas",
        docs: "Clears the specified canvas.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "(type?: KulCanvasType) => Promise<void>",
      },
      {
        name: "getCanvas",
        docs: "Returns the canvas HTML element.",
        returns: {
          type: "Promise<HTMLCanvasElement>",
          docs: "The painting canvas.",
        },
        signature: "(type?: KulCanvasType) => Promise<HTMLCanvasElement>",
      },
      {
        name: "getDebugInfo",
        docs: "Fetches debug information of the component's current state.",
        returns: {
          type: "Promise<KulDebugLifecycleInfo>",
          docs: "A promise that resolves with the debug information object.",
        },
        signature: "() => Promise<KulDebugLifecycleInfo>",
      },
      {
        name: "getImage",
        docs: "Returns the image component.",
        returns: {
          type: "Promise<HTMLKulImageElement>",
          docs: "",
        },
        signature: "() => Promise<HTMLKulImageElement>",
      },
      {
        name: "getProps",
        docs: "Used to retrieve component's properties and descriptions.",
        returns: {
          type: "Promise<KulCanvasPropsInterface>",
          docs: "Promise resolved with an object containing the component's properties.",
        },
        signature: "() => Promise<KulCanvasPropsInterface>",
      },
      {
        name: "refresh",
        docs: "This method is used to trigger a new render of the component.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "() => Promise<void>",
      },
      {
        name: "resizeCanvas",
        docs: "Automatically resizes the canvas to the match the size of the container.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "() => Promise<void>",
      },
      {
        name: "setCanvasHeight",
        docs: "Sets the height of the canvas.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "(value?: number) => Promise<void>",
      },
      {
        name: "setCanvasWidth",
        docs: "Sets the width of the canvas.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "(value?: number) => Promise<void>",
      },
      {
        name: "unmount",
        docs: "Initiates the unmount sequence, which removes the component from the DOM after a delay.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "(ms?: number) => Promise<void>",
      },
    ],
    props: [
      {
        name: "kulBrush",
        docs: "The shape of the brush.",
        type: '"round" | "square"',
      },
      {
        name: "kulColor",
        docs: "The color of the brush.",
        type: "string",
      },
      {
        name: "kulCursor",
        docs: "Sets the style of the cursor.",
        type: '"default" | "preview"',
      },
      {
        name: "kulImageProps",
        docs: "The props of the image displayed inside the badge.",
        type: "KulImagePropsInterface",
      },
      {
        name: "kulOpacity",
        docs: "The opacity of the brush.",
        type: "number",
      },
      {
        name: "kulPreview",
        docs: "Displays the brush track of the current stroke.",
        type: "boolean",
      },
      {
        name: "kulSize",
        docs: "The size of the brush.",
        type: "number",
      },
      {
        name: "kulStrokeTolerance",
        docs: "Simplifies the coordinates array by applying the Ramer-Douglas-Peucker algorithm.\nThis prop sets the tolerance of the algorithm (null to disable).",
        type: "number",
      },
      {
        name: "kulStyle",
        docs: "Customizes the style of the component.",
        type: "string",
      },
    ],
    styles: [],
  },
  "kul-card": {
    methods: [
      {
        name: "getDebugInfo",
        docs: "Fetches debug information of the component's current state.",
        returns: {
          type: "Promise<KulDebugLifecycleInfo>",
          docs: "A promise that resolves with the debug information object.",
        },
        signature: "() => Promise<KulDebugLifecycleInfo>",
      },
      {
        name: "getProps",
        docs: "Used to retrieve component's properties and descriptions.",
        returns: {
          type: "Promise<KulCardPropsInterface>",
          docs: "Promise resolved with an object containing the component's properties.",
        },
        signature: "() => Promise<KulCardPropsInterface>",
      },
      {
        name: "getShapes",
        docs: "Used to retrieve component's shapes.",
        returns: {
          type: "Promise<KulDataShapesMap>",
          docs: "Map of shapes.",
        },
        signature: "() => Promise<KulDataShapesMap>",
      },
      {
        name: "refresh",
        docs: "This method is used to trigger a new render of the component.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "() => Promise<void>",
      },
      {
        name: "unmount",
        docs: "Initiates the unmount sequence, which removes the component from the DOM after a delay.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "(ms?: number) => Promise<void>",
      },
    ],
    props: [
      {
        name: "kulData",
        docs: "The actual data of the card.",
        type: "KulDataDataset",
      },
      {
        name: "kulLayout",
        docs: "Sets the layout.",
        type: '"debug" | "keywords" | "material" | "upload"',
      },
      {
        name: "kulSizeX",
        docs: "The width of the card, defaults to 100%. Accepts any valid CSS format (px, %, vw, etc.).",
        type: "string",
      },
      {
        name: "kulSizeY",
        docs: "The height of the card, defaults to 100%. Accepts any valid CSS format (px, %, vh, etc.).",
        type: "string",
      },
      {
        name: "kulStyle",
        docs: "Custom style of the component.",
        type: "string",
      },
    ],
    styles: [
      {
        name: "--kul-card-backdrop",
        docs: "Sets the backdrop color of the component when visible. Defaults to rgba(0, 0, 0, 0.32).",
      },
    ],
  },
  "kul-carousel": {
    methods: [
      {
        name: "getDebugInfo",
        docs: "Fetches debug information of the component's current state.",
        returns: {
          type: "Promise<KulDebugLifecycleInfo>",
          docs: "A promise that resolves with the debug information object.",
        },
        signature: "() => Promise<KulDebugLifecycleInfo>",
      },
      {
        name: "getProps",
        docs: "Used to retrieve component's properties and descriptions.",
        returns: {
          type: "Promise<KulCarouselPropsInterface>",
          docs: "Promise resolved with an object containing the component's properties.",
        },
        signature: "() => Promise<KulCarouselPropsInterface>",
      },
      {
        name: "goToSlide",
        docs: "Changes the slide to the specified index if it's within bounds.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "(index: number) => Promise<void>",
      },
      {
        name: "nextSlide",
        docs: "Advances to the next slide, looping back to the start if at the end.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "() => Promise<void>",
      },
      {
        name: "prevSlide",
        docs: "Moves to the previous slide, looping to the last slide if at the beginning.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "() => Promise<void>",
      },
      {
        name: "refresh",
        docs: "This method is used to trigger a new render of the component.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "() => Promise<void>",
      },
      {
        name: "unmount",
        docs: "Initiates the unmount sequence, which removes the component from the DOM after a delay.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "(ms?: number) => Promise<void>",
      },
    ],
    props: [
      {
        name: "kulAutoPlay",
        docs: "Enable or disable autoplay for the carousel.",
        type: "boolean",
      },
      {
        name: "kulData",
        docs: "Actual data of the carousel.",
        type: "KulDataDataset",
      },
      {
        name: "kulInterval",
        docs: "Interval in milliseconds for autoplay.",
        type: "number",
      },
      {
        name: "kulShape",
        docs: "Sets the type of shapes to compare.",
        type: '"badge" | "button" | "canvas" | "card" | "chart" | "chat" | "chip" | "code" | "image" | "number" | "photoframe" | "slot" | "text" | "toggle" | "typewriter" | "upload"',
      },
      {
        name: "kulStyle",
        docs: "Custom style of the component.",
        type: "string",
      },
    ],
    styles: [],
  },
  "kul-chart": {
    methods: [
      {
        name: "getDebugInfo",
        docs: "Fetches debug information of the component's current state.",
        returns: {
          type: "Promise<KulDebugLifecycleInfo>",
          docs: "A promise that resolves with the debug information object.",
        },
        signature: "() => Promise<KulDebugLifecycleInfo>",
      },
      {
        name: "getProps",
        docs: "Used to retrieve component's properties and descriptions.",
        returns: {
          type: "Promise<KulChartPropsInterface>",
          docs: "Promise resolved with an object containing the component's properties.",
        },
        signature: "() => Promise<KulChartPropsInterface>",
      },
      {
        name: "refresh",
        docs: "This method is used to trigger a new render of the component.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "() => Promise<void>",
      },
      {
        name: "unmount",
        docs: "Initiates the unmount sequence, which removes the component from the DOM after a delay.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "(ms?: number) => Promise<void>",
      },
    ],
    props: [
      {
        name: "kulAxis",
        docs: "Sets the axis of the chart.",
        type: "string | string[]",
      },
      {
        name: "kulColors",
        docs: "Overrides theme's colors.",
        type: "string[]",
      },
      {
        name: "kulData",
        docs: "The actual data of the chart.",
        type: "KulDataDataset",
      },
      {
        name: "kulLegend",
        docs: "Sets the position of the legend. Supported values: bottom, left, right, top, hidden. Keep in mind that legend types are tied to chart types, some combinations might not work.",
        type: '"bottom" | "hidden" | "left" | "right" | "top"',
      },
      {
        name: "kulSeries",
        docs: "The data series to be displayed. They must be of the same type.",
        type: "string[]",
      },
      {
        name: "kulSizeX",
        docs: "The width of the chart, defaults to 100%. Accepts any valid CSS format (px, %, vw, etc.).",
        type: "string",
      },
      {
        name: "kulSizeY",
        docs: "The height of the chart, defaults to 100%. Accepts any valid CSS format (px, %, vh, etc.).",
        type: "string",
      },
      {
        name: "kulStyle",
        docs: "Custom style of the component.",
        type: "string",
      },
      {
        name: "kulTypes",
        docs: "The type of the chart. Supported formats: Bar, Gaussian, Line, Pie, Map and Scatter.",
        type: "KulChartType[]",
      },
      {
        name: "kulXAxis",
        docs: "Customization options for the x Axis.",
        type: 'AxisBaseOptionCommon & { gridIndex?: number; gridId?: string; position?: CartesianAxisPosition; offset?: number; categorySortInfo?: OrdinalSortInfo; } & { mainType?: "xAxis"; } | CategoryAxisBaseOption & { gridIndex?: number; gridId?: string; position?: CartesianAxisPosition; offset?: number; categorySortInfo?: OrdinalSortInfo; } & { mainType?: "xAxis"; } | LogAxisBaseOption & { gridIndex?: number; gridId?: string; position?: CartesianAxisPosition; offset?: number; categorySortInfo?: OrdinalSortInfo; } & { mainType?: "xAxis"; } | TimeAxisBaseOption & { gridIndex?: number; gridId?: string; position?: CartesianAxisPosition; offset?: number; categorySortInfo?: OrdinalSortInfo; } & { mainType?: "xAxis"; } | ValueAxisBaseOption & { gridIndex?: number; gridId?: string; position?: CartesianAxisPosition; offset?: number; categorySortInfo?: OrdinalSortInfo; } & { mainType?: "xAxis"; }',
      },
      {
        name: "kulYAxis",
        docs: "Customization options for the y Axis.",
        type: 'AxisBaseOptionCommon & { gridIndex?: number; gridId?: string; position?: CartesianAxisPosition; offset?: number; categorySortInfo?: OrdinalSortInfo; } & { mainType?: "yAxis"; } | CategoryAxisBaseOption & { gridIndex?: number; gridId?: string; position?: CartesianAxisPosition; offset?: number; categorySortInfo?: OrdinalSortInfo; } & { mainType?: "yAxis"; } | LogAxisBaseOption & { gridIndex?: number; gridId?: string; position?: CartesianAxisPosition; offset?: number; categorySortInfo?: OrdinalSortInfo; } & { mainType?: "yAxis"; } | TimeAxisBaseOption & { gridIndex?: number; gridId?: string; position?: CartesianAxisPosition; offset?: number; categorySortInfo?: OrdinalSortInfo; } & { mainType?: "yAxis"; } | ValueAxisBaseOption & { gridIndex?: number; gridId?: string; position?: CartesianAxisPosition; offset?: number; categorySortInfo?: OrdinalSortInfo; } & { mainType?: "yAxis"; }',
      },
    ],
    styles: [],
  },
  "kul-chat": {
    methods: [
      {
        name: "getDebugInfo",
        docs: "Retrieves the debug information reflecting the current state of the component.",
        returns: {
          type: "Promise<KulDebugLifecycleInfo>",
          docs: "A promise that resolves to a KulDebugLifecycleInfo object containing debug information.",
        },
        signature: "() => Promise<KulDebugLifecycleInfo>",
      },
      {
        name: "getHistory",
        docs: "Returns the full history as a string.",
        returns: {
          type: "Promise<string>",
          docs: "Full history of the chat.",
        },
        signature: "() => Promise<string>",
      },
      {
        name: "getLastMessage",
        docs: "Returns the last message as a string.",
        returns: {
          type: "Promise<string>",
          docs: "The last message of the history.",
        },
        signature: "() => Promise<string>",
      },
      {
        name: "getProps",
        docs: "Used to retrieve component's properties and descriptions.",
        returns: {
          type: "Promise<KulChatPropsInterface>",
          docs: "Promise resolved with an object containing the component's properties.",
        },
        signature: "() => Promise<KulChatPropsInterface>",
      },
      {
        name: "refresh",
        docs: "Triggers a re-render of the component to reflect any state changes.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "() => Promise<void>",
      },
      {
        name: "setHistory",
        docs: "Sets the history of the component through a string.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "(history: string) => Promise<void>",
      },
      {
        name: "unmount",
        docs: "Initiates the unmount sequence, which removes the component from the DOM after a delay.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "(ms?: number) => Promise<void>",
      },
    ],
    props: [
      {
        name: "kulContextWindow",
        docs: "How many tokens the context window can handle, used to calculate the occupied space.",
        type: "number",
      },
      {
        name: "kulEmpty",
        docs: "Empty text displayed when there is no data.",
        type: "string",
      },
      {
        name: "kulEndpointUrl",
        docs: "Enables customization of the component's style.",
        type: "string",
      },
      {
        name: "kulLayout",
        docs: "Sets the layout of the chat.",
        type: '"bottom-textarea" | "top-textarea"',
      },
      {
        name: "kulMaxTokens",
        docs: "The maximum amount of tokens allowed in the LLM's answer.",
        type: "number",
      },
      {
        name: "kulPollingInterval",
        docs: "How often the component checks whether the LLM endpoint is online or not.",
        type: "number",
      },
      {
        name: "kulSeed",
        docs: "The seed of the LLM's answer.",
        type: "number",
      },
      {
        name: "kulStyle",
        docs: "Enables customization of the component's style.",
        type: "string",
      },
      {
        name: "kulSystem",
        docs: "System message for the LLM.",
        type: "string",
      },
      {
        name: "kulTemperature",
        docs: "Sets the creative boundaries of the LLM.",
        type: "number",
      },
      {
        name: "kulTypewriterProps",
        docs: "Sets the props of the assistant typewriter component. Set this prop to false to replace the typewriter with a simple text element.",
        type: "KulTypewriterPropsInterface",
      },
      {
        name: "kulValue",
        docs: "Sets the initial history of the chat.",
        type: "KulLLMChoiceMessage[]",
      },
    ],
    styles: [
      {
        name: "--kul-chat-blur-radius",
        docs: "Sets the blur radius for backdrop filters. Defaults to 3.5px.",
      },
      {
        name: "--kul-chat-border-radius",
        docs: "Sets the border-radius for elements. Defaults to 8px.",
      },
      {
        name: "--kul-chat-buttons-padding",
        docs: "Sets the chat controls' padding. Defaults to 1em 0.",
      },
      {
        name: "--kul-chat-grid-gap",
        docs: "Sets the gap between grid elements. Defaults to 16px.",
      },
      {
        name: "--kul-chat-inner-padding",
        docs: "Sets the padding of the inner chat grid. Defaults to 0 16px.",
      },
      {
        name: "--kul-chat-margin-bottom",
        docs: "Sets the bottom margin of the chat area. Defaults to 16px.",
      },
      {
        name: "--kul-chat-margin-top",
        docs: "Sets the top margin of the chat area. Defaults to 16px.",
      },
      {
        name: "--kul-chat-outer-grid-gap",
        docs: "Sets the gap between the outer grid's elements. Defaults to 12px.",
      },
      {
        name: "--kul-chat-padding",
        docs: "Sets the default padding for various elements. Defaults to 18px.",
      },
      {
        name: "--kul-chat-small-font-size",
        docs: "Sets the font size for small text elements. Defaults to 0.875em.",
      },
      {
        name: "--kul-chat-spinner-size",
        docs: "Sets the size of the spinner. Defaults to 48px.",
      },
      {
        name: "--kul-chat-title-font-size",
        docs: "Sets the font size for titles. Defaults to 2em.",
      },
    ],
  },
  "kul-chip": {
    methods: [
      {
        name: "getDebugInfo",
        docs: "Fetches debug information of the component's current state.",
        returns: {
          type: "Promise<KulDebugLifecycleInfo>",
          docs: "A promise that resolves with the debug information object.",
        },
        signature: "() => Promise<KulDebugLifecycleInfo>",
      },
      {
        name: "getProps",
        docs: "Used to retrieve component's properties and descriptions.",
        returns: {
          type: "Promise<KulChipPropsInterface>",
          docs: "Promise resolved with an object containing the component's properties.",
        },
        signature: "() => Promise<KulChipPropsInterface>",
      },
      {
        name: "getSelectedNodes",
        docs: "Returns the selected nodes.",
        returns: {
          type: "Promise<Set<KulDataNode>>",
          docs: "Selected nodes.",
        },
        signature: "() => Promise<Set<KulDataNode>>",
      },
      {
        name: "refresh",
        docs: "This method is used to trigger a new render of the component.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "() => Promise<void>",
      },
      {
        name: "setSelectedNodes",
        docs: "Selects one or more nodes in the chip component.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature:
          "(nodes: (KulDataNode[] | string[]) & Array<any>) => Promise<void>",
      },
      {
        name: "unmount",
        docs: "Initiates the unmount sequence, which removes the component from the DOM after a delay.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "(ms?: number) => Promise<void>",
      },
    ],
    props: [
      {
        name: "kulData",
        docs: "The data of the chip list.",
        type: "KulDataDataset",
      },
      {
        name: "kulRipple",
        docs: "When set to true, the pointerdown event will trigger a ripple effect.",
        type: "boolean",
      },
      {
        name: "kulStyle",
        docs: "Custom style of the component.",
        type: "string",
      },
      {
        name: "kulStyling",
        docs: 'Styling of the chip component, includes: "choice", "input", "filter" and "standard".',
        type: '"choice" | "filter" | "input" | "standard"',
      },
    ],
    styles: [
      {
        name: "--kul-chip-background-color",
        docs: "Sets background color of the component. Defaults to the value of --kul-background-color.",
      },
      {
        name: "--kul-chip-border-radius",
        docs: "Sets border radius of the chips. Defaults to 16px.",
      },
      {
        name: "--kul-chip-font-family",
        docs: "Sets font family of the chips. Defaults to the value of --kul-font-family.",
      },
      {
        name: "--kul-chip-font-size",
        docs: "Sets font size of the chips. Defaults to the value of --kul-font-size.",
      },
      {
        name: "--kul-chip-font-weight",
        docs: "Sets font weight of the chips. Defaults to the value of --kul-font-weight.",
      },
      {
        name: "--kul-chip-height",
        docs: "Sets height of the chips. Defaults to 32px.",
      },
      {
        name: "--kul-chip-indent-multiplier",
        docs: "Sets the indentation multiplier for children chips. Defaults to 10.",
      },
      {
        name: "--kul-chip-margin",
        docs: "Sets margin of the chips. Defaults to 4px.",
      },
      {
        name: "--kul-chip-padding",
        docs: "Sets padding of the chips. Defaults to 0 12px.",
      },
      {
        name: "--kul-chip-primary-color",
        docs: "Sets primary color of the component. Defaults to the value of --kul-primary-color.",
      },
      {
        name: "--kul-chip-primary-color-rgb",
        docs: "Sets primary color RGB values of the component (used for shaders). Defaults to the value of --kul-primary-color-rgb.",
      },
      {
        name: "--kul-chip-text-color",
        docs: "Sets text color of the component. Defaults to the value of --kul-text-color.",
      },
      {
        name: "--kul-chip-text-color-rgb",
        docs: "Sets text color RGB values of the component (used for shaders). Defaults to the value of --kul-text-color-rgb.",
      },
    ],
  },
  "kul-code": {
    methods: [
      {
        name: "getDebugInfo",
        docs: "Retrieves the debug information reflecting the current state of the component.",
        returns: {
          type: "Promise<KulDebugLifecycleInfo>",
          docs: "A promise that resolves to a KulDebugLifecycleInfo object containing debug information.",
        },
        signature: "() => Promise<KulDebugLifecycleInfo>",
      },
      {
        name: "getProps",
        docs: "Used to retrieve component's properties and descriptions.",
        returns: {
          type: "Promise<KulCodePropsInterface>",
          docs: "Promise resolved with an object containing the component's properties.",
        },
        signature: "() => Promise<KulCodePropsInterface>",
      },
      {
        name: "refresh",
        docs: "Triggers a re-render of the component to reflect any state changes.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "() => Promise<void>",
      },
      {
        name: "unmount",
        docs: "Initiates the unmount sequence, which removes the component from the DOM after a delay.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "(ms?: number) => Promise<void>",
      },
    ],
    props: [
      {
        name: "kulFormat",
        docs: "Automatically formats the value.",
        type: "boolean",
      },
      {
        name: "kulLanguage",
        docs: "Sets the language of the snippet.",
        type: "string",
      },
      {
        name: "kulPreserveSpaces",
        docs: "Whether to preserve spaces or not. When missing it is set automatically.",
        type: "boolean",
      },
      {
        name: "kulStyle",
        docs: "Enables customization of the component's style.",
        type: "string",
      },
      {
        name: "kulValue",
        docs: "String containing the snippet of code to display.",
        type: "string",
      },
    ],
    styles: [
      {
        name: "--kul-code-background-color",
        docs: "Sets the background color of the component. Defaults to rgba(var(--kul-background-color-rgb) 0.275)",
      },
      {
        name: "--kul-code-font-family",
        docs: "Sets the font family of the component. Defaults to var(--kul-font-family-monospace)",
      },
      {
        name: "--kul-code-header-background-color",
        docs: "Sets the background color of the header. Defaults to var(--kul-title-background-color)",
      },
      {
        name: "--kul-code-header-color",
        docs: "Sets the color of the header. Defaults to var(--kul-title-color)",
      },
      {
        name: "--kul-code-selection-background-color",
        docs: "Sets the background color of selected text. Defaults to rgba(var(--kul-border-color-rgb, 0.275))",
      },
      {
        name: "--kul-code-text-color",
        docs: "Sets the color of the text. Defaults to var(--kul-text-color)",
      },
      {
        name: "--kul-code-token-color-1",
        docs: "Sets the background color of: boolean, constant, deleted, number, property, symbol, tag. Defaults to rgb(231, 0, 127)",
      },
      {
        name: "--kul-code-token-color-2",
        docs: "Sets the background color of: attr-name, builtin, char, inserted, selector, string. Defaults to rgb(146, 219, 0)",
      },
      {
        name: "--kul-code-token-color-3",
        docs: "Sets the background color of: atrule, attr-value, keyword. Defaults to rgb(0, 165, 236)",
      },
      {
        name: "--kul-code-token-color-4",
        docs: "Sets the background color of: class-name, function. Defaults to #ff6363",
      },
      {
        name: "--kul-code-token-color-5",
        docs: "Sets the background color of: important, regex, variable. Defaults to rgb(255, 196, 86)",
      },
    ],
  },
  "kul-compare": {
    methods: [
      {
        name: "getDebugInfo",
        docs: "Fetches debug information of the component's current state.",
        returns: {
          type: "Promise<KulDebugLifecycleInfo>",
          docs: "A promise that resolves with the debug information object.",
        },
        signature: "() => Promise<KulDebugLifecycleInfo>",
      },
      {
        name: "getProps",
        docs: "Used to retrieve component's properties and descriptions.",
        returns: {
          type: "Promise<KulComparePropsInterface>",
          docs: "Promise resolved with an object containing the component's properties.",
        },
        signature: "() => Promise<KulComparePropsInterface>",
      },
      {
        name: "refresh",
        docs: "This method is used to trigger a new render of the component.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "() => Promise<void>",
      },
      {
        name: "unmount",
        docs: "Initiates the unmount sequence, which removes the component from the DOM after a delay.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "(ms?: number) => Promise<void>",
      },
    ],
    props: [
      {
        name: "kulData",
        docs: "Actual data of the compare.",
        type: "KulDataDataset",
      },
      {
        name: "kulShape",
        docs: "Sets the type of shapes to compare.",
        type: '"badge" | "button" | "canvas" | "card" | "chart" | "chat" | "chip" | "code" | "image" | "number" | "photoframe" | "slot" | "text" | "toggle" | "typewriter" | "upload"',
      },
      {
        name: "kulStyle",
        docs: "Custom style of the component.",
        type: "string",
      },
      {
        name: "kulView",
        docs: "Sets the type of view, either styled as a before-after or a side-by-side comparison.",
        type: '"overlay" | "split"',
      },
    ],
    styles: [
      {
        name: "--kul-compare-change-view-background-color",
        docs: "Sets the background color of the bottom bar. Defaults to var(--kul-title-background-color).",
      },
      {
        name: "--kul-compare-change-view-padding",
        docs: "Sets the padding of the bottom bar. Defaults to 8px.",
      },
      {
        name: "--kul-compare-grid-template",
        docs: "Sets the grid's layout. Defaults to 1fr auto.",
      },
      {
        name: "--kul-compare-slider-color",
        docs: "Sets the color of the overlay slider. Defaults to var(--kul-title-background-color).",
      },
      {
        name: "--kul-compare-slider-width",
        docs: "Sets the width of the overlay slider. Defaults to 3px.",
      },
    ],
  },
  "kul-drawer": {
    methods: [
      {
        name: "close",
        docs: "Closes the drawer.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "() => Promise<void>",
      },
      {
        name: "getDebugInfo",
        docs: "Fetches debug information of the component's current state.",
        returns: {
          type: "Promise<KulDebugLifecycleInfo>",
          docs: "A promise that resolves with the debug information object.",
        },
        signature: "() => Promise<KulDebugLifecycleInfo>",
      },
      {
        name: "getProps",
        docs: "Used to retrieve component's properties and descriptions.",
        returns: {
          type: "Promise<KulDrawerPropsInterface>",
          docs: "Promise resolved with an object containing the component's properties.",
        },
        signature: "() => Promise<KulDrawerPropsInterface>",
      },
      {
        name: "isOpened",
        docs: "Returns the state of the drawer.",
        returns: {
          type: "Promise<boolean>",
          docs: "True when opened, false when closed.",
        },
        signature: "() => Promise<boolean>",
      },
      {
        name: "open",
        docs: "Opens the drawer.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "() => Promise<void>",
      },
      {
        name: "refresh",
        docs: "This method is used to trigger a new render of the component.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "() => Promise<void>",
      },
      {
        name: "toggle",
        docs: "Opens the drawer when closed and vice-versa.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "() => Promise<void>",
      },
      {
        name: "unmount",
        docs: "Initiates the unmount sequence, which removes the component from the DOM after a delay.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "(ms?: number) => Promise<void>",
      },
    ],
    props: [
      {
        name: "kulStyle",
        docs: "Custom style of the component.",
        type: "string",
      },
    ],
    styles: [
      {
        name: "--kul-drawer-backdrop",
        docs: "Sets the backdrop color of the drawer when in slide mode. Defaults to rgba(0, 0, 0, 0.32).",
      },
      {
        name: "--kul-drawer-box-shadow",
        docs: "Sets the box shadow of the drawer when in slide mode. Defaults to a combination of shadows for depth.",
      },
      {
        name: "--kul-drawer-permanent-border",
        docs: "Sets the border of the drawer in permanent mode. Defaults to a 1px solid border with the color defined by --kul-border-color.",
      },
      {
        name: "--kul-drawer-slide-transition",
        docs: "Sets the horizontal transition duration when in slide mode. Defaults to 750ms.",
      },
      {
        name: "--kul-drawer-transition",
        docs: "Sets the transition duration for the drawer. Defaults to 250ms.",
      },
    ],
  },
  "kul-header": {
    methods: [
      {
        name: "getDebugInfo",
        docs: "Fetches debug information of the component's current state.",
        returns: {
          type: "Promise<KulDebugLifecycleInfo>",
          docs: "A promise that resolves with the debug information object.",
        },
        signature: "() => Promise<KulDebugLifecycleInfo>",
      },
      {
        name: "getProps",
        docs: "Used to retrieve component's properties and descriptions.",
        returns: {
          type: "Promise<KulHeaderPropsInterface>",
          docs: "Promise resolved with an object containing the component's properties.",
        },
        signature: "() => Promise<KulHeaderPropsInterface>",
      },
      {
        name: "refresh",
        docs: "This method is used to trigger a new render of the component.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "() => Promise<void>",
      },
      {
        name: "unmount",
        docs: "Initiates the unmount sequence, which removes the component from the DOM after a delay.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "(ms?: number) => Promise<void>",
      },
    ],
    props: [
      {
        name: "kulStyle",
        docs: "Customizes the style of the component. This property allows you to apply a custom CSS style to the component.",
        type: "string",
      },
    ],
    styles: [
      {
        name: "--kul-header-box-shadow",
        docs: "Sets the box shadow of the header component. Defaults to a combination of shadows for depth.",
      },
      {
        name: "--kul-header-padding",
        docs: "Sets the padding of the header component. Defaults to 8px top and bottom, 12px left and right.",
      },
      {
        name: "--kul-header-position",
        docs: "Sets the CSS positioning of the header component. Defaults to fixed.",
      },
      {
        name: "--kul-header-transition",
        docs: "Sets the transition time of the header component. Defaults to 250ms.",
      },
      {
        name: "--kul-header-width",
        docs: "Sets the width of the header component. Defaults to 100%.",
      },
    ],
  },
  "kul-image": {
    methods: [
      {
        name: "getDebugInfo",
        docs: "Fetches debug information of the component's current state.",
        returns: {
          type: "Promise<KulDebugLifecycleInfo>",
          docs: "A promise that resolves with the debug information object.",
        },
        signature: "() => Promise<KulDebugLifecycleInfo>",
      },
      {
        name: "getProps",
        docs: "Used to retrieve component's properties and descriptions.",
        returns: {
          type: "Promise<KulImagePropsInterface>",
          docs: "Promise resolved with an object containing the component's properties.",
        },
        signature: "() => Promise<KulImagePropsInterface>",
      },
      {
        name: "refresh",
        docs: "This method is used to trigger a new render of the component.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "() => Promise<void>",
      },
      {
        name: "unmount",
        docs: "Initiates the unmount sequence, which removes the component from the DOM after a delay.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "(ms?: number) => Promise<void>",
      },
    ],
    props: [
      {
        name: "kulBadgeProps",
        docs: "This property is used to attach a badge to the component.",
        type: "KulBadgePropsInterface",
      },
      {
        name: "kulColor",
        docs: "Specifies the color of the icon using a CSS variable. This property is used to set the color of the component's icon.",
        type: "string",
      },
      {
        name: "kulShowSpinner",
        docs: "Controls the display of a loading indicator. When enabled, a spinner is shown until the image finishes loading. This property is not compatible with SVG images.",
        type: "boolean",
      },
      {
        name: "kulSizeX",
        docs: "Sets the width of the icon. This property accepts any valid CSS measurement value (e.g., px, %, vh, etc.) and defaults to 100%.",
        type: "string",
      },
      {
        name: "kulSizeY",
        docs: "Sets the height of the icon. This property accepts any valid CSS measurement value (e.g., px, %, vh, etc.) and defaults to 100%.",
        type: "string",
      },
      {
        name: "kulStyle",
        docs: "Customizes the style of the component. This property allows you to apply a custom CSS style to the component.",
        type: "string",
      },
      {
        name: "kulValue",
        docs: "Defines the source URL of the image. This property is used to set the image resource that the component should display.",
        type: "string",
      },
    ],
    styles: [
      {
        name: "--kul-image-aspect-ratio",
        docs: "Sets the aspect ratio of the image. Defaults to 1 (square).",
      },
      {
        name: "--kul-image-background",
        docs: "Sets the background color of the image icon. Defaults to transparent.",
      },
      {
        name: "--kul-image-height",
        docs: "Sets the height of the image. Defaults to 100%.",
      },
      {
        name: "--kul-image-margin",
        docs: "Sets the margin of the image. Defaults to auto.",
      },
      {
        name: "--kul-image-mask",
        docs: "Sets the mask for the image icon. Defaults to none.",
      },
      {
        name: "--kul-image-spinner-offset",
        docs: "Sets the offset of the spinner from the center. Defaults to calc(var(--kul-image-spinner-size) / 2).",
      },
      {
        name: "--kul-image-spinner-size",
        docs: "Sets the size of the spinner. Defaults to 32px.",
      },
      {
        name: "--kul-image-transition-duration",
        docs: "Sets the duration of the color transition. Defaults to 0.2s.",
      },
      {
        name: "--kul-image-transition-timing-function",
        docs: "Sets the timing function of the color transition. Defaults to ease.",
      },
      {
        name: "--kul-image-width",
        docs: "Sets the width of the image. Defaults to 100%.",
      },
    ],
  },
  "kul-imageviewer": {
    methods: [
      {
        name: "addSnapshot",
        docs: "Appends a new snapshot to the current shape's history by duplicating it with an updated value.\nIt has no effect when the current shape is not set.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "(value: string) => Promise<void>",
      },
      {
        name: "clearHistory",
        docs: "Clears the history related to the shape identified by the index.\nWhen index is not provided, it clear the full history.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "(index?: number) => Promise<void>",
      },
      {
        name: "clearSelection",
        docs: "Clears the currently selected shape.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "() => Promise<void>",
      },
      {
        name: "getComponents",
        docs: "This method is used to retrieve the references to the subcomponents.",
        returns: {
          type: "Promise<KulImageviewerAdapterRefs>",
          docs: "",
        },
        signature: "() => Promise<KulImageviewerAdapterRefs>",
      },
      {
        name: "getCurrentSnapshot",
        docs: "Fetches the current snapshot.",
        returns: {
          type: "Promise<{ shape: KulMasonrySelectedShape; value: string; }>",
          docs: "A promise that resolves with the current snapshot's object.",
        },
        signature:
          "() => Promise<{ shape: KulMasonrySelectedShape; value: string; }>",
      },
      {
        name: "getDebugInfo",
        docs: "Fetches debug information of the component's current state.",
        returns: {
          type: "Promise<KulDebugLifecycleInfo>",
          docs: "A promise that resolves with the debug information object.",
        },
        signature: "() => Promise<KulDebugLifecycleInfo>",
      },
      {
        name: "getProps",
        docs: "Used to retrieve component's properties and descriptions.",
        returns: {
          type: "Promise<KulImageviewerPropsInterface>",
          docs: "Promise resolved with an object containing the component's properties.",
        },
        signature: "() => Promise<KulImageviewerPropsInterface>",
      },
      {
        name: "refresh",
        docs: "This method is used to trigger a new render of the component.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "() => Promise<void>",
      },
      {
        name: "reset",
        docs: "Clears the full history and clears the current selection.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "() => Promise<void>",
      },
      {
        name: "setSpinnerStatus",
        docs: "Displays/hides the spinner over the preview.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "(status: boolean) => Promise<void>",
      },
      {
        name: "unmount",
        docs: "Initiates the unmount sequence, which removes the component from the DOM after a delay.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "(ms?: number) => Promise<void>",
      },
    ],
    props: [
      {
        name: "kulData",
        docs: "Actual data of the image viewer.",
        type: "KulDataDataset",
      },
      {
        name: "kulLoadCallback",
        docs: "Callback invoked when the load button is clicked.",
        type: "(imageviewer: KulImageviewer, dir: string) => Promise<void>",
      },
      {
        name: "kulStyle",
        docs: "Custom style of the component.",
        type: "string",
      },
      {
        name: "kulValue",
        docs: "Configuration parameters of the detail view.",
        type: "KulDataDataset",
      },
    ],
    styles: [
      {
        name: "--kul-imageviewer-component-height",
        docs: "Sets the height of the #kul-component element. Defaults to 100%.",
      },
      {
        name: "--kul-imageviewer-component-width",
        docs: "Sets the width of the #kul-component element. Defaults to 100%.",
      },
      {
        name: "--kul-imageviewer-details-grid-actions-border-bottom-color",
        docs: "Sets the bottom border color of .details-grid__actions. Defaults to var(--kul-border-color).",
      },
      {
        name: "--kul-imageviewer-details-grid-actions-border-bottom-style",
        docs: "Sets the bottom border style of .details-grid__actions. Defaults to solid.",
      },
      {
        name: "--kul-imageviewer-details-grid-actions-border-bottom-width",
        docs: "Sets the bottom border width of .details-grid__actions. Defaults to 2px.",
      },
      {
        name: "--kul-imageviewer-details-grid-actions-box-sizing",
        docs: "Sets the box-sizing of .details-grid__actions. Defaults to border-box.",
      },
      {
        name: "--kul-imageviewer-details-grid-actions-display",
        docs: "Sets the display property of .details-grid__actions. Defaults to flex.",
      },
      {
        name: "--kul-imageviewer-details-grid-actions-grid-area",
        docs: "Sets the grid-area of .details-grid__actions. Defaults to actions.",
      },
      {
        name: "--kul-imageviewer-details-grid-border-left-color",
        docs: "Sets the left border color of .details-grid. Defaults to var(--kul-border-color).",
      },
      {
        name: "--kul-imageviewer-details-grid-border-left-style",
        docs: "Sets the left border style of .details-grid. Defaults to solid.",
      },
      {
        name: "--kul-imageviewer-details-grid-border-left-width",
        docs: "Sets the left border width of .details-grid. Defaults to 2px.",
      },
      {
        name: "--kul-imageviewer-details-grid-box-sizing",
        docs: "Sets the box-sizing of .details-grid. Defaults to border-box.",
      },
      {
        name: "--kul-imageviewer-details-grid-display",
        docs: "Sets the display property of .details-grid. Defaults to none.",
      },
      {
        name: "--kul-imageviewer-details-grid-height",
        docs: "Sets the height of .details-grid. Defaults to 100%.",
      },
      {
        name: "--kul-imageviewer-details-grid-image-border-bottom-color",
        docs: "Sets the bottom border color of .details-grid__image. Defaults to var(--kul-border-color).",
      },
      {
        name: "--kul-imageviewer-details-grid-image-border-bottom-style",
        docs: "Sets the bottom border style of .details-grid__image. Defaults to solid.",
      },
      {
        name: "--kul-imageviewer-details-grid-image-border-bottom-width",
        docs: "Sets the bottom border width of .details-grid__image. Defaults to 2px.",
      },
      {
        name: "--kul-imageviewer-details-grid-image-box-sizing",
        docs: "Sets the box-sizing of .details-grid__image. Defaults to border-box.",
      },
      {
        name: "--kul-imageviewer-details-grid-image-grid-area",
        docs: "Sets the grid-area of .details-grid__image. Defaults to image.",
      },
      {
        name: "--kul-imageviewer-details-grid-template-areas",
        docs: "Sets the grid-template-areas of .details-grid. Defaults to 'image image' 'actions actions' 'tree settings'.",
      },
      {
        name: "--kul-imageviewer-details-grid-template-columns",
        docs: "Sets the grid-template-columns of .details-grid. Defaults to 40% 1fr.",
      },
      {
        name: "--kul-imageviewer-details-grid-template-rows",
        docs: "Sets the grid-template-rows of .details-grid. Defaults to 60% auto 1fr.",
      },
      {
        name: "--kul-imageviewer-details-grid-tree-border-right-color",
        docs: "Sets the right border color of .details-grid__tree. Defaults to var(--kul-border-color).",
      },
      {
        name: "--kul-imageviewer-details-grid-tree-border-right-style",
        docs: "Sets the right border style of .details-grid__tree. Defaults to solid.",
      },
      {
        name: "--kul-imageviewer-details-grid-tree-border-right-width",
        docs: "Sets the right border width of .details-grid__tree. Defaults to 2px.",
      },
      {
        name: "--kul-imageviewer-details-grid-tree-box-sizing",
        docs: "Sets the box-sizing of .details-grid__tree. Defaults to border-box.",
      },
      {
        name: "--kul-imageviewer-details-grid-tree-grid-area",
        docs: "Sets the grid-area of .details-grid__tree. Defaults to tree.",
      },
      {
        name: "--kul-imageviewer-details-grid-width",
        docs: "Sets the width of .details-grid. Defaults to 100%.",
      },
      {
        name: "--kul-imageviewer-display",
        docs: "Sets the display property of the host element. Defaults to block.",
      },
      {
        name: "--kul-imageviewer-height",
        docs: "Sets the height of the host element. Defaults to 100%.",
      },
      {
        name: "--kul-imageviewer-main-grid-border-color",
        docs: "Sets the border color of .main-grid. Defaults to var(--kul-border-color).",
      },
      {
        name: "--kul-imageviewer-main-grid-border-style",
        docs: "Sets the border style of .main-grid. Defaults to solid.",
      },
      {
        name: "--kul-imageviewer-main-grid-border-width",
        docs: "Sets the border width of .main-grid. Defaults to 2px.",
      },
      {
        name: "--kul-imageviewer-main-grid-box-sizing",
        docs: "Sets the box-sizing of .main-grid. Defaults to border-box.",
      },
      {
        name: "--kul-imageviewer-main-grid-display",
        docs: "Sets the display property of .main-grid. Defaults to grid.",
      },
      {
        name: "--kul-imageviewer-main-grid-has-selection-template-columns",
        docs: "Sets the grid-template-columns when .main-grid has selection. Defaults to 30% 70%.",
      },
      {
        name: "--kul-imageviewer-main-grid-height",
        docs: "Sets the height of .main-grid. Defaults to 100%.",
      },
      {
        name: "--kul-imageviewer-main-grid-template-columns",
        docs: "Sets the grid-template-columns of .main-grid. Defaults to 100% 0.",
      },
      {
        name: "--kul-imageviewer-main-grid-width",
        docs: "Sets the width of .main-grid. Defaults to 100%.",
      },
      {
        name: "--kul-imageviewer-navigation-grid-button-padding-bottom",
        docs: "Sets the bottom padding of .navigation-grid__button. Defaults to 12px.",
      },
      {
        name: "--kul-imageviewer-navigation-grid-display",
        docs: "Sets the display property of .navigation-grid. Defaults to grid.",
      },
      {
        name: "--kul-imageviewer-navigation-grid-height",
        docs: "Sets the height of .navigation-grid. Defaults to 100%.",
      },
      {
        name: "--kul-imageviewer-navigation-grid-masonry-overflow",
        docs: "Sets the overflow of .navigation-grid__masonry. Defaults to auto.",
      },
      {
        name: "--kul-imageviewer-navigation-grid-masonry-position",
        docs: "Sets the position of .navigation-grid__masonry. Defaults to relative.",
      },
      {
        name: "--kul-imageviewer-navigation-grid-template-rows",
        docs: "Sets the grid-template-rows of .navigation-grid. Defaults to auto auto 1fr.",
      },
      {
        name: "--kul-imageviewer-navigation-grid-textfield-padding",
        docs: "Sets the padding of .navigation-grid__textfield. Defaults to 0.",
      },
      {
        name: "--kul-imageviewer-navigation-grid-width",
        docs: "Sets the width of .navigation-grid. Defaults to 100%.",
      },
      {
        name: "--kul-imageviewer-viewer-height",
        docs: "Sets the height of the .imageviewer element. Defaults to 100%.",
      },
      {
        name: "--kul-imageviewer-viewer-width",
        docs: "Sets the width of the .imageviewer element. Defaults to 100%.",
      },
      {
        name: "--kul-imageviewer-width",
        docs: "Sets the width of the host element. Defaults to 100%.",
      },
    ],
  },
  "kul-lazy": {
    methods: [
      {
        name: "getComponent",
        docs: "Returns the HTMLElement of the component to lazy load.",
        returns: {
          type: "Promise<HTMLElement>",
          docs: "Lazy loaded component.",
        },
        signature: "() => Promise<HTMLElement>",
      },
      {
        name: "getDebugInfo",
        docs: "Fetches debug information of the component's current state.",
        returns: {
          type: "Promise<KulDebugLifecycleInfo>",
          docs: "A promise that resolves with the debug information object.",
        },
        signature: "() => Promise<KulDebugLifecycleInfo>",
      },
      {
        name: "getProps",
        docs: "Used to retrieve component's properties and descriptions.",
        returns: {
          type: "Promise<KulLazyPropsInterface>",
          docs: "Promise resolved with an object containing the component's properties.",
        },
        signature: "() => Promise<KulLazyPropsInterface>",
      },
      {
        name: "refresh",
        docs: "This method is used to trigger a new render of the component.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "() => Promise<void>",
      },
      {
        name: "unmount",
        docs: "Initiates the unmount sequence, which removes the component from the DOM after a delay.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "(ms?: number) => Promise<void>",
      },
    ],
    props: [
      {
        name: "kulComponentName",
        docs: "Sets the tag name of the component to be lazy loaded.",
        type: "string",
      },
      {
        name: "kulComponentProps",
        docs: "Sets the data of the component to be lazy loaded.",
        type: "unknown",
      },
      {
        name: "kulRenderMode",
        docs: "Decides when the sub-component should be rendered.\nBy default when both the component props exist and the component is in the viewport.",
        type: '"both" | "props" | "viewport"',
      },
      {
        name: "kulShowPlaceholder",
        docs: "Displays an animated SVG placeholder until the component is loaded.",
        type: "boolean",
      },
      {
        name: "kulStyle",
        docs: "Customizes the style of the component. This property allows you to apply a custom CSS style to the component.",
        type: "string",
      },
    ],
    styles: [
      {
        name: "--kul-lazy-animation-time",
        docs: "Sets the duration of the animation. Defaults to 2s.",
      },
      {
        name: "--kul-lazy-height",
        docs: "Sets the height of the component and subcomponent. Defaults to 100%.",
      },
      {
        name: "--kul-lazy-hor-alignment",
        docs: "Sets the horizontal alignment of the subcomponent. Defaults to center.",
      },
      {
        name: "--kul-lazy-placeholder-color",
        docs: "Sets color of the placeholder icon. Defaults to var(--kul-icon-color).",
      },
      {
        name: "--kul-lazy-ver-alignment",
        docs: "Sets the vertical alignment of the subcomponent. Defaults to center.",
      },
      {
        name: "--kul-lazy-width",
        docs: "Sets the width of the component and subcomponent. Defaults to 100%.",
      },
    ],
  },
  "kul-list": {
    methods: [
      {
        name: "focusNext",
        docs: "Focuses the next element of the list.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "() => Promise<void>",
      },
      {
        name: "focusPrevious",
        docs: "Focuses the previous element of the list.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "() => Promise<void>",
      },
      {
        name: "getDebugInfo",
        docs: "Fetches debug information of the component's current state.",
        returns: {
          type: "Promise<KulDebugLifecycleInfo>",
          docs: "A promise that resolves with the debug information object.",
        },
        signature: "() => Promise<KulDebugLifecycleInfo>",
      },
      {
        name: "getProps",
        docs: "Used to retrieve component's properties and descriptions.",
        returns: {
          type: "Promise<KulListPropsInterface>",
          docs: "Promise resolved with an object containing the component's properties.",
        },
        signature: "() => Promise<KulListPropsInterface>",
      },
      {
        name: "getSelected",
        docs: "Returns the selected node.",
        returns: {
          type: "Promise<KulDataNode>",
          docs: "Selected node.",
        },
        signature: "() => Promise<KulDataNode>",
      },
      {
        name: "refresh",
        docs: "This method is used to trigger a new render of the component.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "() => Promise<void>",
      },
      {
        name: "selectNode",
        docs: "Calls handleSelection private method to select the given item.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "(index?: number) => Promise<void>",
      },
      {
        name: "unmount",
        docs: "Initiates the unmount sequence, which removes the component from the DOM after a delay.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "(ms?: number) => Promise<void>",
      },
    ],
    props: [
      {
        name: "kulData",
        docs: "The data of the list.",
        type: "KulDataDataset",
      },
      {
        name: "kulEmpty",
        docs: "Empty text displayed when there is no data.",
        type: "string",
      },
      {
        name: "kulEnableDeletions",
        docs: "Defines whether items can be removed from the list or not.",
        type: "boolean",
      },
      {
        name: "kulNavigation",
        docs: "When true, enables items' navigation through arrow keys.",
        type: "boolean",
      },
      {
        name: "kulRipple",
        docs: "When set to true, the pointerdown event will trigger a ripple effect.",
        type: "boolean",
      },
      {
        name: "kulSelectable",
        docs: "Defines whether items are selectable or not.",
        type: "boolean",
      },
      {
        name: "kulStyle",
        docs: "Custom style of the component.",
        type: "string",
      },
    ],
    styles: [
      {
        name: "--kul-list-backdrop-filter",
        docs: "Sets the backdrop filter of the list. Defaults to blur(3.5px).",
      },
      {
        name: "--kul-list-background-color",
        docs: "Sets the background color of the list. Defaults to rgba(var(--kul-background-color-rgb), 0.75).",
      },
      {
        name: "--kul-list-font-family",
        docs: "Sets font family of the component. Defaults to the value of --kul-font-family.",
      },
      {
        name: "--kul-list-font-size",
        docs: "Sets font size of the component. Defaults to the value of --kul-font-size.",
      },
      {
        name: "--kul-list-font-weight",
        docs: "Sets font weight of the component. Defaults to 400.",
      },
      {
        name: "--kul-list-group-item-height",
        docs: "Sets height of each list item when the list contains radio buttons or checkboxes. Defaults to 3em.",
      },
      {
        name: "--kul-list-item-height",
        docs: "Sets height of each list item. Defaults to 2.5em.",
      },
      {
        name: "--kul-list-item-padding",
        docs: "Sets the padding of each list item. Defaults to 0 0.75em.",
      },
      {
        name: "--kul-list-primary-color",
        docs: "Sets the primary color of the component. Defaults to the value of --kul-primary-color.",
      },
      {
        name: "--kul-list-primary-color-rgb",
        docs: "Sets the RGB values of the primary color of the component (used for shaders). Defaults to the value of --kul-primary-color-rgb.",
      },
      {
        name: "--kul-list-text-color",
        docs: "Sets text color of the list. Defaults to the value of --kul-text-color.",
      },
      {
        name: "--kul-list-text-color-rgb",
        docs: "Sets the RGB values of text color. Defaults to the value of --kul-text-color-rgb.",
      },
      {
        name: "--kul-list-transition",
        docs: "Transitions duration for text and background colors. Defaults to 125ms.",
      },
    ],
  },
  "kul-masonry": {
    methods: [
      {
        name: "getDebugInfo",
        docs: "Fetches debug information of the component's current state.",
        returns: {
          type: "Promise<KulDebugLifecycleInfo>",
          docs: "A promise that resolves with the debug information object.",
        },
        signature: "() => Promise<KulDebugLifecycleInfo>",
      },
      {
        name: "getProps",
        docs: "Used to retrieve component's properties and descriptions.",
        returns: {
          type: "Promise<KulMasonryPropsInterface>",
          docs: "Promise resolved with an object containing the component's properties.",
        },
        signature: "() => Promise<KulMasonryPropsInterface>",
      },
      {
        name: "getSelectedShape",
        docs: "Returns the selected shape.",
        returns: {
          type: "Promise<KulMasonrySelectedShape>",
          docs: "Selected shape.",
        },
        signature: "() => Promise<KulMasonrySelectedShape>",
      },
      {
        name: "redecorateShapes",
        docs: "Redecorates the shapes, updating potential new values.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "() => Promise<void>",
      },
      {
        name: "refresh",
        docs: "This method is used to trigger a new render of the component.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "() => Promise<void>",
      },
      {
        name: "setSelectedShape",
        docs: "Sets the selected shape by index.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "(index: number) => Promise<void>",
      },
      {
        name: "unmount",
        docs: "Initiates the unmount sequence, which removes the component from the DOM after a delay.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "(ms?: number) => Promise<void>",
      },
    ],
    props: [
      {
        name: "kulColumns",
        docs: "Number of columns of the masonry, doesn't affect sequential views.\nCan be set with a number or an array of numbers that identify each breakpoint.",
        type: "number | number[]",
      },
      {
        name: "kulData",
        docs: "Actual data of the masonry.",
        type: "KulDataDataset",
      },
      {
        name: "kulSelectable",
        docs: "Allows for the selection of elements.",
        type: "boolean",
      },
      {
        name: "kulShape",
        docs: "Sets the type of shapes to compare.",
        type: '"badge" | "button" | "canvas" | "card" | "chart" | "chat" | "chip" | "code" | "image" | "number" | "photoframe" | "slot" | "text" | "toggle" | "typewriter" | "upload"',
      },
      {
        name: "kulStyle",
        docs: "Custom style of the component.",
        type: "string",
      },
      {
        name: "kulView",
        docs: "Sets the type of view, either the actual masonry or a sequential view.",
        type: '"horizontal" | "masonry" | "vertical"',
      },
    ],
    styles: [
      {
        name: "--kul-masonry-actions-z-index",
        docs: "Sets the z-index of action elements. Defaults to 2.",
      },
      {
        name: "--kul-masonry-button-bottom",
        docs: "Sets the bottom placement of the change view button. Defaults to 16px.",
      },
      {
        name: "--kul-masonry-button-right",
        docs: "Sets the right placement of the change view button. Defaults to 16px.",
      },
      {
        name: "--kul-masonry-column-size",
        docs: "Sets the dimension of the masonry columns. Defaults to minmax(0px, 1fr).",
      },
      {
        name: "--kul-masonry-grid-gap",
        docs: "Sets the gaps of the grid. Defaults to 8px.",
      },
      {
        name: "--kul-masonry-grid-gap-actions",
        docs: "Sets the gap for action grids. Defaults to 8px.",
      },
      {
        name: "--kul-masonry-grid-gap-actions-sub",
        docs: "Sets the gap for sub-action grids. Defaults to 4px.",
      },
      {
        name: "--kul-masonry-grid-items-alignment",
        docs: "Sets the alignment of grid items. Defaults to start.",
      },
      {
        name: "--kul-masonry-hover-brightness",
        docs: "Sets the brightness on hover. Defaults to 125%.",
      },
      {
        name: "--kul-masonry-padding",
        docs: "Sets the padding of the grid. Defaults to 12px.",
      },
      {
        name: "--kul-masonry-selected-after-border-radius",
        docs: "Sets the border radius of the ::after pseudo-element. Defaults to 8px.",
      },
      {
        name: "--kul-masonry-selected-after-border-width",
        docs: "Sets the border width of the ::after pseudo-element. Defaults to 4px.",
      },
      {
        name: "--kul-masonry-selected-after-offset",
        docs: "Sets the offset for the ::after pseudo-element. Defaults to -4px.",
      },
      {
        name: "--kul-masonry-selected-border",
        docs: "Sets the border color of selected items. Defaults to var(--kul-primary-color).",
      },
      {
        name: "--kul-masonry-selected-border-radius",
        docs: "Sets the border radius of selected items. Defaults to 5px.",
      },
      {
        name: "--kul-masonry-selected-box-shadow-blur",
        docs: "Sets the blur radius of the box-shadow. Defaults to 10px.",
      },
      {
        name: "--kul-masonry-selected-box-shadow-offset-y",
        docs: "Sets the Y-offset of the box-shadow. Defaults to 4px.",
      },
      {
        name: "--kul-masonry-selected-outline-offset",
        docs: "Sets the outline offset of selected items. Defaults to 4px.",
      },
      {
        name: "--kul-masonry-selected-outline-width",
        docs: "Sets the outline width of selected items. Defaults to 2px.",
      },
      {
        name: "--kul-masonry-selected-transform-scale",
        docs: "Sets the scale transform of selected items. Defaults to 1.05.",
      },
      {
        name: "--kul-masonry-selected-z-index",
        docs: "Sets the z-index of selected items. Defaults to 1.",
      },
      {
        name: "--kul-masonry-transition-duration",
        docs: "Sets the duration of transitions. Defaults to 0.3s.",
      },
      {
        name: "--kul-masonry-transition-timing-function",
        docs: "Sets the timing function of transitions. Defaults to ease.",
      },
    ],
  },
  "kul-messenger": {
    methods: [
      {
        name: "deleteOption",
        docs: "Deletes the options identified by the node and type.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature:
          "(node: KulMessengerBaseChildNode<KulMessengerUnionChildIds>, type: KulMessengerImageTypes) => Promise<void>",
      },
      {
        name: "getDebugInfo",
        docs: "Fetches debug information of the component's current state.",
        returns: {
          type: "Promise<KulDebugLifecycleInfo>",
          docs: "A promise that resolves with the debug information object.",
        },
        signature: "() => Promise<KulDebugLifecycleInfo>",
      },
      {
        name: "getProps",
        docs: "Used to retrieve component's properties and descriptions.",
        returns: {
          type: "Promise<KulMessengerPropsInterface>",
          docs: "Promise resolved with an object containing the component's properties.",
        },
        signature: "() => Promise<KulMessengerPropsInterface>",
      },
      {
        name: "refresh",
        docs: "This method is used to trigger a new render of the component.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "() => Promise<void>",
      },
      {
        name: "reset",
        docs: "Resets the states of the component.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "() => Promise<void>",
      },
      {
        name: "save",
        docs: "Saves the current status of the messenger.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "() => Promise<void>",
      },
      {
        name: "unmount",
        docs: "Initiates the unmount sequence, which removes the component from the DOM after a delay.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "(ms?: number) => Promise<void>",
      },
    ],
    props: [
      {
        name: "kulAutosave",
        docs: "Automatically saves the dataset when a chat updates.",
        type: "boolean",
      },
      {
        name: "kulData",
        docs: "The data of the messenger.",
        type: "KulMessengerDataset",
      },
      {
        name: "kulStyle",
        docs: "Customizes the style of the component. This property allows you to apply a custom CSS style to the component.",
        type: "string",
      },
      {
        name: "kulValue",
        docs: "Sets the initial configuration, including active character and filters.",
        type: "KulMessengerConfig",
      },
    ],
    styles: [
      {
        name: "--kul-messenger-active-options-name-padding",
        docs: "Sets the padding of active options' names. Defaults to 4px.",
      },
      {
        name: "--kul-messenger-avatar-name-padding",
        docs: "Sets the padding of the avatar's name. Defaults to 12px.",
      },
      {
        name: "--kul-messenger-backdrop-filter",
        docs: "Sets the backdrop filter. Defaults to 5px.",
      },
      {
        name: "--kul-messenger-background-color",
        docs: "Sets the background color. Defaults to var(--kul-background-color).",
      },
      {
        name: "--kul-messenger-customization-title-padding",
        docs: "Sets the padding of customization panel titles. Defaults to 8px 12px.",
      },
      {
        name: "--kul-messenger-font-size",
        docs: "Sets the font size of the component. Defaults to var(--kul-font-size).",
      },
      {
        name: "--kul-messenger-letter-spacing",
        docs: "Sets the letter spacing. Defaults to 5px.",
      },
      {
        name: "--kul-messenger-name-background-color",
        docs: "Sets the color of text. Defaults to rgba(var(--kul-title-background-color-rgb), 0.75).",
      },
      {
        name: "--kul-messenger-name-height",
        docs: "Sets the height of the character's name. Defaults to 50px.",
      },
      {
        name: "--kul-messenger-nav-box-shadow",
        docs: "Sets the box shadow of the messenger's navigation bar. Defaults to 0px 1px 7px 3px rgba(var(--kul-text-color-rgb), 0.375).",
      },
      {
        name: "--kul-messenger-text-color",
        docs: "Sets the color of text. Defaults to var(--kul-text-color).",
      },
      {
        name: "--kul-messenger-transition",
        docs: "Sets the transition effect. Defaults to 125ms ease-out.",
      },
    ],
  },
  "kul-photoframe": {
    methods: [
      {
        name: "getDebugInfo",
        docs: "Fetches debug information of the component's current state.",
        returns: {
          type: "Promise<KulDebugLifecycleInfo>",
          docs: "A promise that resolves with the debug information object.",
        },
        signature: "() => Promise<KulDebugLifecycleInfo>",
      },
      {
        name: "getProps",
        docs: "Used to retrieve component's properties and descriptions.",
        returns: {
          type: "Promise<KulPhotoframePropsInterface>",
          docs: "Promise resolved with an object containing the component's properties.",
        },
        signature: "() => Promise<KulPhotoframePropsInterface>",
      },
      {
        name: "refresh",
        docs: "This method is used to trigger a new render of the component.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "() => Promise<void>",
      },
      {
        name: "unmount",
        docs: "Initiates the unmount sequence, which removes the component from the DOM after a delay.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "(ms?: number) => Promise<void>",
      },
    ],
    props: [
      {
        name: "kulOverlay",
        docs: "When not empty, this text will be overlayed on the photo - blocking the view.",
        type: "KulPhotoframeOverlay",
      },
      {
        name: "kulPlaceholder",
        docs: "Html attributes of the picture before the component enters the viewport.",
        type: "GenericObject<unknown>",
      },
      {
        name: "kulStyle",
        docs: "Custom style of the component.",
        type: "string",
      },
      {
        name: "kulThreshold",
        docs: "Percentage of the component dimensions entering the viewport (0.1 => 1).",
        type: "number",
      },
      {
        name: "kulValue",
        docs: "Html attributes of the picture after the component enters the viewport.",
        type: "GenericObject<unknown>",
      },
    ],
    styles: [
      {
        name: "--kul-photoframe-border",
        docs: "Sets the border of the component. Defaults to 1px inset var(--kul-border-color).",
      },
      {
        name: "--kul-photoframe-fade-out-time",
        docs: "Sets the time of the placeholder's fade out transition. Defaults to 2000ms.",
      },
    ],
  },
  "kul-progressbar": {
    methods: [
      {
        name: "getDebugInfo",
        docs: "Retrieves the debug information reflecting the current state of the component.",
        returns: {
          type: "Promise<KulDebugLifecycleInfo>",
          docs: "A promise that resolves to a KulDebugLifecycleInfo object containing debug information.",
        },
        signature: "() => Promise<KulDebugLifecycleInfo>",
      },
      {
        name: "getProps",
        docs: "Used to retrieve component's properties and descriptions.",
        returns: {
          type: "Promise<KulProgressbarPropsInterface>",
          docs: "Promise resolved with an object containing the component's properties.",
        },
        signature: "() => Promise<KulProgressbarPropsInterface>",
      },
      {
        name: "refresh",
        docs: "Triggers a re-render of the component to reflect any state changes.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "() => Promise<void>",
      },
      {
        name: "unmount",
        docs: "Initiates the unmount sequence, which removes the component from the DOM after a delay.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "(ms?: number) => Promise<void>",
      },
    ],
    props: [
      {
        name: "kulCenteredLabel",
        docs: "Displays the label in the middle of the progress bar. It's the default for the radial variant and can't be changed.",
        type: "boolean",
      },
      {
        name: "kulIcon",
        docs: "Specifies an icon to replace the label.",
        type: "string",
      },
      {
        name: "kulIsRadial",
        docs: "Radial version.",
        type: "boolean",
      },
      {
        name: "kulLabel",
        docs: "Specifies a text for the bar's label.",
        type: "string",
      },
      {
        name: "kulStyle",
        docs: "Custom style of the component.",
        type: "string",
      },
      {
        name: "kulValue",
        docs: "The current value the progress bar must display.",
        type: "number",
      },
    ],
    styles: [
      {
        name: "--kul-progressbar-border-radius",
        docs: "Sets border radius of the component. Defaults to 4px.",
      },
      {
        name: "--kul-progressbar-font-family",
        docs: "Sets font family of the component. Defaults to the value of --kul-font-family.",
      },
      {
        name: "--kul-progressbar-font-size",
        docs: "Sets font size of the component. Defaults to the value of --kul-font-size.",
      },
      {
        name: "--kul-progressbar-height",
        docs: "Sets height of the component. Defaults to 1.25em.",
      },
      {
        name: "--kul-progressbar-primary-color",
        docs: "Sets primary color of the component. Defaults to the value of --kul-primary-color.",
      },
      {
        name: "--kul-progressbar-text-color",
        docs: "Sets text color of the component. Defaults to the value of --kul-text-color.",
      },
      {
        name: "--kul-progressbar-text-color-rgb",
        docs: "Sets text color RGB values of the component (used for shaders). Defaults to the value of --kul-text-color-rgb.",
      },
      {
        name: "--kul-progressbar-text-on-primary-color",
        docs: "Sets text on primary color of the component. Defaults to the value of --kul-text-on-primary-color.",
      },
      {
        name: "--kul-progressbar-track-color",
        docs: "Sets track color of the progress bar (empty section). Defaults to the value of --kul-disabled-background-color.",
      },
      {
        name: "--kul-progressbar-width",
        docs: "Sets width of the component. Defaults to 100%.",
      },
    ],
  },
  "kul-showcase": {
    methods: [],
    props: [
      {
        name: "kulScrollElement",
        docs: "The scroll container, functional to the ScrollToTop floating button.",
        type: "HTMLElement",
      },
      {
        name: "kulStyle",
        docs: "Customizes the style of the component. This property allows you to apply a custom CSS style to the component.",
        type: "string",
      },
      {
        name: "kulValue",
        docs: "Sets the initial value of the views.",
        type: "{ Components: string; Framework: string; Utilities: string; }",
      },
    ],
    styles: [],
  },
  "kul-showcase-accordion": {
    methods: [],
    props: [],
    styles: [],
  },
  "kul-showcase-article": {
    methods: [],
    props: [],
    styles: [],
  },
  "kul-showcase-badge": {
    methods: [],
    props: [],
    styles: [],
  },
  "kul-showcase-button": {
    methods: [],
    props: [],
    styles: [],
  },
  "kul-showcase-canvas": {
    methods: [],
    props: [],
    styles: [],
  },
  "kul-showcase-card": {
    methods: [],
    props: [],
    styles: [],
  },
  "kul-showcase-carousel": {
    methods: [],
    props: [],
    styles: [],
  },
  "kul-showcase-chart": {
    methods: [],
    props: [],
    styles: [],
  },
  "kul-showcase-chat": {
    methods: [],
    props: [],
    styles: [],
  },
  "kul-showcase-chip": {
    methods: [],
    props: [],
    styles: [],
  },
  "kul-showcase-code": {
    methods: [],
    props: [],
    styles: [],
  },
  "kul-showcase-compare": {
    methods: [],
    props: [],
    styles: [],
  },
  "kul-showcase-debug": {
    methods: [],
    props: [],
    styles: [],
  },
  "kul-showcase-drawer": {
    methods: [],
    props: [],
    styles: [],
  },
  "kul-showcase-header": {
    methods: [],
    props: [],
    styles: [],
  },
  "kul-showcase-image": {
    methods: [],
    props: [],
    styles: [],
  },
  "kul-showcase-imageviewer": {
    methods: [],
    props: [],
    styles: [],
  },
  "kul-showcase-kuldata": {
    methods: [],
    props: [],
    styles: [],
  },
  "kul-showcase-kuldebug": {
    methods: [],
    props: [],
    styles: [],
  },
  "kul-showcase-kuldynamicposition": {
    methods: [],
    props: [],
    styles: [],
  },
  "kul-showcase-kulllm": {
    methods: [],
    props: [],
    styles: [],
  },
  "kul-showcase-kulmanager": {
    methods: [],
    props: [],
    styles: [],
  },
  "kul-showcase-kulscrollonhover": {
    methods: [],
    props: [],
    styles: [],
  },
  "kul-showcase-kultheme": {
    methods: [],
    props: [],
    styles: [],
  },
  "kul-showcase-lazy": {
    methods: [],
    props: [],
    styles: [],
  },
  "kul-showcase-list": {
    methods: [],
    props: [],
    styles: [],
  },
  "kul-showcase-masonry": {
    methods: [],
    props: [],
    styles: [],
  },
  "kul-showcase-messenger": {
    methods: [],
    props: [],
    styles: [],
  },
  "kul-showcase-photoframe": {
    methods: [],
    props: [],
    styles: [],
  },
  "kul-showcase-progressbar": {
    methods: [],
    props: [],
    styles: [],
  },
  "kul-showcase-slider": {
    methods: [],
    props: [],
    styles: [],
  },
  "kul-showcase-spinner": {
    methods: [],
    props: [],
    styles: [],
  },
  "kul-showcase-splash": {
    methods: [],
    props: [],
    styles: [],
  },
  "kul-showcase-tabbar": {
    methods: [],
    props: [],
    styles: [],
  },
  "kul-showcase-textfield": {
    methods: [],
    props: [],
    styles: [],
  },
  "kul-showcase-toast": {
    methods: [],
    props: [],
    styles: [],
  },
  "kul-showcase-toggle": {
    methods: [],
    props: [],
    styles: [],
  },
  "kul-showcase-tree": {
    methods: [],
    props: [],
    styles: [],
  },
  "kul-showcase-typewriter": {
    methods: [],
    props: [],
    styles: [],
  },
  "kul-showcase-upload": {
    methods: [],
    props: [],
    styles: [],
  },
  "kul-slider": {
    methods: [
      {
        name: "getDebugInfo",
        docs: "Fetches debug information of the component's current state.",
        returns: {
          type: "Promise<KulDebugLifecycleInfo>",
          docs: "A promise that resolves with the debug information object.",
        },
        signature: "() => Promise<KulDebugLifecycleInfo>",
      },
      {
        name: "getProps",
        docs: "Used to retrieve component's properties and descriptions.",
        returns: {
          type: "Promise<KulSliderPropsInterface>",
          docs: "Promise resolved with an object containing the component's properties.",
        },
        signature: "() => Promise<KulSliderPropsInterface>",
      },
      {
        name: "getValue",
        docs: "Used to retrieve the component's current state.",
        returns: {
          type: "Promise<KulSliderValue>",
          docs: "Promise resolved with the current state of the component.",
        },
        signature: "() => Promise<KulSliderValue>",
      },
      {
        name: "refresh",
        docs: "This method is used to trigger a new render of the component.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "() => Promise<void>",
      },
      {
        name: "setValue",
        docs: "Sets the component's state.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "(value: number) => Promise<void>",
      },
      {
        name: "unmount",
        docs: "Initiates the unmount sequence, which removes the component from the DOM after a delay.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "(ms?: number) => Promise<void>",
      },
    ],
    props: [
      {
        name: "kulDisabled",
        docs: "When true, the component is disabled, preventing user interaction.",
        type: "boolean",
      },
      {
        name: "kulLabel",
        docs: "Defines text to display as a label for the slider.",
        type: "string",
      },
      {
        name: "kulLeadingLabel",
        docs: "When true, displays the label before the slider component. Defaults to `false`.",
        type: "boolean",
      },
      {
        name: "kulMax",
        docs: "The maximum value allowed by the slider.",
        type: "number",
      },
      {
        name: "kulMin",
        docs: "The minimum value allowed by the slider.",
        type: "number",
      },
      {
        name: "kulRipple",
        docs: "Adds a ripple effect when interacting with the slider.",
        type: "boolean",
      },
      {
        name: "kulStep",
        docs: "Sets the increment or decrement steps when moving the slider.",
        type: "number",
      },
      {
        name: "kulStyle",
        docs: "Custom CSS style to apply to the slider component.",
        type: "string",
      },
      {
        name: "kulValue",
        docs: "The initial numeric value for the slider within the defined range.",
        type: "number",
      },
    ],
    styles: [
      {
        name: "--kul-slider-backdrop-filter",
        docs: "Sets backdrop filter effect for the track and thumb underlay. Defaults to blur(10px).",
      },
      {
        name: "--kul-slider-box-shadow",
        docs: "Sets box shadow for the slider components. Defaults to 0px 4px 8px rgba(0, 0, 0, 0.2).",
      },
      {
        name: "--kul-slider-disabled-opacity",
        docs: "Sets opacity of the slider when disabled. Defaults to 0.5.",
      },
      {
        name: "--kul-slider-font-family",
        docs: "Sets font family of the slider's label. Defaults to var(--kul-font-family).",
      },
      {
        name: "--kul-slider-font-size",
        docs: "Sets font size of the slider's label. Defaults to var(--kul-font-size).",
      },
      {
        name: "--kul-slider-font-weight",
        docs: "Sets font weight of the slider's label. Defaults to 400.",
      },
      {
        name: "--kul-slider-input-height",
        docs: "Sets the height of the hidden input element. Defaults to 48px.",
      },
      {
        name: "--kul-slider-label-color",
        docs: "Sets text color of the slider's label. Defaults to var(--kul-text-color).",
      },
      {
        name: "--kul-slider-label-font-size",
        docs: "Sets font size of the slider's label. Defaults to 0.875em.",
      },
      {
        name: "--kul-slider-label-letter-spacing",
        docs: "Sets letter spacing of the slider's label. Defaults to 0.0178571429em.",
      },
      {
        name: "--kul-slider-label-line-height",
        docs: "Sets line height of the slider's label. Defaults to 2em.",
      },
      {
        name: "--kul-slider-label-min-width",
        docs: "Sets the min. width of the label. Defaults to 0px.",
      },
      {
        name: "--kul-slider-label-overflow",
        docs: "Sets the behavior of the label's overflow. Defaults to unset.",
      },
      {
        name: "--kul-slider-label-padding-left",
        docs: "Sets left padding of the slider's label. Defaults to 8px.",
      },
      {
        name: "--kul-slider-label-padding-right",
        docs: "Sets right padding of the slider's label. Defaults to 8px.",
      },
      {
        name: "--kul-slider-label-white-space",
        docs: "Sets the behavior of the label's white spaces. Defaults to pre-wrap.",
      },
      {
        name: "--kul-slider-margin",
        docs: "Sets margin around the slider component. Defaults to 0 0.75em.",
      },
      {
        name: "--kul-slider-min-width",
        docs: "Sets minimum width of the slider component. Defaults to 128px.",
      },
      {
        name: "--kul-slider-primary-color",
        docs: "Sets primary color of the component. Used for active parts of the slider such as the track and thumb. Defaults to var(--kul-primary-color).",
      },
      {
        name: "--kul-slider-primary-color-rgb",
        docs: "Sets primary color RGB values for the component. Used to create transparent variations of the primary color. Defaults to var(--kul-primary-color-rgb).",
      },
      {
        name: "--kul-slider-thumb-active-after-scale",
        docs: "Sets scale transform on active state for the thumb's after element. Defaults to 1.5.",
      },
      {
        name: "--kul-slider-thumb-backdrop-filter",
        docs: "Sets backdrop filter for the thumb underlay. Defaults to blur(10px).",
      },
      {
        name: "--kul-slider-thumb-backdrop-filter-active",
        docs: "Sets backdrop filter for the active thumb. Defaults to blur(12px).",
      },
      {
        name: "--kul-slider-thumb-border-radius",
        docs: "Sets border radius of the slider thumb. Defaults to 50%.",
      },
      {
        name: "--kul-slider-thumb-box-shadow",
        docs: "Sets box shadow for the slider thumb. Defaults to 0px 4px 8px rgba(0, 0, 0, 0.2).",
      },
      {
        name: "--kul-slider-thumb-color",
        docs: "Sets color of the slider thumb. Defaults to var(--kul-border-color).",
      },
      {
        name: "--kul-slider-thumb-height",
        docs: "Sets height of the slider thumb. Defaults to 24px.",
      },
      {
        name: "--kul-slider-thumb-hover-scale",
        docs: "Sets scale transform on hover for the thumb. Defaults to 1.1.",
      },
      {
        name: "--kul-slider-thumb-underlay-top",
        docs: "Sets top position of the thumb underlay. Defaults to -9px.",
      },
      {
        name: "--kul-slider-thumb-width",
        docs: "Sets width of the slider thumb. Defaults to 24px.",
      },
      {
        name: "--kul-slider-track-border-radius",
        docs: "Sets border radius of the slider track. Defaults to 12px.",
      },
      {
        name: "--kul-slider-track-height",
        docs: "Sets height of the slider track. Defaults to 6px.",
      },
      {
        name: "--kul-slider-transition-duration",
        docs: "Sets duration of transitions. Defaults to 0.3s.",
      },
      {
        name: "--kul-slider-value-bottom-position",
        docs: "Sets the bottom position of the value display. Defaults to -3em.",
      },
      {
        name: "--kul-slider-value-font-size",
        docs: "Sets font size of the slider's value display. Defaults to 0.875em.",
      },
      {
        name: "--kul-slider-value-font-weight",
        docs: "Sets font weight of the slider's value display. Defaults to 500.",
      },
    ],
  },
  "kul-spinner": {
    methods: [
      {
        name: "getDebugInfo",
        docs: "Fetches debug information of the component's current state.",
        returns: {
          type: "Promise<KulDebugLifecycleInfo>",
          docs: "A promise that resolves with the debug information object.",
        },
        signature: "() => Promise<KulDebugLifecycleInfo>",
      },
      {
        name: "getProps",
        docs: "Used to retrieve component's properties and descriptions.",
        returns: {
          type: "Promise<KulSpinnerPropsInterface>",
          docs: "Promise resolved with an object containing the component's properties.",
        },
        signature: "() => Promise<KulSpinnerPropsInterface>",
      },
      {
        name: "refresh",
        docs: "This method is used to trigger a new render of the component.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "() => Promise<void>",
      },
      {
        name: "unmount",
        docs: "Initiates the unmount sequence, which removes the component from the DOM after a delay.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "(ms?: number) => Promise<void>",
      },
    ],
    props: [
      {
        name: "kulActive",
        docs: "Specifies if the spinner is animating.",
        type: "boolean",
      },
      {
        name: "kulBarVariant",
        docs: "Controls if the component displays as a bar or a spinner.",
        type: "boolean",
      },
      {
        name: "kulDimensions",
        docs: "Defines the width and height of the spinner. In the bar variant, it specifies only the height.",
        type: "string",
      },
      {
        name: "kulFader",
        docs: "Applies a blending modal over the component to darken or lighten the view, based on the theme.",
        type: "boolean",
      },
      {
        name: "kulFaderTimeout",
        docs: "Duration needed for the fader to become active.",
        type: "number",
      },
      {
        name: "kulFullScreen",
        docs: "Fills the entire viewport when enabled.",
        type: "boolean",
      },
      {
        name: "kulLayout",
        docs: "Selects the spinner layout.",
        type: "number",
      },
      {
        name: "kulStyle",
        docs: "Sets a custom style for the component.",
        type: "string",
      },
      {
        name: "kulTimeout",
        docs: "Duration for the progress bar to fill up (in milliseconds).",
        type: "number",
      },
    ],
    styles: [
      {
        name: "--kul-spinner-border-color",
        docs: "Sets the border color of the spinner component. Defaults to var(--kul-border-color).",
      },
    ],
  },
  "kul-splash": {
    methods: [
      {
        name: "getDebugInfo",
        docs: "Retrieves the debug information reflecting the current state of the component.",
        returns: {
          type: "Promise<KulDebugLifecycleInfo>",
          docs: "A promise that resolves to a KulDebugLifecycleInfo object containing debug information.",
        },
        signature: "() => Promise<KulDebugLifecycleInfo>",
      },
      {
        name: "getProps",
        docs: "Used to retrieve component's properties and descriptions.",
        returns: {
          type: "Promise<KulSplashPropsInterface>",
          docs: "Promise resolved with an object containing the component's properties.",
        },
        signature: "() => Promise<KulSplashPropsInterface>",
      },
      {
        name: "refresh",
        docs: "Triggers a re-render of the component to reflect any state changes.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "() => Promise<void>",
      },
      {
        name: "unmount",
        docs: "Initiates the unmount sequence, which removes the component from the DOM after a delay.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "(ms?: number) => Promise<void>",
      },
    ],
    props: [
      {
        name: "kulLabel",
        docs: "Initial text displayed within the component, typically shown during loading.",
        type: "string",
      },
      {
        name: "kulStyle",
        docs: "Enables customization of the component's style.",
        type: "string",
      },
    ],
    styles: [
      {
        name: "--kul-splash-background-color",
        docs: "Sets the color of the spinner. Defaults to the value of --kul-background-color.",
      },
      {
        name: "--kul-splash-font-family",
        docs: "Sets the label's font family. Defaults to the value of --kul-font-family.",
      },
      {
        name: "--kul-splash-font-size",
        docs: "Sets the label's font size. Defaults to the value of --kul-font-size.",
      },
      {
        name: "--kul-splash-label-color",
        docs: "Sets the color of the label. Defaults to the value of --kul-text-color.",
      },
      {
        name: "--kul-splash-label-display",
        docs: "Sets the display property of the label. Defaults to block.",
      },
      {
        name: "--kul-splash-widget-color",
        docs: "Sets the color of the widget. Defaults to the value of --kul-primary-color.",
      },
      {
        name: "--kul-splash-widget-height",
        docs: "Sets the height of the widget. Defaults to 150px.",
      },
      {
        name: "--kul-splash-widget-width",
        docs: "Sets the width of the widget. Defaults to 150px.",
      },
    ],
  },
  "kul-tabbar": {
    methods: [
      {
        name: "getDebugInfo",
        docs: "Retrieves the debug information reflecting the current state of the component.",
        returns: {
          type: "Promise<KulDebugLifecycleInfo>",
          docs: "A promise that resolves to a KulDebugLifecycleInfo object containing debug information.",
        },
        signature: "() => Promise<KulDebugLifecycleInfo>",
      },
      {
        name: "getProps",
        docs: "Used to retrieve component's properties and descriptions.",
        returns: {
          type: "Promise<KulTabbarPropsInterface>",
          docs: "Promise resolved with an object containing the component's properties.",
        },
        signature: "() => Promise<KulTabbarPropsInterface>",
      },
      {
        name: "getValue",
        docs: "Returns the selected node and its index.",
        returns: {
          type: "Promise<KulTabbarState>",
          docs: "Selected node and its index.",
        },
        signature: "() => Promise<KulTabbarState>",
      },
      {
        name: "refresh",
        docs: "Triggers a re-render of the component to reflect any state changes.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "() => Promise<void>",
      },
      {
        name: "setValue",
        docs: "Sets the value of the component based on the provided argument.",
        returns: {
          type: "Promise<KulTabbarState>",
          docs: "The newly set value.",
        },
        signature: "(value: number | string) => Promise<KulTabbarState>",
      },
      {
        name: "unmount",
        docs: "Initiates the unmount sequence, which removes the component from the DOM after a delay.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "(ms?: number) => Promise<void>",
      },
    ],
    props: [
      {
        name: "kulData",
        docs: "Actual data of the component.",
        type: "KulDataDataset",
      },
      {
        name: "kulRipple",
        docs: "When set to true, the pointerdown event will trigger a ripple effect.",
        type: "boolean",
      },
      {
        name: "kulStyle",
        docs: "Custom style of the component.",
        type: "string",
      },
      {
        name: "kulValue",
        docs: "Sets the initial selected node's index.",
        type: "number | string",
      },
    ],
    styles: [
      {
        name: "--kul-tabbar-backdrop-filter",
        docs: "Sets the backdrop filter of tabs. Defaults to blur(3.5px).",
      },
      {
        name: "--kul-tabbar-backdrop-filter-hover",
        docs: "Sets the backdrop filter of tabs when hovering. Defaults to blur(5px).",
      },
      {
        name: "--kul-tabbar-font-size",
        docs: "Sets the font size of the tab bar. Defaults to the value of --kul-font-size.",
      },
      {
        name: "--kul-tabbar-font-weight",
        docs: "Sets the font weight of the tab bar. Defaults to 500.",
      },
      {
        name: "--kul-tabbar-height",
        docs: "Sets the height of the tab bar. Defaults to 36px.",
      },
      {
        name: "--kul-tabbar-primary-color",
        docs: "Sets the primary color of the tab bar. Defaults to the value of --kul-primary-color.",
      },
      {
        name: "--kul-tabbar-primary-color-rgb",
        docs: "Sets the primary color of the tab bar in RGB format. Defaults to the value of --kul-primary-color-rgb.",
      },
      {
        name: "--kul-tabbar-tab-padding",
        docs: "Sets the padding of the tabs in the tab bar. Defaults to 0 24px.",
      },
    ],
  },
  "kul-textfield": {
    methods: [
      {
        name: "getDebugInfo",
        docs: "Fetches debug information of the component's current state.",
        returns: {
          type: "Promise<KulDebugLifecycleInfo>",
          docs: "A promise that resolves with the debug information object.",
        },
        signature: "() => Promise<KulDebugLifecycleInfo>",
      },
      {
        name: "getProps",
        docs: "Used to retrieve component's properties and descriptions.",
        returns: {
          type: "Promise<KulTextfieldPropsInterface>",
          docs: "Promise resolved with an object containing the component's properties.",
        },
        signature: "() => Promise<KulTextfieldPropsInterface>",
      },
      {
        name: "getValue",
        docs: "Used to retrieve the component's current state.",
        returns: {
          type: "Promise<string>",
          docs: "Promise resolved with the current state of the component.",
        },
        signature: "() => Promise<string>",
      },
      {
        name: "refresh",
        docs: "This method is used to trigger a new render of the component.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "() => Promise<void>",
      },
      {
        name: "setBlur",
        docs: "Blurs the input element.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "() => Promise<void>",
      },
      {
        name: "setFocus",
        docs: "Focuses the input element.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "() => Promise<void>",
      },
      {
        name: "setValue",
        docs: "Sets the component's state.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "(value: string) => Promise<void>",
      },
      {
        name: "unmount",
        docs: "Initiates the unmount sequence, which removes the component from the DOM after a delay.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "(ms?: number) => Promise<void>",
      },
    ],
    props: [
      {
        name: "kulDisabled",
        docs: "Enables or disables the text field to prevent user interaction.",
        type: "boolean",
      },
      {
        name: "kulFullWidth",
        docs: "Applies a full-width styling to the text field, making it occupy all available horizontal space.",
        type: "boolean",
      },
      {
        name: "kulHelper",
        docs: "Specifies helper text to display alongside the text field.\nHelper text can provide additional context or instructions to the user.",
        type: "KulTextfieldHelper",
      },
      {
        name: "kulHtmlAttributes",
        docs: "Allows customization of the input or textarea element through additional HTML attributes.\nThis can include attributes like 'readonly', 'placeholder', etc., to further customize the behavior or appearance of the input.",
        type: "GenericObject<unknown>",
      },
      {
        name: "kulIcon",
        docs: "Defines the icon to be displayed within the text field.\nIcons can indicate actions such as search, clear, or provide visual cues related to the input's purpose.",
        type: "string",
      },
      {
        name: "kulLabel",
        docs: "Assigns a label to the text field, improving accessibility and providing context to the user about what kind of input is expected.\nLabels are especially important for screen readers and users navigating with keyboard-only controls.",
        type: "string",
      },
      {
        name: "kulStyle",
        docs: "Accepts custom CSS styles to apply directly to the text field component.\nThis allows for fine-grained control over the appearance of the component beyond predefined styling options.",
        type: "string",
      },
      {
        name: "kulStyling",
        docs: "Determines the overall styling theme of the text field, affecting its shape and border.\nOptions include 'default', 'outlined', or 'textarea', each offering a distinct visual presentation.",
        type: '"flat" | "outlined" | "raised" | "textarea"',
      },
      {
        name: "kulTrailingIcon",
        docs: "Controls whether the icon should appear after the text input, typically used for action buttons like clear or search.",
        type: "boolean",
      },
      {
        name: "kulValue",
        docs: "Initializes the text field with a default value when the component is first rendered.\nThis can be used to pre-fill forms or set a starting point for user input.",
        type: "string",
      },
    ],
    styles: [
      {
        name: "--kul-textfield-backdrop-filter",
        docs: "Sets the backdrop filter of the text field. Defaults to blur(3.5px).",
      },
      {
        name: "--kul-textfield-backdrop-filter-hover",
        docs: "Sets the backdrop filter of the text field when hovering. Defaults to blur(5px).",
      },
      {
        name: "--kul-textfield-background-color",
        docs: "Sets the background color of the text field. Defaults to rgba(var(--kul-text-color-rgb), 0.125).",
      },
      {
        name: "--kul-textfield-background-color-hover",
        docs: "Sets the background color of the text field when hovering. Defaults to rgba(var(--kul-text-color-rgb), 0.125).",
      },
      {
        name: "--kul-textfield-border-radius",
        docs: "Sets the border radius of the text field. Defaults to 4px.",
      },
      {
        name: "--kul-textfield-font-family",
        docs: "Sets the font family of the text field. Defaults to var(--kul-font-family).",
      },
      {
        name: "--kul-textfield-input-color",
        docs: "Sets the color of the text field's input text. Defaults to var(--kul-text-color).",
      },
      {
        name: "--kul-textfield-input-color-rgb",
        docs: "Sets the rgb color of the text field's input text. Defaults to var(--kul-text-color-rgb).",
      },
      {
        name: "--kul-textfield-input-font-size",
        docs: "Sets the font size of the text field's value. Defaults to var(--kul-font-size).",
      },
      {
        name: "--kul-textfield-input-font-weight",
        docs: "Sets the font weight of the text field's input. Defaults to 400.",
      },
      {
        name: "--kul-textfield-label-color",
        docs: "Sets the color of the text field's label. Defaults to rgba(var(--kul-text-color-rgb), 0.875).",
      },
      {
        name: "--kul-textfield-label-font-size",
        docs: "Sets the font size of the text field's label. Defaults to var(--kul-font-size).",
      },
      {
        name: "--kul-textfield-label-font-weight",
        docs: "Sets the font weight of the text field's label. Defaults to 400.",
      },
      {
        name: "--kul-textfield-padding",
        docs: "Sets the padding of the text field. Defaults to 0 16px.",
      },
      {
        name: "--kul-textfield-primary-color",
        docs: "Sets the primary color of the text field. Defaults to var(--kul-primary-color).",
      },
    ],
  },
  "kul-toast": {
    methods: [
      {
        name: "getDebugInfo",
        docs: "Retrieves the debug information reflecting the current state of the component.",
        returns: {
          type: "Promise<KulDebugLifecycleInfo>",
          docs: "A promise that resolves to a KulDebugLifecycleInfo object containing debug information.",
        },
        signature: "() => Promise<KulDebugLifecycleInfo>",
      },
      {
        name: "getProps",
        docs: "Used to retrieve component's properties and descriptions.",
        returns: {
          type: "Promise<KulToastPropsInterface>",
          docs: "Promise resolved with an object containing the component's properties.",
        },
        signature: "() => Promise<KulToastPropsInterface>",
      },
      {
        name: "refresh",
        docs: "Triggers a re-render of the component to reflect any state changes.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "() => Promise<void>",
      },
      {
        name: "unmount",
        docs: "Initiates the unmount sequence, which removes the component from the DOM after a delay.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "(ms?: number) => Promise<void>",
      },
    ],
    props: [
      {
        name: "kulCloseCallback",
        docs: "Callback invoked when the toast is closed.",
        type: "() => void",
      },
      {
        name: "kulCloseIcon",
        docs: "Sets the props of the clickable icon used to close the toast.",
        type: "KulImagePropsInterface",
      },
      {
        name: "kulIcon",
        docs: "Sets the props of an optional icon that will be displayed along with the message.",
        type: "KulImagePropsInterface",
      },
      {
        name: "kulMessage",
        docs: "Sets the message of the toast.",
        type: "string",
      },
      {
        name: "kulStyle",
        docs: "Enables customization of the component's style.",
        type: "string",
      },
      {
        name: "kulTimer",
        docs: "When kulTimer is set with a number, the toast will close itself after the specified amount of time (in ms).",
        type: "number",
      },
    ],
    styles: [
      {
        name: "--kul-toast-accent-color",
        docs: "Sets the accent color of the toast, identified by a bar displayed on the top of the component. Defaults to var(--kul-info-color).",
      },
      {
        name: "--kul-toast-accent-height",
        docs: "Sets the height of the accent color bar. Defaults to 4px.",
      },
      {
        name: "--kul-toast-icon-opacity",
        docs: "Sets the opacity of the icon. Defaults to 0.625.",
      },
      {
        name: "--kul-toast-slidein-from",
        docs: "Sets the animation starting point. Defaults to translateX(100%).",
      },
      {
        name: "--kul-toast-slidein-to",
        docs: "Sets the animation ending point. Defaults to translateX(0).",
      },
    ],
  },
  "kul-toggle": {
    methods: [
      {
        name: "getDebugInfo",
        docs: "Fetches debug information of the component's current state.",
        returns: {
          type: "Promise<KulDebugLifecycleInfo>",
          docs: "A promise that resolves with the debug information object.",
        },
        signature: "() => Promise<KulDebugLifecycleInfo>",
      },
      {
        name: "getProps",
        docs: "Used to retrieve component's properties and descriptions.",
        returns: {
          type: "Promise<KulTogglePropsInterface>",
          docs: "Promise resolved with an object containing the component's properties.",
        },
        signature: "() => Promise<KulTogglePropsInterface>",
      },
      {
        name: "getValue",
        docs: "Used to retrieve the component's current state.",
        returns: {
          type: "Promise<KulToggleState>",
          docs: "Promise resolved with the current state of the component.",
        },
        signature: "() => Promise<KulToggleState>",
      },
      {
        name: "refresh",
        docs: "This method is used to trigger a new render of the component.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "() => Promise<void>",
      },
      {
        name: "setValue",
        docs: "Sets the component's state.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "(value: KulToggleState | boolean) => Promise<void>",
      },
      {
        name: "unmount",
        docs: "Initiates the unmount sequence, which removes the component from the DOM after a delay.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "(ms?: number) => Promise<void>",
      },
    ],
    props: [
      {
        name: "kulDisabled",
        docs: "Defaults at false. When set to true, the component is disabled.",
        type: "boolean",
      },
      {
        name: "kulLabel",
        docs: "Defines text to display along with the toggle.",
        type: "string",
      },
      {
        name: "kulLeadingLabel",
        docs: "Defaults at false. When set to true, the label will be displayed before the component.",
        type: "boolean",
      },
      {
        name: "kulRipple",
        docs: "When set to true, the pointerdown event will trigger a ripple effect.",
        type: "boolean",
      },
      {
        name: "kulStyle",
        docs: "Custom style of the component.",
        type: "string",
      },
      {
        name: "kulValue",
        docs: "Sets the initial boolean state of the toggle.",
        type: "boolean",
      },
    ],
    styles: [
      {
        name: "--kul-toggle-font-family",
        docs: "Sets font family of the toggle's label. Defaults to var(--kul-font-family).",
      },
      {
        name: "--kul-toggle-font-size",
        docs: "Sets font size of the toggle's label. Defaults to var(--kul-font-size).",
      },
      {
        name: "--kul-toggle-font-weight",
        docs: "Sets font weight of the toggle's label. Defaults to 400.",
      },
      {
        name: "--kul-toggle-label-color",
        docs: "Sets text color of the toggle's label. Defaults to var(--kul-text-color).",
      },
      {
        name: "--kul-toggle-primary-color",
        docs: "Sets primary color of the component. Defaults to var(--kul-primary-color).",
      },
      {
        name: "--kul-toggle-primary-color-rgb",
        docs: "Sets primary color RGB values of the component. Defaults to var(--kul-primary-color-rgb).",
      },
      {
        name: "--kul-toggle-thumb-color",
        docs: "Sets thumb color. Defaults to var(--kul-border-color).",
      },
    ],
  },
  "kul-tree": {
    methods: [
      {
        name: "getDebugInfo",
        docs: "Retrieves the debug information reflecting the current state of the component.",
        returns: {
          type: "Promise<KulDebugLifecycleInfo>",
          docs: "A promise that resolves to a KulDebugLifecycleInfo object containing debug information.",
        },
        signature: "() => Promise<KulDebugLifecycleInfo>",
      },
      {
        name: "getProps",
        docs: "Used to retrieve component's properties and descriptions.",
        returns: {
          type: "Promise<KulTreePropsInterface>",
          docs: "Promise resolved with an object containing the component's properties.",
        },
        signature: "() => Promise<KulTreePropsInterface>",
      },
      {
        name: "refresh",
        docs: "Triggers a re-render of the component to reflect any state changes.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "() => Promise<void>",
      },
      {
        name: "unmount",
        docs: "Initiates the unmount sequence, which removes the component from the DOM after a delay.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "(ms?: number) => Promise<void>",
      },
    ],
    props: [
      {
        name: "kulAccordionLayout",
        docs: "When enabled, the first level of depth will create an accordion-style appearance for nodes.",
        type: "boolean",
      },
      {
        name: "kulData",
        docs: "The actual data of the tree.",
        type: "KulDataDataset",
      },
      {
        name: "kulEmpty",
        docs: "Empty text displayed when there is no data.",
        type: "string",
      },
      {
        name: "kulFilter",
        docs: "When true, displays a text field which enables filtering the dataset of the tree.",
        type: "boolean",
      },
      {
        name: "kulInitialExpansionDepth",
        docs: "Sets the initial expanded nodes based on the specified depth.\nIf the property is not provided, all nodes in the tree will be expanded.",
        type: "number",
      },
      {
        name: "kulRipple",
        docs: "When set to true, the pointerdown event will trigger a ripple effect.",
        type: "boolean",
      },
      {
        name: "kulSelectable",
        docs: "When true, nodes can be selected.",
        type: "boolean",
      },
      {
        name: "kulStyle",
        docs: "Enables customization of the component's style.",
        type: "string",
      },
    ],
    styles: [
      {
        name: "--kul-tree-accordion-background-color",
        docs: 'Sets the background color for top-level nodes (data-depth="0") when kul-accordion-layout is applied. Defaults to #ffffff.',
      },
      {
        name: "--kul-tree-accordion-border-radius",
        docs: 'Sets the border radius for top-level nodes (data-depth="0") when kul-accordion-layout is applied. Defaults to 4px.',
      },
      {
        name: "--kul-tree-accordion-color",
        docs: 'Sets the text color for top-level nodes (data-depth="0") when kul-accordion-layout is applied. Defaults to #000000.',
      },
      {
        name: "--kul-tree-accordion-font-size",
        docs: 'Sets the font size for top-level nodes (data-depth="0") when kul-accordion-layout is applied. Defaults to 1.125em.',
      },
      {
        name: "--kul-tree-accordion-hover-background-color",
        docs: 'Sets the background color for top-level nodes (data-depth="0") on hover when kul-accordion-layout is applied. Defaults to var(--kul-primary-color).',
      },
      {
        name: "--kul-tree-accordion-hover-color",
        docs: 'Sets the text color for top-level nodes (data-depth="0") on hover when kul-accordion-layout is applied. Defaults to var(--kul-text-on-primary-color).',
      },
      {
        name: "--kul-tree-accordion-node-height",
        docs: 'Sets the height of top-level nodes (data-depth="0") when the tree has an accordion layout. Defaults to 4em.',
      },
      {
        name: "--kul-tree-backdrop-filter",
        docs: "Sets the backdrop filter of the tree. Defaults to blur(3.5px).",
      },
      {
        name: "--kul-tree-node-background-color-hover",
        docs: "Sets the background color when hovering a node. Defaults to rgba(var(--kul-primary-color-rgb), 0.175).",
      },
      {
        name: "--kul-tree-node-background-color-selected",
        docs: "Sets the background color of the selected node. Defaults to rgba(var(--kul-primary-color-rgb), 0.375).",
      },
      {
        name: "--kul-tree-node-height",
        docs: "Sets the height for all nodes. Replaces the static value previously used. Defaults to 2em.",
      },
      {
        name: "--kul-tree-node-padding",
        docs: "Sets the padding of nodes. Defaults to 0 1em.",
      },
      {
        name: "--kul-tree-padding",
        docs: "Sets the padding of the tree. Defaults to 0.",
      },
      {
        name: "--kul-tree-text-color",
        docs: "Sets the text color of the tree. Defaults to var(--kul-text-color).",
      },
    ],
  },
  "kul-typewriter": {
    methods: [
      {
        name: "getDebugInfo",
        docs: "Fetches debug information of the component's current state.",
        returns: {
          type: "Promise<KulDebugLifecycleInfo>",
          docs: "A promise that resolves with the debug information object.",
        },
        signature: "() => Promise<KulDebugLifecycleInfo>",
      },
      {
        name: "getProps",
        docs: "Used to retrieve component's properties and descriptions.",
        returns: {
          type: "Promise<KulTypewriterPropsInterface>",
          docs: "Promise resolved with an object containing the component's properties.",
        },
        signature: "() => Promise<KulTypewriterPropsInterface>",
      },
      {
        name: "refresh",
        docs: "This method is used to trigger a new render of the component.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "() => Promise<void>",
      },
      {
        name: "unmount",
        docs: "Initiates the unmount sequence, which removes the component from the DOM after a delay.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "(ms?: number) => Promise<void>",
      },
    ],
    props: [
      {
        name: "kulCursor",
        docs: "Sets the behavior of the bliking cursor.",
        type: '"auto" | "disabled" | "enabled"',
      },
      {
        name: "kulDeleteSpeed",
        docs: "Sets the deleting speed in milliseconds.",
        type: "number",
      },
      {
        name: "kulLoop",
        docs: "Enables or disables looping of the text.",
        type: "boolean",
      },
      {
        name: "kulPause",
        docs: "Sets the duration of the pause after typing a complete text.",
        type: "number",
      },
      {
        name: "kulSpeed",
        docs: "Sets the typing speed in milliseconds.",
        type: "number",
      },
      {
        name: "kulStyle",
        docs: "Customizes the style of the component. This property allows you to apply a custom CSS style to the component.",
        type: "string",
      },
      {
        name: "kulTag",
        docs: "The name of the HTML tag that will wrap the text.",
        type: '"code" | "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "pre" | "span"',
      },
      {
        name: "kulValue",
        docs: "Sets the text or array of texts to display with the typewriter effect.",
        type: "string | string[]",
      },
    ],
    styles: [
      {
        name: "--kul-typewriter-cursor-color",
        docs: "Color of the blinking cursor. Defaults to the same color as text.",
      },
      {
        name: "--kul-typewriter-cursor-width",
        docs: "Width of the blinking cursor. Defaults to 2px.",
      },
      {
        name: "--kul-typewriter-font-family",
        docs: "Font family for the text. Defaults to inherit.",
      },
      {
        name: "--kul-typewriter-font-size",
        docs: "Font size for the text. Defaults to inherit.",
      },
      {
        name: "--kul-typewriter-text-color",
        docs: "Color of the text being typed. Defaults to currentColor.",
      },
    ],
  },
  "kul-upload": {
    methods: [
      {
        name: "getDebugInfo",
        docs: "Retrieves the debug information reflecting the current state of the component.",
        returns: {
          type: "Promise<KulDebugLifecycleInfo>",
          docs: "A promise that resolves to a KulDebugLifecycleInfo object containing debug information.",
        },
        signature: "() => Promise<KulDebugLifecycleInfo>",
      },
      {
        name: "getProps",
        docs: "Used to retrieve component's properties and descriptions.",
        returns: {
          type: "Promise<KulUploadPropsInterface>",
          docs: "Promise resolved with an object containing the component's properties.",
        },
        signature: "() => Promise<KulUploadPropsInterface>",
      },
      {
        name: "getValue",
        docs: "Returns the component's internal value.",
        returns: {
          type: "Promise<File[]>",
          docs: "",
        },
        signature: "() => Promise<File[]>",
      },
      {
        name: "refresh",
        docs: "Triggers a re-render of the component to reflect any state changes.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "() => Promise<void>",
      },
      {
        name: "unmount",
        docs: "Initiates the unmount sequence, which removes the component from the DOM after a delay.",
        returns: {
          type: "Promise<void>",
          docs: "",
        },
        signature: "(ms?: number) => Promise<void>",
      },
    ],
    props: [
      {
        name: "kulLabel",
        docs: "Sets the button's label.",
        type: "string",
      },
      {
        name: "kulRipple",
        docs: "When set to true, the pointerdown event will trigger a ripple effect.",
        type: "boolean",
      },
      {
        name: "kulStyle",
        docs: "Enables customization of the component's style.",
        type: "string",
      },
      {
        name: "kulValue",
        docs: "Initializes the component with these files.",
        type: "File[]",
      },
    ],
    styles: [
      {
        name: "--kul-upload-backdrop-filter",
        docs: "Sets the backdrop filter for the upload component. Defaults to a blur effect of 5px.",
      },
      {
        name: "--kul-upload-backdrop-filter-hover",
        docs: "Sets the backdrop filter for the upload component on hover. Defaults to a blur effect of 10px.",
      },
      {
        name: "--kul-upload-border",
        docs: "Sets the border for the upload component. Defaults to a 1px solid border with a color defined by --kul-border-color-rgb.",
      },
      {
        name: "--kul-upload-border-radius",
        docs: "Sets the border radius for the upload component. Defaults to 4px.",
      },
      {
        name: "--kul-upload-button-height",
        docs: "Sets the height of the upload button. Defaults to 42px.",
      },
      {
        name: "--kul-upload-button-text-transform",
        docs: "Sets the text transformation for the upload button. Defaults to uppercase.",
      },
      {
        name: "--kul-upload-grid-gap",
        docs: "Sets the grid gap for the upload component. Defaults to 20px.",
      },
      {
        name: "--kul-upload-info-height",
        docs: "Sets the height of the info section in the upload component. Defaults to 1fr.",
      },
      {
        name: "--kul-upload-padding",
        docs: "Sets the padding for the upload component. Defaults to 1em.",
      },
    ],
  },
};
