import { KulDataShapeDefaults } from '../../../managers/kul-data/kul-data-declarations';

export const SOURCE_DEFAULTS: KulDataShapeDefaults = {
    image: () => [
        {
            kulSizeX: '100%',
            kulSizeY: '100%',
        },
    ],
};

export const TARGET_DEFAULTS: KulDataShapeDefaults = {
    image: () => [
        {
            kulSizeX: 'auto',
            kulSizeY: '100%',
        },
    ],
};
