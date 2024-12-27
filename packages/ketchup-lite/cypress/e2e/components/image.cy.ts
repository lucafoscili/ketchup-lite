import { KUL_IMAGE_PROPS } from "src/components/kul-image/helpers/constants";
import { CY_ATTRIBUTES } from "src/utils/constants";
import { KulImageEvent } from "../../../src/components/kul-image/kul-image-declarations";
import { IMAGE_EXAMPLES_KEYS } from "../../../src/components/kul-showcase/components/image/kul-showcase-image-declarations";

const image = "image";
const imageTag = "kul-" + image;

//#region Basic
describe("Basic", () => {
  beforeEach(() => {
    cy.navigate(image).waitForWebComponents([imageTag]);
  });
  it(`Should check that all <${imageTag}> exist.`, () => {
    cy.checkComponentExamples(imageTag, new Set(IMAGE_EXAMPLES_KEYS));
  });
  it(`Should check that the number of <${imageTag}> elements matches the number of examples.`, () => {
    cy.checkComponentExamplesNumber(Array.from(IMAGE_EXAMPLES_KEYS));
  });
});
//#endregion

//#region Events
describe("Events", () => {
  it(`click`, () => {
    cy.navigate(image);
    const eventType: KulImageEvent = "click";
    cy.checkEvent(image, eventType);
    cy.get("@eventElement").click();
    cy.getCyElement(CY_ATTRIBUTES.check).should("exist");
  });
  it(`load`, () => {
    const eventType: KulImageEvent = "load";
    cy.checkReadyEvent(image, eventType);
  });
  it(`ready`, () => {
    cy.checkReadyEvent(image);
  });
  it(`unmount`, () => {
    cy.navigate(image);
    const eventType: KulImageEvent = "unmount";
    cy.checkEvent(image, eventType);
    cy.get("@eventElement").then(($image) => {
      const kulImageElement = $image[0] as HTMLKulImageElement;
      kulImageElement.unmount();
    });
    cy.getCyElement(CY_ATTRIBUTES.check).should("exist");
  });
});
//#endregion

//#region Methods
describe("Methods", () => {
  beforeEach(() => {
    cy.navigate(image);
  });

  it("getDebugInfo: check the structure of the returned object.", () => {
    cy.checkDebugInfo(imageTag);
  });

  it("getDebugInfo, refresh: check that renderCount has increased after refreshing.", () => {
    cy.checkRenderCountIncrease(imageTag);
  });
  it(`getProps: check keys against props array.`, () => {
    cy.checkProps(imageTag, KUL_IMAGE_PROPS);
  });
});
//#endregion

//#region Props
describe("Props", () => {
  beforeEach(() => {
    cy.navigate(image);
  });
  it("kulStyle: should check for the presence of a <style> element with id kul-style.", () => {
    cy.checkKulStyle();
  });
});
//#endregion
