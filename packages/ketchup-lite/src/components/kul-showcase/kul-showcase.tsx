import { Component, Element, h, Host, Prop, State, VNode } from "@stencil/core";

import { KulDataDataset } from "src/components";
import { kulManagerInstance } from "src/managers/kul-manager/kul-manager";
import { KulCardEventPayload } from "../kul-card/kul-card-declarations";
import {
  KUL_DOC,
  KUL_SHOWCASE_COMPONENTS,
  KUL_SHOWCASE_FRAMEWORK,
  KUL_SHOWCASE_UTILITIES,
} from "./kul-showcase-data";
import { KulShowcaseTitle } from "./kul-showcase-declarations";

@Component({
  assetsDirs: ["assets/media"],
  tag: "kul-showcase",
  styleUrl: "kul-showcase.scss",
  shadow: true,
})
export class KulShowcase {
  @Element() rootElement: HTMLKulShowcaseElement;

  //#region States
  @State() currentState: { [K in KulShowcaseTitle]: string } = {
    Components: "",
    Framework: "",
    Utilities: "",
  };
  @State() showScrollTop = false;
  //#endregion

  //#region Props
  @Prop({ mutable: true, reflect: true }) kulStyle = "";
  //#endregion

  //#region Internal variables
  #kulManager = kulManagerInstance();
  //#endregion

  //#region Private methods
  #renderSection(type: KulShowcaseTitle): VNode {
    const currentValue = this.currentState[type];

    return (
      <div class="section">
        {this.#prepHeader(type, currentValue)}
        <div class="flex-wrapper flex-wrapper--responsive">
          {currentValue ? this.#comps(type) : this.#cards(type)}
        </div>
      </div>
    );
  }
  #prepHeader(type: KulShowcaseTitle, current: string): VNode {
    return (
      <div class="header">
        <h2>{current || type}</h2>
        <div class={`navigation ${current ? "active" : ""}`}>
          <kul-button
            class="kul-full-height kul-full-width"
            kulIcon="home"
            onClick={() => {
              this.currentState = {
                ...this.currentState,
                [type]: "",
              };
            }}
          ></kul-button>
        </div>
      </div>
    );
  }
  #comps(type: KulShowcaseTitle): VNode {
    if (this.currentState[type]) {
      const TagName = `kul-showcase-${this.currentState[type].toLowerCase()}`;
      return <TagName />;
    }
  }
  #cards(type: KulShowcaseTitle): VNode[] {
    const dataset =
      type === "Components"
        ? KUL_SHOWCASE_COMPONENTS
        : type === "Framework"
          ? KUL_SHOWCASE_FRAMEWORK
          : KUL_SHOWCASE_UTILITIES;

    return dataset.nodes.map((node) => {
      const cardDataset: KulDataDataset = {
        nodes: [
          {
            cells: {
              icon: {
                shape: "image",
                value: node.icon,
              },
              text1: {
                value: this.#kulManager.data.cell.stringify(node.value),
              },
              text2: { value: "" },
              text3: { value: node.description },
            },
            id: node.id,
          },
        ],
      };

      return (
        <kul-card
          id={node.id}
          kulData={cardDataset}
          kulSizeX="300px"
          kulSizeY="300px"
          onKul-card-event={(e) => this.#handleCardClick(e, type)}
        ></kul-card>
      );
    });
  }
  #handleCardClick(
    e: CustomEvent<KulCardEventPayload>,
    type: KulShowcaseTitle,
  ): void {
    if (e.detail.eventType === "click") {
      this.currentState = {
        ...this.currentState,
        [type]: e.detail.id,
      };
      console.log(`Selected: ${e.detail.id} (${type})`);
    }
  }
  #handleScroll = () => {
    this.showScrollTop = window.scrollY > 300;
  };
  //#endregion

  //#region Lifecycle hooks
  connectedCallback() {
    window.addEventListener("scroll", this.#handleScroll);
  }
  render() {
    return (
      <Host>
        <div id="kul-wrapper">
          <div class="showcase">
            <kul-article kulData={KUL_DOC}></kul-article>
            <div class="link-wrapper">
              <kul-button
                aria-label="Open GitHub Repository"
                class="link"
                kulIcon="github"
                kulLabel="GitHub"
                kulStyling="floating"
                onClick={() =>
                  window.open(
                    "https://github.com/lucafoscili/ketchup-lite",
                    "_blank",
                  )
                }
                title="Open GitHub Repository"
              ></kul-button>
              <kul-button
                aria-label="Open npm Package"
                class="link"
                kulIcon="npm"
                kulLabel="npm"
                kulStyling="floating"
                onClick={() =>
                  window.open(
                    "https://www.npmjs.com/package/ketchup-lite",
                    "_blank",
                  )
                }
                title="Open npm Package"
              ></kul-button>
            </div>
            {this.#renderSection("Components")}
            {this.#renderSection("Framework")}
            {this.#renderSection("Utilities")}
          </div>
          <kul-button
            aria-label="Scroll to top"
            class={this.showScrollTop ? "visible" : "hidden"}
            id="scroll-to-top"
            kulIcon="chevron_up"
            kulStyling="floating"
            title="Scroll to top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          ></kul-button>
        </div>
      </Host>
    );
  }
  disconnectedCallback() {
    window.removeEventListener("scroll", this.#handleScroll);
  }
  //#endregion
}
