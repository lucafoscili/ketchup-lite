import { Component, Element, Fragment, VNode, h } from '@stencil/core';
import {
    TYPEWRITER_DOC,
    TYPEWRITER_EXAMPLES,
} from './kul-showcase-typewriter-data';
import { SHOWCASE_DYN_EXAMPLES } from '../../helpers/kul-showcase-dyn-sample';
import { KulShowcaseDynamicExampleType } from '../../kul-showcase-declarations';
import { TypewriterExample } from './kul-showcase-typewriter-declarations';
import { KulDataCyAttributes } from '../../../../types/GenericTypes';

@Component({
    tag: 'kul-showcase-typewriter',
    styleUrl: 'kul-showcase-typewriter.scss',
    shadow: true,
})
export class KulShowcaseTypewriter {
    /**
     * References the root HTML element of the component (<kul-showcase-typewriter>).
     */
    @Element() rootElement: HTMLKulShowcaseTypewriterElement;

    /*-------------------------------------------------*/
    /*       I n t e r n a l   V a r i a b l e s       */
    /*-------------------------------------------------*/

    #dynamicExamples: HTMLKulTypewriterElement[] = [];
    #dynamicExampleManager = SHOWCASE_DYN_EXAMPLES;
    #interval: NodeJS.Timeout;

    /*-------------------------------------------------*/
    /*           P r i v a t e   M e t h o d s         */
    /*-------------------------------------------------*/

    #prepExamples() {
        const elements: VNode[] = [];
        for (const key in TYPEWRITER_EXAMPLES) {
            if (
                Object.prototype.hasOwnProperty.call(TYPEWRITER_EXAMPLES, key)
            ) {
                const props: TypewriterExample = TYPEWRITER_EXAMPLES[key];
                elements.push(
                    <div class="example" part="example">
                        <div class="description" part="description">
                            {props['data-description']}
                        </div>
                        <div class="comp-wrapper" part="comp-wrapper">
                            <kul-typewriter
                                key={key}
                                id={key}
                                ref={(el) => {
                                    if (el && props['data-dynamic']) {
                                        this.#dynamicExamples.push(el);
                                    }
                                }}
                                {...props}
                            ></kul-typewriter>
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

    componentDidLoad() {
        if (this.#dynamicExamples.length > 0) {
            this.#interval = setInterval(() => {
                this.#dynamicExamples.forEach((comp) => {
                    switch (
                        comp.dataset.dynamic as KulShowcaseDynamicExampleType
                    ) {
                        case 'custom':
                            comp.kulStyle =
                                this.#dynamicExampleManager.custom.get(comp.id);
                            break;
                    }
                });
            }, 500);
        }
    }

    render() {
        return (
            <Fragment>
                <kul-article kulData={TYPEWRITER_DOC}></kul-article>
                <div class="examples-title" part="examples-title">
                    Examples
                </div>
                <div
                    class="grid"
                    data-cy={KulDataCyAttributes.SHOWCASE_GRID_WRAPPER}
                    part="grid"
                >
                    {this.#prepExamples()}
                </div>
            </Fragment>
        );
    }

    disconnectedCallback() {
        clearInterval(this.#interval);
    }
}
