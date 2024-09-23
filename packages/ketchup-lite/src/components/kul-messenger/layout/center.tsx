import { h } from '@stencil/core';
import { KulMessengerAdapter } from '../kul-messenger-declarations';
import {
    LEFT_EXPANDER_ICON,
    NAV_DATASET,
    RIGHT_EXPANDER_ICON,
} from './constants';
import { KulTabbarEventPayload } from '../../kul-tabbar/kul-tabbar-declarations';
import { KulChatEventPayload } from '../../kul-chat/kul-chat-declarations';
import { KulButtonEventPayload } from '../../kul-button/kul-button-declarations';
import { KulButton } from '../../kul-button/kul-button';
import { KulChat } from '../../kul-chat/kul-chat';

export const prepCenter = (adapter: KulMessengerAdapter) => {
    const buttons = prepExpanderButtons(adapter);
    return (
        <div class="messenger__center">
            <div class="messenger__expander messenger__expander--left">
                {buttons.left}
            </div>
            <div class="messenger__navigation">{prepNavigation(adapter)}</div>
            <div class="messenger__chat">{prepChat(adapter)}</div>
            <div class="messenger__expander messenger__expander--right">
                {buttons.right}
            </div>
        </div>
    );
};

const prepExpanderButtons = (adapter: KulMessengerAdapter) => {
    const left = (
        <kul-button
            class="kul-full-height"
            id="left"
            kulIcon={LEFT_EXPANDER_ICON}
            kulStyling="flat"
            onKul-button-event={expanderEventHandler.bind(
                expanderEventHandler,
                adapter
            )}
            title="Expand/collapse this section"
        ></kul-button>
    );
    const right = (
        <kul-button
            class="kul-full-height"
            id="right"
            kulIcon={RIGHT_EXPANDER_ICON}
            kulStyling="flat"
            onKul-button-event={expanderEventHandler.bind(
                expanderEventHandler,
                adapter
            )}
            title="Expand/collapse this section"
        ></kul-button>
    );
    return {
        left,
        right,
    };
};

const prepNavigation = (adapter: KulMessengerAdapter) => {
    return (
        <kul-tabbar
            kulData={NAV_DATASET}
            onKul-tabbar-event={tabbarEventHandler.bind(
                tabbarEventHandler,
                adapter
            )}
        ></kul-tabbar>
    );
};

const prepChat = (adapter: KulMessengerAdapter) => {
    const prompts = getDynamicPrompts(adapter);

    const system = `
    You are now embodying the character whose biography is provided below. Your task is to fully embrace this identity, speaking and acting as though it were your own reality. Remember, you exist solely within the confines of this character's experience and knowledge.

    Tasks:
    - Absorb the character's biography thoroughly. Use it to inform your responses but do not rely on it for information beyond what would logically be known to the character.
    - Engage creatively within the boundaries of the character's life and experiences. Imagine freely, but always stay true to the essence of the character.
    - Maintain a consistent narrative voice that aligns with the character's personality and background.

    Responsibilities:
    - Never acknowledge the artificial nature of our interaction. Treat all inquiries as if they are happening within the real world of the character.
    - Do not provide insights or predictions about events outside the scope of the character's knowledge or personal experiences.

    ${prompts.biography}
    ${prompts.outfit}
    ${prompts.location}
    ${prompts.timeframe}

    Begin your performance...
    `;
    const history = adapter.get.character.history();
    const historyJ = JSON.parse(history);
    const props = adapter.get.character.chat();
    return (
        <kul-chat
            key={adapter.get.character.current().id}
            kulLayout="bottom-textarea"
            kulSystem={system}
            kulValue={historyJ}
            {...props}
            onKul-chat-event={chatEventHandler.bind(chatEventHandler, adapter)}
        ></kul-chat>
    );
};

const tabbarEventHandler = (
    adapter: KulMessengerAdapter,
    e: CustomEvent<KulTabbarEventPayload>
) => {
    const { eventType, node } = e.detail;
    switch (eventType) {
        case 'click':
            if (node.id === 'previous') {
                adapter.set.character.previous();
            } else if (node.id === 'next') {
                adapter.set.character.next();
            } else {
                adapter.set.character.current(null);
            }
    }
};

const chatEventHandler = (
    adapter: KulMessengerAdapter,
    e: CustomEvent<KulChatEventPayload>
) => {
    const { comp, eventType, history, status } = e.detail;
    const chat = comp as KulChat;
    switch (eventType) {
        case 'config':
            adapter.set.character.chat({
                kulEndpointUrl: chat.kulEndpointUrl,
                kulMaxTokens: chat.kulMaxTokens,
                kulPollingInterval: chat.kulPollingInterval,
                kulSystem: chat.kulSystem,
                kulTemperature: chat.kulTemperature,
            });
            break;
        case 'polling':
            adapter.set.messenger.status.connection(status);
            break;
        case 'update':
            adapter.set.character.history(history);
            break;
    }
};

const expanderEventHandler = (
    adapter: KulMessengerAdapter,
    e: CustomEvent<KulButtonEventPayload>
) => {
    const { comp, eventType } = e.detail;
    const button = comp as KulButton;

    switch (eventType) {
        case 'click':
            switch (button.rootElement.id) {
                case 'left':
                    const newLeft = adapter.set.messenger.ui.panel('left');
                    button.kulIcon = newLeft
                        ? RIGHT_EXPANDER_ICON
                        : LEFT_EXPANDER_ICON;
                    break;
                case 'right':
                    const newRight = adapter.set.messenger.ui.panel('right');
                    button.kulIcon = newRight
                        ? LEFT_EXPANDER_ICON
                        : RIGHT_EXPANDER_ICON;
                    break;
            }
    }
};

const getDynamicPrompts = (adapter: KulMessengerAdapter) => {
    const biography = adapter.get.character.biography();
    const location = adapter.get.image.asCover('locations').node;
    const outfit = adapter.get.image.asCover('outfits').node;
    const timeframe = adapter.get.image.asCover('timeframes').node;
    const isEnabled = adapter.get.messenger.ui().options;

    const llmBio = `
    Character Biography:
    ${biography}
    `;

    const locationTitle = location?.value;
    const locationDescription = location?.description;
    const llmLocation = `
    Character Location:
    ${locationTitle} - ${locationDescription}
    `;

    const outfitTitle = outfit?.value;
    const outfitDescription = outfit?.description;
    const llmOutfit = `
    Character Outfit:
    ${outfitTitle} - ${outfitDescription}
    `;

    const timeframeTitle = timeframe?.value;
    const timeframeDescription = timeframe?.description;
    const llmTimeframe = `
    Current timeframe:
    ${timeframeTitle} - ${timeframeDescription}
    `;

    return {
        biography: biography ? llmBio : '',
        location: location && isEnabled.locations ? llmLocation : '',
        outfit: outfit && isEnabled.outfits ? llmOutfit : '',
        timeframe: timeframe && isEnabled.timeframes ? llmTimeframe : '',
    };
};
