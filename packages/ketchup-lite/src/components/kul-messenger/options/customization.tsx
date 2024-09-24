import { Fragment, h } from '@stencil/core';
import { KulChip } from '../../kul-chip/kul-chip';
import { KulChipEventPayload } from '../../kul-chip/kul-chip-declarations';
import {
    KulMessengerAdapter,
    KulMessengerFilters,
    KulMessengerImageChildNode,
    KulMessengerImageNodesIds,
    KulMessengerImageNodesPrefixes,
    KulMessengerImageRootNodesIds,
} from '../kul-messenger-declarations';
import { FILTER_DATASET, IMAGE_TYPE_IDS } from '../kul-messenger-constants';
import { KulButtonEventPayload } from '../../kul-button/kul-button-declarations';

export const prepFilters = (adapter: KulMessengerAdapter) => {
    for (let index = 0; index < FILTER_DATASET.nodes.length; index++) {
        const filter = FILTER_DATASET.nodes[index];
        filter.icon = adapter.get.image.asCover(
            filter.id as KulMessengerImageRootNodesIds,
            null
        ).value;
    }
    return (
        <kul-chip
            key={'filter_' + adapter.get.character.name()}
            kulData={FILTER_DATASET}
            kulStyling="filter"
            onKul-chip-event={chipEventHandler.bind(chipEventHandler, adapter)}
        ></kul-chip>
    );
};

export const prepList = (adapter: KulMessengerAdapter) => {
    const elements = [];
    const editing = adapter.get.messenger.ui().editing;
    const filters = adapter.get.messenger.ui().filters;
    const imagesGetter = adapter.get.image.byType;
    for (let index = 0; index < IMAGE_TYPE_IDS.length; index++) {
        const type = IMAGE_TYPE_IDS[index];
        if (filters[type]) {
            const isEditingEnable = editing[type];
            const activeIndex = adapter.get.image.coverIndex(type);
            const images = imagesGetter(type).map((node, j) => (
                <div
                    class={`messenger__customization__image-wrapper  ${activeIndex === j ? 'messenger__customization__image-wrapper--selected' : ''}`}
                    onClick={imageEventHandler.bind(
                        imageEventHandler,
                        adapter,
                        node,
                        j
                    )}
                >
                    <img
                        alt={adapter.get.image.title(node)}
                        class={`messenger__customization__image`}
                        src={node.cells.kulImage.value}
                        title={adapter.get.image.title(node)}
                    />
                </div>
            ));
            elements.push(
                <div class="messenger__customization__section">
                    {isEditingEnable ? (
                        <div class="messenger__customization__edit__panel">
                            <div class="messenger__customization__edit__label">
                                Create {type}
                            </div>
                            <kul-textfield
                                kulFullWidth={true}
                                kulIcon="title"
                                kulLabel="Title"
                                ref={(el) =>
                                    (adapter.components.editing[
                                        type
                                    ].titleTextarea = el)
                                }
                                title="The overall theme of this option."
                            ></kul-textfield>
                            <kul-textfield
                                kulFullWidth={true}
                                kulIcon="format-float-left"
                                kulLabel="Description"
                                ref={(el) =>
                                    (adapter.components.editing[
                                        type
                                    ].descriptionTextarea = el)
                                }
                                title="A more accurate description to give more context to the LLM."
                            ></kul-textfield>
                            <kul-textfield
                                kulFullWidth={true}
                                kulIcon="image"
                                kulLabel="Image URL"
                                ref={(el) =>
                                    (adapter.components.editing[
                                        type
                                    ].imageUrlTextarea = el)
                                }
                                title="The cover image displayed in the selection panel."
                            ></kul-textfield>
                            <div class="messenger__customization__edit__confirm">
                                <kul-button
                                    class={
                                        'messenger__customization__edit__button'
                                    }
                                    kulIcon="clear"
                                    kulLabel="Cancel"
                                    kulStyling="flat"
                                    onKul-button-event={buttonEventHandler.bind(
                                        buttonEventHandler,
                                        adapter,
                                        type,
                                        'cancel'
                                    )}
                                ></kul-button>
                                <kul-button
                                    class={
                                        'messenger__customization__edit__button'
                                    }
                                    kulIcon="check"
                                    kulLabel="Confirm"
                                    kulStyling="outlined"
                                    onKul-button-event={buttonEventHandler.bind(
                                        buttonEventHandler,
                                        adapter,
                                        type,
                                        'confirm'
                                    )}
                                ></kul-button>
                            </div>
                        </div>
                    ) : (
                        <Fragment>
                            <div class="messenger__customization__title">
                                <div class="messenger__customization__label">
                                    {type}
                                </div>
                                <kul-button
                                    class="messenger__customization__add kul-full-height kul-slim"
                                    id={`edit-${type}`}
                                    kulIcon="plus"
                                    kulLabel="New"
                                    kulStyling="flat"
                                    onKul-button-event={buttonEventHandler.bind(
                                        buttonEventHandler,
                                        adapter,
                                        type,
                                        'add'
                                    )}
                                ></kul-button>
                            </div>
                            <div class="messenger__customization__images">
                                {images}
                            </div>
                        </Fragment>
                    )}
                </div>
            );
        }
    }
    return elements;
};

