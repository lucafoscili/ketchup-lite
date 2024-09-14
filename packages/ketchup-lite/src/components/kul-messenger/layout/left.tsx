import { h } from '@stencil/core';
import { KulMessengerAdapter } from '../kul-messenger-declarations';

export const prepLeft = (adapter: KulMessengerAdapter) => {
    return (
        <div class="messenger__left">
            <div class="avatar">{prepAvatar(adapter)}</div>
            <div class="biography">{prepBiography(adapter)}</div>
        </div>
    );
};

const prepAvatar = (adapter: KulMessengerAdapter) => {
    return <kul-image kulValue={adapter.get.image('avatar')}></kul-image>;
};

const prepBiography = (adapter: KulMessengerAdapter) => {
    return (
        <kul-code
            kulLanguage="markdown"
            kulValue={adapter.get.biography()}
        ></kul-code>
    );
};
