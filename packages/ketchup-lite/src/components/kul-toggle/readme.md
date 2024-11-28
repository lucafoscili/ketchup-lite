# kul-button



<!-- Auto Generated Below -->


## Properties

| Property          | Attribute           | Description                                                                            | Type      | Default |
| ----------------- | ------------------- | -------------------------------------------------------------------------------------- | --------- | ------- |
| `kulDisabled`     | `kul-disabled`      | Defaults at false. When set to true, the component is disabled.                        | `boolean` | `false` |
| `kulLabel`        | `kul-label`         | Defines text to display along with the toggle.                                         | `string`  | `''`    |
| `kulLeadingLabel` | `kul-leading-label` | Defaults at false. When set to true, the label will be displayed before the component. | `boolean` | `false` |
| `kulRipple`       | `kul-ripple`        | When set to true, the pointerdown event will trigger a ripple effect.                  | `boolean` | `true`  |
| `kulStyle`        | `kul-style`         | Custom style of the component.                                                         | `string`  | `''`    |
| `kulValue`        | `kul-value`         | Sets the initial boolean state of the toggle.                                          | `boolean` | `false` |


## Events

| Event              | Description | Type                                 |
| ------------------ | ----------- | ------------------------------------ |
| `kul-toggle-event` |             | `CustomEvent<KulToggleEventPayload>` |


## Methods

### `getDebugInfo() => Promise<KulDebugLifecycleInfo>`

Fetches debug information of the component's current state.

#### Returns

Type: `Promise<KulDebugLifecycleInfo>`

A promise that resolves with the debug information object.

### `getProps(descriptions?: boolean) => Promise<GenericObject>`

Used to retrieve component's properties and descriptions.

#### Parameters

| Name           | Type      | Description                                           |
| -------------- | --------- | ----------------------------------------------------- |
| `descriptions` | `boolean` | - When true, includes descriptions for each property. |

#### Returns

Type: `Promise<GenericObject<unknown>>`

Promise resolved with an object containing the component's properties.

### `getValue() => Promise<KulToggleState>`

Used to retrieve the component's current state.

#### Returns

Type: `Promise<KulToggleState>`

Promise resolved with the current state of the component.

### `refresh() => Promise<void>`

This method is used to trigger a new render of the component.

#### Returns

Type: `Promise<void>`



### `setValue(value: KulToggleState | boolean) => Promise<void>`

Sets the component's state.

#### Parameters

| Name    | Type                        | Description                                 |
| ------- | --------------------------- | ------------------------------------------- |
| `value` | `boolean \| KulToggleState` | - The new state to be set on the component. |

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

| Name                             | Description                                                                               |
| -------------------------------- | ----------------------------------------------------------------------------------------- |
| `--kul-toggle-font-family`       | Sets font family of the toggle's label. Defaults to var(--kul-font-family).               |
| `--kul-toggle-font-size`         | Sets font size of the toggle's label. Defaults to var(--kul-font-size).                   |
| `--kul-toggle-font-weight`       | Sets font weight of the toggle's label. Defaults to 400.                                  |
| `--kul-toggle-label-color`       | Sets text color of the toggle's label. Defaults to var(--kul-text-color).                 |
| `--kul-toggle-primary-color`     | Sets primary color of the component. Defaults to var(--kul-primary-color).                |
| `--kul-toggle-primary-color-rgb` | Sets primary color RGB values of the component. Defaults to var(--kul-primary-color-rgb). |
| `--kul-toggle-thumb-color`       | Sets thumb color. Defaults to var(--kul-border-color).                                    |


## Dependencies

### Used by

 - [kul-showcase-toggle](../kul-showcase/components/toggle)

### Graph
```mermaid
graph TD;
  kul-showcase-toggle --> kul-toggle
  style kul-toggle fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
