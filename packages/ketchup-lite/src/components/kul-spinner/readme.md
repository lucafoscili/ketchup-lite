# kul-spinner



<!-- Auto Generated Below -->


## Properties

| Property          | Attribute           | Description                                                                                    | Type      | Default     |
| ----------------- | ------------------- | ---------------------------------------------------------------------------------------------- | --------- | ----------- |
| `kulActive`       | `kul-active`        | Specifies if the spinner is animating.                                                         | `boolean` | `false`     |
| `kulBarVariant`   | `kul-bar-variant`   | Controls if the component displays as a bar or a spinner.                                      | `boolean` | `false`     |
| `kulDimensions`   | `kul-dimensions`    | Defines the width and height of the spinner. In the bar variant, it specifies only the height. | `string`  | `""`        |
| `kulFader`        | `kul-fader`         | Applies a blending modal over the component to darken or lighten the view, based on the theme. | `boolean` | `false`     |
| `kulFaderTimeout` | `kul-fader-timeout` | Duration needed for the fader to become active.                                                | `number`  | `3500`      |
| `kulFullScreen`   | `kul-full-screen`   | Fills the entire viewport when enabled.                                                        | `boolean` | `false`     |
| `kulLayout`       | `kul-layout`        | Selects the spinner layout.                                                                    | `number`  | `1`         |
| `kulStyle`        | `kul-style`         | Sets a custom style for the component.                                                         | `string`  | `""`        |
| `kulTimeout`      | `kul-timeout`       | Duration for the progress bar to fill up (in milliseconds).                                    | `number`  | `undefined` |


## Events

| Event               | Description | Type                                  |
| ------------------- | ----------- | ------------------------------------- |
| `kul-spinner-event` |             | `CustomEvent<KulSpinnerEventPayload>` |


## Methods

### `getDebugInfo() => Promise<KulDebugLifecycleInfo>`

Fetches debug information of the component's current state.

#### Returns

Type: `Promise<KulDebugLifecycleInfo>`

A promise that resolves with the debug information object.

### `getProps(descriptions?: boolean) => Promise<GenericObject>`

Used to retrieve component's props values.

#### Parameters

| Name           | Type      | Description                                                                            |
| -------------- | --------- | -------------------------------------------------------------------------------------- |
| `descriptions` | `boolean` | - When provided and true, the result will be the list of props with their description. |

#### Returns

Type: `Promise<GenericObject<unknown>>`

List of props as object, each key will be a prop.

### `refresh() => Promise<void>`

This method is used to trigger a new render of the component.

#### Returns

Type: `Promise<void>`



### `unmount(ms?: number) => Promise<void>`

Initiates the unmount sequence, which removes the component from the DOM after a delay.

#### Parameters

| Name | Type     | Description              |
| ---- | -------- | ------------------------ |
| `ms` | `number` | - Number of milliseconds |

#### Returns

Type: `Promise<void>`




## CSS Custom Properties

| Name                         | Description                                                                          |
| ---------------------------- | ------------------------------------------------------------------------------------ |
| `--kul-spinner-border-color` | Sets the border color of the spinner component. Defaults to var(--kul-border-color). |


## Dependencies

### Used by

 - [kul-chat](../kul-chat)
 - [kul-image](../kul-image)
 - [kul-imageviewer](../kul-imageviewer)
 - [kul-messenger](../kul-messenger)
 - [kul-showcase-button](../kul-showcase/components/button)
 - [kul-showcase-spinner](../kul-showcase/components/spinner)
 - [kul-showcase-splash](../kul-showcase/components/splash)

### Graph
```mermaid
graph TD;
  kul-chat --> kul-spinner
  kul-image --> kul-spinner
  kul-imageviewer --> kul-spinner
  kul-messenger --> kul-spinner
  kul-showcase-button --> kul-spinner
  kul-showcase-spinner --> kul-spinner
  kul-showcase-splash --> kul-spinner
  style kul-spinner fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
