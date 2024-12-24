import { KUL_SLIDER_PROPS } from "src/components/kul-slider/helpers/constants";
import { CY_ATTRIBUTES } from "src/utils/constants";
import { SLIDER_EXAMPLES_KEYS } from "../../../src/components/kul-showcase/components/slider/kul-showcase-slider-declarations";
import { KulSliderEvent } from "../../../src/components/kul-slider/kul-slider-declarations";

const sliderComponent = "slider";
const sliderTag = "kul-" + sliderComponent;

//#region Basic
describe("Basic", () => {
  beforeEach(() => {
    cy.navigate(sliderComponent).waitForWebComponents([sliderTag]);
  });
  it(`Should check that all <${sliderTag}> exist.`, () => {
    cy.checkComponentExamples(sliderTag, new Set(SLIDER_EXAMPLES_KEYS));
  });
  it(`Should check that the number of <${sliderTag}> elements matches the number of examples.`, () => {
    cy.checkComponentExamplesNumber(Array.from(SLIDER_EXAMPLES_KEYS));
  });
});
//#endregion

//#region Events
describe("Events", () => {
  it(`blur`, () => {
    cy.navigate(sliderComponent);
    const eventType: KulSliderEvent = "blur";
    cy.checkEvent(sliderComponent, eventType);
    cy.get("@eventElement")
      .findCyElement(CY_ATTRIBUTES.input)
      .first()
      .focus()
      .blur();
    cy.getCyElement(CY_ATTRIBUTES.check).should("exist");
  });
  it(`focus`, () => {
    cy.navigate(sliderComponent);
    const eventType: KulSliderEvent = "focus";
    cy.checkEvent(sliderComponent, eventType);
    cy.get("@eventElement").findCyElement(CY_ATTRIBUTES.input).first().focus();
    cy.getCyElement(CY_ATTRIBUTES.check).should("exist");
  });
  it(`input`, () => {
    cy.navigate(sliderComponent);
    const eventType: KulSliderEvent = "input";
    cy.checkEvent(sliderComponent, eventType);
    cy.get("@eventElement")
      .findCyElement(CY_ATTRIBUTES.input)
      .first()
      .invoke("val", "1")
      .trigger("input");
    cy.getCyElement(CY_ATTRIBUTES.check).should("exist");
  });
  it(`pointerdown`, () => {
    cy.navigate(sliderComponent);
    const eventType: KulSliderEvent = "pointerdown";
    cy.checkEvent(sliderComponent, eventType);
    cy.get("@eventElement")
      .findCyElement(CY_ATTRIBUTES.input)
      .first()
      .click({ force: true });
    cy.getCyElement(CY_ATTRIBUTES.check).should("exist");
  });
  it(`ready`, () => {
    cy.checkReadyEvent(sliderComponent);
  });
  it(`unmount`, () => {
    cy.navigate(sliderComponent);
    const eventType: KulSliderEvent = "unmount";
    cy.checkEvent(sliderComponent, eventType);
    cy.get("@eventElement").then(($sliderComponent) => {
      const kulSliderElement = $sliderComponent[0] as HTMLKulSliderElement;
      kulSliderElement.unmount();
    });
    cy.getCyElement(CY_ATTRIBUTES.check).should("exist");
  });
});
//#endregion

//#region Methods
describe("Methods", () => {
  beforeEach(() => {
    cy.navigate(sliderComponent);
  });
  it("getDebugInfo: check the structure of the returned object.", () => {
    cy.checkDebugInfo(sliderTag);
  });
  it("getDebugInfo, refresh: check that renderCount has increased after refreshing.", () => {
    cy.checkRenderCountIncrease(sliderTag);
  });
  it(`getProps: check keys against props array.`, () => {
    cy.checkProps(sliderTag, KUL_SLIDER_PROPS);
  });
});
//#endregion

//#region Props
describe("Props", () => {
  beforeEach(() => {
    cy.navigate(sliderComponent);
  });
  it("kulStyle: hould check for the presence of a <style> element with id kup-style.", () => {
    cy.checkKulStyle();
  });
});
//#endregion
