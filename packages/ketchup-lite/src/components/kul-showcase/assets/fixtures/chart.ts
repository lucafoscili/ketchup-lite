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
            { id: 'Value', title: 'Value' },
        ],
        nodes: [
            {
                id: '0',
                cells: {
                    Date: {
                        value: new Date(
                            new Date().setDate(new Date().getDate() - 4)
                        )
                            .toISOString()
                            .split('T')[0],
                    },
                    Value: { value: '10' },
                },
            },
            {
                id: '1',
                cells: {
                    Date: {
                        value: new Date(
                            new Date().setDate(new Date().getDate() - 3)
                        )
                            .toISOString()
                            .split('T')[0],
                    },
                    Value: { value: '15' },
                },
            },
            {
                id: '2',
                cells: {
                    Date: {
                        value: new Date(
                            new Date().setDate(new Date().getDate() - 2)
                        )
                            .toISOString()
                            .split('T')[0],
                    },
                    Value: { value: '20' },
                },
            },
            {
                id: '3',
                cells: {
                    Date: {
                        value: new Date(
                            new Date().setDate(new Date().getDate() - 1)
                        )
                            .toISOString()
                            .split('T')[0],
                    },
                    Value: { value: '25' },
                },
            },
            {
                id: '4',
                cells: {
                    Date: { value: new Date().toISOString().split('T')[0] },
                    Value: { value: '30' },
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
    heatmap: () => ({
        columns: [
            { id: 'Source_Channel', title: 'Source Channel Intensity' },
            { id: 'Target_Channel', title: 'Target Channel Intensity' },
            { id: 'Mapping_Count', title: 'Mapping Count' },
        ],
        nodes: [
            {
                id: '0',
                cells: {
                    Source_Channel: { value: '20' },
                    Target_Channel: { value: '25' },
                    Mapping_Count: { value: '12' },
                },
            },
            {
                id: '1',
                cells: {
                    Source_Channel: { value: '45' },
                    Target_Channel: { value: '55' },
                    Mapping_Count: { value: '8' },
                },
            },
            {
                id: '2',
                cells: {
                    Source_Channel: { value: '60' },
                    Target_Channel: { value: '65' },
                    Mapping_Count: { value: '20' },
                },
            },
            {
                id: '3',
                cells: {
                    Source_Channel: { value: '100' },
                    Target_Channel: { value: '110' },
                    Mapping_Count: { value: '25' },
                },
            },
            {
                id: '4',
                cells: {
                    Source_Channel: { value: '125' },
                    Target_Channel: { value: '130' },
                    Mapping_Count: { value: '18' },
                },
            },
            {
                id: '5',
                cells: {
                    Source_Channel: { value: '150' },
                    Target_Channel: { value: '140' },
                    Mapping_Count: { value: '30' },
                },
            },
            {
                id: '6',
                cells: {
                    Source_Channel: { value: '175' },
                    Target_Channel: { value: '170' },
                    Mapping_Count: { value: '22' },
                },
            },
            {
                id: '7',
                cells: {
                    Source_Channel: { value: '200' },
                    Target_Channel: { value: '210' },
                    Mapping_Count: { value: '15' },
                },
            },
            {
                id: '8',
                cells: {
                    Source_Channel: { value: '225' },
                    Target_Channel: { value: '230' },
                    Mapping_Count: { value: '10' },
                },
            },
            {
                id: '9',
                cells: {
                    Source_Channel: { value: '240' },
                    Target_Channel: { value: '250' },
                    Mapping_Count: { value: '5' },
                },
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
    sankey: () => ({
        columns: [
            { id: 'Source', title: 'Source' },
            { id: 'Target', title: 'Target' },
            { id: 'Value', title: 'Value' },
        ],
        nodes: [
            {
                id: '0',
                cells: {
                    Source: { value: 'Marketing' },
                    Target: { value: 'Sales' },
                    Value: { value: '300' },
                },
            },
            {
                id: '1',
                cells: {
                    Source: { value: 'Sales' },
                    Target: { value: 'Support' },
                    Value: { value: '150' },
                },
            },
            {
                id: '2',
                cells: {
                    Source: { value: 'Marketing' },
                    Target: { value: 'Development' },
                    Value: { value: '200' },
                },
            },
            {
                id: '3',
                cells: {
                    Source: { value: 'Development' },
                    Target: { value: 'Operations' },
                    Value: { value: '100' },
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
