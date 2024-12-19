import { FunctionalComponent, h } from "@stencil/core";
import { KulDataCyAttributes } from "src/types/GenericTypes";
import { KulTreeNodeProps } from "../kul-tree-declarations";
import { TreeNodeContent } from "./node-content";

//#region Tree node
export const TreeNode: FunctionalComponent<KulTreeNodeProps> = (
  props: KulTreeNodeProps,
) => {
  const { accordionLayout, depth, elements, events, expanded, node, selected } =
    props || {};

  const icon = node.icon ? (
    <TreeNodeContent node={node} type="icon"></TreeNodeContent>
  ) : (
    <TreeNodeContent type="placeholder"></TreeNodeContent>
  );

  const className = {
    node: true,
    ["node--expanded"]: expanded ? true : false,
    ["node--selected"]: selected ? true : false,
  };

  if (accordionLayout) {
    return (
      <div
        class={className}
        data-depth={depth.toString()}
        key={node.id}
        onClick={events.onClickExpand}
        onPointerDown={events.onPointerDown}
        title={node.description}
      >
        <div class="node__content">
          {elements.ripple}
          {icon}
          {elements.value}
          {node.children?.length ? (
            <TreeNodeContent
              expanded={expanded}
              node={node}
              type="dropdown"
            ></TreeNodeContent>
          ) : (
            <TreeNodeContent type="placeholder"></TreeNodeContent>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div
        class={`node ${expanded ? "node--expanded" : ""} ${
          selected ? "node--selected" : ""
        }`}
        data-cy={KulDataCyAttributes.NODE}
        data-depth={depth.toString()}
        key={node.id}
        onClick={events.onClick}
        onPointerDown={events.onPointerDown}
        title={node.description}
      >
        <div class="node__content">
          {elements.ripple}
          <TreeNodeContent depth={depth} type="padding"></TreeNodeContent>
          {node.children?.length ? (
            <TreeNodeContent
              expanded={expanded}
              node={node}
              onClickExpand={events.onClickExpand}
              type="expand"
            ></TreeNodeContent>
          ) : (
            <TreeNodeContent type="placeholder"></TreeNodeContent>
          )}
          {icon}
          {elements.value}
        </div>
      </div>
    );
  }
};
//#endregion
