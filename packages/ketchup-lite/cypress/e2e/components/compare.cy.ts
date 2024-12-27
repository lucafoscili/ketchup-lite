import { KUL_COMPARE_PROPS } from "src/components/kul-compare/helpers/constants";
import { CY_ATTRIBUTES } from "src/utils/constants";
import { KulCompareEvent } from "../../../src/components/kul-compare/kul-compare-declarations";
import { COMPARE_EXAMPLES_KEYS } from "../../../src/components/kul-showcase/components/compare/kul-showcase-compare-declarations";

const compare = "compare";
const compareTag = "kul-" + compare;

//#region Basic
describe("Basic", () => {
  beforeEach(() => {
    cy.navigate(compare).waitForWebComponents([compareTag]);
  });

  it(`Should check that all <${compareTag}> exist.`, () => {
    cy.checkComponentExamples(compareTag, new Set(COMPARE_EXAMPLES_KEYS));
  });

  it(`Should check that the number of <${compareTag}> elements matches the number of examples.`, () => {
    cy.checkComponentExamplesNumber(Array.from(COMPARE_EXAMPLES_KEYS));
  });
});
//#endregion

//#region Events
describe("Events", () => {
  it(`kul-event`, () => {
    cy.navigate(compare);
    const eventType: KulCompareEvent = "kul-event";
    cy.checkEvent(compare, eventType);
    cy.get("@eventElement")
      .findCyElement(CY_ATTRIBUTES.shape)
      .first()
      .scrollIntoView()
      .trigger("click", { force: true, x: 100, y: 100 });
    cy.getCyElement(CY_ATTRIBUTES.check).should("exist");
  });
  it(`ready`, () => {
    cy.checkReadyEvent(compare);
  });
  it(`unmount`, () => {
    cy.navigate(compare);
    const eventType: KulCompareEvent = "unmount";
    cy.checkEvent(compare, eventType);
    cy.get("@eventElement").then(($compare) => {
      const kulCompareElement = $compare[0] as HTMLKulCompareElement;
      kulCompareElement.unmount();
    });
    cy.getCyElement(CY_ATTRIBUTES.check).should("exist");
  });
});
//#endregion

//#region Methods
describe("Methods", () => {
  beforeEach(() => {
    cy.navigate(compare);
  });
  it("getDebugInfo: check the structure of the returned object.", () => {
    cy.checkDebugInfo(compareTag);
  });
  it("getDebugInfo, refresh: check that renderCount has increased after refreshing.", () => {
    cy.checkRenderCountIncrease(compareTag);
  });
  it(`getProps: check keys against props array.`, () => {
    cy.checkProps(compareTag, KUL_COMPARE_PROPS);
  });
});
//#endregion

//#region Props
describe("Props", () => {
  beforeEach(() => {
    cy.navigate(compare);
  });
  it("kulStyle: should check for the presence of a <style> element with id kul-style.", () => {
    cy.checkKulStyle();
  });
});
//#endregion
