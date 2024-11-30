import { Component, Element, Fragment, VNode, h } from '@stencil/core';
import { SHOWCASE_DYN_EXAMPLES } from '../../helpers/kul-showcase-dyn-sample';
import { KulShowcaseDynamicExampleType } from '../../kul-showcase-declarations';
import { CAROUSEL_DOC, CAROUSEL_EXAMPLES } from './kul-showcase-carousel-data';
import { CarouselExample } from './kul-showcase-carousel-declarations';

@Component({
    tag: 'kul-showcase-carousel',
    styleUrl: 'kul-showcase-carousel.scss',
    shadow: true,
})
export class KulShowcaseCarousel {
    /**
     * References the root HTML element of the component (<kul-showcase-carousel>).
     */
    @Element() rootElement: HTMLKulShowcaseCarouselElement;

    //#region Internal variables
    #dynamicExampleManager = SHOWCASE_DYN_EXAMPLES;
    #dynamicExamples: HTMLKulCarouselElement[] = [];
    #interval: NodeJS.Timeout;
    //#endregion

    //#region Private methods
    #prepExamples() {
        const elements: VNode[] = [];
        const examples = CAROUSEL_EXAMPLES();
        for (const key in examples) {
            if (Object.prototype.hasOwnProperty.call(examples, key)) {
                const props: CarouselExample = examples[key];
                elements.push(
                    <div class="example" part="example">
                        <div class="description" part="description">
                            {props['data-description']}
                        </div>
                        <div class="comp-wrapper" part="comp-wrapper">
                            <kul-carousel
                                key={key}
                                id={key}
                                ref={(el) => {
                                    if (el && props['data-dynamic']) {
                                        this.#dynamicExamples.push(el);
                                    }
                                }}
                                {...props}
                            ></kul-carousel>
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
                <kul-article kulData={CAROUSEL_DOC}></kul-article>
                <div class="examples-title" part="examples-title">
                    Examples
                </div>
                <div class="grid" data-cy="wrapper" part="grid">
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
