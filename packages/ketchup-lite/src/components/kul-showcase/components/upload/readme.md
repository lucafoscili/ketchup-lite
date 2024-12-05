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
- [kul-upload](../../../kul-upload)

### Graph
```mermaid
graph TD;
  kul-showcase-upload --> kul-article
  kul-showcase-upload --> kul-upload
  kul-upload --> kul-image
  kul-upload --> kul-button
  kul-image --> kul-spinner
  kul-image --> kul-badge
  kul-badge --> kul-image
  kul-button --> kul-image
  kul-button --> kul-list
  kul-showcase --> kul-showcase-upload
  style kul-showcase-upload fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
