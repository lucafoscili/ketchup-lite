import {
    KulComponentEventName,
    KulComponentEventPayloadName,
    KulComponentName,
    KulComponentTag,
} from '../../../../types/GenericTypes';
import { KulArticleDataset } from '../../../kul-article/kul-article-declarations';
import {
    DRAWER_IFRAME_MOCK,
    DRAWER_IFRAME_MOCK_STYLE,
} from '../../assets/fixtures/drawer';
import { SECTION_FACTORY } from '../../helpers/kul-showcase-section';
import { DOC_IDS } from '../../kul-showcase-data';
import { DrawerData } from './kul-showcase-drawer-declarations';

const COMPONENT_NAME: KulComponentName = 'KulDrawer';
const EVENT_NAME: KulComponentEventName<'KulDrawer'> = 'kul-drawer-event';
const PAYLOAD_NAME: KulComponentEventPayloadName<'KulDrawer'> =
    'KulDrawerEventPayload';
const TAG_NAME: KulComponentTag<'KulDrawer'> = 'kul-drawer';

export const DRAWER_EXAMPLES: DrawerData = {
    simple: {
        ['data-description']: 'Simple drawer component',
        iframeProps: {
            height: '100%',
            srcDoc: DRAWER_IFRAME_MOCK,
            width: '100%',
        },
    },
    style: {
        ['data-description']: 'Drawer with custom style',
        ['data-dynamic']: 'custom',
        iframeProps: {
            height: '100%',
            srcDoc: DRAWER_IFRAME_MOCK_STYLE,
            width: '100%',
        },
    },
};

export const DRAWER_DOC: KulArticleDataset = {
    nodes: [
        {
            id: DOC_IDS.root,
            value: COMPONENT_NAME,
            children: [
                SECTION_FACTORY.overview(
                    COMPONENT_NAME,
                    'is a simple element designed to be a side menu of an application, its content is set by a slot'
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
                            type: 'close',
                            description: 'emitted when the drawer gets closed',
                        },
                        {
                            type: 'open',
                            description: 'emitted when the drawer gets opened',
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
