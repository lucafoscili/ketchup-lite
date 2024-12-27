import { KUL_CARD_PROPS } from "src/components/kul-card/helpers/constants";
import { CY_ATTRIBUTES } from "src/utils/constants";
import { KulCardEvent } from "../../../src/components/kul-card/kul-card-declarations";
import { CARD_CATEGORIES_KEYS } from "../../../src/components/kul-showcase/components/card/kul-showcase-card-declarations";

const card = "card";
const cardTag = "kul-" + card;

//#region Basic
describe("Basic", () => {
  beforeEach(() => {
    cy.navigate(card).waitForWebComponents([cardTag]);
  });
  it(`Should select all <${cardTag}> elements matching the composed ID`, () => {
    cy.checkComponentExamplesByCategory(new Set(CARD_CATEGORIES_KEYS));
  });
  it(`Should check that all categories have at least 1 <${cardTag}>`, () => {
    cy.checkComponentExamplesByCategoryNumber(cardTag);
  });
});
//#endregion

//#region Events
describe("Events", () => {
  it(`click`, () => {
    cy.navigate(card);
    const eventType: KulCardEvent = "click";
    cy.checkEvent(card, eventType);
    cy.get("@eventElement").click();
    cy.getCyElement(CY_ATTRIBUTES.check).should("exist");
  });
  it(`contextmenu`, () => {
    cy.navigate(card);
    const eventType: KulCardEvent = "contextmenu";
    cy.checkEvent(card, eventType);
    cy.get("@eventElement").rightclick();
    cy.getCyElement(CY_ATTRIBUTES.check).should("exist");
  });
  it(`kul-event`, () => {
    cy.navigate(card);
    const eventType: KulCardEvent = "kul-event";
    cy.checkEvent(card, eventType);
    cy.get("@eventElement").findCyElement(CY_ATTRIBUTES.shape).first().click();
    cy.getCyElement(CY_ATTRIBUTES.check).should("exist");
  });
  it(`pointerdown`, () => {
    cy.navigate(card);
    const eventType: KulCardEvent = "pointerdown";
    cy.checkEvent(card, eventType);
    cy.get(`${cardTag}#material-image`)
      .findCyElement(CY_ATTRIBUTES.ripple)
      .first()
      .click();
    cy.getCyElement(CY_ATTRIBUTES.check).should("exist");
  });
  it(`ready`, () => {
    cy.checkReadyEvent(card);
  });
  it(`unmount`, () => {
    cy.navigate(card);
    const eventType: KulCardEvent = "unmount";
    cy.checkEvent(card, eventType);
    cy.get("@eventElement").then(($card) => {
      const kulCardElement = $card[0] as HTMLKulCardElement;
      kulCardElement.unmount();
    });
    cy.getCyElement(CY_ATTRIBUTES.check).should("exist");
  });
});
//#endregion

//#region Methdos
describe("Methods", () => {
  beforeEach(() => {
    cy.navigate(card);
  });
  it("getDebugInfo: check the structure of the returned object.", () => {
    cy.checkDebugInfo(cardTag);
  });
  it("getDebugInfo, refresh: check that renderCount has increased after refreshing.", () => {
    cy.checkRenderCountIncrease(cardTag);
  });
  it(`getProps: check keys against props array.`, () => {
    cy.checkProps(cardTag, KUL_CARD_PROPS);
  });
});
//#endregion

//#region Props
describe("Props", () => {
  beforeEach(() => {
    cy.navigate(card);
  });
  it("kulStyle: should check for the presence of a <style> element with id kul-style.", () => {
    cy.checkKulStyle();
  });
});
//#endregion
