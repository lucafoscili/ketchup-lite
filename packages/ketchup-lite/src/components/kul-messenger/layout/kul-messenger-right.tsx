import { Fragment, h } from '@stencil/core';
import { KulMessengerAdapter } from '../kul-messenger-declarations';
import { KulButtonEventPayload } from '../../kul-button/kul-button-declarations';
import { prepOptions } from '../options/kul-messenger-active';
import { prepFilters, prepList } from '../options/kul-messenger-customization';

export const prepRight = (adapter: KulMessengerAdapter) => {
    const ui = adapter.get.messenger.ui();
    const className = {
        messenger__right: true,
        'messenger__right--collapsed': ui.panels.isRightCollapsed,
        'messenger__right--customization': ui.customization,
    };
    return (
        <div class={className}>
            {ui.customization ? (
                <Fragment>
                    <div class="messenger__options__filters">
                        {prepFilters(adapter)}
                        <div class="messenger__options__list">
                            {prepList(adapter)}
                        </div>
                    </div>
                    <kul-button
                        class="kul-full-width"
                        id="customization-right-button"
                        kulIcon="arrow_back"
                        kulLabel="Back"
                        onKul-button-event={buttonEventHandler.bind(
                            buttonEventHandler,
                            adapter
                        )}
                    ></kul-button>
                </Fragment>
            ) : (
                <Fragment>
                    <div class="messenger__options__active">
                        {prepOptions(adapter)}
                    </div>
                    <kul-button
                        class="kul-full-width"
                        id="active-right-button"
                        kulIcon="auto-fix"
                        kulLabel="Customize"
                        onKul-button-event={buttonEventHandler.bind(
                            buttonEventHandler,
                            adapter
                        )}
                    ></kul-button>
                </Fragment>
            )}
        </div>
    );
};

const buttonEventHandler = (
    adapter: KulMessengerAdapter,
    e: CustomEvent<KulButtonEventPayload>
) => {
    const { eventType, id } = e.detail;
    const customizationSetter = adapter.set.messenger.ui.customization;

    switch (eventType) {
        case 'click':
            switch (id) {
                case 'active-right-button':
                    customizationSetter(true);
                    break;
                case 'customization-right-button':
                    customizationSetter(false);
                    break;
            }
            break;
    }
};
