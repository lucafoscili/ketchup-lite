# kul-showcase



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute   | Description                    | Type     | Default |
| ---------- | ----------- | ------------------------------ | -------- | ------- |
| `kulStyle` | `kul-style` | Custom style of the component. | `string` | `""`    |


## Dependencies

### Depends on

- [kul-article](../kul-article)
- [kul-button](../kul-button)
- [kul-card](../kul-card)

### Graph
```mermaid
graph TD;
  kul-showcase --> kul-article
  kul-showcase --> kul-button
  kul-showcase --> kul-card
  kul-button --> kul-image
  kul-button --> kul-list
  kul-image --> kul-spinner
  kul-image --> kul-badge
  kul-badge --> kul-image
  style kul-showcase fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
