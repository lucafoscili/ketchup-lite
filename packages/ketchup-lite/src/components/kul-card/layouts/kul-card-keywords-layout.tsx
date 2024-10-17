import { h, VNode } from '@stencil/core';
import { getShapes } from '../helpers/shapes';
import { KulCardAdapter } from '../kul-card-declarations';
import { KulButtonEventPayload } from '../../kul-button/kul-button-declarations';

export function getKeywordsLayout(adapter: KulCardAdapter): VNode {
    const card = adapter.get.card();
    const shapes = adapter.get.shapes();
    const eventDispatcher = adapter.actions.dispatchEvent;
    const buttonEventHandler = async (
        e: CustomEvent<KulButtonEventPayload>
    ) => {
        const { comp, eventType } = e.detail;
        const chipEl = chip?.ref?.[0] as HTMLKulChipElement;

        if (chipEl && eventType === 'pointerdown') {
            comp.setMessage();
            if (chipEl) {
                const selectedChips: string[] = [];
                (await chipEl.getSelectedNodes()).forEach((n) => {
                    selectedChips.push(n.id);
                });
                navigator.clipboard.writeText(selectedChips.join(', '));
            }
        }
    };

    const button = getShapes(
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
        buttonEventHandler
    );
    const chart = getShapes(
        'KulChart',
        'chart',
        shapes.chart,
        eventDispatcher,
        {
            kulLegend: 'hidden',
            kulTypes: ['bar'],
        }
    );
    const chip = getShapes('KulChip', 'chip', shapes.chip, eventDispatcher, {
        kulStyle: '#kul-component .chip-set { height: auto; }',
        kulStyling: 'filter',
    });

    const className = {
        [`${card.kulLayout}-layout`]: true,
    };

    return (
        <div class={className}>
            {chart?.element?.length && (
                <div class="sub-1 chart">{chart.element[0]}</div>
            )}
            {chip?.element?.length && (
                <div class="sub-2 chip">{chip.element[0]}</div>
            )}
            {button?.element?.length && (
                <div class="sub-3 button">{button.element[0]}</div>
            )}
        </div>
    );
}
