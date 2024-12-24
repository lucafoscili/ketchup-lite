import { KUL_CHIP_PROPS } from "src/components/kul-chip/helpers/constants";
import { CY_ATTRIBUTES } from "src/utils/constants";
import { KulChipEvent } from "../../../src/components/kul-chip/kul-chip-declarations";
import { CHIP_EXAMPLES_KEYS } from "../../../src/components/kul-showcase/components/chip/kul-showcase-chip-declarations";

const chip = "chip";
const chipTag = "kul-" + chip;

//#region Basic
describe("Basic", () => {
  beforeEach(() => {
    cy.navigate(chip).waitForWebComponents([chipTag]);
  });
  it(`Should check that all <${chipTag}> exist.`, () => {
    cy.checkComponentExamples(chipTag, new Set(CHIP_EXAMPLES_KEYS));
  });
  it(`Should check that the number of <${chipTag}> elements matches the number of examples.`, () => {
    cy.checkComponentExamplesNumber(Array.from(CHIP_EXAMPLES_KEYS));
  });
});
//#endregion

//#region Events
describe("Events", () => {
  it(`blur`, () => {
    cy.navigate(chip);
    const eventType: KulChipEvent = "blur";
    cy.checkEvent(chip, eventType);
    cy.get("@eventElement")
      .findCyElement(CY_ATTRIBUTES.input)
      .first()
      .focus()
      .blur();
    cy.getCyElement(CY_ATTRIBUTES.check).should("exist");
  });
  it(`click`, () => {
    cy.navigate(chip);
    const eventType: KulChipEvent = "click";
    cy.checkEvent(chip, eventType);
    cy.get("@eventElement").findCyElement(CY_ATTRIBUTES.input).first().click();
    cy.getCyElement(CY_ATTRIBUTES.check).should("exist");
  });
  it(`delete`, () => {
    cy.navigate(chip);
    const eventType: KulChipEvent = "delete";
    cy.checkEvent(chip, eventType);
    cy.get(`${chipTag}#input`)
      .findCyElement(CY_ATTRIBUTES.button)
      .first()
      .click();
    cy.getCyElement(CY_ATTRIBUTES.check).should("exist");
  });
  it(`focus`, () => {
    cy.navigate(chip);
    const eventType: KulChipEvent = "focus";
    cy.checkEvent(chip, eventType);
    cy.get("@eventElement").findCyElement(CY_ATTRIBUTES.input).first().focus();
    cy.getCyElement(CY_ATTRIBUTES.check).should("exist");
  });
  it(`ready`, () => {
    cy.checkReadyEvent(chip);
  });
  it(`unmount`, () => {
    cy.navigate(chip);
    const eventType: KulChipEvent = "unmount";
    cy.checkEvent(chip, eventType);
    cy.get("@eventElement").then(($chip) => {
      const kulChipElement = $chip[0] as HTMLKulChipElement;
      kulChipElement.unmount();
    });
    cy.getCyElement(CY_ATTRIBUTES.check).should("exist");
  });
});
//#endregion

//#region Methods
describe("Methods", () => {
  beforeEach(() => {
    cy.navigate(chip);
  });
  it("getDebugInfo: check the structure of the returned object.", () => {
    cy.checkDebugInfo(chipTag);
  });
  it("getDebugInfo, refresh: check that renderCount has increased after refreshing.", () => {
    cy.checkRenderCountIncrease(chipTag);
  });
  it(`getProps: check keys against props array.`, () => {
    cy.checkProps(chipTag, KUL_CHIP_PROPS);
  });
});
//#endregion

//#region Props
describe("Props", () => {
  beforeEach(() => {
    cy.navigate(chip);
  });
  it("Should check for the presence of a <style> element with id kup-style.", () => {
    cy.checkKulStyle();
  });
});
//#endregion
