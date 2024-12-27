import { KUL_SPLASH_PROPS } from "src/components/kul-splash/helpers/constants";
import type { KulTheme } from "src/managers/kul-theme/kul-theme";
import { SPLASH_EXAMPLES_KEYS } from "../../../src/components/kul-showcase/components/splash/kul-showcase-splash-declarations";

const splash = "splash";
const splashTag = "kul-" + splash;

//#region Basic
describe("Basic", () => {
  beforeEach(() => {
    cy.navigate(splash).waitForWebComponents([splashTag]);
  });
  it(`Should check that all <${splashTag}> exist.`, () => {
    SPLASH_EXAMPLES_KEYS.forEach((key) => {
      const triggerId = `${key}-trigger`;
      cy.get("@kulComponentShowcase").get(`#${triggerId}`).click();
      cy.get(`${splashTag}#${key}`).should("exist").click();
    });
  });
  it(`Should check that the number of <${splashTag}> elements matches the number of examples.`, () => {
    let counter = 0;
    SPLASH_EXAMPLES_KEYS.forEach((key) => {
      const triggerId = `${key}-trigger`;
      cy.get("@kulComponentShowcase").get(`#${triggerId}`).click();
      cy.get(`${splashTag}#${key}`).should("exist").click();
      counter++;
    });
    expect(counter).equals(SPLASH_EXAMPLES_KEYS.length);
  });
});
//#endregion

//#region Methods
describe("Methods", () => {
  beforeEach(() => {
    cy.navigate(splash);
  });
  it("getDebugInfo: check the structure of the returned object.", () => {
    cy.get("@kulComponentShowcase").get("#label-trigger").click();
    cy.get(splashTag).then(($splash) => {
      const kulSplashElement = $splash[0] as HTMLKulSplashElement;
      kulSplashElement.getDebugInfo().then((debugInfo) => {
        expect(debugInfo).to.have.property("endTime").that.is.a("number");
        expect(debugInfo).to.have.property("renderCount").that.is.a("number");
        expect(debugInfo).to.have.property("renderEnd").that.is.a("number");
        expect(debugInfo).to.have.property("renderStart").that.is.a("number");
        expect(debugInfo).to.have.property("startTime").that.is.a("number");
      });
    });
  });
  it("getDebugInfo, refresh: check that renderCount has increased after refreshing.", () => {
    let initialRenderCount: number;

    cy.get("@kulComponentShowcase").get("#label-trigger").click();
    cy.get(splashTag)
      .then(($splash) => {
        const kulSplashElement = $splash[0] as HTMLKulSplashElement;
        return kulSplashElement.getDebugInfo();
      })
      .then((debugInfo) => {
        initialRenderCount = debugInfo.renderCount;
        return cy.wrap(initialRenderCount);
      })
      .then((initialRenderCount) => {
        cy.get(splashTag)
          .first()
          .then(($splash) => {
            const kulSplashElement = $splash[0] as HTMLKulSplashElement;
            return kulSplashElement.refresh();
          })
          .then(() => {
            cy.wait(250);
            return cy.wrap(initialRenderCount);
          })
          .then((initialRenderCount) => {
            cy.get(splashTag)
              .first()
              .then(($splash) => {
                const kulSplashElement = $splash[0] as HTMLKulSplashElement;
                return kulSplashElement.getDebugInfo();
              })
              .then((debugInfo) => {
                cy.wait(250);
                expect(debugInfo.renderCount).to.be.greaterThan(
                  initialRenderCount,
                );
              });
          });
        `${splashTag}#style`;
      });
  });
  it(`getProps: check keys against props array.`, () => {
    cy.get("@kulComponentShowcase").get("#style-trigger").click();
    cy.get(`${splashTag}#style`)
      .should("exist")
      .checkProps(splashTag, KUL_SPLASH_PROPS, true);
  });
});
//#endregion

//#region Props
describe("Props", () => {
  beforeEach(() => {
    cy.navigate(splash);
  });
  it("Should check for the presence of a <style> element with id kul-style.", () => {
    cy.get("@kulComponentShowcase").get("#style-trigger").click();
    cy.get(`${splashTag}#style`)
      .shadow()
      .find("style")
      .eq(1)
      .should("not.be.empty");
  });
  it("kulLabel: should check that the label is different from the default (Loading...)", () => {
    let bemClass: KulTheme["bemClass"];

    cy.get("@kulComponentShowcase").get("#label-trigger").click();
    cy.get(`${splashTag}#label`)
      .shadow()
      .within(($splash) => {
        cy.getKulManager()
          .then((kulManager) => {
            bemClass = kulManager.theme.bemClass;
          })
          .then(() => {
            const splash = $splash[0] as HTMLKulSplashElement;
            const selector = `.${bemClass("splash", "label")}`;

            expect(splash).to.exist;
            cy.wrap(splash)
              .find(selector)
              .should("not.have.text", "Loading...");
          });
      });
  });
});
//#endregion
