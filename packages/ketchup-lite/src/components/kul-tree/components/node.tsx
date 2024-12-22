import { FunctionalComponent, h } from "@stencil/core";
import { kulManagerSingleton } from "src/global/global";
import { KulDataCyAttributes } from "src/types/GenericTypes";
import { KulTreeNodeProps } from "../kul-tree-declarations";
import { TreeNodeContent } from "./node-content";

//#region Tree node
export const TreeNode: FunctionalComponent<KulTreeNodeProps> = (
  props: KulTreeNodeProps,
) => {
  const { bemClass } = kulManagerSingleton.theme;

  const { accordionLayout, depth, elements, events, expanded, node, selected } =
    props || {};

  const icon = node.icon ? (
    <TreeNodeContent node={node} type="icon"></TreeNodeContent>
  ) : (
    <TreeNodeContent type="placeholder"></TreeNodeContent>
  );

  if (accordionLayout) {
    return (
      <div
        class={bemClass("node", null, {
          expanded,
          selected,
        })}
        data-cy={KulDataCyAttributes.NODE}
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
        class={bemClass("node", null, {
          expanded,
          selected,
        })}
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
