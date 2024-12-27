import { KUL_TABBAR_PROPS } from "src/components/kul-tabbar/helpers/constants";
import { CY_ATTRIBUTES } from "src/utils/constants";
import { TABBAR_EXAMPLES_KEYS } from "../../../src/components/kul-showcase/components/tabbar/kul-showcase-tabbar-declarations";
import { KulTabbarEvent } from "../../../src/components/kul-tabbar/kul-tabbar-declarations";

const tabbar = "tabbar";
const tabbarTag = "kul-" + tabbar;

//#region Basic
describe("Basic", () => {
  beforeEach(() => {
    cy.navigate(tabbar).waitForWebComponents([tabbarTag]);
  });
  it(`Should check that all <${tabbarTag}> exist.`, () => {
    cy.checkComponentExamples(tabbarTag, new Set(TABBAR_EXAMPLES_KEYS));
  });
  it(`Should check that the number of <${tabbarTag}> elements matches the number of examples.`, () => {
    cy.checkComponentExamplesNumber(Array.from(TABBAR_EXAMPLES_KEYS));
  });
});
//#endregion

//#region Events
describe("Events", () => {
  it(`click`, () => {
    cy.navigate(tabbar);
    const eventType: KulTabbarEvent = "click";
    cy.checkEvent(tabbar, eventType);
    cy.get("@eventElement").findCyElement(CY_ATTRIBUTES.button).first().click();
    cy.getCyElement(CY_ATTRIBUTES.check).should("exist");
  });
  it(`pointerdown`, () => {
    cy.navigate(tabbar);
    const eventType: KulTabbarEvent = "pointerdown";
    cy.checkEvent(tabbar, eventType);
    cy.get("@eventElement").findCyElement(CY_ATTRIBUTES.button).first().click();
    cy.getCyElement(CY_ATTRIBUTES.check).should("exist");
  });
  it(`ready`, () => {
    cy.checkReadyEvent(tabbar);
  });
  it(`unmount`, () => {
    cy.navigate(tabbar);
    const eventType: KulTabbarEvent = "unmount";
    cy.checkEvent(tabbar, eventType);
    cy.get("@eventElement").then(($tabbar) => {
      const kulTabbarElement = $tabbar[0] as HTMLKulTabbarElement;
      kulTabbarElement.unmount();
    });
    cy.getCyElement(CY_ATTRIBUTES.check).should("exist");
  });
});
//#endregion

//#region Methods
describe("Methods", () => {
  beforeEach(() => {
    cy.navigate(tabbar);
  });
  it("getDebugInfo: check the structure of the returned object.", () => {
    cy.checkDebugInfo(tabbarTag);
  });
  it("getDebugInfo, refresh: check that renderCount has increased after refreshing.", () => {
    cy.checkRenderCountIncrease(tabbarTag);
  });
  it(`getProps: check keys against props array.`, () => {
    cy.checkProps(tabbarTag, KUL_TABBAR_PROPS);
  });
});
//#endregion

//#region Props
describe("Props", () => {
  beforeEach(() => {
    cy.navigate(tabbar);
  });
  it("kulStyle: should check for the presence of a <style> element with id kul-style.", () => {
    cy.checkKulStyle();
  });
});
//#endregion
