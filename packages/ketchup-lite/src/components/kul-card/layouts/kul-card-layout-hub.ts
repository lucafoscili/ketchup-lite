import { VNode } from '@stencil/core';
import { KulCardAdapter, KulCardLayout } from '../kul-card-declarations';
import { getLayoutA } from './kul-card-layout-a';
import { getLayoutB } from './kul-card-layout-b';

export const LAYOUT_HUB: {
    [K in KulCardLayout]: (adapter: KulCardAdapter) => VNode;
} = {
    a: (adapter) => getLayoutA(adapter),
    b: (adapter) => getLayoutB(adapter),
};
