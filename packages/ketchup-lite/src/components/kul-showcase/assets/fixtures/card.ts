import { getAssetPath } from '@stencil/core';
import { KulDataDataset } from '../../../../components';
import { KulCardLayout } from '../../../kul-card/kul-card-declarations';

export const CARD_KULDATA_FACTORY: {
    [K in KulCardLayout]: () => KulDataDataset;
} = {
    keywords: () => {
        return {
            nodes: [
                {
                    cells: {
                        kulChart: {
                            kulAxis: 'Axis_0',
                            kulData: {
                                columns: [
                                    {
                                        id: 'Axis_0',
                                        title: 'Keyword',
                                    },
                                    {
                                        id: 'Series_0',
                                        title: 'Count',
                                    },
                                ],
                                nodes: [
                                    {
                                        cells: {
                                            Axis_0: {
                                                value: 'key_1',
                                            },
                                            Series_0: {
                                                shape: 'number',
                                                value: 1,
                                            },
                                        },
                                        id: '0',
                                    },
                                    {
                                        cells: {
                                            Axis_0: {
                                                value: 'key_2',
                                            },
                                            Series_0: {
                                                shape: 'number',
                                                value: 2,
                                            },
                                        },
                                        id: '1',
                                    },
                                    {
                                        cells: {
                                            Axis_0: {
                                                value: 'key_3',
                                            },
                                            Series_0: {
                                                shape: 'number',
                                                value: 6,
                                            },
                                        },
                                        id: '2',
                                    },
                                    {
                                        cells: {
                                            Axis_0: {
                                                value: 'key_4',
                                            },
                                            Series_0: {
                                                shape: 'number',
                                                value: 0,
                                            },
                                        },
                                        id: '3',
                                    },
                                    {
                                        cells: {
                                            Axis_0: {
                                                value: 'key_5',
                                            },
                                            Series_0: {
                                                shape: 'number',
                                                value: 12,
                                            },
                                        },
                                        id: '4',
                                    },
                                ],
                            },
                            kulSeries: ['Series_0'],
                            shape: 'chart',
                            value: '',
                        },
                        kulChip: {
                            kulData: {
                                nodes: [
                                    {
                                        id: 'key_1',
                                        value: 'key_1',
                                    },
                                    {
                                        id: 'key_2',
                                        value: 'key_2',
                                    },
                                    {
                                        id: 'key_3',
                                        value: 'key_3',
                                    },
                                    {
                                        id: 'key_4',
                                        value: 'key_4',
                                    },
                                    {
                                        id: 'key_5',
                                        value: 'key_5',
                                    },
                                ],
                            },
                            kulStyle:
                                '#kul-component .chip-set { height: auto; }',
                            kulStyling: 'filter',
                            shape: 'chip',
                            value: '',
                        },
                        kulButton: {
                            kulIcon: 'content_copy',
                            kulLabel: 'Copy selected',
                            kulStyling: 'flat',
                            shape: 'button',
                            value: '',
                        },
                    },
                    id: '1',
                },
            ],
        };
    },
    material: () => {
        return {
            nodes: [
                {
                    cells: {
                        1: { value: 'Title' },
                        2: { value: 'Subtitle' },
                        3: { value: 'Description' },
                        kulImage: {
                            shape: 'image',
                            value: getAssetPath(
                                `./assets/media/color_splash.jpg`
                            ),
                        },
                    },
                    id: '1',
                },
            ],
        };
    },
    upload: () => {
        return {
            nodes: [
                {
                    cells: {
                        kulButton: { shape: 'button', value: '' },
                        kulUpload: {
                            shape: 'upload',
                            value: '',
                        },
                    },
                    id: '1',
                },
            ],
        };
    },
};
