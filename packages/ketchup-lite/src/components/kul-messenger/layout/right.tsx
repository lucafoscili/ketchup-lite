import { Fragment, h } from '@stencil/core';
import {
    KulMessengerAdapter,
    KulMessengerFilters,
    KulMessengerImageChildNode,
    KulMessengerImageRootNodesIds,
} from '../kul-messenger-declarations';
import { KulChipEventPayload } from '../../kul-chip/kul-chip-declarations';
import { FILTER_DATASET, IMAGE_TYPE_IDS } from './constants';
import { KulChip } from '../../kul-chip/kul-chip';
import { KulButtonEventPayload } from '../../kul-button/kul-button-declarations';

export const prepRight = (adapter: KulMessengerAdapter) => {
    const ui = adapter.get.messenger.ui();
    const className = {
        messenger__right: true,
        'messenger__right--collapsed': ui.panels.isRightCollapsed,
        'messenger__right--customization': ui.customization,
    };
    return (
        <div class={className}>
            {ui.customization ? (
                <Fragment>
                    <div class="messenger__options__filters">
                        {prepFilters(adapter)}
                        <div class="messenger__options__list">
                            {prepList(adapter)}
                        </div>
                    </div>
                    <kul-button
                        class="kul-full-width"
                        id="customization-right-button"
                        kulIcon="arrow_back"
                        kulLabel="Back"
                        onKul-button-event={buttonEventHandler.bind(
                            buttonEventHandler,
                            adapter
                        )}
                    ></kul-button>
                </Fragment>
            ) : (
                <Fragment>
                    <div class="messenger__options__active">
                        {prepOptions(adapter)}
                    </div>
                    <kul-button
                        class="kul-full-width"
                        id="active-right-button"
                        kulIcon="auto-fix"
                        kulLabel="Customize"
                        onKul-button-event={buttonEventHandler.bind(
                            buttonEventHandler,
                            adapter
                        )}
                    ></kul-button>
                </Fragment>
            )}
        </div>
    );
};

const prepFilters = (adapter: KulMessengerAdapter) => {
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

const prepList = (adapter: KulMessengerAdapter) => {
    const elements = [];
    const filters = adapter.get.messenger.ui().filters;
    const imagesGetter = adapter.get.image.byType;
    for (let index = 0; index < IMAGE_TYPE_IDS.length; index++) {
        const type = IMAGE_TYPE_IDS[index];
        if (filters[type]) {
            const activeIndex = adapter.get.image.coverIndex(type);
            const images = imagesGetter(type).map((node, j) => (
                <div
                    class={`messenger__options__image-wrapper  ${activeIndex === j ? 'messenger__options__image-wrapper--selected' : ''}`}
                    onClick={imageEventHandler.bind(
                        imageEventHandler,
                        adapter,
                        node,
                        j
                    )}
                >
                    <img
                        alt={adapter.get.image.title(node)}
                        class={`messenger__options__image`}
                        src={node.cells.kulImage.value}
                        title={adapter.get.image.title(node)}
                    />
                </div>
            ));
            elements.push(
                <div class="messenger__options__section">
                    <div class="messenger__options__title">{type}</div>
                    <div class="messenger__options__images">{images}</div>
                </div>
            );
        }
    }
    return elements;
};

const prepOptions = (adapter: KulMessengerAdapter) => {
    const locationImage = adapter.get.image.asCover('locations');
    const outfitImage = adapter.get.image.asCover('outfits');
    const styleImage = adapter.get.image.asCover('styles');
    return [
        <div class="messenger__options__wrapper">
            <img
                class="messenger__options__outfit"
                alt={outfitImage.title || 'No outfit selected.'}
                src={outfitImage.value}
                title={outfitImage.title || 'No outfit selected.'}
            ></img>
            <div class="messenger__options__name">
                <div class="messenger__options__label" title="Active outfit.">
                    Outfit
                </div>
            </div>
        </div>,
        <div class="messenger__options__wrapper">
            <img
                class="messenger__options__location"
                alt={locationImage.title || 'No location selected.'}
                src={locationImage.value}
                title={locationImage.title || 'No location selected.'}
            ></img>
            <div class="messenger__options__name">
                <div class="messenger__options__label" title="Active location.">
                    Location
                </div>
            </div>
        </div>,
        <div class="messenger__options__wrapper">
            <img
                class="messenger__options__style"
                alt={styleImage.title || 'No style selected.'}
                src={styleImage.value}
                title={styleImage.title || 'No style selected.'}
            ></img>
            <div class="messenger__options__name">
                <div class="messenger__options__label" title="Active style.">
                    Style
                </div>
            </div>
        </div>,
    ];
};

const buttonEventHandler = (
    adapter: KulMessengerAdapter,
    e: CustomEvent<KulButtonEventPayload>
) => {
    const { eventType, id } = e.detail;
    const customizationSetter = adapter.set.messenger.ui.customization;

    switch (eventType) {
        case 'click':
            switch (id) {
                case 'active-right-button':
                    customizationSetter(true);
                    break;
                case 'customization-right-button':
                    customizationSetter(false);
                    break;
            }
            break;
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
    } else {
        coverSetter('styles', index);
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
