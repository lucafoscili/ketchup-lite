import { KulDataShapeDefaults } from '../../../managers/kul-data/kul-data-declarations';

export const DEFAULTS: (isOverlay: boolean) => {
    left: KulDataShapeDefaults;
    right: KulDataShapeDefaults;
} = (isOverlay) => {
    return {
        left: {
            image: () => [
                {
                    htmlProps: { className: 'kul-fit' },
                    kulSizeX: '100%',
                    kulSizeY: '100%',
                },
            ],
        },
        right: {
            image: () => [
                {
                    htmlProps: { className: 'kul-fit' },
                    kulSizeX: isOverlay ? 'auto' : '100%',
                    kulSizeY: '100%',
                },
            ],
        },
    };
};
