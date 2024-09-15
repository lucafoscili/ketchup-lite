import { h } from '@stencil/core';
import { KulMessengerAdapter } from '../kul-messenger-declarations';

export const prepLeft = (adapter: KulMessengerAdapter) => {
    return (
        <div class="messenger__left">
            <div class="messenger__avatar">{prepAvatar(adapter)}</div>
            <div class="messenger__biography">{prepBiography(adapter)}</div>
        </div>
    );
};

const prepAvatar = (adapter: KulMessengerAdapter) => {
    return (
        <kul-image
            class="kul-cover"
            kulValue={adapter.get.image.asCover('avatars')}
        ></kul-image>
    );
};

const prepBiography = (adapter: KulMessengerAdapter) => {
    return (
        <kul-code
            kulLanguage="markdown"
            kulValue={adapter.get.character.biography()}
        ></kul-code>
    );
};
