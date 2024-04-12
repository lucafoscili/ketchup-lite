import { Component, Element, Fragment, VNode, h } from '@stencil/core';
import { SPLASH_EXAMPLES } from './kul-showcase-splash-data';

@Component({
    tag: 'kul-showcase-splash',
    styleUrl: 'kul-showcase-splash.scss',
    shadow: true,
})
export class KulShowcaseSplash {
    /**
     * References the root HTML element of the component (<kul-showcase-splash>).
     */
    @Element() rootElement: HTMLKulShowcaseSplashElement;

    /*-------------------------------------------------*/
    /*           P r i v a t e   M e t h o d s         */
    /*-------------------------------------------------*/

    #prepExamples() {
        const elements: VNode[] = [];
        for (const key in SPLASH_EXAMPLES) {
            if (Object.prototype.hasOwnProperty.call(SPLASH_EXAMPLES, key)) {
                const props = SPLASH_EXAMPLES[key];
                elements.push(
                    <div class="example" part="example">
                        <div class="description" part="description">
                            {props['data-description']}
                        </div>
                        <div class="comp-wrapper" part="comp-wrapper">
                            <kul-button
                                kulLabel="Splash!"
                                onClick={() => {
                                    const splash =
                                        document.createElement('kul-splash');
                                    splash.kulLabel = 'Click to close...';
                                    splash.addEventListener('click', () => {
                                        splash.remove();
                                    });
                                    const spinner =
                                        document.createElement('kul-spinner');
                                    spinner.kulActive = true;
                                    spinner.kulDimensions = '7px';
                                    spinner.kulLayout = 7;
                                    splash.appendChild(spinner);
                                    document.body.appendChild(splash);
                                }}
                            ></kul-button>
                        </div>
                    </div>
                );
            }
        }
        return elements;
    }

    /*-------------------------------------------------*/
    /*          L i f e c y c l e   H o o k s          */
    /*-------------------------------------------------*/

    render() {
        return (
            <Fragment>
                <div class="grid" part="grid">
                    {this.#prepExamples()}
                </div>
            </Fragment>
        );
    }
}
