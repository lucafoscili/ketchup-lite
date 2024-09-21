import { h } from '@stencil/core';
import { KulChatAdapter } from '../kul-chat-declarations';
import { KulButtonEventPayload } from '../../kul-button/kul-button-declarations';

export const prepInputArea = (adapter: KulChatAdapter) => {
    return (
        <div class="input-area">
            <kul-button
                class="kul-full-height"
                kulIcon="settings"
                kulStyling="flat"
                ref={(el) => {
                    if (el) {
                        adapter.set.ui.button.settings(el);
                    }
                }}
            ></kul-button>
            <kul-textfield
                kulLabel="What's on your mind?"
                kulStyling="textarea"
                ref={(el) => {
                    if (el) {
                        adapter.set.ui.textarea(el);
                    }
                }}
            ></kul-textfield>
        </div>
    );
};

export const prepButtons = (adapter: KulChatAdapter) => {
    return (
        <div class="buttons">
            <kul-button
                kulIcon="clear"
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
                class="stt"
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
