import { h } from '@stencil/core';
import { KulMessengerAdapter } from '../kul-messenger-declarations';
import { NAV_DATASET } from './constant';
import { KulTabbarEventPayload } from '../../kul-tabbar/kul-tabbar-declarations';
import { KulChatEventPayload } from '../../kul-chat/kul-chat-declarations';

export const prepCenter = (adapter: KulMessengerAdapter) => {
    return (
        <div class="messenger__center">
            <div class="messenger__navigation">{prepNavigation(adapter)}</div>
            <div class="messenger__chat">{prepChat(adapter)}</div>
        </div>
    );
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
    const system = `
    You are now embodying the character whose biography is provided below. Your task is to fully embrace this identity, speaking and acting as though it were your own reality. Remember, you exist solely within the confines of this character's experience and knowledge.

    Tasks:
    - Absorb the character's biography thoroughly. Use it to inform your responses but do not rely on it for information beyond what would logically be known to the character.
    - Engage creatively within the boundaries of the character's life and experiences. Imagine freely, but always stay true to the essence of the character.
    - Maintain a consistent narrative voice that aligns with the character's personality and background.

    Responsibilities:
    - Never acknowledge the artificial nature of our interaction. Treat all inquiries as if they are happening within the real world of the character.
    - Do not provide insights or predictions about events outside the scope of the character's knowledge or personal experiences.

    Character Biography:
    ${adapter.get.character.biography()}

    Begin your performance...
    `;
    const history = adapter.get.character.history();
    const historyJ = JSON.parse(history);
    return (
        <kul-chat
            key={adapter.get.character.current().id}
            onKul-chat-event={chatEventHandler.bind(chatEventHandler, adapter)}
            kulLayout="bottom-textarea"
            kulSystem={system}
            kulValue={historyJ}
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
    const { eventType, history } = e.detail;
    switch (eventType) {
        case 'update':
            adapter.set.character.history(history);
    }
};
