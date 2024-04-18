import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { reactOutputTarget } from '@stencil/react-output-target';

export const config: Config = {
    sourceMap: false,
    namespace: 'ketchup-lite',
    outputTargets: [
        { type: 'docs-readme' },
        {
            copy: [{ src: 'assets' }],
            empty: false,
            type: 'www',
            serviceWorker: null,
        },
        reactOutputTarget({
            componentCorePackage: 'ketchup-lite',
            proxiesFile: '../ketchup-lite-react/src/index.ts',
            includeDefineCustomElements: true,
        }),
        {
            type: 'dist',
            esmLoaderPath: './loader',
        },
        {
            type: 'dist-custom-elements',
        },
    ],
    plugins: [
        sass({
            includePaths: ['./node_modules', './src/style'],
            injectGlobalPaths: ['src/style/global.scss'],
        }),
    ],
};
