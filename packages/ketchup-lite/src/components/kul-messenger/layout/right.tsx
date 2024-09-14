import { h } from '@stencil/core';
import { KulMessengerAdapter } from '../kul-messenger-declarations';

export const prepRight = (adapter: KulMessengerAdapter) => {
    return (
        <div class="messenger__right">
            <div class="outfit">{prepOutfit(adapter)}</div>
            <div class="location">{prepLocation(adapter)}</div>
            <div class="style">{prepStyle(adapter)}</div>
        </div>
    );
};

const prepOutfit = (adapter: KulMessengerAdapter) => {
    return <kul-image kulValue={adapter.get.image('outfit')}></kul-image>;
};

const prepLocation = (adapter: KulMessengerAdapter) => {
    return <kul-image kulValue={adapter.get.image('location')}></kul-image>;
};

const prepStyle = (adapter: KulMessengerAdapter) => {
    return <kul-image kulValue={adapter.get.image('style')}></kul-image>;
};
