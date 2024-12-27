import { KUL_TYPEWRITER_PROPS } from "src/components/kul-typewriter/helpers/constants";
import { CY_ATTRIBUTES } from "src/utils/constants";
import { TYPEWRITER_EXAMPLES_KEYS } from "../../../src/components/kul-showcase/components/typewriter/kul-showcase-typewriter-declarations";
import { KulTypewriterEvent } from "../../../src/components/kul-typewriter/kul-typewriter-declarations";

const typewriter = "typewriter";
const typewriterTag = "kul-" + typewriter;

//#region Basic
describe("Basic", () => {
  beforeEach(() => {
    cy.navigate(typewriter).waitForWebComponents([typewriterTag]);
  });
  it(`Should check that all <${typewriterTag}> exist.`, () => {
    cy.checkComponentExamples(typewriterTag, new Set(TYPEWRITER_EXAMPLES_KEYS));
  });
  it(`Should check that the number of <${typewriterTag}> elements matches the number of examples.`, () => {
    cy.checkComponentExamplesNumber(Array.from(TYPEWRITER_EXAMPLES_KEYS));
  });
});
//#endregion

//#region Events
describe("Events", () => {
  it(`ready`, () => {
    cy.checkReadyEvent(typewriter);
  });
  it(`unmount`, () => {
    cy.navigate(typewriter);
    const eventType: KulTypewriterEvent = "unmount";
    cy.checkEvent(typewriter, eventType);
    cy.get("@eventElement").then(($article) => {
      const kulArticleElement = $article[0] as HTMLKulArticleElement;
      kulArticleElement.unmount();
    });
    cy.getCyElement(CY_ATTRIBUTES.check).should("exist");
  });
});
//#endregion

//#region Methods
describe("Methods", () => {
  beforeEach(() => {
    cy.navigate(typewriter);
  });
  it("getDebugInfo: check the structure of the returned object.", () => {
    cy.checkDebugInfo(typewriterTag);
  });
  it("getDebugInfo, refresh: check that renderCount has increased after refreshing.", () => {
    cy.checkRenderCountIncrease(typewriterTag);
  });
  it(`getProps: check keys against props array.`, () => {
    cy.checkProps(typewriterTag, KUL_TYPEWRITER_PROPS);
  });
});
//#endregion

//#region Props
describe("Props", () => {
  beforeEach(() => {
    cy.navigate(typewriter);
  });
  it("kulStyle: should check for the presence of a <style> element with id kul-style.", () => {
    cy.checkKulStyle();
  });
});
//#endregion
