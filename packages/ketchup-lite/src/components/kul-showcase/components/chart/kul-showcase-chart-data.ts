import { KulArticleDataset } from '../../../kul-article/kul-article-declarations';
import { ChartData } from './kul-showcase-chart-declarations';
import { DOC_IDS } from '../../kul-showcase-data';
import {
    KulComponentEventName,
    KulComponentEventPayloadName,
    KulComponentName,
    KulComponentTag,
} from '../../../../types/GenericTypes';
import { SECTION_FACTORY } from '../../helpers/kul-showcase-section';
import { CHART_KULDATA_FACTORY } from '../../assets/fixtures/chart';
import { KulDataDataset } from '../../../../components';

const COMPONENT_NAME: KulComponentName = 'KulChart';
const EVENT_NAME: KulComponentEventName<'KulChart'> = 'kul-chart-event';
const PAYLOAD_NAME: KulComponentEventPayloadName<'KulChart'> =
    'KulChartEventPayload';
const TAG_NAME: KulComponentTag<'KulChart'> = 'kul-chart';

export const CHART_EXAMPLES: ChartData = {
    area: {
        ['data-description']: 'Area',
        kulAxis: 'Axis',
        kulData: CHART_KULDATA_FACTORY.line(),
        kulSeries: ['Series_1', 'Series_2', 'Series_3', 'Series_4', 'Series_5'],
        kulSizeY: '300px',
        kulTypes: ['area'],
    },
    bar: {
        ['data-description']: 'Bar',
        kulAxis: 'Axis',
        kulData: CHART_KULDATA_FACTORY.bar(),
        kulSeries: ['Series_1'],
        kulSizeY: '300px',
        kulTypes: ['bar'],
    },
    candlestick: {
        ['data-description']: 'Candlestick',
        kulAxis: 'Date',
        kulData: CHART_KULDATA_FACTORY.candlestick(),
        kulSeries: ['Open', 'Close', 'Low', 'High'],
        kulSizeY: '300px',
        kulTypes: ['candlestick'],
    },
    funnel: {
        ['data-description']: 'Funnel',
        kulAxis: 'Stage',
        kulData: CHART_KULDATA_FACTORY.funnel(),
        kulSeries: ['Value', 'Revenue'],
        kulSizeY: '300px',
        kulTypes: ['funnel'],
    },
    hbar: {
        ['data-description']: 'Bar (horizontal)',
        kulAxis: 'Axis',
        kulData: CHART_KULDATA_FACTORY.bar(),
        kulSeries: ['Series_1'],
        kulSizeY: '300px',
        kulTypes: ['hbar'],
    },
    gaussian: {
        ['data-description']: 'Gaussian',
        kulAxis: 'X',
        kulData: CHART_KULDATA_FACTORY.gaussian(),
        kulSeries: ['Frequency'],
        kulSizeY: '300px',
        kulTypes: ['gaussian'],
    },
    line: {
        ['data-description']: 'Line',
        kulAxis: 'Axis',
        kulData: CHART_KULDATA_FACTORY.line(),
        kulSeries: ['Series_1', 'Series_2', 'Series_3', 'Series_4', 'Series_5'],
        kulSizeY: '300px',
    },
    pie: {
        ['data-description']: 'Pie',
        kulAxis: 'Axis',
        kulData: CHART_KULDATA_FACTORY.pie(),
        kulSeries: ['Series_1', 'Series_2', 'Series_3', 'Series_4', 'Series_5'],
        kulSizeY: '300px',
        kulTypes: ['pie'],
    },
    radar: {
        ['data-description']: 'Radar',
        kulAxis: 'Axis',
        kulData: CHART_KULDATA_FACTORY.radar(),
        kulSeries: [
            'Speed',
            'Agility',
            'Strength',
            'Endurance',
            'Intelligence',
        ],
        kulSizeY: '300px',
        kulTypes: ['radar'],
    },
    sankey: {
        ['data-description']: 'Sankey',
        kulAxis: 'Source',
        kulData: CHART_KULDATA_FACTORY.sankey(),
        kulSeries: ['Target', 'Value'],
        kulSizeY: '300px',
        kulTypes: ['sankey'],
    },
    scatter: {
        ['data-description']: 'Scatter',
        kulAxis: 'X',
        kulData: CHART_KULDATA_FACTORY.scatter(),
        kulSeries: ['Y'],
        kulSizeY: '300px',
        kulTypes: ['scatter'],
    },
    style: {
        ['data-description']: 'Bar',
        ['data-dynamic']: 'custom',
        kulAxis: 'Axis',
        kulData: CHART_KULDATA_FACTORY.line(),
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
                    data: JSON.stringify({
                        columns: [
                            { id: 'my_column_1', title: 'My column' },
                            { id: 'my_column_2', title: 'My column (2)' },
                        ],
                        nodes: [
                            { id: 'my_node_1', value: 1 },
                            { id: 'my_node_2', value: 2 },
                        ],
                    } as KulDataDataset),
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
