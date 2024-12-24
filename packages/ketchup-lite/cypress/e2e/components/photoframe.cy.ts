import { KUL_PHOTOFRAME_PROPS } from "src/components/kul-photoframe/helpers/constants";
import { CY_ATTRIBUTES } from "src/utils/constants";
import { KulPhotoframeEvent } from "../../../src/components/kul-photoframe/kul-photoframe-declarations";
import { PHOTOFRAME_EXAMPLES_KEYS } from "../../../src/components/kul-showcase/components/photoframe/kul-showcase-photoframe-declarations";

const photoframe = "photoframe";
const photoframeTag = "kul-" + photoframe;

//#region Basic
describe("Basic", () => {
  beforeEach(() => {
    cy.navigate(photoframe).waitForWebComponents([photoframeTag]);
  });
  it(`Should check that all <${photoframeTag}> exist.`, () => {
    cy.checkComponentExamples(photoframeTag, new Set(PHOTOFRAME_EXAMPLES_KEYS));
  });
  it(`Should check that the number of <${photoframeTag}> elements matches the number of examples.`, () => {
    cy.checkComponentExamplesNumber(Array.from(PHOTOFRAME_EXAMPLES_KEYS));
  });
});
//#endregion

//#region Events
describe("Events", () => {
  it(`load`, () => {
    const eventType: KulPhotoframeEvent = "load";
    cy.checkReadyEvent(photoframe, eventType);
  });
  it(`ready`, () => {
    cy.checkReadyEvent(photoframe);
  });
  it(`unmount`, () => {
    cy.navigate(photoframe);
    const eventType: KulPhotoframeEvent = "unmount";
    cy.checkEvent(photoframe, eventType);
    cy.get("@eventElement").then(($photoframe) => {
      const kulPhotoframeElement = $photoframe[0] as HTMLKulPhotoframeElement;
      kulPhotoframeElement.unmount();
    });
    cy.getCyElement(CY_ATTRIBUTES.check).should("exist");
  });
});
//#endregion

//#region Methods
describe("Methods", () => {
  beforeEach(() => {
    cy.navigate(photoframe);
  });
  it("getDebugInfo: check the structure of the returned object.", () => {
    cy.checkDebugInfo(photoframeTag);
  });
  it("getDebugInfo, refresh: check that renderCount has increased after refreshing.", () => {
    cy.checkRenderCountIncrease(photoframeTag);
  });
  it(`getProps: check keys against props array.`, () => {
    cy.checkProps(photoframeTag, KUL_PHOTOFRAME_PROPS);
  });
});
//#endregion

//#region Props
describe("Props", () => {
  beforeEach(() => {
    cy.navigate(photoframe);
  });
  it("kulStyle: should check for the presence of a <style> element with id kup-style.", () => {
    cy.checkKulStyle();
  });
});
//#endregion
