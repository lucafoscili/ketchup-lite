# kul-card



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute    | Description                                                                               | Type                                   | Default      |
| ----------- | ------------ | ----------------------------------------------------------------------------------------- | -------------------------------------- | ------------ |
| `kulData`   | --           | The actual data of the card.                                                              | `KulDataDataset`                       | `null`       |
| `kulLayout` | `kul-layout` | Sets the layout.                                                                          | `"keywords" \| "material" \| "upload"` | `'material'` |
| `kulSizeX`  | `kul-size-x` | The width of the card, defaults to 100%. Accepts any valid CSS format (px, %, vw, etc.).  | `string`                               | `'100%'`     |
| `kulSizeY`  | `kul-size-y` | The height of the card, defaults to 100%. Accepts any valid CSS format (px, %, vh, etc.). | `string`                               | `'100%'`     |
| `kulStyle`  | `kul-style`  | Custom style of the component.                                                            | `string`                               | `''`         |


## Events

| Event            | Description                       | Type                               |
| ---------------- | --------------------------------- | ---------------------------------- |
| `kul-card-event` | Triggered when an event is fired. | `CustomEvent<KulCardEventPayload>` |


## Methods

### `getDebugInfo() => Promise<KulDebugComponentInfo>`

Fetches debug information of the component's current state.

#### Returns

Type: `Promise<KulDebugComponentInfo>`

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

### `getShapes() => Promise<KulDataShapesMap>`

Used to retrieve component's shapes.

#### Returns

Type: `Promise<KulDataShapesMap>`

Map of shapes.

### `refresh() => Promise<void>`

This method is used to trigger a new render of the component.

#### Returns

Type: `Promise<void>`




## CSS Custom Properties

| Name                  | Description                                                                             |
| --------------------- | --------------------------------------------------------------------------------------- |
| `--kul-card-backdrop` | Sets the backdrop color of the component when visible. Defaults to rgba(0, 0, 0, 0.32). |


## Dependencies

### Used by

 - [kul-showcase](../kul-showcase)
 - [kul-showcase-card](../kul-showcase/components/card)

### Graph
```mermaid
graph TD;
  kul-showcase --> kul-card
  kul-showcase-card --> kul-card
  style kul-card fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
