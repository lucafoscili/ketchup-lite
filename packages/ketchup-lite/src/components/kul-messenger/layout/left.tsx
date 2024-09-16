import { Fragment, h } from '@stencil/core';
import { KulMessengerAdapter } from '../kul-messenger-declarations';
import { MENU_DATASET } from './constant';

export const prepLeft = (adapter: KulMessengerAdapter) => {
    return (
        <div class="messenger__left">
            <div class="messenger__avatar">{prepAvatar(adapter)}</div>
            <div class="messenger__biography">{prepBiography(adapter)}</div>
        </div>
    );
};

const prepAvatar = (adapter: KulMessengerAdapter) => {
    const image = adapter.get.image.asCover('avatars');
    const status = adapter.get.character.status();
    return (
        <Fragment>
            <img
                alt={image.title || ''}
                class="messenger__avatar__image"
                src={image.value}
                title={image.title || ''}
            />
            <div class="messenger__avatar__name">
                <div class="messenger__avatar__label">
                    <kul-image
                        class="messenger__avatar__status"
                        kulColor={
                            status === 'ready'
                                ? 'var(--kul-success-color)'
                                : status === 'offline'
                                  ? 'var(--kul-danger-color)'
                                  : 'var(--kul-warning-color)'
                        }
                        kulSizeX="16px"
                        kulSizeY="16px"
                        kulValue="brightness-1"
                        title={
                            status === 'ready'
                                ? 'Ready to chat!'
                                : status === 'offline'
                                  ? 'This character seems to be offline...'
                                  : 'Contacting this character...'
                        }
                    ></kul-image>
                    {adapter.get.character.name()}
                </div>
                <kul-button
                    kulData={MENU_DATASET}
                    kulIcon="save"
                    kulLabel="save"
                    kulStyling="flat"
                ></kul-button>
            </div>
        </Fragment>
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
