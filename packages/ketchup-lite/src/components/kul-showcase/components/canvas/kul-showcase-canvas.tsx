import { Component, Element, Fragment, VNode, h } from '@stencil/core';

import { CANVAS_DOC, CANVAS_EXAMPLES } from './kul-showcase-canvas-data';
import { CanvasExample } from './kul-showcase-canvas-declarations';
import { KulDataCyAttributes } from '../../../../types/GenericTypes';
import { SHOWCASE_DYN_EXAMPLES } from '../../helpers/kul-showcase-dyn-sample';
import { KulShowcaseDynamicExampleType } from '../../kul-showcase-declarations';

@Component({
  tag: 'kul-showcase-canvas',
  styleUrl: 'kul-showcase-canvas.scss',
  shadow: true,
})
export class KulShowcaseCanvas {
  /**
   * References the root HTML element of the component (<kul-showcase-canvas>).
   */
  @Element() rootElement: HTMLKulShowcaseCanvasElement;

  //#region Internal variables
  #dynamicExampleManager = SHOWCASE_DYN_EXAMPLES;
  #dynamicExamples: HTMLKulCanvasElement[] = [];
  #interval: NodeJS.Timeout;
  //#endregion

  //#region Private methods
  #prepExamples() {
    const elements: VNode[] = [];
    const examples = CANVAS_EXAMPLES();
    for (const key in examples) {
      if (Object.prototype.hasOwnProperty.call(examples, key)) {
        const props: CanvasExample = examples[key];
        elements.push(
          <div class="example" part="example">
            <div class="description" part="description">
              {props['data-description']}
            </div>
            <div class="comp-wrapper" part="comp-wrapper">
              <kul-canvas
                key={key}
                id={key}
                ref={(el) => {
                  if (el && props['data-dynamic']) {
                    this.#dynamicExamples.push(el);
                  }
                }}
                {...props}
              ></kul-canvas>
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
        <kul-article kulData={CANVAS_DOC}></kul-article>
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
