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
- [kul-imageviewer](../../../kul-imageviewer)

### Graph
```mermaid
graph TD;
  kul-showcase-imageviewer --> kul-article
  kul-showcase-imageviewer --> kul-imageviewer
  kul-imageviewer --> kul-canvas
  kul-imageviewer --> kul-button
  kul-imageviewer --> kul-spinner
  kul-imageviewer --> kul-tree
  kul-imageviewer --> kul-masonry
  kul-imageviewer --> kul-textfield
  kul-canvas --> kul-image
  kul-image --> kul-spinner
  kul-image --> kul-badge
  kul-badge --> kul-image
  kul-button --> kul-image
  kul-button --> kul-list
  kul-tree --> kul-textfield
  kul-masonry --> kul-button
  kul-showcase --> kul-showcase-imageviewer
  style kul-showcase-imageviewer fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
