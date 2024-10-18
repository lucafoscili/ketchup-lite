import { h, VNode } from '@stencil/core';
import { KulCardAdapter } from '../kul-card-declarations';
import { getShapes } from '../helpers/kul-card-shapes';
import { DEFAULTS } from '../helpers/kul-card-defaults';

export function getUploadLayout(adapter: KulCardAdapter): VNode {
    const card = adapter.get.card();
    const shapes = adapter.get.shapes();
    const eventDispatcher = adapter.actions.dispatchEvent;

    const buttons = getShapes(
        'KulButton',
        'button',
        shapes.button,
        eventDispatcher,
        DEFAULTS.upload.button()
    );
    const uploads = getShapes(
        'KulUpload',
        'upload',
        shapes.upload,
        eventDispatcher
    );

    const className = {
        [`${card.kulLayout}-layout`]: true,
    };

    return (
        <div class={className}>
            {uploads?.element?.length && (
                <div class="section-1 upload">{uploads.element[0]}</div>
            )}
            {buttons?.element?.length && (
                <div class="section-2 button">{buttons.element[0]}</div>
            )}
        </div>
    );
}
