import { Fragment, h } from '@stencil/core';
import { KulChatAdapter } from '../kul-chat-declarations';
import { KulButtonEventPayload } from '../../kul-button/kul-button-declarations';
import { KulTextfieldEventPayload } from '../../kul-textfield/kul-textfield-declarations';

export const OPTIONS_IDS = {
    contextWindow: 'context-option',
    endpointUrl: 'endpoint-option',
    maxTokens: 'maxtokens-option',
    polling: 'polling-option',
    system: 'system-option',
    temperature: 'temperature-option',
};

export const prepSettings = (adapter: KulChatAdapter) => {
    return (
        <Fragment>
            {prepButton(adapter)}
            <div class="settings__options">{prepFields(adapter)}</div>
            <kul-textfield
                id={OPTIONS_IDS.system}
                class="settings__system kul-full-height"
                kulLabel="System prompt"
                kulStyling="textarea"
                kulValue={adapter.get.props.system()}
                onKul-textfield-event={textfieldEventHandler.bind(
                    textfieldEventHandler,
                    adapter
                )}
            ></kul-textfield>
        </Fragment>
    );
};

const prepButton = (adapter: KulChatAdapter) => {
    return (
        <kul-button
            class="kul-full-width"
            kulIcon="arrow_back"
            kulLabel="Back"
            onKul-button-event={backEventHandler.bind(
                backEventHandler,
                adapter
            )}
        ></kul-button>
    );
};

const prepFields = (adapter: KulChatAdapter) => {
    return (
        <Fragment>
            <kul-textfield
                id={OPTIONS_IDS.contextWindow}
                kulHtmlAttributes={{
                    min: 10,
                    step: 100,
                    type: 'number',
                }}
                kulIcon="data_usage"
                kulLabel="Context window length"
                kulValue={String(adapter.get.props.contextWindow()).valueOf()}
                onKul-textfield-event={textfieldEventHandler.bind(
                    textfieldEventHandler,
                    adapter
                )}
            ></kul-textfield>
            <kul-textfield
                id={OPTIONS_IDS.temperature}
                kulHtmlAttributes={{
                    min: 0,
                    step: 0.1,
                    type: 'number',
                }}
                kulIcon="thermometer"
                kulLabel="Temperature"
                kulValue={String(adapter.get.props.temperature()).valueOf()}
                onKul-textfield-event={textfieldEventHandler.bind(
                    textfieldEventHandler,
                    adapter
                )}
            ></kul-textfield>
            <kul-textfield
                id={OPTIONS_IDS.endpointUrl}
                kulIcon="http"
                kulLabel="Endpoint URL"
                kulValue={adapter.get.props.endpointUrl()}
                onKul-textfield-event={textfieldEventHandler.bind(
                    textfieldEventHandler,
                    adapter
                )}
            ></kul-textfield>
            <kul-textfield
                id={OPTIONS_IDS.maxTokens}
                kulHtmlAttributes={{
                    min: 10,
                    step: 100,
                    type: 'number',
                }}
                kulIcon="plus_one"
                kulLabel="Max tokens count"
                kulValue={String(adapter.get.props.maxTokens()).valueOf()}
                onKul-textfield-event={textfieldEventHandler.bind(
                    textfieldEventHandler,
                    adapter
                )}
            ></kul-textfield>
            <kul-textfield
                id={OPTIONS_IDS.polling}
                kulHtmlAttributes={{
                    min: 10,
                    step: 10,
                    type: 'number',
                }}
                kulIcon="timer"
                kulLabel="Polling interval"
                kulValue={String(adapter.get.props.pollingInterval()).valueOf()}
                onKul-textfield-event={textfieldEventHandler.bind(
                    textfieldEventHandler,
                    adapter
                )}
            ></kul-textfield>
        </Fragment>
    );
};

const backEventHandler = (
    adapter: KulChatAdapter,
    e: CustomEvent<KulButtonEventPayload>
) => {
    const { eventType } = e.detail;

    switch (eventType) {
        case 'click':
            adapter.emit.event('config');
            adapter.set.status.view('chat');
            break;
    }
};

const textfieldEventHandler = (
    adapter: KulChatAdapter,
    e: CustomEvent<KulTextfieldEventPayload>
) => {
    const { eventType, id, value } = e.detail;

    switch (eventType) {
        case 'change':
            switch (id) {
                case OPTIONS_IDS.contextWindow:
                    adapter.set.props.contextWindow(parseInt(value));
                    break;
                case OPTIONS_IDS.endpointUrl:
                    adapter.set.props.endpointUrl(value);
                    break;
                case OPTIONS_IDS.maxTokens:
                    adapter.set.props.maxTokens(parseInt(value));
                    break;
                case OPTIONS_IDS.polling:
                    adapter.set.props.pollingInterval(parseInt(value));
                    break;
                case OPTIONS_IDS.system:
                    adapter.set.props.system(value);
                    break;
                case OPTIONS_IDS.temperature:
                    adapter.set.props.temperature(parseFloat(value));
                    break;
            }
            break;
    }
};
