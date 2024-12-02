import { Component, Element, Fragment, h } from '@stencil/core';

import { MANAGER_DATA } from './kul-showcase-kulmanager-data';
import { KUL_WRAPPER_ID } from '../../../../variables/GenericVariables';

@Component({
  tag: 'kul-showcase-kulmanager',
  styleUrl: 'kul-showcase-kulmanager.scss',
  shadow: true,
})
export class KulShowcaseKulmanager {
  /**
   * References the root HTML element of the component (<kul-showcase-kulmanager>).
   */
  @Element() rootElement: HTMLKulShowcaseKulmanagerElement;

  //#region Lifecycle hooks
  render() {
    return (
      <Fragment>
        <div id={KUL_WRAPPER_ID}>
          <kul-article kulData={MANAGER_DATA}></kul-article>
        </div>
      </Fragment>
    );
  }
  //#endregion
}
