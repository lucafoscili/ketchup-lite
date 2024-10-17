import { h, VNode } from '@stencil/core';
import { getShapes } from '../helpers/shapes';
import { KulCardAdapter } from '../kul-card-declarations';

export function getKeywordsLayout(adapter: KulCardAdapter): VNode {
    const card = adapter.get.card();
    const shapes = adapter.get.shapes();
    const eventDispatcher = adapter.actions.dispatchEvent;

    const button =
        getShapes(
            'KulButton',
            'button',
            shapes.button,
            eventDispatcher,
            {
                htmlProps: {
                    className: 'kul-full-width',
                },
                kulIcon: 'content_copy',
                kulLabel: 'Copy selected',
                kulStyling: 'flat',
            },
            (e) => {
                const { comp, eventType } = e.detail;

                if (eventType === 'pointerdown') {
                    comp.setMessage();
                }
            }
        )?.[0] || null;
    const chart =
        getShapes('KulChart', 'chart', shapes.chart, eventDispatcher, {
            kulLegend: 'hidden',
            kulTypes: ['bar'],
        })?.[0] || null;
    const chip =
        getShapes('KulChip', 'chip', shapes.chip, eventDispatcher, {
            kulStyle: '#kul-component .chip-set { height: auto; }',
            kulStyling: 'filter',
        })?.[0] || null;

    const className = {
        [`${card.kulLayout}-layout`]: true,
    };

    return (
        <div class={className}>
            {chart && <div class="sub-1 chart">{chart}</div>}
            {chip && <div class="sub-2 chip">{chip}</div>}
            {button && <div class="sub-3 button">{button}</div>}
        </div>
    );
}
