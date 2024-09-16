import { Fragment, h } from '@stencil/core';
import { KulMessengerAdapter } from '../kul-messenger-declarations';
import { MENU_DATASET } from './constant';
import { KulButtonEventPayload } from '../../kul-button/kul-button-declarations';
import { KulListEventPayload } from '../../kul-list/kul-list-declarations';

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
                    onKul-button-event={buttonClickHandler.bind(
                        buttonClickHandler,
                        adapter
                    )}
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

const buttonClickHandler = async (
    adapter: KulMessengerAdapter,
    e: CustomEvent<KulButtonEventPayload>
) => {
    const { eventType, originalEvent } = e.detail;
    switch (eventType) {
        case 'click':
            adapter.set.messenger.data();
            break;
        case 'kul-event':
            listClickHandler(
                adapter,
                originalEvent as CustomEvent<KulListEventPayload>
            );
            break;
    }
};

const listClickHandler = async (
    adapter: KulMessengerAdapter,
    e: CustomEvent<KulListEventPayload>
) => {
    const { eventType, node } = e.detail;
    let strJson = '';
    switch (eventType) {
        case 'click':
            switch (node.id) {
                case 'full_history':
                    strJson = JSON.stringify(
                        adapter.get.messenger.history(),
                        null,
                        2
                    );
                    break;
                case 'history':
                    strJson = adapter.get.character.history();
                    break;
                case 'kulData':
                    strJson = JSON.stringify(
                        adapter.get.messenger.data(),
                        null,
                        2
                    );
                    break;
                case 'settings':
                    strJson = JSON.stringify(
                        adapter.get.messenger.config(),
                        null,
                        2
                    );
                    break;
            }
            const url = window.URL.createObjectURL(
                new Blob([strJson], {
                    type: 'application/json',
                })
            );
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', node.id + '.json');
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
    }
};
