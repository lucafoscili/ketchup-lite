import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { reactOutputTarget } from '@stencil/react-output-target';

export const config: Config = {
    bundles: [
        {
            components: [
                'kul-showcase',
                'kul-showcase-debug',
                'kul-showcase-kuldata',
                'kul-showcase-kuldates',
                'kul-showcase-kuldebug',
                'kul-showcase-kuldynamicposition',
                'kul-showcase-kullanguage',
                'kul-showcase-kulllm',
                'kul-showcase-kulmanager',
                'kul-showcase-kulscrollonhover',
                'kul-showcase-kultheme',
                'kul-showcase-accordion',
                'kul-showcase-article',
                'kul-showcase-badge',
                'kul-showcase-button',
                'kul-showcase-card',
                'kul-showcase-carousel',
                'kul-showcase-chart',
                'kul-showcase-chat',
                'kul-showcase-chip',
                'kul-showcase-code',
                'kul-showcase-compare',
                'kul-showcase-drawer',
                'kul-showcase-header',
                'kul-showcase-image',
                'kul-showcase-lazy',
                'kul-showcase-list',
                'kul-showcase-masonry',
                'kul-showcase-messenger',
                'kul-showcase-photoframe',
                'kul-showcase-progressbar',
                'kul-showcase-slider',
                'kul-showcase-spinner',
                'kul-showcase-splash',
                'kul-showcase-switch',
                'kul-showcase-tabbar',
                'kul-showcase-textfield',
                'kul-showcase-toast',
                'kul-showcase-tree',
                'kul-showcase-typewriter',
                'kul-showcase-upload',
            ],
        },
    ],
    namespace: 'ketchup-lite',
    outputTargets: [
        {
            file: 'src/docs/doc.json',
            type: 'docs-json',
        },
        { type: 'docs-readme' },
        {
            copy: [{ src: 'assets' }],
            type: 'www',
            serviceWorker: null,
        },
        reactOutputTarget({
            outDir: '../ketchup-lite-react/src',
        }),
        {
            type: 'dist',
            esmLoaderPath: './loader',
        },
        {
            type: 'dist-custom-elements',
            externalRuntime: false,
        },
    ],
    plugins: [
        sass({
            includePaths: ['./node_modules', './src/style'],
            injectGlobalPaths: ['src/style/global.scss'],
        }),
    ],
    sourceMap: true,
};
