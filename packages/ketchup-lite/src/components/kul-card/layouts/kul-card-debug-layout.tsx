import { h, VNode } from '@stencil/core';
import { KulCardAdapter, KulCardShapesIds } from '../kul-card-declarations';
import { kulManagerInstance } from '../../../managers/kul-manager/kul-manager';
import { KulButtonEventPayload } from '../../kul-button/kul-button-declarations';
import { KulListEventPayload } from '../../kul-list/kul-list-declarations';
import { KulCodeEventPayload } from '../../kul-code/kul-code-declarations';
import { DEFAULTS } from '../helpers/kul-card-defaults';
import { KulSwitchEventPayload } from '../../kul-switch/kul-switch-declarations';

export function getDebugLayout(adapter: KulCardAdapter): VNode {
    const card = adapter.get.card();
    const shapes = adapter.get.shapes();
    const eventDispatcher = adapter.actions.dispatchEvent;
    const decorator = kulManagerInstance().data.cell.shapes.decorate;

    const buttons = decorator(
        'KulButton',
        'button',
        shapes.button,
        eventDispatcher,
        DEFAULTS.debug.button(),
        buttonEventHandler
    );
    const codes = decorator(
        'KulCode',
        'code',
        shapes.code,
        eventDispatcher,
        DEFAULTS.debug.code(),
        codeEventHandler
    );
    const switches = decorator(
        'KulSwitch',
        'switch',
        shapes.switch,
        eventDispatcher,
        DEFAULTS.debug.switch(),
        switchEventHandler
    );

    const className = {
        [`${card.kulLayout}-layout`]: true,
    };

    return (
        <div class={className}>
            {switches?.element?.length && (
                <div class="section-1 switch">{switches.element[0]}</div>
            )}
            {codes?.element?.length && (
                <div class="section-2 code">{codes.element[0]}</div>
            )}
            {buttons?.element?.length && (
                <div class="section-3 button">{buttons.element[0]}</div>
            )}
            {buttons?.element?.length && (
                <div class="section-4 button">{buttons.element[1]}</div>
            )}
        </div>
    );
}

const buttonEventHandler = (e: CustomEvent<KulButtonEventPayload>) => {
    const { eventType, id, originalEvent } = e.detail;

    switch (id) {
        case KulCardShapesIds.CLEAR:
            break;

        case KulCardShapesIds.THEME:
            break;
    }

    switch (eventType) {
        case 'click':
            switch (id) {
                case KulCardShapesIds.CLEAR:
                    kulManagerInstance().debug.logs.dump();
                    break;
                case KulCardShapesIds.THEME:
                    kulManagerInstance().theme.randomTheme();
                    break;
            }
            break;
        case 'kul-event':
            switch (id) {
                case KulCardShapesIds.THEME:
                    listEventHandler(
                        originalEvent as CustomEvent<KulListEventPayload>
                    );
                    break;
            }
            break;
    }
};

const codeEventHandler = (e: CustomEvent<KulCodeEventPayload>) => {
    const { comp, eventType } = e.detail;

    switch (eventType) {
        case 'ready':
            kulManagerInstance().debug.register(comp);
            break;
        case 'unmount':
            kulManagerInstance().debug.unregister(comp);
            break;
    }
};

const listEventHandler = (e: CustomEvent<KulListEventPayload>) => {
    const { eventType, node } = e.detail;

    switch (eventType) {
        case 'click':
            kulManagerInstance().theme.set(node.id);
            break;
    }
};

const switchEventHandler = (e: CustomEvent<KulSwitchEventPayload>) => {
    const { comp, eventType, value } = e.detail;
    const boolValue = value === 'on' ? true : false;

    switch (eventType) {
        case 'change':
            kulManagerInstance().debug.toggle(boolValue, false);
            break;
        case 'ready':
            kulManagerInstance().debug.register(comp);
            break;
        case 'unmount':
            kulManagerInstance().debug.unregister(comp);
            break;
    }
};
