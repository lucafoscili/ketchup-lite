import { KUL_PROGRESSBAR_PROPS } from "src/components/kul-progressbar/helpers/constants";
import { CY_ATTRIBUTES } from "src/utils/constants";
import { KulProgressbarEvent } from "../../../src/components/kul-progressbar/kul-progressbar-declarations";
import { PROGRESSBAR_EXAMPLES_KEYS } from "../../../src/components/kul-showcase/components/progressbar/kul-showcase-progressbar-declarations";

const progressbar = "progressbar";
const progressbarTag = "kul-" + progressbar;

//#region Basic
describe("Basic", () => {
  beforeEach(() => {
    cy.navigate(progressbar).waitForWebComponents([progressbarTag]);
  });
  it(`Should check that all <${progressbarTag}> exist.`, () => {
    cy.checkComponentExamples(
      progressbarTag,
      new Set(PROGRESSBAR_EXAMPLES_KEYS),
    );
  });
  it(`Should check that the number of <${progressbarTag}> elements matches the number of examples.`, () => {
    cy.checkComponentExamplesNumber(Array.from(PROGRESSBAR_EXAMPLES_KEYS));
  });
});
//#endregion

//#region Events
describe("Events", () => {
  it(`ready`, () => {
    cy.checkReadyEvent(progressbar);
  });
  it(`unmount`, () => {
    cy.navigate(progressbar);
    const eventType: KulProgressbarEvent = "unmount";
    cy.checkEvent(progressbar, eventType);
    cy.get("@eventElement").then(($progressbar) => {
      const kulProgressbarElement =
        $progressbar[0] as HTMLKulProgressbarElement;
      kulProgressbarElement.unmount();
    });
    cy.getCyElement(CY_ATTRIBUTES.check).should("exist");
  });
});
//#endregion

//#region Methods
describe("Methods", () => {
  beforeEach(() => {
    cy.navigate(progressbar);
  });
  it("getDebugInfo: check the structure of the returned object.", () => {
    cy.checkDebugInfo(progressbarTag);
  });
  it("getDebugInfo, refresh: check that renderCount has increased after refreshing.", () => {
    cy.checkRenderCountIncrease(progressbarTag);
  });
  it(`getProps: check keys against props array.`, () => {
    cy.checkProps(progressbarTag, KUL_PROGRESSBAR_PROPS);
  });
});
//#endregion

//#region Props
describe("Props", () => {
  beforeEach(() => {
    cy.navigate(progressbar);
  });

  it("Should check for the presence of a <style> element with id kup-style.", () => {
    cy.checkKulStyle();
  });
});
//#endregion
