import { Component, Element, Fragment, VNode, h } from '@stencil/core';

import { TABBAR_DOC, TABBAR_EXAMPLES } from './kul-showcase-tabbar-data';
import { TabbarExample } from './kul-showcase-tabbar-declarations';
import { KulDataCyAttributes } from '../../../../types/GenericTypes';
import { SHOWCASE_DYN_EXAMPLES } from '../../helpers/kul-showcase-dyn-sample';
import { KulShowcaseDynamicExampleType } from '../../kul-showcase-declarations';

@Component({
  tag: 'kul-showcase-tabbar',
  styleUrl: 'kul-showcase-tabbar.scss',
  shadow: true,
})
export class KulShowcaseTabbar {
  /**
   * References the root HTML element of the component (<kul-showcase-tabbar>).
   */
  @Element() rootElement: HTMLKulShowcaseTabbarElement;

  //#region Internal variables
  #dynamicExamples: HTMLKulTabbarElement[] = [];
  #dynamicExampleManager = SHOWCASE_DYN_EXAMPLES;
  #interval: NodeJS.Timeout;
  //#endregion

  //#region Private methods
  #prepExamples() {
    const elements: VNode[] = [];
    for (const key in TABBAR_EXAMPLES) {
      if (Object.prototype.hasOwnProperty.call(TABBAR_EXAMPLES, key)) {
        const props: TabbarExample = TABBAR_EXAMPLES[key];
        elements.push(
          <div class="example" part="example">
            <div class="description" part="description">
              {props['data-description']}
            </div>
            <div class="comp-wrapper" part="comp-wrapper">
              <kul-tabbar
                key={key}
                id={key}
                ref={(el) => {
                  if (el && props['data-dynamic']) {
                    this.#dynamicExamples.push(el);
                  }
                }}
                {...props}
              ></kul-tabbar>
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
        <kul-article kulData={TABBAR_DOC}></kul-article>
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
