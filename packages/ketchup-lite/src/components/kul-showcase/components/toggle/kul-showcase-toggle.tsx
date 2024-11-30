import { Component, Element, Fragment, VNode, h } from '@stencil/core';
import { KulDataCyAttributes } from '../../../../types/GenericTypes';
import { SHOWCASE_DYN_EXAMPLES } from '../../helpers/kul-showcase-dyn-sample';
import { KulShowcaseDynamicExampleType } from '../../kul-showcase-declarations';
import { TOGGLE_DOC, TOGGLE_EXAMPLES } from './kul-showcase-toggle-data';
import { ToggleExample } from './kul-showcase-toggle-declarations';

@Component({
    tag: 'kul-showcase-toggle',
    styleUrl: 'kul-showcase-toggle.scss',
    shadow: true,
})
export class KulShowcaseToggle {
    /**
     * References the root HTML element of the component (<kul-showcase-toggle>).
     */
    @Element() rootElement: HTMLKulShowcaseToggleElement;

    //#region Internal variables
    #dynamicExamples: HTMLKulToggleElement[] = [];
    #dynamicExampleManager = SHOWCASE_DYN_EXAMPLES;
    #interval: NodeJS.Timeout;
    //#endregion

    //#region Private methods
    #prepExamples() {
        const elements: VNode[] = [];
        for (const key in TOGGLE_EXAMPLES) {
            if (Object.prototype.hasOwnProperty.call(TOGGLE_EXAMPLES, key)) {
                const props: ToggleExample = TOGGLE_EXAMPLES[key];
                elements.push(
                    <div class="example" part="example">
                        <div class="description" part="description">
                            {props['data-description']}
                        </div>
                        <div class="comp-wrapper" part="comp-wrapper">
                            <kul-toggle
                                key={key}
                                id={key}
                                ref={(el) => {
                                    if (el && props['data-dynamic']) {
                                        this.#dynamicExamples.push(el);
                                    }
                                }}
                                {...props}
                            ></kul-toggle>
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
                <kul-article kulData={TOGGLE_DOC}></kul-article>
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
