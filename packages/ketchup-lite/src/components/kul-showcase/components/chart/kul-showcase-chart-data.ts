import { KulArticleDataset } from '../../../kul-article/kul-article-declarations';
import { ChartData } from './kul-showcase-chart-declarations';
import { DOC_IDS } from '../../kul-showcase-data';
import { KulDataDataset } from '../../../../managers/kul-data/kul-data-declarations';
import {
    KulComponentEventName,
    KulComponentEventPayloadName,
    KulComponentName,
    KulComponentTag,
} from '../../../../types/GenericTypes';
import { SECTION_FACTORY } from '../../helpers/kul-showcase-section';

const COMPONENT_NAME: KulComponentName = 'KulChart';
const EVENT_NAME: KulComponentEventName<'KulChart'> = 'kul-chart-event';
const PAYLOAD_NAME: KulComponentEventPayloadName<'KulChart'> =
    'KulChartEventPayload';
const TAG_NAME: KulComponentTag<'KulChart'> = 'kul-chart';

const kulData: KulDataDataset = {
    columns: [
        {
            id: 'Axis',
            title: 'Department',
        },
        {
            id: 'Series_1',
            title: 'Current Budget',
        },
        {
            id: 'Series_2',
            title: 'Projected Budget',
        },
        {
            id: 'Series_3',
            title: 'Allocated Budget',
        },
        {
            id: 'Series_4',
            title: 'Expenditures',
        },
        {
            id: 'Series_5',
            title: 'Savings',
        },
    ],
    nodes: [
        {
            cells: {
                Axis: {
                    value: 'Digital Marketing',
                },
                Series_1: {
                    value: '15000',
                },
                Series_2: {
                    value: '16000',
                },
                Series_3: {
                    value: '15500',
                },
                Series_4: {
                    value: '14500',
                },
                Series_5: {
                    value: '500',
                },
            },
            id: '0',
        },
        {
            cells: {
                Axis: {
                    value: 'E-commerce Sales',
                },
                Series_1: {
                    value: '8000',
                },
                Series_2: {
                    value: '9000',
                },
                Series_3: {
                    value: '8500',
                },
                Series_4: {
                    value: '7500',
                },
                Series_5: {
                    value: '1000',
                },
            },
            id: '1',
        },
        {
            cells: {
                Axis: {
                    value: 'Administrative Services',
                },
                Series_1: {
                    value: '6000',
                },
                Series_2: {
                    value: '6500',
                },
                Series_3: {
                    value: '6250',
                },
                Series_4: {
                    value: '6000',
                },
                Series_5: {
                    value: '250',
                },
            },
            id: '2',
        },
        {
            cells: {
                Axis: {
                    value: 'Product Development',
                },
                Series_1: {
                    value: '20000',
                },
                Series_2: {
                    value: '22000',
                },
                Series_3: {
                    value: '21000',
                },
                Series_4: {
                    value: '20500',
                },
                Series_5: {
                    value: '9500',
                },
            },
            id: '3',
        },
        {
            cells: {
                Axis: {
                    value: 'Customer Support',
                },
                Series_1: {
                    value: '10000',
                },
                Series_2: {
                    value: '11000',
                },
                Series_3: {
                    value: '10500',
                },
                Series_4: {
                    value: '10000',
                },
                Series_5: {
                    value: '500',
                },
            },
            id: '4',
        },
    ],
};

export const CHART_EXAMPLES: ChartData = {
    area: {
        ['data-description']: 'Area',
        kulAxis: 'Axis',
        kulData,
        kulSizeY: '300px',
        kulTypes: ['area'],
    },
    bar: {
        ['data-description']: 'Bar',
        kulAxis: 'Axis',
        kulData,
        kulSeries: ['Series_1'],
        kulSizeY: '300px',
        kulTypes: ['bar'],
    },
    line: {
        ['data-description']: 'Line',
        kulAxis: 'Axis',
        kulData,
        kulSizeY: '300px',
    },
    pie: {
        ['data-description']: 'Pie',
        kulAxis: 'Axis',
        kulData,
        kulSizeY: '300px',
        kulTypes: ['pie'],
    },
    scatter: {
        ['data-description']: 'Scatter',
        kulAxis: 'Axis',
        kulData,
        kulSizeY: '300px',
        kulTypes: ['scatter'],
    },
    style: {
        ['data-description']: 'Bar',
        ['data-dynamic']: 'custom',
        kulAxis: 'Axis',
        kulData,
        kulSeries: ['Series_1'],
        kulSizeY: '300px',
        kulTypes: ['bar'],
    },
};

export const CHART_DOC: KulArticleDataset = {
    nodes: [
        {
            id: DOC_IDS.root,
            value: COMPONENT_NAME,
            children: [
                SECTION_FACTORY.overview(
                    COMPONENT_NAME,
                    'is designed to plot data on charts'
                ),
                SECTION_FACTORY.usage(COMPONENT_NAME, {
                    data: JSON.stringify(kulData),
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
