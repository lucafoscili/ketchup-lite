import { h, VNode } from '@stencil/core';
import { getShapes } from '../helpers/shapes';
import { KulCardAdapter } from '../kul-card-declarations';

export function getLayoutB(adapter: KulCardAdapter): VNode {
    const card = adapter.get.card();
    const shapes = adapter.get.shapes();
    const eventDispatcher = adapter.actions.dispatchEvent;

    const button =
        getShapes.button(shapes.button, eventDispatcher, {
            htmlProps: {
                className: 'kul-full-width',
            },
            kulIcon: 'content_copy',
            kulLabel: 'Copy selected',
            kulStyling: 'flat',
        })?.[0] || null;
    const chart =
        getShapes.chart(shapes.chart, eventDispatcher, {
            kulLegend: 'hidden',
            kulTypes: ['bar'],
        })?.[0] || null;
    const chip =
        getShapes.chip(shapes.chip, eventDispatcher, {
            kulStyle: '#kul-component .chip-set { height: auto; }',
            kulStyling: 'filter',
        })?.[0] || null;

    const className = {
        [`layout-${card.kulLayout}`]: true,
    };

    return (
        <div class={className}>
            {chart && <div class="sub-1 chart">{chart}</div>}
            {chip && <div class="sub-2 chip">{chip}</div>}
            {button && <div class="sub-3 button">{button}</div>}
        </div>
    );
}
