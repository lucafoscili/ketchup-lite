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
import {
    CHART_KULDATA_FACTORY,
    MIXED_HEATMAP,
} from '../../assets/fixtures/chart';
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
        kulSizeY: '400px',
        kulTypes: ['area'],
    },
    bar: {
        ['data-description']: 'Bar',
        kulAxis: 'Axis',
        kulData: CHART_KULDATA_FACTORY.bar(),
        kulSeries: ['Series_1'],
        kulSizeY: '400px',
        kulTypes: ['bar'],
    },
    bubble: {
        ['data-description']: 'Bubble',
        kulAxis: ['X_Value', 'Y_Value'],
        kulData: CHART_KULDATA_FACTORY.bubble(),
        kulSeries: ['Bubble_Size'],
        kulSizeY: '400px',
        kulTypes: ['bubble'],
    },
    calendar: {
        ['data-description']: 'Calendar',
        kulAxis: 'Date',
        kulData: CHART_KULDATA_FACTORY.calendar(),
        kulSeries: ['Value'],
        kulSizeY: '400px',
        kulTypes: ['calendar'],
    },
    candlestick: {
        ['data-description']: 'Candlestick',
        kulAxis: 'Date',
        kulData: CHART_KULDATA_FACTORY.candlestick(),
        kulSeries: ['Open', 'Close', 'Low', 'High'],
        kulSizeY: '400px',
        kulTypes: ['candlestick'],
    },
    dualAxis: {
        ['data-description']: 'Dual Axis Chart',
        kulAxis: ['Axis'],
        kulData: CHART_KULDATA_FACTORY.line(),
        kulSeries: ['Series_1', 'Series_2', 'Series_3', 'Series_4'],
        kulSizeY: '400px',
        kulTypes: ['bar', 'bar', 'line', 'line'],
    },
    funnel: {
        ['data-description']: 'Funnel',
        kulAxis: 'Stage',
        kulData: CHART_KULDATA_FACTORY.funnel(),
        kulSeries: ['Value', 'Revenue'],
        kulSizeY: '400px',
        kulTypes: ['funnel'],
    },
    gaussian: {
        ['data-description']: 'Gaussian',
        kulAxis: 'X',
        kulData: CHART_KULDATA_FACTORY.gaussian(),
        kulSeries: ['Frequency'],
        kulSizeY: '400px',
        kulTypes: ['gaussian'],
    },
    hbar: {
        ['data-description']: 'Bar (horizontal)',
        kulAxis: 'Axis',
        kulData: CHART_KULDATA_FACTORY.bar(),
        kulSeries: ['Series_1'],
        kulSizeY: '400px',
        kulTypes: ['hbar'],
    },
    heatmap: {
        ['data-description']: 'Heatmap',
        kulAxis: 'Source_Channel',
        kulData: CHART_KULDATA_FACTORY.heatmap(),
        kulSeries: ['Target_Channel', 'Mapping_Count'],
        kulSizeY: '400px',
        kulTypes: ['heatmap'],
    },
    heatmapWithLine: {
        ['data-description']: 'Heatmap with Line Overlay',
        kulAxis: ['X', 'Y'],
        kulData: MIXED_HEATMAP(),
        kulSeries: ['Heat_Value', 'Line_Value'],
        kulSizeY: '400px',
        kulTypes: ['heatmap', 'line'],
    },
    line: {
        ['data-description']: 'Line',
        kulAxis: 'Axis',
        kulData: CHART_KULDATA_FACTORY.line(),
        kulSeries: ['Series_1', 'Series_2', 'Series_3', 'Series_4', 'Series_5'],
        kulSizeY: '400px',
    },
    mixedLineBar: {
        ['data-description']: 'Mixed Line and Bar with Multiple Y-Axes',
        kulAxis: ['Axis'],
        kulData: CHART_KULDATA_FACTORY.line(),
        kulSeries: ['Series_1', 'Series_2', 'Series_3', 'Series_4'],
        kulSizeY: '400px',
        kulTypes: ['bar', 'line', 'bar', 'line'],
    },
    mixedTypesMultiAxis: {
        ['data-description']: 'Mixed Types with Multiple Axes',
        kulAxis: ['Axis', 'Axis', 'Axis'],
        kulData: CHART_KULDATA_FACTORY.line(),
        kulSeries: ['Series_1', 'Series_2', 'Series_3', 'Series_4', 'Series_5'],
        kulSizeY: '400px',
        kulTypes: ['bar', 'line', 'scatter', 'line', 'bar'],
    },
    multiAxis: {
        ['data-description']: 'Multi-Axis Chart with Different Units',
        kulAxis: ['Axis', 'Axis', 'Axis'],
        kulData: CHART_KULDATA_FACTORY.line(),
        kulSeries: ['Series_1', 'Series_2', 'Series_3'],
        kulSizeY: '400px',
        kulTypes: ['line', 'line', 'line'],
    },
    multiAxisLine: {
        ['data-description']: 'Multi-Axis Line Chart',
        kulAxis: ['Axis', 'Axis'],
        kulData: CHART_KULDATA_FACTORY.line(),
        kulSeries: ['Series_1', 'Series_4'],
        kulSizeY: '400px',
        kulTypes: ['line', 'line'],
    },
    pie: {
        ['data-description']: 'Pie',
        kulAxis: 'Axis',
        kulData: CHART_KULDATA_FACTORY.pie(),
        kulSeries: ['Series_1', 'Series_2', 'Series_3', 'Series_4', 'Series_5'],
        kulSizeY: '400px',
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
        kulSizeY: '400px',
        kulTypes: ['radar'],
    },
    sankey: {
        ['data-description']: 'Sankey',
        kulAxis: 'Source',
        kulData: CHART_KULDATA_FACTORY.sankey(),
        kulSeries: ['Target', 'Value'],
        kulSizeY: '400px',
        kulTypes: ['sankey'],
    },
    scatter: {
        ['data-description']: 'Scatter',
        kulAxis: 'X',
        kulData: CHART_KULDATA_FACTORY.scatter(),
        kulSeries: ['Y'],
        kulSizeY: '400px',
        kulTypes: ['scatter'],
    },
    stackedBar: {
        ['data-description']: 'Stacked Bar Chart',
        kulAxis: ['Axis'],
        kulData: CHART_KULDATA_FACTORY.line(),
        kulSeries: ['Series_1', 'Series_2', 'Series_3'],
        kulSizeY: '400px',
        kulTypes: ['sbar', 'sbar', 'sbar'],
    },
    style: {
        ['data-description']: 'Bar',
        ['data-dynamic']: 'custom',
        kulAxis: 'Axis',
        kulData: CHART_KULDATA_FACTORY.line(),
        kulSeries: ['Series_1'],
        kulSizeY: '400px',
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
