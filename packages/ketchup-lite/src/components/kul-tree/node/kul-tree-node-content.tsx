import { FunctionalComponent, getAssetPath, h } from '@stencil/core';
import { KulDataNode } from '../../../managers/kul-data/kul-data-declarations';

export const TreeNodeContent: FunctionalComponent<{
    depth?: number;
    expanded?: boolean;
    node?: KulDataNode;
    type: 'dropdown' | 'expand' | 'icon' | 'padding' | 'placeholder';
    onClickExpand?: (e: MouseEvent) => void;
}> = ({ depth, expanded = false, node, onClickExpand, type }) => {
    switch (type) {
        //#region dropdown
        case 'dropdown':
            return (
                <div
                    class={`node__dropdown ${
                        expanded ? 'node__dropdown--expanded' : ''
                    } `}
                ></div>
            );
        //#endregion

        //#region expand
        case 'expand':
            return (
                <div
                    class={`node__expand ${
                        expanded ? 'node__expand--expanded' : ''
                    } `}
                    onClick={onClickExpand}
                ></div>
            );
        //#endregion

        //#region icon
        case 'icon':
            const path = getAssetPath(`./assets/svg/${node.icon}.svg`);
            const style = {
                mask: `url('${path}') no-repeat center`,
                webkitMask: `url('${path}') no-repeat center`,
            };
            return <div class={'node__icon'} style={style}></div>;
        //#endregion

        //#region padding
        case 'padding':
            return (
                <div
                    class="node__padding"
                    style={{
                        ['--kul_tree_padding_multiplier']: depth.toString(),
                    }}
                ></div>
            );
        //#endregion
        default:
            return <div class={'node__expand node__expand--placeholder'}></div>;
    }
};
