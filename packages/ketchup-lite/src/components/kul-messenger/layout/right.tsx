import { h } from '@stencil/core';
import {
    KulMessengerAdapter,
    KulMessengerImageChildNode,
    KulMessengerImageRootNodesIds,
} from '../kul-messenger-declarations';
import { KulChipEventPayload } from '../../kul-chip/kul-chip-declarations';
import { KulEventPayload } from '../../../types/GenericTypes';
import { FILTER_DATASET, IMAGE_TYPE_IDS } from './constant';
import { KulChip } from '../../kul-chip/kul-chip';

export const prepRight = (adapter: KulMessengerAdapter) => {
    return (
        <div class="messenger__right">
            <div class="messenger__options__active">{prepOptions(adapter)}</div>
            <div class="messenger__options__filters">
                {prepFilters(adapter)}
            </div>
            <div class="messenger__options__list">{prepList(adapter)}</div>
        </div>
    );
};

const prepOptions = (adapter: KulMessengerAdapter) => {
    return [
        <div class="messenger__options__outfit">
            <kul-image
                class={'kul-cover'}
                kulValue={adapter.get.image.asCover('outfits')}
            ></kul-image>
            <div class="messenger__options__name">
                <div class="messenger__options__label">Outfit</div>
            </div>
        </div>,
        <div class="messenger__options__location">
            <kul-image
                class={'kul-cover'}
                kulValue={adapter.get.image.asCover('locations')}
            ></kul-image>
            <div class="messenger__options__name">
                <div class="messenger__options__label">Location</div>
            </div>
        </div>,
        <div class="messenger__options__style">
            <kul-image
                class={'kul-cover'}
                kulValue={adapter.get.image.asCover('styles')}
            ></kul-image>
            <div class="messenger__options__name">
                <div class="messenger__options__label">Style</div>
            </div>
        </div>,
    ];
};

const prepFilters = (adapter: KulMessengerAdapter) => {
    for (let index = 0; index < FILTER_DATASET.nodes.length; index++) {
        const filter = FILTER_DATASET.nodes[index];
        filter.icon = adapter.get.image.asCover(
            filter.id as KulMessengerImageRootNodesIds,
            null
        );
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
    const options = adapter.get.image.options();
    const imagesGetter = adapter.get.image.byType;
    for (let index = 0; index < IMAGE_TYPE_IDS.length; index++) {
        const type = IMAGE_TYPE_IDS[index];
        if (options[type]) {
            const activeIndex = adapter.get.image.coverIndex(type);
            const images = imagesGetter(type).map((node, j) => (
                <kul-image
                    class={`messenger__options__image ${activeIndex === j ? 'messenger__options__image--selected' : ''} kul-cover`}
                    kulValue={node.cells.kulImage.value}
                    onKul-image-event={imageEventHandler.bind(
                        imageEventHandler,
                        adapter,
                        node,
                        j
                    )}
                ></kul-image>
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

const imageEventHandler = (
    adapter: KulMessengerAdapter,
    node: KulMessengerImageChildNode,
    index: number,
    e: CustomEvent<KulEventPayload>
) => {
    const { eventType } = e.detail;
    const coverSetter = adapter.set.image.cover;

    switch (eventType) {
        case 'click':
            if (node.id.includes('avatar')) {
                coverSetter('avatars', index);
            } else if (node.id.includes('location')) {
                coverSetter('locations', index);
            } else if (node.id.includes('outfit')) {
                coverSetter('outfits', index);
            } else {
                coverSetter('styles', index);
            }
    }
};

const chipEventHandler = async (
    adapter: KulMessengerAdapter,
    e: CustomEvent<KulChipEventPayload>
) => {
    const { comp, eventType, node } = e.detail;
    const optionsGetter = adapter.get.image.options;
    const optionsSetter = adapter.set.image.options;

    switch (eventType) {
        case 'click':
            switch (node.id as KulMessengerImageRootNodesIds) {
                case 'avatars':
                    optionsSetter('avatars', !optionsGetter().avatars);
                    break;
                case 'locations':
                    optionsSetter('locations', !optionsGetter().locations);
                    break;
                case 'outfits':
                    optionsSetter('outfits', !optionsGetter().outfits);
                    break;
                case 'styles':
                    optionsSetter('styles', !optionsGetter().styles);
                    break;
            }
            break;
        case 'ready':
            const options = adapter.get.image.options();
            const nodes: string[] = [];
            for (const key in options) {
                if (Object.prototype.hasOwnProperty.call(options, key)) {
                    const option = options[key];
                    if (option) {
                        nodes.push(key);
                    }
                }
            }
            requestAnimationFrame(() => (comp as KulChip).selectNodes(nodes));
    }
};
