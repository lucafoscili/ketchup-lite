import { Component, Element, Fragment, VNode, h } from '@stencil/core';
import { KulDataCyAttributes } from '../../../../types/GenericTypes';
import { HEADER_DOC, HEADER_EXAMPLES } from './kul-showcase-header-data';
import { HeaderExample } from './kul-showcase-header-declarations';

@Component({
    tag: 'kul-showcase-header',
    styleUrl: 'kul-showcase-header.scss',
    shadow: true,
})
export class KulShowcaseHeader {
    /**
     * References the root HTML element of the component (<kul-showcase-header>).
     */
    @Element() rootElement: HTMLKulShowcaseHeaderElement;

    //#region Private methods
    #prepExamples() {
        const elements: VNode[] = [];
        for (const key in HEADER_EXAMPLES) {
            if (Object.prototype.hasOwnProperty.call(HEADER_EXAMPLES, key)) {
                const props: HeaderExample = HEADER_EXAMPLES[key];
                elements.push(
                    <div class="example" part="example">
                        <div class="description" part="description">
                            {props['data-description']}
                        </div>
                        <div class="comp-wrapper" part="comp-wrapper">
                            <iframe
                                key={key}
                                id={key}
                                {...props.iframeProps}
                            ></iframe>
                        </div>
                    </div>
                );
            }
        }
        return elements;
    }
    //#endregion

    //#region Lifecycle hooks
    render() {
        return (
            <Fragment>
                <kul-article kulData={HEADER_DOC}></kul-article>
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
    //#endregion
}
