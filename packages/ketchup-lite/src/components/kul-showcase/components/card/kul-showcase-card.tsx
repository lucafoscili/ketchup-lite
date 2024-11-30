import { Component, Element, Fragment, VNode, h } from '@stencil/core';
import { KulDataCyAttributes } from '../../../../types/GenericTypes';
import { KulCardLayout } from '../../../kul-card/kul-card-declarations';
import { SHOWCASE_DYN_EXAMPLES } from '../../helpers/kul-showcase-dyn-sample';
import { KulShowcaseDynamicExampleType } from '../../kul-showcase-declarations';
import { CARD_DOC, CARD_EXAMPLES } from './kul-showcase-card-data';
import { CardExample } from './kul-showcase-card-declarations';

@Component({
    tag: 'kul-showcase-card',
    styleUrl: 'kul-showcase-card.scss',
    shadow: true,
})
export class KulShowcaseCard {
    /**
     * References the root HTML element of the component (<kul-showcase-card>).
     */
    @Element() rootElement: HTMLKulShowcaseCardElement;

    //#region Internal variables
    #dynamicExampleManager = SHOWCASE_DYN_EXAMPLES;
    #dynamicExamples: HTMLKulCardElement[] = [];
    #interval: NodeJS.Timeout;
    //#endregion

    //#region Private methods
    #prepExamples() {
        const elements: VNode[] = [];
        const examples = CARD_EXAMPLES();
        for (const k1 in examples) {
            if (Object.prototype.hasOwnProperty.call(examples, k1)) {
                const layout: CardExample = examples[k1];
                const layoutWrapper: VNode[] = [];

                for (const k2 in layout) {
                    if (Object.prototype.hasOwnProperty.call(layout, k2)) {
                        const props: CardExample = layout[k2];
                        layoutWrapper.push(
                            <div class="example" part="example">
                                <div class="description" part="description">
                                    {props['data-description']}
                                </div>
                                <div class="comp-wrapper" part="comp-wrapper">
                                    <kul-card
                                        key={k2}
                                        id={k1 + '-' + k2}
                                        ref={(el) => {
                                            if (el && props['data-dynamic']) {
                                                this.#dynamicExamples.push(el);
                                            }
                                        }}
                                        kulLayout={k1 as KulCardLayout}
                                        {...props}
                                    ></kul-card>
                                </div>
                            </div>
                        );
                    }
                }
                elements.push(
                    <div class="grid-container" part="grid-container">
                        <div class="grid-title" part="grid-title">
                            {k1} layout
                        </div>
                        <div class="grid" part="grid">
                            {layoutWrapper}
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
                <kul-article kulData={CARD_DOC}></kul-article>
                <div class="examples-title" part="examples-title">
                    Examples
                </div>
                <div data-cy={KulDataCyAttributes.SHOWCASE_GRID_WRAPPER}>
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
