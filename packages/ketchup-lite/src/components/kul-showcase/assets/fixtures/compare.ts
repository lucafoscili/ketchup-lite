import { getAssetPath } from '@stencil/core';
import { KulDataDataset } from '../../../../components';
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
                },
            ],
        };
    },
};
