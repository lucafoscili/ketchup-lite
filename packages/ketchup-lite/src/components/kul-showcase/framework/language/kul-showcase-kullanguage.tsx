import { Component, Element, Fragment, h } from '@stencil/core';

import { LANGUAGE_DATA } from './kul-showcase-kullanguage-data';
import { KUL_WRAPPER_ID } from '../../../../variables/GenericVariables';

@Component({
  tag: 'kul-showcase-kullanguage',
  styleUrl: 'kul-showcase-kullanguage.scss',
  shadow: true,
})
export class KulShowcaseKullanguage {
  /**
   * References the root HTML element of the component (<kul-showcase-kullanguage>).
   */
  @Element() rootElement: HTMLKulShowcaseKullanguageElement;

  //#region Lifecycle hooks
  render() {
    return (
      <Fragment>
        <div id={KUL_WRAPPER_ID}>
          <kul-article kulData={LANGUAGE_DATA}></kul-article>
        </div>
      </Fragment>
    );
  }
  //#endregion
}
