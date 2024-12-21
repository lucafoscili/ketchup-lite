# kul-showcase-accordion



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
- [kul-compare](../../../kul-compare)

### Graph
```mermaid
graph TD;
  kul-showcase-compare --> kul-article
  kul-showcase-compare --> kul-compare
  kul-compare --> kul-tree
  kul-compare --> kul-button
  kul-tree --> kul-textfield
  kul-button --> kul-image
  kul-button --> kul-list
  kul-image --> kul-spinner
  kul-image --> kul-badge
  kul-badge --> kul-image
  kul-showcase --> kul-showcase-compare
  style kul-showcase-compare fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
