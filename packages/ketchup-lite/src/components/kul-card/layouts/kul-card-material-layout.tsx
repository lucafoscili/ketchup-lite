import { h, VNode } from '@stencil/core';
import { kulManagerInstance } from '../../../managers/kul-manager/kul-manager';
import { RIPPLE_SURFACE_CLASS } from '../../../variables/GenericVariables';
import { KulCardAdapter, KulCardCSSClasses } from '../kul-card-declarations';
import { KulDataCyAttributes } from '../../../types/GenericTypes';
import { getShapes } from '../helpers/kul-card-shapes';
import { DEFAULTS } from '../helpers/kul-card-defaults';

const KUL_MANAGER = kulManagerInstance();

export function getMaterialLayout(adapter: KulCardAdapter): VNode {
    const card = adapter.get.card();
    const shapes = adapter.get.shapes();
    const eventDispatcher = adapter.actions.dispatchEvent;

    const buttons = getShapes(
        'KulButton',
        'button',
        shapes.button,
        eventDispatcher
    );
    const images = getShapes(
        'KulImage',
        'image',
        shapes.image,
        eventDispatcher,
        DEFAULTS.material.image()
    );
    const texts = getShapes(
        'KulTextfield',
        'text',
        shapes.text,
        eventDispatcher
    );

    const coverIndex = 0;
    const cover: VNode = images.element?.length
        ? images.element[coverIndex]
        : null;

    const titleIndex = 0;
    const title = texts.element?.length ? shapes.text[titleIndex].value : null;

    const subtitleIndex = 1;
    const subtitle =
        texts.element?.length > subtitleIndex
            ? shapes.text[subtitleIndex].value
            : null;

    const descriptionIndex = 2;
    const description =
        texts.element?.length > descriptionIndex
            ? shapes.text[descriptionIndex].value
            : undefined;

    const className = {
        [`${card.kulLayout}-layout`]: true,
        [KulCardCSSClasses.HAS_ACTIONS]: !!buttons.element?.length,
    };

    return (
        <div class={className}>
            <div
                class={RIPPLE_SURFACE_CLASS}
                data-cy={KulDataCyAttributes.RIPPLE}
                onPointerDown={(e) => {
                    KUL_MANAGER.theme.ripple.trigger(
                        e as PointerEvent,
                        e.currentTarget as HTMLElement
                    );
                }}
            >
                <div class="section-1">{cover}</div>
                <div class="section-2">
                    <div class="sub-2 title">{title}</div>
                    <div class="sub-2 subtitle">{subtitle}</div>
                    <div class="sub-2 description">{description}</div>
                </div>
            </div>
            {buttons.element?.length ? (
                <div class="section-3">{buttons.element}</div>
            ) : null}
        </div>
    );
}
