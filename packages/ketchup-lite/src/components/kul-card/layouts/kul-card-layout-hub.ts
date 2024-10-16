import { VNode } from '@stencil/core';
import { KulCardLayout } from '../kul-card-declarations';
import { getLayoutA } from './kul-card-layout-a';
import { KulCard } from '../kul-card';
import { KulDataShapesMap } from '../../../components';
import { getLayoutB } from './kul-card-layout-b';

export const LAYOUT_HUB: {
    [K in KulCardLayout]: (card: KulCard, shapes?: KulDataShapesMap) => VNode;
} = {
    a: (card, shapes) => getLayoutA(card, shapes),
    b: (card, shapes) => getLayoutB(card, shapes),
};
