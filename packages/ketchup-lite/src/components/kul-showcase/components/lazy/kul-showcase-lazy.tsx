import { Component, Element, Fragment, VNode, h } from '@stencil/core';
import { KulDataCyAttributes } from '../../../../types/GenericTypes';
import { SHOWCASE_DYN_EXAMPLES } from '../../helpers/kul-showcase-dyn-sample';
import { KulShowcaseDynamicExampleType } from '../../kul-showcase-declarations';
import { LAZY_DOC, LAZY_EXAMPLES } from './kul-showcase-lazy-data';
import { LazyExample } from './kul-showcase-lazy-declarations';

@Component({
    tag: 'kul-showcase-lazy',
    styleUrl: 'kul-showcase-lazy.scss',
    shadow: true,
})
export class KulShowcaseLazy {
    /**
     * References the root HTML element of the component (<kul-showcase-lazy>).
     */
    @Element() rootElement: HTMLKulShowcaseLazyElement;

    //#region Internal variables
    #dynamicExampleManager = SHOWCASE_DYN_EXAMPLES;
    #dynamicExamples: HTMLKulLazyElement[] = [];
    #interval: NodeJS.Timeout;
    //#endregion

    //#region Private methods
    #prepExamples() {
        const elements: VNode[] = [];
        for (const key in LAZY_EXAMPLES) {
            if (Object.prototype.hasOwnProperty.call(LAZY_EXAMPLES, key)) {
                const props: LazyExample = LAZY_EXAMPLES[key];
                elements.push(
                    <div class="example" part="example">
                        <div class="description" part="description">
                            {props['data-description']}
                        </div>
                        <div class="comp-wrapper" part="comp-wrapper">
                            <kul-lazy
                                key={key}
                                id={key}
                                ref={(el) => {
                                    if (el && props['data-dynamic']) {
                                        this.#dynamicExamples.push(el);
                                    }
                                }}
                                {...props}
                            ></kul-lazy>
                        </div>
                    </div>
                );
            }
        }
        return elements;
    }
    //#endregion

    //#region Lifecycle hooks
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
                <kul-article kulData={LAZY_DOC}></kul-article>
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
    //#endregion
}
