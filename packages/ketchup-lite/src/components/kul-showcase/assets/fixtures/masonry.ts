import { getAssetPath } from '@stencil/core';
import { KulDataDataset } from '../../../../components';
import { KulComponentName } from '../../../../types/GenericTypes';

export const MASONRY_KULDATA_FACTORY: Partial<{
    [K in KulComponentName]: () => KulDataDataset;
}> = {
    KulImage: () => {
        return {
            nodes: [
                {
                    cells: {
                        kulImage: {
                            shape: 'image',
                            value: getAssetPath(
                                `./assets/media/avatar_thor_2.png`
                            ),
                        },
                    },
                    id: 'image_0',
                    value: 'Node 0',
                },
                {
                    cells: {
                        kulImage: {
                            shape: 'image',
                            value: getAssetPath(
                                `./assets/media/location_forest.png`
                            ),
                        },
                    },
                    id: 'image_1',
                    value: 'Node 1',
                },
                {
                    cells: {
                        kulImage: {
                            shape: 'image',
                            value: getAssetPath(
                                `./assets/media/avatar_freya.png`
                            ),
                        },
                    },
                    id: 'image_2',
                    value: 'Node 2',
                },
                {
                    cells: {
                        kulImage: {
                            shape: 'image',
                            value: getAssetPath(
                                `./assets/media/avatar_thor_2.png`
                            ),
                        },
                    },
                    id: 'image_3',
                    value: 'Node 3',
                },
                {
                    cells: {
                        kulImage: {
                            shape: 'image',
                            value: getAssetPath(
                                `./assets/media/avatar_thor_2.png`
                            ),
                        },
                    },
                    id: 'image_4',
                    value: 'Node 4',
                },
                {
                    cells: {
                        kulImage: {
                            shape: 'image',
                            value: getAssetPath(
                                `./assets/media/avatar_freya_2.png`
                            ),
                        },
                    },
                    id: 'image_5',
                    value: 'Node 5',
                },
                {
                    cells: {
                        kulImage: {
                            shape: 'image',
                            value: getAssetPath(
                                `./assets/media/avatar_thor_2.png`
                            ),
                        },
                    },
                    id: 'image_6',
                    value: 'Node 6',
                },
                {
                    cells: {
                        kulImage: {
                            shape: 'image',
                            value: getAssetPath(
                                `./assets/media/avatar_thor_2.png`
                            ),
                        },
                    },
                    id: 'image_7',
                    value: 'Node 7',
                },
                {
                    cells: {
                        kulImage: {
                            shape: 'image',
                            value: getAssetPath(
                                `./assets/media/outfit_armor_2.png`
                            ),
                        },
                    },
                    id: 'image_8',
                    value: 'Node 8',
                },
                {
                    cells: {
                        kulImage: {
                            shape: 'image',
                            value: getAssetPath(
                                `./assets/media/outfit_armor_3.png`
                            ),
                        },
                    },
                    id: 'image_9',
                    value: 'Node 9',
                },
                {
                    cells: {
                        kulImage: {
                            shape: 'image',
                            value: getAssetPath(
                                `./assets/media/location_lake.png`
                            ),
                        },
                    },
                    id: 'image_10',
                    value: 'Node 10',
                },
                {
                    cells: {
                        kulImage: {
                            shape: 'image',
                            value: getAssetPath(
                                `./assets/media/avatar_freya_2.png`
                            ),
                        },
                    },
                    id: 'image_11',
                    value: 'Node 11',
                },
            ],
        };
    },
};
