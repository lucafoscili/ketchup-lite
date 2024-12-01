import { Component, Element, Fragment, h } from '@stencil/core';

import { DEBUG_DATA } from './kul-showcase-kuldebug-data';
import { KUL_WRAPPER_ID } from '../../../../variables/GenericVariables';

@Component({
  tag: 'kul-showcase-kuldebug',
  styleUrl: 'kul-showcase-kuldebug.scss',
  shadow: true,
})
export class KulShowcaseKuldebug {
  /**
   * References the root HTML element of the component (<kul-showcase-kuldebug>).
   */
  @Element() rootElement: HTMLKulShowcaseKuldebugElement;

  //#region Lifecycle hooks
  render() {
    return (
      <Fragment>
        <div id={KUL_WRAPPER_ID}>
          <kul-article kulData={DEBUG_DATA}></kul-article>
        </div>
      </Fragment>
    );
  }
  //#endregion
}
