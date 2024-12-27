import { KUL_MASONRY_PROPS } from "src/components/kul-masonry/helpers/constants";
import { CY_ATTRIBUTES } from "src/utils/constants";
import { KulMasonryEvent } from "../../../src/components/kul-masonry/kul-masonry-declarations";
import { MASONRY_EXAMPLES_KEYS } from "../../../src/components/kul-showcase/components/masonry/kul-showcase-masonry-declarations";

const masonry = "masonry";
const masonryTag = "kul-" + masonry;

//#region Basic
describe("Basic", () => {
  beforeEach(() => {
    cy.navigate(masonry).waitForWebComponents([masonryTag, "kul-image"]);
  });
  it(`Should check that all <${masonryTag}> exist.`, () => {
    cy.checkComponentExamples(masonryTag, new Set(MASONRY_EXAMPLES_KEYS));
  });
  it(`Should check that the number of <${masonryTag}> elements matches the number of examples.`, () => {
    cy.checkComponentExamplesNumber(Array.from(MASONRY_EXAMPLES_KEYS));
  });
});
//#endregion

//#region Events
describe("Events", () => {
  it(`kul-event`, () => {
    cy.navigate(masonry);
    const eventType: KulMasonryEvent = "kul-event";
    cy.checkEvent(masonry, eventType);
    cy.get("@eventElement")
      .findCyElement(CY_ATTRIBUTES.shape)
      .first()
      .scrollIntoView()
      .click();
    cy.getCyElement(CY_ATTRIBUTES.check).should("exist");
  });
  it(`ready`, () => {
    cy.checkReadyEvent(masonry);
  });
  it(`unmount`, () => {
    cy.navigate(masonry);
    const eventType: KulMasonryEvent = "unmount";
    cy.checkEvent(masonry, eventType);
    cy.get("@eventElement").then(($masonry) => {
      const kulMasonryElement = $masonry[0] as HTMLKulMasonryElement;
      kulMasonryElement.unmount();
    });
    cy.getCyElement(CY_ATTRIBUTES.check).should("exist");
  });
});
//#endregion

//#region Methods
describe("Methods", () => {
  beforeEach(() => {
    cy.navigate(masonry);
  });
  it("getDebugInfo: check the structure of the returned object.", () => {
    cy.checkDebugInfo(masonryTag);
  });
  it("getDebugInfo, refresh: check that renderCount has increased after refreshing.", () => {
    cy.checkRenderCountIncrease(masonryTag);
  });
  it(`getProps: check keys against props array.`, () => {
    cy.checkProps(masonryTag, KUL_MASONRY_PROPS);
  });
});
//#endregion

//#region Props
describe("Props", () => {
  beforeEach(() => {
    cy.navigate(masonry);
  });
  it("kulStyle: should check for the presence of a <style> element with id kul-style.", () => {
    cy.checkKulStyle();
  });
});
//#endregion
