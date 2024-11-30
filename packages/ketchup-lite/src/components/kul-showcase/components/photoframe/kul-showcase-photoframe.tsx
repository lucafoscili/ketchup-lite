import { Component, Element, Fragment, VNode, h } from '@stencil/core';
import { KulDataCyAttributes } from '../../../../types/GenericTypes';
import { SHOWCASE_DYN_EXAMPLES } from '../../helpers/kul-showcase-dyn-sample';
import { KulShowcaseDynamicExampleType } from '../../kul-showcase-declarations';
import {
    PHOTOFRAME_DOC,
    PHOTOFRAME_EXAMPLES,
} from './kul-showcase-photoframe-data';
import { PhotoframeExample } from './kul-showcase-photoframe-declarations';

@Component({
    tag: 'kul-showcase-photoframe',
    styleUrl: 'kul-showcase-photoframe.scss',
    shadow: true,
})
export class KulShowcasePhotoframe {
    /**
     * References the root HTML element of the component (<kul-showcase-photoframe>).
     */
    @Element() rootElement: HTMLKulShowcasePhotoframeElement;

    //#region Internal variables
    #dynamicExampleManager = SHOWCASE_DYN_EXAMPLES;
    #dynamicExamples: HTMLKulPhotoframeElement[] = [];
    #interval: NodeJS.Timeout;
    //#endregion

    //#region Private methods
    #prepExamples() {
        const elements: VNode[] = [];
        const examples = PHOTOFRAME_EXAMPLES();
        for (const key in examples) {
            if (Object.prototype.hasOwnProperty.call(examples, key)) {
                const props: PhotoframeExample = examples[key];
                elements.push(
                    <div class="example" part="example">
                        <div class="description" part="description">
                            {props['data-description']}
                        </div>
                        <div class="comp-wrapper" part="comp-wrapper">
                            <kul-photoframe
                                key={key}
                                id={key}
                                ref={(el) => {
                                    if (el && props['data-dynamic']) {
                                        this.#dynamicExamples.push(el);
                                    }
                                }}
                                {...props}
                            ></kul-photoframe>
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
                <kul-article kulData={PHOTOFRAME_DOC}></kul-article>
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
