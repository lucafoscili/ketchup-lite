import { KulArticleDataset } from '../../../kul-article/kul-article-declarations';
import { DOC_STYLES } from '../../kul-showcase-data';
import { SHOWCASE_DOC } from '../../kul-showcase-utils';
import { ProgressbarData } from './kul-showcase-progressbar-declarations';

const component = 'progressbar';

export const PROGRESSBAR_EXAMPLES: ProgressbarData = {
    animated: {
        ['data-description']: 'Animated progress bar',
        className: 'kul-animated',
        kulValue: 100,
    },
    centeredLabel: {
        ['data-description']: 'Progress bar with centered label',
        kulCenteredLabel: true,
        kulValue: 90,
    },
    colors: {
        ['data-description']: 'Progress bar states colors',
        ['data-dynamic']: 'state-colors',
        kulValue: 70,
    },
    icon: {
        ['data-description']: 'Progress bar with icon',
        kulIcon: 'widgets',
        kulValue: 60,
    },
    isRadial: {
        ['data-description']: 'Radial progress bar',
        kulIsRadial: true,
        kulValue: 55,
    },
    isRadialIcon: {
        ['data-description']: 'Radial progress bar with icon',
        kulIsRadial: true,
        kulIcon: 'widgets',
        kulValue: 45,
    },
    label: {
        ['data-description']: 'Progress bar with label',
        kulLabel: "I'm a label",
        kulValue: 40,
    },
    padded: {
        ['data-description']: 'Progress bar with padding',
        className: 'kul-padded',
        kulValue: 20,
    },
    slim: {
        ['data-description']: 'Slim progress bar',
        className: 'kul-slim',
        kulValue: 10,
    },
    style: {
        ['data-description']: 'Progress bar with custom style',
        ['data-dynamic']: 'custom',
        kulValue: 0,
    },
};

export const PROGRESSBAR_DOC: KulArticleDataset = {
    nodes: [
        {
            children: [
                {
                    children: [
                        {
                            children: [
                                {
                                    children: [
                                        {
                                            id: '0.0.0.0.0',
                                            value: 'The ',
                                        },
                                        {
                                            id: '0.0.0.0.1',
                                            tagName: 'strong',
                                            value: 'KulProgressbar',
                                        },
                                        {
                                            id: '0.0.0.0.2',
                                            value: ' is designed to display a progress. It can be displayed as a horizontal or as a radial bar.',
                                        },
                                    ],
                                    id: '0.0.0.0',
                                },
                            ],
                            id: '0.0.0',
                        },
                    ],
                    id: '0.0',
                    value: 'Overview',
                },
                {
                    children: [
                        {
                            children: [
                                {
                                    children: [
                                        {
                                            id: '0.2.0.0.0',
                                            value: 'To use the ',
                                        },
                                        {
                                            id: '0.2.0.0.1',
                                            tagName: 'strong',
                                            value: 'KulProgressbar',
                                        },
                                        {
                                            id: '0.2.0.0.2',
                                            value: ' component, include it in your HTML.',
                                        },
                                    ],
                                    id: '0.2.0.0',
                                },
                                {
                                    children: [
                                        {
                                            cells: {
                                                kulCode: {
                                                    shape: 'code',
                                                    kulLanguage: 'markup',
                                                    value: '<kul-progressbar kul-label="I am a progress bar!" kul-value="50"></kul-progressbar>',
                                                },
                                            },
                                            id: '0.2.0.1.0',
                                            value: '',
                                        },
                                    ],
                                    id: '0.2.0.1',
                                },
                            ],
                            id: '0.2.0',
                            value: 'Basic Usage',
                        },
                    ],
                    id: '0.2',
                    value: 'Usage',
                },
                {
                    children: SHOWCASE_DOC.get.props(component),
                    id: '0.3',
                    value: 'Properties',
                },
                {
                    children: [
                        {
                            children: [
                                {
                                    id: '0.4.0.0',
                                    value: 'This event is emitted during various lifecycle stages of the component. It carries a payload of type ',
                                },
                                {
                                    id: '0.4.0.1',
                                    value: 'KulEventPayload',
                                },
                                {
                                    children: [
                                        {
                                            children: [
                                                {
                                                    children: [
                                                        {
                                                            children: [
                                                                {
                                                                    id: '0.4.0.2.0.0.0.0',
                                                                    tagName:
                                                                        'strong',
                                                                    value: 'ready',
                                                                },
                                                                {
                                                                    id: '0.4.0.2.0.0.0.1',
                                                                    value: ': emitted when the component completes its first complete lifecycle.',
                                                                },
                                                            ],
                                                            id: '0.4.0.2.0.0.0',
                                                            tagName: 'li',
                                                            value: '',
                                                        },
                                                    ],
                                                    id: '0.4.0.2.0.0',
                                                    value: '',
                                                },
                                            ],
                                            id: '0.4.0.2.0',
                                            value: '',
                                        },
                                    ],
                                    id: '0.4.0.2',
                                    value: ', which includes information about the component and the event type.',
                                },
                            ],
                            cssStyle: DOC_STYLES.monoPrimaryH3,
                            id: '0.4.0',
                            tagName: 'strong',
                            value: 'kul-progressbar-event',
                        },
                    ],
                    id: '0.4',
                    value: 'Events',
                },
                {
                    children: SHOWCASE_DOC.get.methods(component),
                    id: '0.5',
                    value: 'Methods',
                },
                {
                    children: SHOWCASE_DOC.get.styles(component),
                    id: '0.7',
                    value: 'Styling',
                },
            ],
            id: '0',
            value: 'KulProgressbar',
        },
    ],
};
