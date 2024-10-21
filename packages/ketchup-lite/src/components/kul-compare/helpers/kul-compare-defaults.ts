import { KulDataShapeDefaults } from '../../../managers/kul-data/kul-data-declarations';

export const DEFAULTS: (isOverlay: boolean) => {
    source: KulDataShapeDefaults;
    target: KulDataShapeDefaults;
} = (isOverlay) => {
    return {
        source: {
            image: () => [
                {
                    htmlProps: { className: 'kul-fit' },
                    kulSizeX: '100%',
                    kulSizeY: '100%',
                },
            ],
        },
        target: {
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
