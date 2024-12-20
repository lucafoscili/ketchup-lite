import { FunctionalComponent, h } from "@stencil/core";
import { kulManagerSingleton } from "src";
import { KulDataNode } from "src/managers/kul-data/kul-data-declarations";

//#region Tree node content
export const TreeNodeContent: FunctionalComponent<{
  depth?: number;
  expanded?: boolean;
  node?: KulDataNode;
  type: "dropdown" | "expand" | "icon" | "padding" | "placeholder";
  onClickExpand?: (e: MouseEvent) => void;
}> = ({ depth, expanded = false, node, onClickExpand, type }) => {
  const { get } = kulManagerSingleton.assets;

  switch (type) {
    case "dropdown":
      return (
        <div
          class={`node__dropdown ${
            expanded ? "node__dropdown--expanded" : ""
          } `}
        ></div>
      );
    case "expand":
      return (
        <div
          class={`node__expand ${expanded ? "node__expand--expanded" : ""} `}
          onClick={onClickExpand}
        ></div>
      );
    case "icon":
      const { style } = get(`./assets/svg/${node.icon}.svg`);
      return <div class={"node__icon"} style={style}></div>;
    case "padding":
      return (
        <div
          class="node__padding"
          style={{
            ["--kul_tree_padding_multiplier"]: depth.toString(),
          }}
        ></div>
      );
    default:
      return <div class={"node__expand node__expand--placeholder"}></div>;
  }
};
//#endregion
