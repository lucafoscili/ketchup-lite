import { Component, Element, Fragment, VNode, h } from '@stencil/core';
import { BADGE_EXAMPLES } from './kul-showcase-badge-data';
import { DynamicExampleManager } from '../../kul-showcase-utils';
import { KulShowcaseDynamicExampleType } from '../../kul-showcase-declarations';

@Component({
    tag: 'kul-showcase-badge',
    styleUrl: 'kul-showcase-badge.scss',
    shadow: true,
})
export class KulShowcaseBadge {
    /**
     * References the root HTML element of the component (<kul-showcase-badge>).
     */
    @Element() rootElement: HTMLKulShowcaseBadgeElement;

    /*-------------------------------------------------*/
    /*       I n t e r n a l   V a r i a b l e s       */
    /*-------------------------------------------------*/

    #dynamicExamples: HTMLKulBadgeElement[] = [];
    #dynamicExampleManager = new DynamicExampleManager();
    #interval: NodeJS.Timeout;

    /*-------------------------------------------------*/
    /*           P r i v a t e   M e t h o d s         */
    /*-------------------------------------------------*/

    #prepExamples() {
        const elements: VNode[] = [];
        for (const key in BADGE_EXAMPLES) {
            if (Object.prototype.hasOwnProperty.call(BADGE_EXAMPLES, key)) {
                const props = BADGE_EXAMPLES[key];
                elements.push(
                    <div class="example" part="example">
                        <div class="description" part="description">
                            {props['data-description']}
                        </div>
                        <div class="comp-wrapper" part="comp-wrapper">
                            <div class="badge-wrapper">
                                <div class="badge-anchor">Simple div</div>
                                <kul-badge
                                    key={key}
                                    id={key}
                                    ref={(el) => {
                                        if (props['data-dynamic']) {
                                            this.#dynamicExamples.push(el);
                                        }
                                    }}
                                    {...props}
                                ></kul-badge>
                            </div>
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
                        case 'positions':
                            comp.className =
                                'hydrated ' +
                                this.#dynamicExampleManager.position.get(
                                    comp.id
                                );
                            break;
                        case 'state-colors':
                            comp.className =
                                'hydrated ' +
                                this.#dynamicExampleManager.stateColors.get(
                                    comp.id
                                );
                            break;
                    }
                });
            }, 500);
        }
    }

    render() {
        return (
            <Fragment>
                <div class="grid" part="grid">
                    {this.#prepExamples()}
                </div>
            </Fragment>
        );
    }

    disconnectedCallback() {
        clearInterval(this.#interval);
    }
}
