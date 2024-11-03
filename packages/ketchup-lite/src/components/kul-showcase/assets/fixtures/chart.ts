import { KulChartType, KulDataDataset } from '../../../../components';

const BASE_DATASET: KulDataDataset = {
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

export const CHART_KULDATA_FACTORY: Partial<{
    [K in KulChartType]: () => KulDataDataset;
}> = {
    bar: () => ({
        ...BASE_DATASET,
        columns: BASE_DATASET.columns,
        nodes: BASE_DATASET.nodes.map((node) => ({
            ...node,
            cells: {
                ...node.cells,
                Series_1: {
                    value: (
                        parseInt(node.cells.Series_1.value as string) + 500
                    ).toString(),
                },
                Series_2: {
                    value: (
                        parseInt(node.cells.Series_2.value as string) + 700
                    ).toString(),
                },
            },
        })),
    }),
    bubble: () => ({
        columns: [
            { id: 'X', title: 'X Axis' },
            { id: 'Y', title: 'Y Axis' },
            { id: 'Size', title: 'Bubble Size' },
        ],
        nodes: [
            {
                id: '0',
                cells: {
                    X: { value: '5' },
                    Y: { value: '10' },
                    Size: { value: '20' },
                },
            },
            {
                id: '1',
                cells: {
                    X: { value: '15' },
                    Y: { value: '25' },
                    Size: { value: '30' },
                },
            },
            {
                id: '2',
                cells: {
                    X: { value: '20' },
                    Y: { value: '35' },
                    Size: { value: '40' },
                },
            },
            {
                id: '3',
                cells: {
                    X: { value: '25' },
                    Y: { value: '50' },
                    Size: { value: '25' },
                },
            },
            {
                id: '4',
                cells: {
                    X: { value: '30' },
                    Y: { value: '40' },
                    Size: { value: '50' },
                },
            },
        ],
    }),
    calendar: () => ({
        columns: [
            { id: 'Date', title: 'Date' },
            { id: 'EventCount', title: 'Event Count' },
        ],
        nodes: [
            {
                id: '0',
                cells: {
                    Date: { value: '2024-01-01' },
                    EventCount: { value: '3' },
                },
            },
            {
                id: '1',
                cells: {
                    Date: { value: '2024-01-02' },
                    EventCount: { value: '5' },
                },
            },
            {
                id: '2',
                cells: {
                    Date: { value: '2024-01-03' },
                    EventCount: { value: '1' },
                },
            },
            {
                id: '3',
                cells: {
                    Date: { value: '2024-01-04' },
                    EventCount: { value: '7' },
                },
            },
        ],
    }),
    candlestick: () => ({
        columns: [
            { id: 'Date', title: 'Date' },
            { id: 'Open', title: 'Open' },
            { id: 'Close', title: 'Close' },
            { id: 'Low', title: 'Low' },
            { id: 'High', title: 'High' },
        ],
        nodes: [
            {
                id: '0',
                cells: {
                    Date: { value: '2024-11-01' },
                    Open: { value: '100' },
                    Close: { value: '110' },
                    Low: { value: '95' },
                    High: { value: '115' },
                },
            },
            {
                id: '1',
                cells: {
                    Date: { value: '2024-11-02' },
                    Open: { value: '110' },
                    Close: { value: '105' },
                    Low: { value: '100' },
                    High: { value: '120' },
                },
            },
            {
                id: '2',
                cells: {
                    Date: { value: '2024-11-03' },
                    Open: { value: '105' },
                    Close: { value: '115' },
                    Low: { value: '102' },
                    High: { value: '118' },
                },
            },
            {
                id: '3',
                cells: {
                    Date: { value: '2024-11-04' },
                    Open: { value: '115' },
                    Close: { value: '120' },
                    Low: { value: '110' },
                    High: { value: '125' },
                },
            },
        ],
    }),
    funnel: () => ({
        columns: [
            { id: 'Stage', title: 'Stage' },
            { id: 'Value', title: 'Value' },
            { id: 'Revenue', title: 'Revenue' },
        ],
        nodes: [
            {
                id: '0',
                cells: {
                    Stage: { value: 'Prospects' },
                    Value: { value: '500' },
                    Revenue: { value: '2000' },
                },
            },
            {
                id: '1',
                cells: {
                    Stage: { value: 'Qualified Leads' },
                    Value: { value: '300' },
                    Revenue: { value: '1500' },
                },
            },
            {
                id: '2',
                cells: {
                    Stage: { value: 'Proposals' },
                    Value: { value: '200' },
                    Revenue: { value: '1200' },
                },
            },
            {
                id: '3',
                cells: {
                    Stage: { value: 'Negotiations' },
                    Value: { value: '100' },
                    Revenue: { value: '800' },
                },
            },
            {
                id: '4',
                cells: {
                    Stage: { value: 'Closed Deals' },
                    Value: { value: '50' },
                    Revenue: { value: '500' },
                },
            },
        ],
    }),
    gaussian: () => ({
        columns: [
            { id: 'X', title: 'X Axis (Value)' },
            { id: 'Frequency', title: 'Frequency' },
        ],
        nodes: [
            {
                id: '0',
                cells: { X: { value: '-3' }, Frequency: { value: '5' } },
            },
            {
                id: '1',
                cells: { X: { value: '-2' }, Frequency: { value: '15' } },
            },
            {
                id: '2',
                cells: { X: { value: '-1' }, Frequency: { value: '40' } },
            },
            {
                id: '3',
                cells: { X: { value: '0' }, Frequency: { value: '70' } },
            },
            {
                id: '4',
                cells: { X: { value: '1' }, Frequency: { value: '40' } },
            },
            {
                id: '5',
                cells: { X: { value: '2' }, Frequency: { value: '15' } },
            },
            {
                id: '6',
                cells: { X: { value: '3' }, Frequency: { value: '5' } },
            },
        ],
    }),
    line: () => BASE_DATASET,
    pie: () => ({
        columns: [
            { id: 'Axis', title: 'Department' },
            { id: 'Series_1', title: 'Current Budget' },
            { id: 'Series_2', title: 'Projected Budget' },
            { id: 'Series_3', title: 'Allocated Budget' },
            { id: 'Series_4', title: 'Expenditures' },
            { id: 'Series_5', title: 'Savings' },
        ],
        nodes: [
            {
                id: '0',
                cells: {
                    Axis: { value: 'Digital Marketing' },
                    Series_1: { value: '15000' },
                    Series_2: { value: '16000' },
                    Series_3: { value: '15500' },
                    Series_4: { value: '14500' },
                    Series_5: { value: '500' },
                },
            },
            {
                id: '1',
                cells: {
                    Axis: { value: 'E-commerce Sales' },
                    Series_1: { value: '8000' },
                    Series_2: { value: '9000' },
                    Series_3: { value: '8500' },
                    Series_4: { value: '7500' },
                    Series_5: { value: '1000' },
                },
            },
            {
                id: '2',
                cells: {
                    Axis: { value: 'Administrative Services' },
                    Series_1: { value: '6000' },
                    Series_2: { value: '6500' },
                    Series_3: { value: '6250' },
                    Series_4: { value: '6000' },
                    Series_5: { value: '250' },
                },
            },
            {
                id: '3',
                cells: {
                    Axis: { value: 'Product Development' },
                    Series_1: { value: '20000' },
                    Series_2: { value: '22000' },
                    Series_3: { value: '21000' },
                    Series_4: { value: '20500' },
                    Series_5: { value: '9500' },
                },
            },
            {
                id: '4',
                cells: {
                    Axis: { value: 'Customer Support' },
                    Series_1: { value: '10000' },
                    Series_2: { value: '11000' },
                    Series_3: { value: '10500' },
                    Series_4: { value: '10000' },
                    Series_5: { value: '500' },
                },
            },
        ],
    }),
    radar: () => ({
        columns: [
            { id: 'Axis', title: 'Category' },
            { id: 'Speed', title: 'Speed' },
            { id: 'Agility', title: 'Agility' },
            { id: 'Strength', title: 'Strength' },
            { id: 'Endurance', title: 'Endurance' },
            { id: 'Intelligence', title: 'Intelligence' },
        ],
        nodes: [
            {
                id: '0',
                cells: {
                    Axis: { value: 'Competitor A' },
                    Speed: { value: '80' },
                    Agility: { value: '70' },
                    Strength: { value: '90' },
                    Endurance: { value: '60' },
                    Intelligence: { value: '85' },
                },
            },
            {
                id: '1',
                cells: {
                    Axis: { value: 'Competitor B' },
                    Speed: { value: '75' },
                    Agility: { value: '80' },
                    Strength: { value: '85' },
                    Endurance: { value: '70' },
                    Intelligence: { value: '80' },
                },
            },
        ],
    }),
    scatter: () => ({
        columns: [
            { id: 'X', title: 'X Axis' },
            { id: 'Y', title: 'Y Axis' },
        ],
        nodes: [
            { id: '0', cells: { X: { value: '10' }, Y: { value: '20' } } },
            { id: '1', cells: { X: { value: '15' }, Y: { value: '30' } } },
            { id: '2', cells: { X: { value: '20' }, Y: { value: '40' } } },
            { id: '3', cells: { X: { value: '25' }, Y: { value: '50' } } },
            { id: '4', cells: { X: { value: '30' }, Y: { value: '60' } } },
        ],
    }),
};
