import { VNode } from '@stencil/core';
import { KulCardAdapter, KulCardLayout } from '../kul-card-declarations';
import { getKeywordsLayout } from './kul-card-keywords-layout';
import { getMaterialLayout } from './kul-card-material-layout';
import { getUploadLayout } from './kul-card-upload-layout';

export const LAYOUT_HUB: {
    [K in KulCardLayout]: (adapter: KulCardAdapter) => VNode;
} = {
    keywords: (adapter) => getKeywordsLayout(adapter),
    material: (adapter) => getMaterialLayout(adapter),
    upload: (adapter) => getUploadLayout(adapter),
};
