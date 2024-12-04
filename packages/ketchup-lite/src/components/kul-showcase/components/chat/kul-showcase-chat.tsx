import { Component, Element, Fragment, State, VNode, h } from "@stencil/core";

import { KulDataCyAttributes } from "../../../../types/GenericTypes";
import { SHOWCASE_DYN_EXAMPLES } from "../../helpers/kul-showcase-dyn-sample";
import { KulShowcaseDynamicExampleType } from "../../kul-showcase-declarations";
import { ChatExample } from "./kul-showcase-chat-declarations";
import { CHAT_FIXTURES } from "./kul-showcase-chat-fixtures";

@Component({
  tag: "kul-showcase-chat",
  styleUrl: "kul-showcase-chat.scss",
  shadow: true,
})
export class KulShowcaseChat {
  /**
   * References the root HTML element of the component (<kul-showcase-chat>).
   */
  @Element() rootElement: HTMLKulShowcaseChatElement;

  //#region States
  /**
   * Data of the fixtures.
   */
  @State() fixtures = CHAT_FIXTURES();
  //#endregion

  //#region Internal variables
  #dynamicExampleManager = SHOWCASE_DYN_EXAMPLES;
  #dynamicExamples: HTMLKulChatElement[] = [];
  #interval: NodeJS.Timeout;
  //#endregion

  //#region Private methods
  #prepExamples() {
    const elements: VNode[] = [];
    for (const key in this.fixtures.examples) {
      if (Object.prototype.hasOwnProperty.call(this.fixtures.examples, key)) {
        const props: ChatExample = this.fixtures.examples[key];
        elements.push(
          <div class="example" part="example">
            <div class="description" part="description">
              {props["data-description"]}
            </div>
            <div class="comp-wrapper" part="comp-wrapper">
              <kul-chat
                key={key}
                id={key}
                ref={(el) => {
                  if (el && props["data-dynamic"]) {
                    this.#dynamicExamples.push(el);
                  }
                }}
                {...props}
              ></kul-chat>
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
            case "custom":
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

  disconnectedCallback() {
    clearInterval(this.#interval);
  }
  //#endregion
}
