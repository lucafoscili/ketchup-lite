import { h } from '@stencil/core';
import { KulCarouselAdapterComponents } from '../kul-carousel-declarations';

const BACK_ICON = 'chevron_left';
const FORWARD_ICON = 'chevron_right';

export const COMPONENTS: KulCarouselAdapterComponents = {
    //#region Back
    back: (adapter) => {
        return (
            <kul-button
                class="kul-full-height"
                id={BACK_ICON}
                kulIcon="chevron_left"
                onClick={() => adapter.actions.previous(adapter)}
                title="View previous slide."
            ></kul-button>
        );
    },
    //#endregion

    //#region Forward
    forward: (adapter) => {
        return (
            <kul-button
                class="kul-full-height"
                id={BACK_ICON}
                kulIcon={FORWARD_ICON}
                onClick={() => adapter.actions.next(adapter)}
                title="View next slide."
            ></kul-button>
        );
    },
    //#endregion
};
