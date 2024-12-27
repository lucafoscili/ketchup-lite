import { KUL_CODE_PROPS } from "src/components/kul-code/helpers/constants";
import { CY_ATTRIBUTES } from "src/utils/constants";
import { KulCodeEvent } from "../../../src/components/kul-code/kul-code-declarations";
import { CODE_EXAMPLES_KEYS } from "../../../src/components/kul-showcase/components/code/kul-showcase-code-declarations";

const code = "code";
const codeTag = "kul-" + code;

//#region Basic
describe("Basic", () => {
  beforeEach(() => {
    cy.navigate(code).waitForWebComponents([codeTag]);
  });
  it(`Should check that all <${codeTag}> exist.`, () => {
    cy.checkComponentExamples(codeTag, new Set(CODE_EXAMPLES_KEYS));
  });
  it(`Should check that the number of <${codeTag}> elements matches the number of examples.`, () => {
    cy.checkComponentExamplesNumber(Array.from(CODE_EXAMPLES_KEYS));
  });
});
//#endregion

//#region Events
describe("Events", () => {
  it(`ready`, () => {
    cy.checkReadyEvent(code);
  });
  it(`unmount`, () => {
    cy.navigate(code);
    const eventType: KulCodeEvent = "unmount";
    cy.checkEvent(code, eventType);
    cy.get("@eventElement").then(($code) => {
      const kulCodeElement = $code[0] as HTMLKulCodeElement;
      kulCodeElement.unmount();
    });
    cy.getCyElement(CY_ATTRIBUTES.check).should("exist");
  });
});
//#endregion

//#region Methods
describe("Methods", () => {
  beforeEach(() => {
    cy.navigate(code);
  });
  it("getDebugInfo: check the structure of the returned object.", () => {
    cy.checkDebugInfo(codeTag);
  });
  it("getDebugInfo, refresh: check that renderCount has increased after refreshing.", () => {
    cy.checkRenderCountIncrease(codeTag);
  });
  it(`getProps: check keys against props array.`, () => {
    cy.checkProps(codeTag, KUL_CODE_PROPS);
  });
});
//#endregion

//#region Props
describe("Props", () => {
  beforeEach(() => {
    cy.navigate(code);
  });
  it("Should check for the presence of a <style> element with id kul-style.", () => {
    cy.checkKulStyle();
  });
});
//#endregion
