import {
    KulComponentEventName,
    KulComponentEventPayloadName,
    KulComponentName,
    KulComponentTag,
} from '../../../../types/GenericTypes';
import { KulArticleDataset } from '../../../kul-article/kul-article-declarations';
import { SECTION_FACTORY } from '../../helpers/kul-showcase-section';
import { DOC_IDS } from '../../kul-showcase-data';
import { TextfieldData } from './kul-showcase-textfield-declarations';

const COMPONENT_NAME: KulComponentName = 'KulTextfield';
const EVENT_NAME: KulComponentEventName<'KulTextfield'> = 'kul-textfield-event';
const PAYLOAD_NAME: KulComponentEventPayloadName<'KulSpinner'> =
    'KulSpinnerEventPayload';
const TAG_NAME: KulComponentTag<'KulTextfield'> = 'kul-textfield';

export const TEXTFIELD_EXAMPLES: TextfieldData = {
    flat: {
        colors: {
            ['data-description']: 'Textfield states colors',
            ['data-dynamic']: 'state-colors',
            kulLabel: 'State colors',
            kulValue: 'Value',
        },
        disabled: {
            ['data-description']: 'Disabled textfield',
            kulDisabled: true,
            kulLabel: 'Disabled',
        },
        disabledIcon: {
            ['data-description']: 'Disabled textfield with icon',
            kulDisabled: true,
            kulIcon: 'widgets',
            kulLabel: 'Disabled',
        },
        disabledValue: {
            ['data-description']: 'Disabled textfield with value',
            kulDisabled: true,
            kulLabel: 'Disabled',
            kulValue: 'Value',
        },
        disabledFullWidthLabel: {
            ['data-description']: 'Full width textfield with label',
            kulDisabled: true,
            kulFullWidth: true,
            kulLabel: 'Full width label (disabled)',
        },
        disabledFullWidthValue: {
            ['data-description']: 'Full width textfield with value',
            kulDisabled: true,
            kulFullWidth: true,
            kulValue: 'Full width value (disabled)',
        },
        fullWidthLabel: {
            ['data-description']: 'Full width textfield with label',
            kulFullWidth: true,
            kulLabel: 'Full width label',
        },
        fullWidthIcon: {
            ['data-description']: 'Full width textfield with icon',
            kulFullWidth: true,
            kulIcon: 'widgets',
            kulLabel: 'Full width with icon',
        },
        fullWidthValue: {
            ['data-description']: 'Full width textfield with value',
            kulFullWidth: true,
            kulValue: 'Value',
        },
        icon: {
            ['data-description']: 'Textfield with icon',
            kulIcon: 'widgets',
        },
        label: {
            ['data-description']: 'Textfield with label',
            kulLabel: 'Textfield with label',
        },
        labelIcon: {
            ['data-description']: 'Textfield with label and icon',
            kulIcon: 'widgets',
            kulLabel: 'Textfield with label and icon',
        },
        style: {
            ['data-description']: 'Textfield with custom style',
            ['data-dynamic']: 'custom',
            kulLabel: 'Textfield with custom style',
        },
    },
    outlined: {
        colors: {
            ['data-description']: 'Textfield states colors',
            ['data-dynamic']: 'state-colors',
            kulLabel: 'State colors',
            kulValue: 'Value',
        },
        disabled: {
            ['data-description']: 'Disabled textfield',
            kulDisabled: true,
            kulLabel: 'Disabled',
        },
        disabledIcon: {
            ['data-description']: 'Disabled textfield with icon',
            kulDisabled: true,
            kulIcon: 'widgets',
            kulLabel: 'Disabled',
        },
        disabledValue: {
            ['data-description']: 'Disabled textfield with value',
            kulDisabled: true,
            kulLabel: 'Disabled',
            kulValue: 'Value',
        },
        icon: {
            ['data-description']: 'Textfield with icon',
            kulIcon: 'widgets',
        },
        label: {
            ['data-description']: 'Textfield with label',
            kulLabel: 'Textfield with label',
        },
        labelIcon: {
            ['data-description']: 'Textfield with label and icon',
            kulIcon: 'widgets',
            kulLabel: 'Textfield with label and icon',
        },
        style: {
            ['data-description']: 'Textfield with custom style',
            ['data-dynamic']: 'custom',
            kulLabel: 'Textfield with custom style',
        },
    },
    raised: {
        colors: {
            ['data-description']: 'Textfield states colors',
            ['data-dynamic']: 'state-colors',
            kulLabel: 'State colors',
            kulValue: 'Value',
        },
        disabled: {
            ['data-description']: 'Disabled textfield',
            kulDisabled: true,
            kulLabel: 'Disabled',
        },
        disabledIcon: {
            ['data-description']: 'Disabled textfield with icon',
            kulDisabled: true,
            kulIcon: 'widgets',
            kulLabel: 'Disabled',
        },
        disabledValue: {
            ['data-description']: 'Disabled textfield with value',
            kulDisabled: true,
            kulLabel: 'Disabled',
            kulValue: 'Value',
        },
        disabledFullWidthLabel: {
            ['data-description']: 'Full width textfield with label',
            kulDisabled: true,
            kulFullWidth: true,
            kulLabel: 'Full width label (disabled)',
        },
        disabledFullWidthValue: {
            ['data-description']: 'Full width textfield with value',
            kulDisabled: true,
            kulFullWidth: true,
            kulValue: 'Full width value (disabled)',
        },
        fullWidthLabel: {
            ['data-description']: 'Full width textfield with label',
            kulFullWidth: true,
            kulLabel: 'Full width label',
        },
        fullWidthIcon: {
            ['data-description']: 'Full width textfield with icon',
            kulFullWidth: true,
            kulIcon: 'widgets',
            kulLabel: 'Full width with icon',
        },
        fullWidthValue: {
            ['data-description']: 'Full width textfield with value',
            kulFullWidth: true,
            kulValue: 'Value',
        },
        icon: {
            ['data-description']: 'Textfield with icon',
            kulIcon: 'widgets',
        },
        label: {
            ['data-description']: 'Textfield with label',
            kulLabel: 'Textfield with label',
        },
        labelIcon: {
            ['data-description']: 'Textfield with label and icon',
            kulIcon: 'widgets',
            kulLabel: 'Textfield with label and icon',
        },
        style: {
            ['data-description']: 'Textfield with custom style',
            ['data-dynamic']: 'custom',
            kulLabel: 'Textfield with custom style',
        },
    },
    textarea: {
        colors: {
            ['data-description']: 'Textfield states colors',
            ['data-dynamic']: 'state-colors',
            kulLabel: 'State colors',
            kulValue: 'Value',
        },
        disabled: {
            ['data-description']: 'Disabled textfield',
            kulDisabled: true,
            kulLabel: 'Disabled',
        },
        disabledValue: {
            ['data-description']: 'Disabled textfield with value',
            kulDisabled: true,
            kulLabel: 'Disabled',
            kulValue: 'Value',
        },
        label: {
            ['data-description']: 'Textfield with label',
            kulLabel: 'Textfield with label',
        },
        style: {
            ['data-description']: 'Textfield with custom style',
            ['data-dynamic']: 'custom',
            kulLabel: 'Textfield with custom style',
        },
    },
};

export const TEXTFIELD_DOC: KulArticleDataset = {
    nodes: [
        {
            id: DOC_IDS.root,
            value: COMPONENT_NAME,
            children: [
                SECTION_FACTORY.overview(
                    COMPONENT_NAME,
                    'is a customizable web component with multiple styling options used to input text'
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
                            type: 'blur',
                            description:
                                'emitted when the component loses focus',
                        },
                        {
                            type: 'change',
                            description:
                                "emitted when the component's value changes",
                        },
                        {
                            type: 'click',
                            description:
                                'emitted when the component is clicked',
                        },
                        {
                            type: 'focus',
                            description:
                                'emitted when the component is focused',
                        },
                        {
                            type: 'input',
                            description:
                                'emitted when a new input signal is received',
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
