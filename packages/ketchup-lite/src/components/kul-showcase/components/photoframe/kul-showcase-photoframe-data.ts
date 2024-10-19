import { KulArticleDataset } from '../../../kul-article/kul-article-declarations';
import { PhotoframeData } from './kul-showcase-photoframe-declarations';
import { DOC_IDS } from '../../kul-showcase-data';
import { getAssetPath } from '@stencil/core';
import {
    KulComponentEventName,
    KulComponentEventPayloadName,
    KulComponentName,
    KulComponentTag,
} from '../../../../types/GenericTypes';
import { SECTION_FACTORY } from '../../helpers/kul-showcase-section';

const COMPONENT_NAME: KulComponentName = 'KulPhotoframe';
const EVENT_NAME: KulComponentEventName<'KulPhotoframe'> =
    'kul-photoframe-event';
const PAYLOAD_NAME: KulComponentEventPayloadName<'KulPhotoframe'> =
    'KulPhotoframeEventPayload';
const TAG_NAME: KulComponentTag<'KulPhotoframe'> = 'kul-photoframe';

const placeholder = getAssetPath(`./assets/media/blur_color_splash.jpg`);
const value = getAssetPath(`./assets/media/color_splash.jpg`);
const kulPlaceholder = {
    alt: null,
    src: placeholder,
};
const kulValue = {
    alt: null,
    src: value,
};

export const PHOTOFRAME_EXAMPLES: PhotoframeData = {
    simple: {
        ['data-description']: 'Simple photoframe',
        kulPlaceholder,
        kulValue,
    },
    style: {
        ['data-description']: 'Photoframe with custom style',
        'data-dynamic': 'custom',
        kulPlaceholder,
        kulValue,
    },
};

export const PHOTOFRAME_DOC: KulArticleDataset = {
    nodes: [
        {
            id: DOC_IDS.root,
            value: COMPONENT_NAME,
            children: [
                SECTION_FACTORY.overview(
                    COMPONENT_NAME,
                    'displays a photo only when it enters the viewport. Until then, a placeholder is displayed in its place'
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
                            type: 'load',
                            description:
                                'emitted when the image is successfully loaded',
                        },
                        {
                            type: 'ready',
                            description:
                                'emitted when the component completes its first complete lifecycle',
                        },
                        {
                            type: 'unmount',
                            description:
                                'emitted when the component is disconnected from the DOM',
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
