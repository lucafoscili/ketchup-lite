import { Fragment, h } from '@stencil/core';
import {
    KulButtonEventPayload,
    KulButtonPropsInterface,
} from '../../kul-button/kul-button-declarations';
import { KulListEventPayload } from '../../kul-list/kul-list-declarations';
import { MENU_DATASET } from '../kul-messenger-constants';
import { KulMessengerAdapter } from '../kul-messenger-declarations';

//#region prepLeft
export const prepLeft = (adapter: KulMessengerAdapter) => {
    const isCollapsed = adapter.get.messenger.ui().panels.isLeftCollapsed;
    return (
        <div
            class={`messenger__left ${isCollapsed ? 'messenger__left--collapsed' : ''}`}
        >
            <div class="messenger__avatar">{prepAvatar(adapter)}</div>
            <div class="messenger__biography">{prepBiography(adapter)}</div>
        </div>
    );
};
//#endregion

//#region prepAvatar
const prepAvatar = (adapter: KulMessengerAdapter) => {
    const image = adapter.get.image.asCover('avatars');
    const status = adapter.get.messenger.status.connection();
    return (
        <Fragment>
            <img
                alt={image.title || ''}
                class="messenger__avatar__image"
                src={image.value}
                title={image.title || ''}
            />
            <div class="messenger__avatar__name-wrapper">
                <div class="messenger__avatar__name">
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
                    <div class="messenger__avatar__label">
                        {adapter.get.character.name()}
                    </div>
                </div>
                {prepSaveButton(adapter)}
            </div>
        </Fragment>
    );
};
//#endregion

//#region prepSaveButton
const prepSaveButton = (adapter: KulMessengerAdapter) => {
    const saveInProgress = adapter.get.messenger.status.save.inProgress();
    const props: KulButtonPropsInterface = {
        kulIcon: saveInProgress ? '' : 'save',
        kulLabel: saveInProgress ? 'Saving...' : 'Save',
        kulShowSpinner: saveInProgress ? true : false,
    };
    return (
        <kul-button
            class={'kul-full-height'}
            {...props}
            kulData={MENU_DATASET}
            kulStyling="flat"
            onKul-button-event={buttonClickHandler.bind(
                buttonClickHandler,
                adapter
            )}
            ref={(el) => {
                adapter.components.saveButton = el;
            }}
            title="Update the dataset with current settings."
        >
            <kul-spinner
                kulActive={true}
                kulDimensions="0.6em"
                kulLayout={4}
                slot="spinner"
            ></kul-spinner>
        </kul-button>
    );
};
//#endregion

//#region prepBiography
const prepBiography = (adapter: KulMessengerAdapter) => {
    return (
        <kul-code
            kulLanguage="markdown"
            kulValue={adapter.get.character.biography()}
        ></kul-code>
    );
};
//#endregion

//#region buttonClickHandler
const buttonClickHandler = async (
    adapter: KulMessengerAdapter,
    e: CustomEvent<KulButtonEventPayload>
) => {
    const { eventType, originalEvent } = e.detail;
    switch (eventType) {
        case 'click':
            const saveInProgress =
                adapter.get.messenger.status.save.inProgress();
            if (!saveInProgress) {
                adapter.set.messenger.data();
            }
            break;
        case 'kul-event':
            listClickHandler(
                adapter,
                originalEvent as CustomEvent<KulListEventPayload>
            );
            break;
    }
};
//#endregion

//#region listClickHandler
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
//#endregion
