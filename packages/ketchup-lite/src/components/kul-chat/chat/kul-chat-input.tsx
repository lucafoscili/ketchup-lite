import { h } from '@stencil/core';
import { KulButtonEventPayload } from '../../kul-button/kul-button-declarations';
import { KulProgressbarEventPayload } from '../../kul-progressbar/kul-progressbar-declarations';
import { KulChatAdapter } from '../kul-chat-declarations';

//#region prepInputArea
export const prepInputArea = (adapter: KulChatAdapter) => {
    return (
        <div class="chat__request__input">
            <kul-button
                class="chat__request__input__button kul-full-height"
                id="settings-button"
                kulIcon="settings"
                kulStyling="flat"
                onKul-button-event={buttonEventHandler.bind(
                    buttonEventHandler,
                    adapter
                )}
                ref={(el) => {
                    if (el) {
                        adapter.components.buttons.settings = el;
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
                        adapter.components.textareas.prompt = el;
                    }
                }}
            ></kul-textfield>
            {prepProgressBar(adapter)}
        </div>
    );
};
//#endregion

//#region prepButtons
export const prepButtons = (adapter: KulChatAdapter) => {
    return (
        <div class="chat__request__buttons">
            <kul-button
                id="clear-button"
                kulLabel="Clear"
                kulStyling={'flat'}
                onKul-button-event={buttonEventHandler.bind(
                    buttonEventHandler,
                    adapter
                )}
                ref={(el) => {
                    if (el) {
                        adapter.components.buttons.clear = el;
                    }
                }}
                title="Clear the textarea."
            ></kul-button>
            <kul-button
                id="stt-button"
                class="chat__request__buttons__stt"
                kulIcon="keyboard_voice"
                kulStyling={'icon'}
                onKul-button-event={buttonEventHandler.bind(
                    buttonEventHandler,
                    adapter
                )}
                ref={(el) => {
                    if (el) {
                        adapter.components.buttons.stt = el;
                    }
                }}
                title="Activate Speech To Text with your browser's API (if supported)."
            >
                <kul-spinner
                    kulActive={true}
                    kulDimensions="0.6em"
                    kulLayout={6}
                    slot="spinner"
                ></kul-spinner>
            </kul-button>
            <kul-button
                id="send-button"
                kulIcon="check"
                kulLabel="Send"
                onKul-button-event={buttonEventHandler.bind(
                    buttonEventHandler,
                    adapter
                )}
                ref={(el) => {
                    if (el) {
                        adapter.components.buttons.send = el;
                    }
                }}
                title="Send your prompt (CTRL+Enter)."
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
//#endregion

//#region prepProgressBar
const prepProgressBar = (adapter: KulChatAdapter) => {
    const cssClass = {
        chat__request__input__progressbar: true,
        ['kul-animated']: true,
        ['kul-striped']: true,
    };
    return (
        <kul-progressbar
            class={cssClass}
            kulCenteredLabel={true}
            kulIcon="data_usage"
            kulLabel="Context window"
            onKul-progressbar-event={progressbarEventHandler.bind(
                progressbarEventHandler,
                adapter
            )}
            ref={(el) => {
                if (el) {
                    adapter.components.progressbar = el;
                }
            }}
        ></kul-progressbar>
    );
};
//#endregion

//#region buttonEventHandler
const buttonEventHandler = async (
    adapter: KulChatAdapter,
    e: CustomEvent<KulButtonEventPayload>
) => {
    const { eventType, id } = e.detail;
    const textarea = adapter.components.textareas.prompt;

    switch (eventType) {
        case 'click':
            switch (id) {
                case 'clear-button':
                    await textarea.setValue('');
                    await textarea.setFocus();
                    break;
                case 'send-button':
                    adapter.actions.send();
                    break;
                case 'settings-button':
                    adapter.set.status.view('settings');
                    break;
                case 'stt-button':
                    adapter.actions.stt();
                    break;
            }
    }
};
//#endregion

//#region progressbarEventHandler
const progressbarEventHandler = async (
    adapter: KulChatAdapter,
    e: CustomEvent<KulProgressbarEventPayload>
) => {
    const { eventType } = e.detail;

    switch (eventType) {
        case 'ready':
            adapter.actions.updateTokenCount();
            break;
    }
};
//#endregion
