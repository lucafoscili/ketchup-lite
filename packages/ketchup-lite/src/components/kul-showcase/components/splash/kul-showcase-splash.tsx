import { Component, Element, Fragment, State, VNode, h } from "@stencil/core";

import { KulDataCyAttributes } from "../../../../types/GenericTypes";
import { SplashExample } from "./kul-showcase-splash-declarations";
import { SPLASH_FIXTURES } from "./kul-showcase-splash-fixtures";

@Component({
  tag: "kul-showcase-splash",
  styleUrl: "kul-showcase-splash.scss",
  shadow: true,
})
export class KulShowcaseSplash {
  /**
   * References the root HTML element of the component (<kul-showcase-splash>).
   */
  @Element() rootElement: HTMLKulShowcaseSplashElement;

  //#region States
  /**
   * Data of the fixtures.
   */
  @State() fixtures = SPLASH_FIXTURES();
  //#endregion

  //#region Private methods
  #prepExamples() {
    const elements: VNode[] = [];
    for (const key in this.fixtures.examples) {
      if (Object.prototype.hasOwnProperty.call(this.fixtures.examples, key)) {
        const props: SplashExample = this.fixtures.examples[key];
        elements.push(
          <div class="example" part="example">
            <div class="description" part="description">
              {props["data-description"]}
            </div>
            <div class="comp-wrapper" part="comp-wrapper">
              <kul-button
                id={key + "-trigger"}
                kulLabel="Splash!"
                onClick={() => {
                  const splash = document.createElement("kul-splash");
                  splash.id = key;
                  splash.kulLabel = props.kulLabel || "Click to close...";
                  splash.kulStyle = props.kulStyle;
                  splash.addEventListener("click", () => {
                    splash.remove();
                  });
                  const spinner = document.createElement("kul-spinner");

                  spinner.kulActive = true;
                  spinner.kulDimensions = "7px";
                  spinner.kulLayout = 7;
                  splash.appendChild(spinner);
                  document.body.appendChild(splash);
                }}
              ></kul-button>
            </div>
          </div>,
        );
      }
    }
    return elements;
  }
  //#endregion Private methods

  //#region Lifecycle hooks
  render() {
    return (
      <Fragment>
        <kul-article kulData={this.fixtures.documentation}></kul-article>
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
