# kul-showcase



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute   | Description                    | Type     | Default |
| ---------- | ----------- | ------------------------------ | -------- | ------- |
| `kulStyle` | `kul-style` | Custom style of the component. | `string` | `''`    |


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




## Dependencies

### Depends on

- [kul-card](../kul-card)
- [kul-button](../kul-button)
- [kul-article](../kul-article)

### Graph
```mermaid
graph TD;
  kul-showcase --> kul-card
  kul-showcase --> kul-button
  kul-showcase --> kul-article
  kul-button --> kul-image
  kul-button --> kul-list
  kul-image --> kul-spinner
  kul-image --> kul-badge
  kul-badge --> kul-image
  style kul-showcase fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
