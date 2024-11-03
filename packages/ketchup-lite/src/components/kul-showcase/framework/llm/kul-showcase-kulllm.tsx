import { Component, Element, Fragment, h } from '@stencil/core';
import { KUL_WRAPPER_ID } from '../../../../variables/GenericVariables';
import { LLM_DATA } from './kul-showcase-kulllm-data';

@Component({
    tag: 'kul-showcase-kulllm',
    styleUrl: 'kul-showcase-kulllm.scss',
    shadow: true,
})
export class KulShowcaseKulllm {
    /**
     * References the root HTML element of the component (<kul-showcase-kulllm>).
     */
    @Element() rootElement: HTMLKulShowcaseKulllmElement;

    /*-------------------------------------------------*/
    /*          L i f e c y c l e   H o o k s          */
    /*-------------------------------------------------*/

    render() {
        return (
            <Fragment>
                <div id={KUL_WRAPPER_ID}>
                    <kul-article kulData={LLM_DATA}></kul-article>
                </div>
            </Fragment>
        );
    }
}
