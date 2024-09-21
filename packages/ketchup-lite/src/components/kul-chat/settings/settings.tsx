import { Fragment, h } from '@stencil/core';
import { KulChatAdapter } from '../kul-chat-declarations';

export const prepSettings = (adapter: KulChatAdapter) => {
    return (
        <Fragment>
            <div class="settings">{prepButtons(adapter)}</div>
        </Fragment>
    );
};

const prepButtons = (adapter: KulChatAdapter) => {};
