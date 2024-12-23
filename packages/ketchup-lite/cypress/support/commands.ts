/// <reference types="cypress" />

import { KulManagerEvent } from "src/managers/kul-manager/kul-manager-declarations";
import type { KulManager } from "../../src/managers/kul-manager/kul-manager";
import {
  KulComponent,
  KulComponentName,
  KulEventType,
  KulGenericComponent,
  KulGenericEvent,
  KulGenericEventPayload,
  KulGenericEventType,
  KulGenericRootElement,
} from "../../src/types/GenericTypes";
import { DataCyAttributeTransformed } from "./selectors";
import { CY_ATTRIBUTES } from "src/utils/constants";

export {};

let kulManager: KulManager;

declare global {
  namespace Cypress {
    interface Chainable {
      checkComponentExamples(
        component: string,
        componentExamples: Set<string>,
      ): Chainable;
      checkComponentExamplesByCategory(category: Set<string>): Chainable;
      checkComponentExamplesByCategoryNumber(component: string): Chainable;
      checkComponentExamplesNumber(componentExamples: Array<string>): Chainable;
      checkDebugInfo(component: string): Chainable;
      checkEvent(component: string, eventType: KulGenericEventType): Chainable;
      checkKulStyle(): Chainable;
      checkProps(component: string, componentProps: string[]): Chainable;
      checkReadyEvent(
        component: string,
        eventType?: KulGenericEventType,
      ): Chainable;
      checkRenderCountIncrease(component: string, attempts?: number): Chainable;
      checkRipple(component: string): Chainable;
      findCyElement(dataCy: string): Chainable;
      getCyElement(dataCy: string): Chainable;
      getKulManager(): Chainable<KulManager>;
      navigate(component: string): Chainable;
      waitForWebComponents(tags: string[]): Chainable;
    }
  }
}

//#region checkComponentExamples
Cypress.Commands.add(
  "checkComponentExamples",
  (component, componentExamples) => {
    cy.get("@kulComponentShowcase")
      .find(component)
      .should("have.length", componentExamples.size);
  },
);
//#endregion

//#region checkComponentExamplesNumber
Cypress.Commands.add("checkComponentExamplesNumber", (componentExamples) => {
  cy.get("@kulComponentShowcase")
    .wrap(componentExamples)
    .each((id) => {
      cy.get(`#${id}`).should("exist");
    });
});
//#endregion

//#region checkComponentExamplesByCategory
Cypress.Commands.add("checkComponentExamplesByCategory", (categories) => {
  categories.forEach((categoryKey) => {
    const composedId = `#${categoryKey}-style`;
    cy.get("@kulComponentShowcase").find(composedId).should("exist");
  });
});
//#endregion

//#region checkComponentExamplesByCategoryNumber
Cypress.Commands.add("checkComponentExamplesByCategoryNumber", (component) => {
  cy.get("@kulComponentShowcase")
    .find(".grid-container")
    .each((category) => {
      cy.wrap(category).find(component).its("length").should("be.gte", 1);
    });
});
//#endregion

//#region checkDebugInfo
Cypress.Commands.add("checkDebugInfo", (component) => {
  cy.get("@kulComponentShowcase")
    .find(component)
    .first()
    .then(($comp) => {
      const kulElement = $comp[0] as Partial<KulGenericComponent>;
      kulElement.getDebugInfo().then((debugInfo) => {
        expect(debugInfo).to.have.property("endTime").that.is.a("number");
        expect(debugInfo).to.have.property("renderCount").that.is.a("number");
        expect(debugInfo).to.have.property("renderEnd").that.is.a("number");
        expect(debugInfo).to.have.property("renderStart").that.is.a("number");
        expect(debugInfo).to.have.property("startTime").that.is.a("number");
      });
    });
});
//#endregion

