import { getAssetPath } from '@stencil/core';
import { random2digitsNumber } from '../../helpers/kul-showcase-dyn-sample';
import { ImageData } from './kul-showcase-image-declarations';
import { KulArticleDataset } from '../../../kul-article/kul-article-declarations';
import { DOC_IDS } from '../../kul-showcase-data';
import {
    KulComponentEventName,
    KulComponentEventPayloadName,
    KulComponentName,
    KulComponentTag,
} from '../../../../types/GenericTypes';
import { SECTION_FACTORY } from '../../helpers/kul-showcase-section';

const COMPONENT_NAME: KulComponentName = 'KulImage';
const EVENT_NAME: KulComponentEventName<'KulImage'> = 'kul-image-event';
const PAYLOAD_NAME: KulComponentEventPayloadName<'KulImage'> =
    'KulImageEventPayload';
const TAG_NAME: KulComponentTag<'KulImage'> = 'kul-image';

const image = getAssetPath(`./assets/media/color_splash.jpg`);

export const IMAGE_EXAMPLES: ImageData = {
    badge: {
        ['data-description']: 'Image with badge',
        kulBadgeProps: { kulLabel: random2digitsNumber().toString() },
        kulSizeX: '128px',
        kulSizeY: '128px',
        kulValue: image,
    },
    cover: {
        ['data-description']: 'Image set as cover of a container',
        className: 'kul-cover',
        kulSizeX: '128px',
        kulSizeY: '256px',
        kulValue: image,
    },
    fit: {
        ['data-description']: 'Image fitting a container',
        className: 'kul-fit',
        kulSizeX: '128px',
        kulSizeY: '256px',
        kulValue: image,
    },
    icon: {
        ['data-description']: 'Icon',
        kulSizeX: '256px',
        kulSizeY: '256px',
        kulValue: 'widgets',
    },
    image: {
        ['data-description']: 'Image',
        kulSizeX: '256px',
        kulSizeY: '256px',
        kulValue: image,
    },
    style: {
        ['data-description']: 'Icon with custom style',
        ['data-dynamic']: 'custom',
        kulSizeX: '256px',
        kulSizeY: '256px',
        kulValue: 'widgets',
    },
};

export const IMAGE_DOC: KulArticleDataset = {
    nodes: [
        {
            id: DOC_IDS.root,
            value: COMPONENT_NAME,
            children: [
                SECTION_FACTORY.overview(
                    COMPONENT_NAME,
                    'is designed to render images or icons based on a provided source or CSS variable'
                ),
                SECTION_FACTORY.usage(COMPONENT_NAME, {
                    tag: TAG_NAME,
                }),
                SECTION_FACTORY.props(TAG_NAME),
                SECTION_FACTORY.events(
                    COMPONENT_NAME,
                    PAYLOAD_NAME,
                    [
                        {
                            type: 'click',
                            description:
                                'emitted when the component is clicked',
                        },
                        {
                            type: 'load',
                            description:
                                'emitted when the image is successfully loaded',
                        },
                        {
                            type: 'ready',
                            description:
                                'emitted when the component completes its first complete lifecycle',
                        },
                    ],
                    EVENT_NAME
                ),
                SECTION_FACTORY.methods(TAG_NAME),
                SECTION_FACTORY.styling(TAG_NAME),
            ],
        },
    ],
};
