import { h } from '@stencil/core';
import { KulChatAdapter } from '../kul-chat-declarations';
import { KulButtonEventPayload } from '../../kul-button/kul-button-declarations';

export const prepInputArea = (adapter: KulChatAdapter) => {
    return (
        <div class="chat__request__input">
            <kul-button
                class="chat__request__input__button kul-full-height"
                kulIcon="settings"
                kulStyling="flat"
                onKul-button-event={settingsEventHandler.bind(
                    settingsEventHandler,
                    adapter
                )}
                ref={(el) => {
                    if (el) {
                        adapter.set.ui.button.settings(el);
                    }
                }}
            ></kul-button>
            <kul-textfield
                class="chat__request__input__textarea"
                kulFullWidth={true}
                kulLabel="What's on your mind?"
                kulStyling="textarea"
                ref={(el) => {
                    if (el) {
                        adapter.set.ui.textarea(el);
                    }
                }}
            ></kul-textfield>
            {prepProgressBar(adapter)}
        </div>
    );
};

export const prepButtons = (adapter: KulChatAdapter) => {
    return (
        <div class="chat__request__buttons">
            <kul-button
                kulLabel="Clear"
                kulStyling={'flat'}
                onKul-button-event={clearEventHandler.bind(
                    clearEventHandler,
                    adapter
                )}
                ref={(el) => {
                    if (el) {
                        adapter.set.ui.button.clear(el);
                    }
                }}
            ></kul-button>
            <kul-button
                class="chat__request__buttons__stt"
                kulIcon="keyboard_voice"
                kulStyling={'icon'}
                onKul-button-event={sttEventHandler.bind(
                    sttEventHandler,
                    adapter
                )}
                ref={(el) => {
                    if (el) {
                        adapter.set.ui.button.stt(el);
                    }
                }}
            >
                <kul-spinner
                    kulActive={true}
                    kulDimensions="0.6em"
                    kulLayout={6}
                    slot="spinner"
                ></kul-spinner>
            </kul-button>
            <kul-button
                kulIcon="check"
                kulLabel="Send"
                onKul-button-event={sendEventHandler.bind(
                    sendEventHandler,
                    adapter
                )}
                ref={(el) => {
                    if (el) {
                        adapter.set.ui.button.send(el);
                    }
                }}
            >
                <kul-spinner
                    kulActive={true}
                    kulDimensions="0.6em"
                    slot="spinner"
                ></kul-spinner>
            </kul-button>
        </div>
    );
};

const prepProgressBar = (adapter: KulChatAdapter) => {
    const currentContext = adapter.get.status.usage()?.total_tokens;
    const maxContext = adapter.get.props?.contextWindow();
    if (isNaN(currentContext) || isNaN(maxContext)) {
        return;
    }
    const value = (currentContext / maxContext) * 100;
    const status =
        value > 80 ? 'kul-danger' : value > 50 ? 'kul-warning' : 'kul-success';
    const cssClass = {
        chat__request__input__progressbar: true,
        [status]: true,
        ['kul-animated']: true,
        ['kul-striped']: true,
    };
    return (
        <kul-progressbar
            class={cssClass}
            kulCenteredLabel={true}
            kulIcon="data_usage"
            kulLabel="Remaining context"
            kulValue={value}
            title={`Used tokens: ${currentContext}/${maxContext}`}
        ></kul-progressbar>
    );
};

const clearEventHandler = async (
    adapter: KulChatAdapter,
    e: CustomEvent<KulButtonEventPayload>
) => {
    const { eventType } = e.detail;

    switch (eventType) {
        case 'click':
            await adapter.get.ui.textarea().setValue('');
            await adapter.get.ui.textarea().setFocus();
            break;
    }
};

const sendEventHandler = async (
    adapter: KulChatAdapter,
    e: CustomEvent<KulButtonEventPayload>
) => {
    const { eventType } = e.detail;

    const value = await adapter.get.ui.textarea().getValue();

    switch (eventType) {
        case 'click':
            if (value) {
                adapter.actions.send(value);
            }
            break;
    }
};

const settingsEventHandler = (
    adapter: KulChatAdapter,
    e: CustomEvent<KulButtonEventPayload>
) => {
    const { eventType } = e.detail;

    switch (eventType) {
        case 'click':
            adapter.set.status.view('settings');
            break;
    }
};

const sttEventHandler = (
    adapter: KulChatAdapter,
    e: CustomEvent<KulButtonEventPayload>
) => {
    const { eventType } = e.detail;

    switch (eventType) {
        case 'click':
            adapter.actions.stt();
            break;
    }
};
