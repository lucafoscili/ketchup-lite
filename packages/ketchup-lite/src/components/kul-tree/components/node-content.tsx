import { FunctionalComponent, h } from "@stencil/core";
import { KulDataNode } from "src/managers/kul-data/kul-data-declarations";
import type { KulManager } from "src/managers/kul-manager/kul-manager";

//#region Tree node content
export const TreeNodeContent: FunctionalComponent<{
  depth?: number;
  expanded?: boolean;
  manager: KulManager;
  node?: KulDataNode;
  type: "dropdown" | "expand" | "icon" | "padding" | "placeholder";
  onClickExpand?: (e: MouseEvent) => void;
}> = ({ depth, expanded = false, manager, node, onClickExpand, type }) => {
  const { get } = manager.assets;
  const { bemClass } = manager.theme;

  switch (type) {
    case "dropdown":
      return (
        <div
          class={bemClass("node", "dropdown", {
            expanded,
          })}
        ></div>
      );
    case "expand":
      return (
        <div
          class={bemClass("node", "expand", {
            expanded,
          })}
          onClick={onClickExpand}
        ></div>
      );
    case "icon":
      const { style } = get(`./assets/svg/${node.icon}.svg`);
      return <div class={bemClass("node", "icon")} style={style}></div>;
    case "padding":
      return (
        <div
          class={bemClass("node", "padding")}
          style={{
            ["--kul_tree_padding_multiplier"]: depth.toString(),
          }}
        ></div>
      );
    default:
      return (
        <div
          class={bemClass("node", "expand", {
            placeholder: true,
          })}
        ></div>
      );
  }
};
//#endregion
