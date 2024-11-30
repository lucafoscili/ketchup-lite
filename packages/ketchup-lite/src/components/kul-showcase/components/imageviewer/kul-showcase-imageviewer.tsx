import { Component, Element, Fragment, VNode, h } from '@stencil/core';
import { SHOWCASE_DYN_EXAMPLES } from '../../helpers/kul-showcase-dyn-sample';
import { KulShowcaseDynamicExampleType } from '../../kul-showcase-declarations';
import {
    IMAGEVIEWER_DOC,
    IMAGEVIEWER_EXAMPLES,
} from './kul-showcase-imageviewer-data';
import { ImageviewerExample } from './kul-showcase-imageviewer-declarations';

@Component({
    tag: 'kul-showcase-imageviewer',
    styleUrl: 'kul-showcase-imageviewer.scss',
    shadow: true,
})
export class KulShowcaseImageviewer {
    /**
     * References the root HTML element of the component (<kul-showcase-imageviewer>).
     */
    @Element() rootElement: HTMLKulShowcaseImageviewerElement;

    //#region Internal variables
    #dynamicExampleManager = SHOWCASE_DYN_EXAMPLES;
    #dynamicExamples: HTMLKulImageviewerElement[] = [];
    #interval: NodeJS.Timeout;
    //#endregion

    //#region Private methods
    #prepExamples() {
        const elements: VNode[] = [];
        const examples = IMAGEVIEWER_EXAMPLES();
        for (const key in examples) {
            if (Object.prototype.hasOwnProperty.call(examples, key)) {
                const props: ImageviewerExample = examples[key];
                elements.push(
                    <div class="example" part="example">
                        <div class="description" part="description">
                            {props['data-description']}
                        </div>
                        <div class="comp-wrapper" part="comp-wrapper">
                            <kul-imageviewer
                                key={key}
                                id={key}
                                ref={(el) => {
                                    if (el && props['data-dynamic']) {
                                        this.#dynamicExamples.push(el);
                                    }
                                }}
                                {...props}
                            ></kul-imageviewer>
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
                <kul-article kulData={IMAGEVIEWER_DOC}></kul-article>
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
