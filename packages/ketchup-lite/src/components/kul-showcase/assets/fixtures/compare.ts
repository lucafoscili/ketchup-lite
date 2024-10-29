import { getAssetPath } from '@stencil/core';
import { KulDataDataset } from '../../../../managers/kul-data/kul-data-declarations';
import { KulComponentName } from '../../../../types/GenericTypes';

export const COMPARE_KULDATA_FACTORY: Partial<{
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
                                `./assets/media/avatar_thor.png`
                            ),
                        },
                    },
                    id: 'image_1',
                    value: 'First node',
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
                    value: 'Second node',
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
                    value: 'Third node',
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
                    id: 'image_4',
                    value: 'Fourth node',
                },
            ],
        };
    },
};
