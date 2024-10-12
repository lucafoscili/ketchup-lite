import { VNode } from '@stencil/core';
import { KulDataNode } from '../../../managers/kul-data/kul-data-declarations';

export interface KulTreeNodeProps {
    accordionLayout: boolean;
    depth: number;
    elements: { ripple: VNode; value: VNode };
    events: {
        onClick: (event: MouseEvent) => void;
        onClickExpand: (event: MouseEvent) => void;
        onPointerDown: (event: MouseEvent) => void;
    };
    expanded: boolean;
    node: KulDataNode;
    selected: boolean;
}
