import { h, VNode } from '@stencil/core';
import { KulCardAdapter } from '../kul-card-declarations';
import { KulButtonEventPayload } from '../../kul-button/kul-button-declarations';
import { DEFAULTS } from '../helpers/kul-card-defaults';
import { kulManagerInstance } from '../../../managers/kul-manager/kul-manager';

export function getKeywordsLayout(adapter: KulCardAdapter): VNode {
    const card = adapter.get.card();
    const shapes = adapter.get.shapes();
    const eventDispatcher = adapter.actions.dispatchEvent;
    const decorator = kulManagerInstance().data.cell.shapes.decorate;

    const buttonEventHandler = async (
        e: CustomEvent<KulButtonEventPayload>
    ) => {
        const { comp, eventType } = e.detail;
        const chipEl = chips?.ref?.[0] as HTMLKulChipElement;

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

    const buttons = decorator(
        'button',
        shapes.button,
        eventDispatcher,
        DEFAULTS.keywords.button(),
        buttonEventHandler
    );
    const charts = decorator(
        'chart',
        shapes.chart,
        eventDispatcher,
        DEFAULTS.keywords.chart()
    );
    const chips = decorator(
        'chip',
        shapes.chip,
        eventDispatcher,
        DEFAULTS.keywords.chip()
    );

    const className = {
        [`${card.kulLayout}-layout`]: true,
    };

    return (
        <div class={className}>
            {charts?.element?.length && (
                <div class="section-1 chart">{charts.element[0]}</div>
            )}
            {chips?.element?.length && (
                <div class="section-2 chip">{chips.element[0]}</div>
            )}
            {buttons?.element?.length && (
                <div class="section-3 button">{buttons.element[0]}</div>
            )}
        </div>
    );
}