//#region checkEvent
Cypress.Commands.add(
  "checkEvent",
  <N extends KulComponentName>(
    component: N,
    eventType: KulEventType<KulComponent<N>>,
  ) => {
    cy.document().then((document) => {
      const checkEvent = (event: KulGenericEvent) => {
        if (
          event.type === `kul-${component}-event` &&
          event.detail.eventType === eventType
        ) {
          const eventCheck = document.createElement("div");
          eventCheck.dataset.cy = CY_ATTRIBUTES.check;
          document.body.appendChild(eventCheck);
        }
      };
      document.addEventListener(`kul-${component}-event`, checkEvent);
    });
    cy.get("@kulComponentShowcase")
      .find(`kul-${component}`)
      .should("exist")
      .first()
      .scrollIntoView()
      .as("eventElement");
  },
);
//#endregion

//#region checkKulStyle
Cypress.Commands.add("checkKulStyle", () => {
  function checkStyles(attempts = 0) {
    cy.get("@kulComponentShowcase")
      .find("style#kul-style")
      .then(($style) => {
        if ($style.length && $style.text().trim() && attempts < 10) {
          cy.wait(200);
          checkStyles(attempts + 1);
        } else {
          cy.wrap($style).should("not.be.empty");
        }
      });
  }
  checkStyles();
});
//#endregion

//#region checkProps
Cypress.Commands.add("checkProps", (component, componentProps) => {
  cy.get("@kulComponentShowcase")
    .find(component)
    .first()
    .then(($comp) => {
      ($comp[0] as Partial<KulGenericComponent>).getProps().then((props) => {
        for (
          let index = 0;
          index < Object.keys(componentProps).length;
          index++
        ) {
          const prop = Object.keys(componentProps)[index];
          expect(Object.keys(props)).to.include(prop);
        }
      });
    });
});
//#endregion

//#region checkReadyEvent
Cypress.Commands.add(
  "checkReadyEvent",
  (component, eventType: KulGenericEventType = "ready") => {
    visitManager().visit();
    visitManager().splashUnmount();
    cy.document().then((document) => {
      const eventName = `kul-${component}-event`;
      const checkEvent = (event: CustomEvent<KulGenericEventPayload>) => {
        if (event.type === eventName && event.detail.eventType === eventType) {
          document.removeEventListener(eventName, checkEvent);
          const readyCheck = document.createElement("div");
          readyCheck.dataset.cy = CY_ATTRIBUTES.check;
          document.body.appendChild(readyCheck);
        }
      };
      document.addEventListener(eventName, checkEvent);
      visitManager().cardClick(component);
      cy.get("@kulComponentShowcase")
        .find(`kul-${component}`)
        .first()
        .scrollIntoView();
      cy.getCyElement(CY_ATTRIBUTES.check).should("exist");
    });
  },
);
//#endregion

//#region checkRipple
Cypress.Commands.add("checkRipple", (component) => {
  cy.get(component)
    .findCyElement(CY_ATTRIBUTES.ripple)
    .should("exist")
    .then(($ripple) => {
      const initialChildCount = $ripple[0].children.length;

      cy.wrap($ripple).first().click();

      cy.wrap($ripple)
        .children()
        .should("have.length", initialChildCount + 1);
    });
});
//#endregion

//#region checkRenderCountIncrease
Cypress.Commands.add(
  "checkRenderCountIncrease",
  (component, maxAttempts = 10) => {
    let initialRenderCount: number;
    cy.get(component)
      .first()
      .then(($component) => {
        const componentElement: Partial<KulGenericRootElement> = $component[0];
        return componentElement.getDebugInfo();
      })
      .then((debugInfo) => {
        initialRenderCount = debugInfo.renderCount;
      });
    cy.get(component)
      .first()
      .then(($component) => {
        const componentElement: Partial<KulGenericRootElement> = $component[0];
        return componentElement.refresh();
      });
    function checkForRenderCountIncrease(attempts = 0) {
      cy.get(component)
        .first()
        .then(($component) => {
          const componentElement: Partial<KulGenericRootElement> =
            $component[0];
          return componentElement.getDebugInfo();
        })
        .then((debugInfo) => {
          if (
            debugInfo.renderCount <= initialRenderCount &&
            attempts < maxAttempts
          ) {
            cy.wait(100);
            checkForRenderCountIncrease(attempts + 1);
          } else if (debugInfo.renderCount > initialRenderCount) {
            expect(debugInfo.renderCount).to.be.greaterThan(initialRenderCount);
          } else {
            throw new Error("Max attempts reached without detecting a render.");
          }
        });
    }
    checkForRenderCountIncrease();
  },
);
//#endregion

