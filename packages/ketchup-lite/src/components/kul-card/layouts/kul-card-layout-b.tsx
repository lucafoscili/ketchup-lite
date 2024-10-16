import { h, VNode } from '@stencil/core';
import { KulCard } from '../kul-card';
import { KulDataShapesMap } from '../../../managers/kul-data/kul-data-declarations';
import { getShapes } from '../helpers/shapes';

export function getLayoutB(
    component: KulCard,
    shapes: KulDataShapesMap = {}
): VNode {
    const button =
        getShapes.button(shapes.button, {
            htmlProps: {
                className: 'kul-full-width',
            },
            kulIcon: 'content_copy',
            kulLabel: 'Copy selected',
            kulStyling: 'flat',
        })?.[0] || null;
    const chart =
        getShapes.chart(shapes.chart, {
            kulLegend: 'hidden',
            kulTypes: ['bar'],
        })?.[0] || null;
    const chip =
        getShapes.chip(shapes.chip, {
            kulStyle: '#kul-component .chip-set { height: auto; }',
            kulStyling: 'filter',
        })?.[0] || null;

    const classObj = {
        [`layout-${component.kulLayout}`]: true,
        ['has-chart']: !!chart,
        ['has-chip']: !!chip,
        ['has-button']: !!button,
    };
    return (
        <div class={classObj}>
            {chart && <div class="sub-1 chart">{chart}</div>}
            {chip && <div class="sub-2 chip">{chip}</div>}
            {button && <div class="sub-3 button">{button}</div>}
        </div>
    );
}
