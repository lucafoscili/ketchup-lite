import { KUL_UPLOAD_PROPS } from "src/components/kul-upload/helpers/constants";
import { CY_ATTRIBUTES } from "src/utils/constants";
import { UPLOAD_EXAMPLES_KEYS } from "../../../src/components/kul-showcase/components/upload/kul-showcase-upload-declarations";
import { KulUploadEvent } from "../../../src/components/kul-upload/kul-upload-declarations";

const upload = "upload";
const uploadTag = "kul-" + upload;

//#region Basic
describe("Basic", () => {
  beforeEach(() => {
    cy.navigate(upload).waitForWebComponents([uploadTag]);
  });
  it(`Should check that all <${uploadTag}> exist.`, () => {
    cy.checkComponentExamples(uploadTag, new Set(UPLOAD_EXAMPLES_KEYS));
  });
  it(`Should check that the number of <${uploadTag}> elements matches the number of examples.`, () => {
    cy.checkComponentExamplesNumber(Array.from(UPLOAD_EXAMPLES_KEYS));
  });
});
//#endregion

//#region Events
describe("Events", () => {
  it(`pointerdown`, () => {
    cy.navigate(upload);
    const eventType: KulUploadEvent = "pointerdown";
    cy.checkEvent(upload, eventType);
    cy.get("@eventElement").click();
    cy.getCyElement(CY_ATTRIBUTES.check).should("exist");
  });
  it(`ready`, () => {
    cy.checkReadyEvent(upload);
  });
  it(`unmount`, () => {
    cy.navigate(upload);
    const eventType: KulUploadEvent = "unmount";
    cy.checkEvent(upload, eventType);
    cy.get("@eventElement").then(($upload) => {
      const kulUploadElement = $upload[0] as HTMLKulUploadElement;
      kulUploadElement.unmount();
    });
    cy.getCyElement(CY_ATTRIBUTES.check).should("exist");
  });
});
//#endregion

//#region Methods
describe("Methods", () => {
  beforeEach(() => {
    cy.navigate(upload);
  });
  it("getDebugInfo: check the structure of the returned object.", () => {
    cy.checkDebugInfo(uploadTag);
  });
  it("getDebugInfo, refresh: check that renderCount has increased after refreshing.", () => {
    cy.checkRenderCountIncrease(uploadTag);
  });
  it(`getProps: check keys against props array.`, () => {
    cy.checkProps(uploadTag, KUL_UPLOAD_PROPS);
  });
});
//#endregion

//#region Props
describe("Props", () => {
  beforeEach(() => {
    cy.navigate(upload);
  });
  it("Should check for the presence of a <style> element with id kul-style.", () => {
    cy.checkKulStyle();
  });
});
//#endregion
