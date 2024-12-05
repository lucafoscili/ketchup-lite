# kul-showcase-badge



<!-- Auto Generated Below -->


## Shadow Parts

| Part               | Description |
| ------------------ | ----------- |
| `"examples-title"` |             |
| `"grid"`           |             |


## Dependencies

### Used by

 - [kul-showcase](../..)

### Depends on

- [kul-article](../../../kul-article)
- [kul-button](../../../kul-button)
- [kul-splash](../../../kul-splash)
- [kul-spinner](../../../kul-spinner)

### Graph
```mermaid
graph TD;
  kul-showcase-splash --> kul-article
  kul-showcase-splash --> kul-button
  kul-showcase-splash --> kul-splash
  kul-showcase-splash --> kul-spinner
  kul-button --> kul-image
  kul-button --> kul-list
  kul-image --> kul-spinner
  kul-image --> kul-badge
  kul-badge --> kul-image
  kul-showcase --> kul-showcase-splash
  style kul-showcase-splash fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
