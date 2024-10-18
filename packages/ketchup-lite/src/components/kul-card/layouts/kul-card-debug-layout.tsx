import { h, VNode } from '@stencil/core';
import { KulCardAdapter } from '../kul-card-declarations';
import { getShapes } from '../helpers/shapes';
import { KulDataNode } from '../../../managers/kul-data/kul-data-declarations';
import { kulManagerInstance } from '../../../managers/kul-manager/kul-manager';
import { KulButtonEventPayload } from '../../kul-button/kul-button-declarations';
import { KulListEventPayload } from '../../kul-list/kul-list-declarations';
import { KulCodeEventPayload } from '../../kul-code/kul-code-declarations';

const KUL_MANAGER = kulManagerInstance();

export function getDebugLayout(adapter: KulCardAdapter): VNode {
    const card = adapter.get.card();
    const shapes = adapter.get.shapes();
    const eventDispatcher = adapter.actions.dispatchEvent;

    const buttons = getShapes(
        'KulButton',
        'button',
        shapes.button,
        eventDispatcher,
        {
            htmlProps: {
                className: 'kul-full-width',
            },
            kulData: {
                nodes: [
                    {
                        icon: 'style',
                        id: 'root',
                        value: 'Random theme',
                        children: getThemes(),
                    },
                ],
            },
        },
        buttonEventHandler
    );
    const codes = getShapes(
        'KulCode',
        'code',
        shapes.code,
        eventDispatcher,
        { kulLanguage: 'markdown' },
        codeEventHandler
    );

    const className = {
        [`${card.kulLayout}-layout`]: true,
    };

    return (
        <div class={className}>
            {codes?.element?.length && (
                <div class="section-1 code">{codes.element[0]}</div>
            )}
            {buttons?.element?.length && (
                <div class="section-2 button">{buttons.element[0]}</div>
            )}
        </div>
    );
}

const buttonEventHandler = (e: CustomEvent<KulButtonEventPayload>) => {
    const { eventType, originalEvent } = e.detail;

    switch (eventType) {
        case 'click':
            KUL_MANAGER.theme.randomTheme();
            break;
        case 'kul-event':
            listEventHandler(originalEvent as CustomEvent<KulListEventPayload>);
            break;
    }
};

const codeEventHandler = (e: CustomEvent<KulCodeEventPayload>) => {
    const { comp, eventType } = e.detail;

    switch (eventType) {
        case 'ready':
            KUL_MANAGER.debug.register(comp);
            break;
        case 'unmount':
            KUL_MANAGER.debug.unregister(comp);
            break;
    }
};

const listEventHandler = (e: CustomEvent<KulListEventPayload>) => {
    const { eventType, node } = e.detail;

    switch (eventType) {
        case 'click':
            KUL_MANAGER.theme.set(node.id);
            break;
    }
};

const getThemes = () => {
    const nodes: KulDataNode[] = [];
    KUL_MANAGER.theme.getThemes().forEach((t) => {
        const char0 = t.charAt(0).toUpperCase();
        nodes.push({
            id: t,
            value: `${char0}${t.substring(1)}`,
        });
    });

    return nodes;
};
