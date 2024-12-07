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
  /**
   * Customizes the style of the component. This property allows you to apply a custom CSS style to the component.
   * @default ""
   */
  @Prop({ mutable: false }) kulScrollElement: HTMLElement = undefined;
  /**
   * Customizes the style of the component. This property allows you to apply a custom CSS style to the component.
   * @default ""
   */
  @Prop({ mutable: true, reflect: true }) kulStyle = "";
  //#endregion

  //#region Internal variables
  #headers: { [K in KulShowcaseTitle]: HTMLDivElement | null } = {
    Components: null,
    Framework: null,
    Utilities: null,
  };
  #sections: { [K in KulShowcaseTitle]: HTMLDivElement | null } = {
    Components: null,
    Framework: null,
    Utilities: null,
  };
  #kulManager = kulManagerInstance();
  //#endregion

  //#region Private methods
  #renderSection(type: KulShowcaseTitle): VNode {
    const currentValue = this.currentState[type];

    return (
      <div
        class="section"
        ref={(el) => {
          if (el) {
            this.#sections[type] = el;
          }
        }}
      >
        {this.#prepHeader(type, currentValue)}
        <div class="flex-wrapper flex-wrapper--responsive">
          {currentValue ? this.#comps(type) : this.#cards(type)}
        </div>
      </div>
    );
  }
  #prepHeader(type: KulShowcaseTitle, current: string): VNode {
    return (
      <div
        class="header"
        ref={(el) => {
          if (el) {
            this.#headers[type] = el;
          }
        }}
      >
        <kul-typewriter kulTag="h2" kulValue={current || type}></kul-typewriter>
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
      switch (this.currentState[type].toLowerCase()) {
        //#region Components
        case "accordion":
          return <kul-showcase-accordion></kul-showcase-accordion>;
        case "article":
          return <kul-showcase-article></kul-showcase-article>;
        case "badge":
          return <kul-showcase-badge></kul-showcase-badge>;
        case "button":
          return <kul-showcase-button></kul-showcase-button>;
        case "canvas":
          return <kul-showcase-canvas></kul-showcase-canvas>;
        case "card":
          return <kul-showcase-card></kul-showcase-card>;
        case "carousel":
          return <kul-showcase-carousel></kul-showcase-carousel>;
        case "chart":
          return <kul-showcase-chart></kul-showcase-chart>;
        case "chat":
          return <kul-showcase-chat></kul-showcase-chat>;
        case "chip":
          return <kul-showcase-chip></kul-showcase-chip>;
        case "code":
          return <kul-showcase-code></kul-showcase-code>;
        case "compare":
          return <kul-showcase-compare></kul-showcase-compare>;
        case "drawer":
          return <kul-showcase-drawer></kul-showcase-drawer>;
        case "header":
          return <kul-showcase-header></kul-showcase-header>;
        case "image":
          return <kul-showcase-image></kul-showcase-image>;
        case "imageviewer":
          return <kul-showcase-imageviewer></kul-showcase-imageviewer>;
        case "lazy":
          return <kul-showcase-lazy></kul-showcase-lazy>;
        case "list":
          return <kul-showcase-list></kul-showcase-list>;
        case "masonry":
          return <kul-showcase-masonry></kul-showcase-masonry>;
        case "messenger":
          return <kul-showcase-messenger></kul-showcase-messenger>;
        case "photoframe":
          return <kul-showcase-photoframe></kul-showcase-photoframe>;
        case "progressbar":
          return <kul-showcase-progressbar></kul-showcase-progressbar>;
        case "slider":
          return <kul-showcase-slider></kul-showcase-slider>;
        case "splash":
          return <kul-showcase-splash></kul-showcase-splash>;
        case "spinner":
          return <kul-showcase-spinner></kul-showcase-spinner>;
        case "tabbar":
          return <kul-showcase-tabbar></kul-showcase-tabbar>;
        case "textfield":
          return <kul-showcase-textfield></kul-showcase-textfield>;
        case "toast":
          return <kul-showcase-toast></kul-showcase-toast>;
        case "toggle":
          return <kul-showcase-toggle></kul-showcase-toggle>;
        case "tree":
          return <kul-showcase-tree></kul-showcase-tree>;
        case "typewriter":
          return <kul-showcase-typewriter></kul-showcase-typewriter>;
        case "upload":
          return <kul-showcase-upload></kul-showcase-upload>;
        //#endregion

        //#region Framework
        case "kuldata":
          return <kul-showcase-kuldata></kul-showcase-kuldata>;
        case "kuldates":
          return <kul-showcase-kuldates></kul-showcase-kuldates>;
        case "kuldebug":
          return <kul-showcase-kuldebug></kul-showcase-kuldebug>;
        case "kuldynamicposition":
          return (
            <kul-showcase-kuldynamicposition></kul-showcase-kuldynamicposition>
          );
        case "kullanguage":
          return <kul-showcase-kullanguage></kul-showcase-kullanguage>;
        case "kulllm":
          return <kul-showcase-kulllm></kul-showcase-kulllm>;
        case "kulmanager":
          return <kul-showcase-kulmanager></kul-showcase-kulmanager>;
        case "kulscrollonhover":
          return (
            <kul-showcase-kulscrollonhover></kul-showcase-kulscrollonhover>
          );
        case "kultheme":
          return <kul-showcase-kultheme></kul-showcase-kultheme>;
        //#endregion

        //#region Utilities
        case "debug":
          return <kul-showcase-debug></kul-showcase-debug>;
        //#endregion

        default:
          return <div>Component not defined :V</div>;
      }
    }
    return <div>No state available for type: {type}</div>;
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
          onKul-card-event={async (e) => {
            const { eventType } = e.detail;

            if (eventType === "click") {
              await this.#handleCardClick(e, type);
              this.#scrollToElement(type);
            }
          }}
        ></kul-card>
      );
    });
  }
  async #handleCardClick(
    e: CustomEvent<KulCardEventPayload>,
    type: KulShowcaseTitle,
  ) {
    if (e.detail.eventType === "click") {
      this.currentState = {
        ...this.currentState,
        [type]: e.detail.id,
      };
      console.log(`Selected: ${e.detail.id} (${type})`);
    }
  }
  #handleScroll = () => {
    const scrollElement = this.kulScrollElement
      ? this.kulScrollElement.scrollTop
      : window.scrollY;
    this.showScrollTop = scrollElement > 300;
  };
  #handleScrollTop = async () => {
    if (this.kulScrollElement) {
      this.kulScrollElement.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  async #scrollToElement(type: KulShowcaseTitle) {
    if (this.#sections[type]) {
      this.#sections[type].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }
  //#endregion

  //#region Lifecycle hooks
  componentWillLoad() {
    if (this.kulScrollElement) {
      this.kulScrollElement.addEventListener("scroll", this.#handleScroll);
    } else {
      window.addEventListener("scroll", this.#handleScroll);
    }
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
            onClick={this.#handleScrollTop}
          ></kul-button>
        </div>
      </Host>
    );
  }
  disconnectedCallback() {
    if (this.kulScrollElement) {
      this.kulScrollElement.removeEventListener("scroll", this.#handleScroll);
    } else {
      window.removeEventListener("scroll", this.#handleScroll);
    }
  }
  //#endregion
}
