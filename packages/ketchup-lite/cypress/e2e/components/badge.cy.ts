import { KulImagePropsInterface } from "../../../src/components";
import { KUL_BADGE_PROPS } from "../../../src/components/kul-badge/helpers/constants";
import { KulBadgeEvent } from "../../../src/components/kul-badge/kul-badge-declarations";
import { DynamicExampleManager } from "../../../src/components/kul-showcase/helpers/kul-showcase-dyn-sample";
import { KulDataCyAttributes } from "../../../src/types/GenericTypes";
import { BADGE_EXAMPLES_KEYS } from "./../../../src/components/kul-showcase/components/badge/kul-showcase-badge-declarations";

const badge = "badge";
const badgeTag = "kul-" + badge;

//#region Basic
describe("Basic", () => {
  beforeEach(() => {
    cy.navigate(badge).waitForWebComponents([badgeTag]);
  });
  it(`Should check that all <${badgeTag}> exist.`, () => {
    cy.checkComponentExamples(badgeTag, new Set(BADGE_EXAMPLES_KEYS));
  });
  it(`Should check that the number of <${badgeTag}> elements matches the number of examples.`, () => {
    cy.checkComponentExamplesNumber(Array.from(BADGE_EXAMPLES_KEYS));
  });
});
//#endregion

//#region CSS Classes
describe("CSS Classes", () => {
  beforeEach(() => {
    cy.navigate(badge);
  });
  it(`colors: Should check that the <${badgeTag}> with status colors has a correct state class and the matching status color.`, () => {
    cy.get("@kulComponentShowcase")
      .find(`${badgeTag}#colors`)
      .wait(Math.floor(Math.random() * (2500 - 500 + 1) + 750)) // Every 500ms the class changes randomly through DynamicExampleManager
      .then(($badge) => {
        const prefix = "hydrated ";
        const badgeClass = $badge.attr("class").substring(prefix.length);
        const dynManager = new DynamicExampleManager();
        const stateColors = dynManager.styles["state-colors"];
        expect(stateColors).to.include(badgeClass);

        cy.window().then((win) => {
          const cssVariable = `--${badgeClass}-color`;
          const computedStyles = win.getComputedStyle(
            $badge[0].shadowRoot.querySelector(`div`),
          );
          const badgeColor = computedStyles.backgroundColor;
          cy.getKulManager().then((kulManager) => {
            debugger;
            const themeName = kulManager.theme.name;
            const themeColor =
              kulManager.theme.list[themeName].cssVariables[cssVariable];
            const hexBadgeColor =
              kulManager.theme.colorCheck(themeColor).hexColor;
            const hexThemeColor =
              kulManager.theme.colorCheck(badgeColor).hexColor;
            expect(hexBadgeColor).to.eq(hexThemeColor);
          });
        });
      });
  });
  it(`position: should check that the <${badgeTag}> with a position class matches the relevant coordinates.`, () => {
    cy.get("@kulComponentShowcase")
      .find(`${badgeTag}#position`)
      .wait(Math.floor(Math.random() * (2500 - 500 + 1) + 750)) // Every 500ms the class changes randomly through DynamicExampleManager
      .then(($badge) => {
        const prefix = "hydrated ";
        const badgeClass = $badge.attr("class").substring(prefix.length);
        const dynManager = new DynamicExampleManager();
        const positions = dynManager.styles.positions;
        expect(positions).to.include(badgeClass);

        cy.window().then((win) => {
          const computedStyles = win.getComputedStyle($badge[0]);
          expect(computedStyles.position).equals("absolute");
          switch (badgeClass) {
            case "kul-top-right":
              expect(computedStyles.right).equals("0px");
              expect(computedStyles.top).equals("0px");
              break;
            case "kul-bottom-left":
              expect(computedStyles.bottom).equals("0px");
              expect(computedStyles.left).equals("0px");
              break;
            case "kul-bottom-right":
              expect(computedStyles.bottom).equals("0px");
              expect(computedStyles.right).equals("0px");
              break;
            default:
              expect(computedStyles.left).equals("0px");
              expect(computedStyles.top).equals("0px");
              break;
          }
        });
      });
  });
});
//#endregion

//#region Events
describe("Events", () => {
  it(`click`, () => {
    cy.navigate(badge);
    const eventType: KulBadgeEvent = "click";
    cy.checkEvent(badge, eventType);
    cy.get("@eventElement").click();
    cy.getCyElement(KulDataCyAttributes.CHECK).should("exist");
  });
  it(`ready`, () => {
    cy.checkReadyEvent(badge);
    cy.getCyElement(KulDataCyAttributes.CHECK).should("exist");
  });
  it(`unmount`, () => {
    cy.navigate(badge);
    const eventType: KulBadgeEvent = "unmount";
    cy.checkEvent(badge, eventType);
    cy.get("@eventElement").then(($badge) => {
      const kulBadgeElement = $badge[0] as HTMLKulBadgeElement;
      kulBadgeElement.unmount();
    });
    cy.getCyElement(KulDataCyAttributes.CHECK).should("exist");
  });
});
//#endregion

//#region Methods
describe("Methods", () => {
  beforeEach(() => {
    cy.navigate(badge);
  });
  it("getDebugInfo: check the structure of the returned object.", () => {
    cy.checkDebugInfo(badgeTag);
  });
  it("getDebugInfo, refresh: check that renderCount has increased after refreshing.", () => {
    cy.checkRenderCountIncrease(badgeTag);
  });
  it(`getProps: check keys against props array.`, () => {
    cy.checkProps(badgeTag, KUL_BADGE_PROPS);
  });
});
//#endregion

//#region Props
describe("Props", () => {
  beforeEach(() => {
    cy.navigate(badge);
  });
  it(`kulImageProps: should check for the presence of the correct <kul-image>, as an icon, inside <${badgeTag}>.`, () => {
    cy.get("@kulComponentShowcase")
      .find(`${badgeTag}#icon`)
      .invoke("prop", "kulImageProps")
      .then((kulImageProps: KulImagePropsInterface) => {
        cy.get("@kulComponentShowcase")
          .get(`${badgeTag}#icon`)
          .shadow()
          .find("kul-image")
          .should("have.prop", "kulValue", kulImageProps.kulValue)
          .shadow()
          .find(".image__icon")
          .should("exist");
      });
  });
  it(`kulImageProps: should check for the presence of the correct <kul-image, as an image, inside <${badgeTag}>.`, () => {
    cy.get("@kulComponentShowcase")
      .find(`${badgeTag}#image`)
      .invoke("prop", "kulImageProps")
      .then((kulImageProps: KulImagePropsInterface) => {
        cy.get("@kulComponentShowcase")
          .find(`${badgeTag}#image`)
          .shadow()
          .find("kul-image")
          .should("have.prop", "kulValue", kulImageProps.kulValue)
          .shadow()
          .find("img")
          .should("exist");
      });
  });
  it(`kulLabel: Should check that the #kul-component inside the empty <${badgeTag}> is actually empty.`, () => {
    cy.get("@kulComponentShowcase")
      .find(`${badgeTag}#empty`)
      .shadow()
      .find("#kul-component")
      .should("be.empty");
  });
  it(`kulLabel: should check that the #kul-component inside the <${badgeTag}> is not empty.`, () => {
    cy.get("@kulComponentShowcase")
      .find(`${badgeTag}#label`)
      .shadow()
      .find("#kul-component")
      .should("not.be.empty");
  });
  it("kulStyle: Should check for the presence of a <style> element with id kul-style.", () => {
    cy.checkKulStyle();
  });
});
//#endregion