//#region findCyElement
Cypress.Commands.add(
  "findCyElement",
  { prevSubject: "element" },
  (subject, dataCy: string) => {
    cy.wrap(subject).find(transformEnumValue(dataCy) as unknown as string);
  },
);
//#endregion

//#region getCyElement
Cypress.Commands.add("getCyElement", (dataCy: string) =>
  cy.get(transformEnumValue(dataCy) as unknown as string),
);
//#endregion

//#region getKulManager
Cypress.Commands.add("getKulManager", () => {
  cy.window().then(() => {
    return kulManager;
  });
});
//#endregion

//#region navigate
Cypress.Commands.add("navigate", (component) => {
  if (!component || typeof component !== "string") {
    throw new Error(`Invalid component name: ${component}`);
  }

  visitManager().visit();

  cy.log("Waiting for splash to unmount");
  visitManager().splashUnmount();

  cy.log("Navigating to component: " + component);
  visitManager().cardClick(component);

  cy.get("@kulComponentShowcase")
    .should("exist")
    .then(() => cy.log("Navigation complete, alias ready"));
});

Cypress.Commands.add("waitForWebComponents", (components: string[]) => {
  cy.window().then((win) => {
    const promises = components.map((component) => {
      cy.log(`Waiting for component: ${component}`);
      return win.customElements.whenDefined(component);
    });
    return Cypress.Promise.all(promises).then(() => {
      cy.log("All specified web components are defined.");
    });
  });
});

function transformEnumValue(key: string): DataCyAttributeTransformed {
  return `[data-cy="${key}"]` as unknown as DataCyAttributeTransformed;
}

function visitManager() {
  return {
    cardClick: (component: string) => {
      cy.waitForWebComponents(["kul-showcase", `kul-showcase-${component}`]);
      cy.get("kul-showcase").should("exist").as("kulShowcase");
      cy.get("@kulShowcase").should("exist");
      cy.get(`#${component.charAt(0).toUpperCase() + component.slice(1)}`)
        .should("exist")
        .click();
      cy.get("@kulShowcase").find(`kul-showcase-${component}`).should("exist");
      cy.getCyElement(CY_ATTRIBUTES.showcaseGridWrapper)
        .as("kulComponentShowcase")
        .then(() => cy.log("Alias @kulComponentShowcase created"));
    },
    splashUnmount: () => {
      cy.waitForWebComponents(["kul-card", "kul-splash"]);
      cy.get("kul-splash")
        .should("exist")
        .then(($component) => {
          return new Cypress.Promise<void>((resolve) => {
            const splash: HTMLKulSplashElement = $component[0];

            const checkEvent = (event: KulGenericEvent) => {
              if (
                event.type === "kul-splash-event" &&
                event.detail.eventType === "unmount"
              ) {
                splash.removeEventListener("kul-splash-event", checkEvent);
                resolve();
              }
            };

            splash.addEventListener("kul-splash-event", checkEvent);
            splash.style.pointerEvents = "none";
          });
        });
    },
    visit: () => {
      cy.visit("http://localhost:3333", {
        onBeforeLoad: (win) => {
          win.document.addEventListener(
            "kul-manager-ready",
            (e: KulManagerEvent) => {
              kulManager = e.detail.kulManager;
            },
          );
        },
      });
    },
  };
}
//#endregion