const buttonEventHandler = async (
    adapter: KulMessengerAdapter,
    type: KulMessengerImageRootNodesIds,
    action: 'cancel' | 'confirm' | 'add',
    e: CustomEvent<KulButtonEventPayload>
) => {
    const { eventType } = e.detail;
    const editingSetter = adapter.set.messenger.ui.editing;

    switch (eventType) {
        case 'click':
            switch (action) {
                case 'add':
                    editingSetter(true, type);
                    break;
                case 'cancel':
                    editingSetter(false, type);
                    break;
                case 'confirm':
                    const titleTextarea =
                        adapter.components.editing[type].titleTextarea;
                    const value = await titleTextarea.getValue();
                    titleTextarea.classList.remove('kul-danger');
                    if (value) {
                        createNode(adapter, type);
                        editingSetter(false, type);
                    } else {
                        titleTextarea.classList.add('kul-danger');
                        titleTextarea.kulHelper = {
                            value: 'This field is mandatory',
                        };
                    }
                    break;
            }
            break;
    }
};

const chipEventHandler = (
    adapter: KulMessengerAdapter,
    e: CustomEvent<KulChipEventPayload>
) => {
    const { comp, eventType, selectedNodes } = e.detail;
    const filtersSetter = adapter.set.messenger.ui.filters;

    switch (eventType) {
        case 'click':
            const newFilters: KulMessengerFilters = {
                avatars: false,
                locations: false,
                outfits: false,
                styles: false,
                timeframes: false,
            };
            Array.from(selectedNodes).forEach((n) => {
                newFilters[n.id] = true;
            });
            filtersSetter(newFilters);
            break;
        case 'ready':
            const filters = adapter.get.messenger.ui().filters;
            const nodes: string[] = [];
            for (const key in filters) {
                if (Object.prototype.hasOwnProperty.call(filters, key)) {
                    const option = filters[key];
                    if (option) {
                        nodes.push(key);
                    }
                }
            }
            requestAnimationFrame(() =>
                (comp as KulChip).setSelectedNodes(nodes)
            );
    }
};

const imageEventHandler = (
    adapter: KulMessengerAdapter,
    node: KulMessengerImageChildNode,
    index: number
) => {
    const coverSetter = adapter.set.image.cover;

    if (node.id.includes('avatar')) {
        coverSetter('avatars', index);
    } else if (node.id.includes('location')) {
        coverSetter('locations', index);
    } else if (node.id.includes('outfit')) {
        coverSetter('outfits', index);
    } else if (node.id.includes('style')) {
        coverSetter('styles', index);
    } else {
        coverSetter('timeframes', index);
    }
};

const createNode = async <T extends KulMessengerImageRootNodesIds>(
    adapter: KulMessengerAdapter,
    type: T
) => {
    const getId = (prefix: KulMessengerImageNodesPrefixes) => {
        let index = 0;
        let nodeId: KulMessengerImageNodesIds = prefix;
        do {
            nodeId = `${prefix}${index}`;
            index++;
        } while (images.some((node) => node.id === nodeId));

        return nodeId;
    };

    const editing = adapter.components.editing;
    const images = adapter.get.image.byType(type);
    const value = await editing[type].titleTextarea.getValue();
    const imageUrl = await editing[type].imageUrlTextarea.getValue();
    const description = await editing[type].descriptionTextarea.getValue();
    const id =
        type === 'avatars'
            ? getId('avatar_')
            : type === 'locations'
              ? getId('location_')
              : type === 'outfits'
                ? getId('outfit_')
                : type === 'styles'
                  ? getId('style_')
                  : getId('timeframe_');

    const node: KulMessengerImageChildNode = {
        cells: { kulImage: { shape: 'image', value: imageUrl } },
        id,
        description,
        value,
    };
    images.push(node);
};
