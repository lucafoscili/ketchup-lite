import { h, VNode } from '@stencil/core';
import { KulMessengerAdapter } from '../kul-messenger-declarations';

export const prepGrid = (adapter: KulMessengerAdapter) => {
    const avatars: VNode[] = [];

    const characters = adapter.get.character.list();
    characters.forEach((c) => {
        avatars.push(
            <div
                class="selection-grid__portrait"
                onClick={() => {
                    adapter.set.character.current(c);
                }}
            >
                <kul-image
                    class={'selection-grid__avatar kul-cover'}
                    kulValue={adapter.get.image.asCover('avatars', c)}
                ></kul-image>
                <div class="selection-grid__name">
                    <div class="selection-grid__label">
                        {adapter.get.character.name(c)}
                    </div>
                </div>
            </div>
        );
    });

    return avatars?.length ? (
        avatars
    ) : (
        <div class="empty-dataset">There are no characters to display!</div>
    );
};
