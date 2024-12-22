# kul-drawer



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute   | Description                    | Type     | Default |
| ---------- | ----------- | ------------------------------ | -------- | ------- |
| `kulStyle` | `kul-style` | Custom style of the component. | `string` | `""`    |


## Events

| Event              | Description | Type                                 |
| ------------------ | ----------- | ------------------------------------ |
| `kul-drawer-event` |             | `CustomEvent<KulDrawerEventPayload>` |


## Methods

### `close() => Promise<void>`

Closes the drawer.

#### Returns

Type: `Promise<void>`



### `getDebugInfo() => Promise<KulDebugLifecycleInfo>`

Fetches debug information of the component's current state.

#### Returns

Type: `Promise<KulDebugLifecycleInfo>`

A promise that resolves with the debug information object.

### `getProps() => Promise<KulDrawerPropsInterface>`

Used to retrieve component's properties and descriptions.

#### Returns

Type: `Promise<KulDrawerPropsInterface>`

Promise resolved with an object containing the component's properties.

### `isOpened() => Promise<boolean>`

Returns the state of the drawer.

#### Returns

Type: `Promise<boolean>`

True when opened, false when closed.

### `open() => Promise<void>`

Opens the drawer.

#### Returns

Type: `Promise<void>`



### `refresh() => Promise<void>`

This method is used to trigger a new render of the component.

#### Returns

Type: `Promise<void>`



### `toggle() => Promise<void>`

Opens the drawer when closed and vice-versa.

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

| Name                            | Description                                                                                                                   |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `--kul-drawer-backdrop`         | Sets the backdrop color of the drawer when in slide mode. Defaults to rgba(0, 0, 0, 0.32).                                    |
| `--kul-drawer-box-shadow`       | Sets the box shadow of the drawer when in slide mode. Defaults to a combination of shadows for depth.                         |
| `--kul-drawer-permanent-border` | Sets the border of the drawer in permanent mode. Defaults to a 1px solid border with the color defined by --kul-border-color. |
| `--kul-drawer-slide-transition` | Sets the horizontal transition duration when in slide mode. Defaults to 750ms.                                                |
| `--kul-drawer-transition`       | Sets the transition duration for the drawer. Defaults to 250ms.                                                               |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
