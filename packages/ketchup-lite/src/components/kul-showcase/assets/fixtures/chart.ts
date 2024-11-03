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
            { id: 'Metric', title: 'Metric' },
            { id: 'Value', title: 'Value' },
        ],
        nodes: [
            {
                id: '0',
                cells: { Metric: { value: 'Speed' }, Value: { value: '80' } },
            },
            {
                id: '1',
                cells: { Metric: { value: 'Agility' }, Value: { value: '70' } },
            },
            {
                id: '2',
                cells: {
                    Metric: { value: 'Strength' },
                    Value: { value: '90' },
                },
            },
            {
                id: '3',
                cells: {
                    Metric: { value: 'Endurance' },
                    Value: { value: '60' },
                },
            },
            {
                id: '4',
                cells: {
                    Metric: { value: 'Intelligence' },
                    Value: { value: '85' },
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
