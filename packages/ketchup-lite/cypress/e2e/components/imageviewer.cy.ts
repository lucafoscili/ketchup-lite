import { KUL_IMAGEVIEWER_PROPS } from "src/components/kul-imageviewer/helpers/constants";
import { CY_ATTRIBUTES } from "src/utils/constants";
import { KulImageviewerEvent } from "../../../src/components/kul-imageviewer/kul-imageviewer-declarations";
import { IMAGEVIEWER_EXAMPLES_KEYS } from "../../../src/components/kul-showcase/components/imageviewer/kul-showcase-imageviewer-declarations";

const imageviewer = "imageviewer";
const imageviewerTag = "kul-" + imageviewer;

//#region Basic
describe("Basic", () => {
  beforeEach(() => {
    cy.navigate(imageviewer).waitForWebComponents([
      imageviewerTag,
      "kul-image",
    ]);
  });
  it(`Should check that all <${imageviewerTag}> exist.`, () => {
    cy.checkComponentExamples(
      imageviewerTag,
      new Set(IMAGEVIEWER_EXAMPLES_KEYS),
    );
  });
  it(`Should check that the number of <${imageviewerTag}> elements matches the number of examples.`, () => {
    cy.checkComponentExamplesNumber(Array.from(IMAGEVIEWER_EXAMPLES_KEYS));
  });
});
//#endregion

//#region
describe("Events", () => {
  it(`kul-event`, () => {
    cy.navigate(imageviewer);
    const eventType: KulImageviewerEvent = "kul-event";
    cy.checkEvent(imageviewer, eventType);
    cy.get("@eventElement").findCyElement(CY_ATTRIBUTES.button).first().click();
    cy.get("@eventElement")
      .findCyElement(CY_ATTRIBUTES.shape)
      .first()
      .scrollIntoView()
      .click();
    cy.getCyElement(CY_ATTRIBUTES.check).should("exist");
  });
  it(`ready`, () => {
    cy.checkReadyEvent(imageviewer);
  });
  it(`unmount`, () => {
    cy.navigate(imageviewer);
    const eventType: KulImageviewerEvent = "unmount";
    cy.checkEvent(imageviewer, eventType);
    cy.get("@eventElement").then(($imageviewer) => {
      const kulImageviewerElement =
        $imageviewer[0] as HTMLKulImageviewerElement;
      kulImageviewerElement.unmount();
    });
    cy.getCyElement(CY_ATTRIBUTES.check).should("exist");
  });
});
//#endregion

//#region Methods
describe("Methods", () => {
  beforeEach(() => {
    cy.navigate(imageviewer);
  });
  it("getDebugInfo: check the structure of the returned object.", () => {
    cy.checkDebugInfo(imageviewerTag);
  });
  it("getDebugInfo, refresh: check that renderCount has increased after refreshing.", () => {
    cy.checkRenderCountIncrease(imageviewerTag);
  });
  it(`getProps: check keys against props array.`, () => {
    cy.checkProps(imageviewerTag, KUL_IMAGEVIEWER_PROPS);
  });
});
//#endregion

//#region Props
describe("Props", () => {
  beforeEach(() => {
    cy.navigate(imageviewer);
  });
  it("kulStyle: should check for the presence of a <style> element with id kul-style.", () => {
    cy.checkKulStyle();
  });
});
//#endregion
