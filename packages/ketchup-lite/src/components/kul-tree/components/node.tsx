import { FunctionalComponent, h } from "@stencil/core";
import { CY_ATTRIBUTES } from "src/utils/constants";
import { KulTreeNodeProps } from "../kul-tree-declarations";
import { TreeNodeContent } from "./node-content";

//#region Tree node
export const TreeNode: FunctionalComponent<KulTreeNodeProps> = (
  props: KulTreeNodeProps,
) => {
  const { manager } = props;
  const { bemClass } = manager.theme;

  const { accordionLayout, depth, elements, events, expanded, node, selected } =
    props || {};

  const icon = node.icon ? (
    <TreeNodeContent
      manager={manager}
      node={node}
      type="icon"
    ></TreeNodeContent>
  ) : (
    <TreeNodeContent manager={manager} type="placeholder"></TreeNodeContent>
  );

  if (accordionLayout) {
    return (
      <div
        class={bemClass("node", null, {
          expanded,
          selected,
        })}
        data-cy={CY_ATTRIBUTES.node}
        data-depth={depth.toString()}
        key={node.id}
        onClick={events.onClickExpand}
        onPointerDown={events.onPointerDown}
        title={node.description}
      >
        <div class={bemClass("node", "content")}>
          {elements.ripple}
          {icon}
          {elements.value}
          {node.children?.length ? (
            <TreeNodeContent
              expanded={expanded}
              manager={manager}
              node={node}
              type="dropdown"
            ></TreeNodeContent>
          ) : (
            <TreeNodeContent
              manager={manager}
              type="placeholder"
            ></TreeNodeContent>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div
        class={bemClass("node", null, {
          expanded,
          selected,
        })}
        data-cy={CY_ATTRIBUTES.node}
        data-depth={depth.toString()}
        key={node.id}
        onClick={events.onClick}
        onPointerDown={events.onPointerDown}
        title={node.description}
      >
        <div class="node__content">
          {elements.ripple}
          <TreeNodeContent
            depth={depth}
            manager={manager}
            type="padding"
          ></TreeNodeContent>
          {node.children?.length ? (
            <TreeNodeContent
              expanded={expanded}
              manager={manager}
              node={node}
              onClickExpand={events.onClickExpand}
              type="expand"
            ></TreeNodeContent>
          ) : (
            <TreeNodeContent
              manager={manager}
              type="placeholder"
            ></TreeNodeContent>
          )}
          {icon}
          {elements.value}
        </div>
      </div>
    );
  }
};
//#endregion
