import { Component, Element, Fragment, State, VNode, h } from '@stencil/core';

import { TOAST_DOC, TOAST_EXAMPLES } from './kul-showcase-toast-data';
import { ToastExample } from './kul-showcase-toast-declarations';
import { KulDataCyAttributes } from '../../../../types/GenericTypes';
import { SHOWCASE_DYN_EXAMPLES } from '../../helpers/kul-showcase-dyn-sample';
import { KulShowcaseDynamicExampleType } from '../../kul-showcase-declarations';

@Component({
  tag: 'kul-showcase-toast',
  styleUrl: 'kul-showcase-toast.scss',
  shadow: true,
})
export class KulShowcaseToast {
  /**
   * References the root HTML element of the component (<kul-showcase-toast>).
   */
  @Element() rootElement: HTMLKulShowcaseToastElement;

  //#region States
  /**
   * Data of the examples.
   */
  @State() examples = TOAST_EXAMPLES;
  //#endregion

  //#region Internal variables
  #dynamicExampleManager = SHOWCASE_DYN_EXAMPLES;
  #dynamicExamples: HTMLKulToastElement[] = [];
  #interval: NodeJS.Timeout;
  //#endregion

  //#region Private methods
  #prepExamples() {
    const elements: VNode[] = [];
    for (const key in this.examples) {
      if (Object.prototype.hasOwnProperty.call(this.examples, key)) {
        const props: ToastExample = this.examples[key];
        elements.push(
          <div class="example" part="example">
            <div class="description" part="description">
              {props['data-description']}
            </div>
            <div class="comp-wrapper" part="comp-wrapper">
              <kul-toast
                key={key}
                id={key}
                ref={(el) => {
                  if (el && props['data-dynamic']) {
                    this.#dynamicExamples.push(el);
                  }
                }}
                {...props}
              ></kul-toast>
            </div>
          </div>,
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
          switch (comp.dataset.dynamic as KulShowcaseDynamicExampleType) {
            case 'custom':
              comp.kulStyle = this.#dynamicExampleManager.custom.get(comp.id);
              break;
          }
        });
      }, 500);
    }
  }

  render() {
    return (
      <Fragment>
        <kul-article kulData={TOAST_DOC}></kul-article>
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
