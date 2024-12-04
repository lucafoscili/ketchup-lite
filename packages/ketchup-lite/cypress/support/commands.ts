/// <reference types="cypress" />

import { KulManager } from "../../src/managers/kul-manager/kul-manager";
import { KulDom } from "../../src/managers/kul-manager/kul-manager-declarations";
import {
  GenericMap,
  KulComponent,
  KulComponentName,
  KulDataCyAttributes,
  KulEventType,
  KulGenericComponent,
  KulGenericEvent,
  KulGenericEventPayload,
  KulGenericEventType,
  KulGenericRootElement,
} from "../../src/types/GenericTypes";
import { DataCyAttributeTransformed } from "./selectors";

export {};

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
      checkProps(component: string, componentProps: GenericMap): Chainable;
      checkPropsInterface(
        component: string,
        componentProps: { [key: string]: any },
      ): Chainable;
      checkReadyEvent(
        component: string,
        eventType?: KulGenericEventType,
      ): Chainable;
      checkRenderCountIncrease(component: string, attempts?: number): Chainable;
      checkKulStyle(): Chainable;
      findCyElement(dataCy: KulDataCyAttributes): Chainable;
      getCyElement(dataCy: KulDataCyAttributes): Chainable;
      getKulManager(): Chainable<KulManager>;
      navigate(component: string): Chainable;
    }
  }
}

Cypress.Commands.add(
  "checkComponentExamples",
  (component, componentExamples) => {
    cy.get("@kulComponentShowcase")
      .find(component)
      .should("have.length", componentExamples.size);
  },
);

Cypress.Commands.add("checkComponentExamplesNumber", (componentExamples) => {
  cy.get("@kulComponentShowcase")
    .wrap(componentExamples)
    .each((id) => {
      cy.get(`#${id}`).should("exist");
    });
});

Cypress.Commands.add("checkComponentExamplesByCategory", (categories) => {
  categories.forEach((categoryKey) => {
    const composedId = `#${categoryKey}-style`;
    cy.get("@kulComponentShowcase").find(composedId).should("exist");
  });
});

Cypress.Commands.add("checkComponentExamplesByCategoryNumber", (component) => {
  cy.get("@kulComponentShowcase")
    .find(".grid-container")
    .each((category) => {
      cy.wrap(category).find(component).its("length").should("be.gte", 1);
    });
});

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
          eventCheck.dataset.cy = KulDataCyAttributes.CHECK;
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

Cypress.Commands.add("checkProps", (component, componentProps) => {
  cy.get("@kulComponentShowcase")
    .find(component)
    .first()
    .then(($comp) => {
      ($comp[0] as Partial<KulGenericComponent>).getProps().then((props) => {
        const enumKeys = Object.keys(componentProps);
        expect(Object.keys(props)).to.deep.equal(enumKeys);
      });
    });
});

Cypress.Commands.add("checkPropsInterface", (component, componentProps) => {
  cy.get("@kulComponentShowcase")
    .find(component)
    .first()
    .then(($comp) => {
      const kulArticleElement = $comp[0] as Partial<KulGenericComponent>;
      return kulArticleElement.getProps();
    })
    .then((props) => {
      const expectedKeys = Object.keys(componentProps);
      expect(Object.keys(props)).to.deep.equal(expectedKeys);
    });
});

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
          readyCheck.dataset.cy = KulDataCyAttributes.CHECK;
          document.body.appendChild(readyCheck);
        }
      };
      document.addEventListener(eventName, checkEvent);
      visitManager().cardClick(component);
      cy.get("@kulComponentShowcase")
        .find(`kul-${component}`)
        .first()
        .scrollIntoView();
      cy.getCyElement(KulDataCyAttributes.CHECK).should("exist");
    });
  },
);

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

Cypress.Commands.add(
  "findCyElement",
  { prevSubject: "element" },
  (subject, dataCy: KulDataCyAttributes) => {
    cy.wrap(subject).find(transformEnumValue(dataCy) as unknown as string);
  },
);

Cypress.Commands.add("getCyElement", (dataCy: KulDataCyAttributes) =>
  cy.get(transformEnumValue(dataCy) as unknown as string),
);

Cypress.Commands.add("getKulManager", () => {
  cy.window().then((win) => {
    const dom = win.document.documentElement as KulDom;
    return dom.ketchupLite;
  });
});

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

function transformEnumValue(
  key: KulDataCyAttributes,
): DataCyAttributeTransformed {
  return `[data-cy="${key}"]` as unknown as DataCyAttributeTransformed;
}

function visitManager() {
  return {
    cardClick: (component: string) => {
      cy.get("kul-showcase").should("exist").as("kulShowcase");
      cy.get("@kulShowcase").should("exist");
      cy.get("#" + component.charAt(0).toUpperCase() + component.slice(1))
        .should("exist")
        .click();
      cy.get("@kulShowcase")
        .find("kul-showcase-" + component)
        .should("exist");
      cy.getCyElement(KulDataCyAttributes.SHOWCASE_GRID_WRAPPER)
        .as("kulComponentShowcase")
        .then(() => cy.log("Alias @kulComponentShowcase created"));
    },
    splashUnmount: () => {
      cy.get("kul-splash")
        .should("exist")
        .then(($component) => {
          return new Cypress.Promise((resolve, reject) => {
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

            setTimeout(() => {
              splash.removeEventListener("kul-splash-event", checkEvent);
              reject(
                new Error(
                  "Timeout: kul-splash did not unmount within expected time.",
                ),
              );
            }, 10000);

            splash.style.pointerEvents = "none";
          });
        });
    },
    visit: () => {
      cy.visit("http://localhost:3333").reload();
    },
  };
}
