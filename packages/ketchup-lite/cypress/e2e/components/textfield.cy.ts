import { KUL_TEXTFIELD_PROPS } from "src/components/kul-textfield/helpers/constants";
import { CY_ATTRIBUTES } from "src/utils/constants";
import { TEXTFIELD_CATEGORIES_KEYS } from "../../../src/components/kul-showcase/components/textfield/kul-showcase-textfield-declarations";
import { KulTextfieldEvent } from "../../../src/components/kul-textfield/kul-textfield-declarations";

const textfield = "textfield";
const textfieldTag = "kul-" + textfield;

//#region Basic
describe("Basic", () => {
  beforeEach(() => {
    cy.navigate(textfield).waitForWebComponents([textfieldTag]);
  });
  it(`Should select all <${textfieldTag}> elements matching the composed ID.`, () => {
    cy.checkComponentExamplesByCategory(new Set(TEXTFIELD_CATEGORIES_KEYS));
  });
  it(`Should check that all categories have at least 1 <${textfieldTag}>.`, () => {
    cy.checkComponentExamplesByCategoryNumber(textfieldTag);
  });
});
//#endregion

//#region Events
describe("Events", () => {
  it(`blur`, () => {
    cy.navigate(textfield);
    const eventType: KulTextfieldEvent = "blur";
    cy.checkEvent(textfield, eventType);
    cy.get("@eventElement")
      .findCyElement(CY_ATTRIBUTES.input)
      .first()
      .focus()
      .blur();
    cy.getCyElement(CY_ATTRIBUTES.check).should("exist");
  });
  it(`change`, () => {
    cy.navigate(textfield);
    const eventType: KulTextfieldEvent = "change";
    cy.checkEvent(textfield, eventType);
    cy.get("@eventElement")
      .findCyElement(CY_ATTRIBUTES.input)
      .first()
      .focus()
      .type("Test{enter}")
      .blur();
    cy.getCyElement(CY_ATTRIBUTES.check).should("exist");
  });
  it(`click`, () => {
    cy.navigate(textfield);
    const eventType: KulTextfieldEvent = "click";
    cy.checkEvent(textfield, eventType);
    cy.get("@eventElement").findCyElement(CY_ATTRIBUTES.input).first().click();
    cy.getCyElement(CY_ATTRIBUTES.check).should("exist");
  });
  it(`focus`, () => {
    cy.navigate(textfield);
    const eventType: KulTextfieldEvent = "focus";
    cy.checkEvent(textfield, eventType);
    cy.get("@eventElement").findCyElement(CY_ATTRIBUTES.input).first().focus();
    cy.getCyElement(CY_ATTRIBUTES.check).should("exist");
  });
  it(`input`, () => {
    cy.navigate(textfield);
    const eventType: KulTextfieldEvent = "input";
    cy.checkEvent(textfield, eventType);
    cy.get("@eventElement")
      .findCyElement(CY_ATTRIBUTES.input)
      .first()
      .type("Test");
    cy.getCyElement(CY_ATTRIBUTES.check).should("exist");
  });
  it(`ready`, () => {
    cy.checkReadyEvent(textfield);
  });
  it(`unmount`, () => {
    cy.navigate(textfield);
    const eventType: KulTextfieldEvent = "unmount";
    cy.checkEvent(textfield, eventType);
    cy.get("@eventElement").then(($textfield) => {
      const kulTextfieldElement = $textfield[0] as HTMLKulTextfieldElement;
      kulTextfieldElement.unmount();
    });
    cy.getCyElement(CY_ATTRIBUTES.check).should("exist");
  });
});
//#endregion

//#region Methods
describe("Methods", () => {
  beforeEach(() => {
    cy.navigate(textfield);
  });
  it("getDebugInfo: check the structure of the returned object.", () => {
    cy.checkDebugInfo(textfieldTag);
  });
  it("getDebugInfo, refresh: check that renderCount has increased after refreshing.", () => {
    cy.checkRenderCountIncrease(textfieldTag);
  });
  it(`getProps: check keys against props array.`, () => {
    cy.checkProps(textfieldTag, KUL_TEXTFIELD_PROPS);
  });
});
//#endregion

//#region Props
describe("Props", () => {
  beforeEach(() => {
    cy.navigate(textfield);
  });
  it("kulStyle: should check for the presence of a <style> element with id kul-style.", () => {
    cy.checkKulStyle();
  });
});
//#endregion
