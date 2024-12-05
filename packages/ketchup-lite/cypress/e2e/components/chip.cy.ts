import {
  KulChipEvent,
  KulChipProps,
  KulChipPropsInterface,
} from "../../../src/components/kul-chip/kul-chip-declarations";
import { CHIP_EXAMPLES_KEYS } from "../../../src/components/kul-showcase/components/chip/kul-showcase-chip-declarations";
import { KulDataCyAttributes } from "../../../src/types/GenericTypes";

const chip = "chip";
const chipCapitalized = chip.charAt(0).toUpperCase() + chip.slice(1);
const chipTag = "kul-" + chip;

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

describe("Events", () => {
  it(`blur`, () => {
    cy.navigate(chip);
    const eventType: KulChipEvent = "blur";
    cy.checkEvent(chip, eventType);
    cy.get("@eventElement")
      .findCyElement(KulDataCyAttributes.INPUT)
      .first()
      .focus()
      .blur();
    cy.getCyElement(KulDataCyAttributes.CHECK).should("exist");
  });

  it(`click`, () => {
    cy.navigate(chip);
    const eventType: KulChipEvent = "click";
    cy.checkEvent(chip, eventType);
    cy.get("@eventElement")
      .findCyElement(KulDataCyAttributes.INPUT)
      .first()
      .click();
    cy.getCyElement(KulDataCyAttributes.CHECK).should("exist");
  });

  it(`delete`, () => {
    cy.navigate(chip);
    const eventType: KulChipEvent = "delete";
    cy.checkEvent(chip, eventType);
    cy.get(`${chipTag}#input`)
      .findCyElement(KulDataCyAttributes.BUTTON)
      .first()
      .click();
    cy.getCyElement(KulDataCyAttributes.CHECK).should("exist");
  });

  it(`focus`, () => {
    cy.navigate(chip);
    const eventType: KulChipEvent = "focus";
    cy.checkEvent(chip, eventType);
    cy.get("@eventElement")
      .findCyElement(KulDataCyAttributes.INPUT)
      .first()
      .focus();
    cy.getCyElement(KulDataCyAttributes.CHECK).should("exist");
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
    cy.getCyElement(KulDataCyAttributes.CHECK).should("exist");
  });
});

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

  it(`getProps: check keys against Kul${chipCapitalized}Props enum.`, () => {
    cy.checkProps(chipTag, KulChipProps);
  });

  it(`getProps: check keys against Kul${chipCapitalized}PropsInterface.`, () => {
    cy.checkPropsInterface(chipTag, {
      kulData: null,
      kulRipple: null,
      kulStyle: null,
      kulStyling: null,
    } as Required<KulChipPropsInterface>);
  });
});

describe("Props", () => {
  beforeEach(() => {
    cy.navigate(chip);
  });

  it("Should check for the presence of a <style> element with id kup-style.", () => {
    cy.checkKulStyle();
  });
});
