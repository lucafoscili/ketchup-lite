import { KUL_SPINNER_PROPS } from "src/components/kul-spinner/helpers/constants";
import { CY_ATTRIBUTES } from "src/utils/constants";
import { SPINNER_EXAMPLES_CATEGORIES } from "../../../src/components/kul-showcase/components/spinner/kul-showcase-spinner-declarations";
import { KulSpinnerEvent } from "../../../src/components/kul-spinner/kul-spinner-declarations";

const spinner = "spinner";
const spinnerTag = "kul-" + spinner;

//#region Basic
describe("Basic", () => {
  beforeEach(() => {
    cy.navigate(spinner).waitForWebComponents([spinnerTag]);
  });
  it(`Should select all <${spinnerTag}> elements matching the composed ID`, () => {
    cy.checkComponentExamplesByCategory(new Set(SPINNER_EXAMPLES_CATEGORIES));
  });
  it(`Should check that all categories have at least 1 <${spinnerTag}>`, () => {
    cy.checkComponentExamplesByCategoryNumber(spinnerTag);
  });
});
//#endregion

//#region Events
describe("Events", () => {
  it(`ready`, () => {
    cy.checkReadyEvent(spinner);
  });
  it(`unmount`, () => {
    cy.navigate(spinner);
    const eventType: KulSpinnerEvent = "unmount";
    cy.checkEvent(spinner, eventType);
    cy.get("@eventElement").then(($spinner) => {
      const kulSpinnerElement = $spinner[0] as HTMLKulSpinnerElement;
      kulSpinnerElement.unmount();
    });
    cy.getCyElement(CY_ATTRIBUTES.check).should("exist");
  });
});
//#endregion

//#region Methods
describe("Methods", () => {
  beforeEach(() => {
    cy.navigate(spinner);
  });
  it("getDebugInfo: check the structure of the returned object.", () => {
    cy.checkDebugInfo(spinnerTag);
  });
  it("getDebugInfo, refresh: check that renderCount has increased after refreshing.", () => {
    cy.checkRenderCountIncrease(spinnerTag);
  });
  it(`getProps: check keys against props array.`, () => {
    cy.checkProps(spinnerTag, KUL_SPINNER_PROPS);
  });
});
//#endregion

//#region Props
describe("Props", () => {
  beforeEach(() => {
    cy.navigate(spinner);
  });
  it("Should check for the presence of a <style> element with id kul-style.", () => {
    cy.checkKulStyle();
  });
});
//#endregion
