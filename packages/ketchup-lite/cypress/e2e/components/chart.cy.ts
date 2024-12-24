import { KUL_CHART_PROPS } from "src/components/kul-chart/helpers/constants";
import { CY_ATTRIBUTES } from "src/utils/constants";
import { KulChartEvent } from "../../../src/components/kul-chart/kul-chart-declarations";
import { CHART_EXAMPLES_KEYS } from "../../../src/components/kul-showcase/components/chart/kul-showcase-chart-declarations";

const chart = "chart";
const chartTag = "kul-" + chart;

//#region Basic
describe("Basic", () => {
  beforeEach(() => {
    cy.navigate(chart).waitForWebComponents([chartTag]);
  });
  it(`Should check that all <${chartTag}> exist.`, () => {
    cy.checkComponentExamples(chartTag, new Set(CHART_EXAMPLES_KEYS));
  });
  it(`Should check that the number of <${chartTag}> elements matches the number of examples.`, () => {
    cy.checkComponentExamplesNumber(Array.from(CHART_EXAMPLES_KEYS));
  });
});
//#endregion

//#region Events
describe("Events", () => {
  it(`ready`, () => {
    cy.checkReadyEvent(chart);
  });
  it(`unmount`, () => {
    cy.navigate(chart);
    const eventType: KulChartEvent = "unmount";
    cy.checkEvent(chart, eventType);
    cy.get("@eventElement").then(($chart) => {
      const kulChartElement = $chart[0] as HTMLKulChartElement;
      kulChartElement.unmount();
    });
    cy.getCyElement(CY_ATTRIBUTES.check).should("exist");
  });
});
//#endregion

//#region Methods
describe("Methods", () => {
  beforeEach(() => {
    cy.navigate(chart);
  });
  it("getDebugInfo: check the structure of the returned object.", () => {
    cy.checkDebugInfo(chartTag);
  });
  it("getDebugInfo, refresh: check that renderCount has increased after refreshing.", () => {
    cy.checkRenderCountIncrease(chartTag);
  });
  it(`getProps: check keys against props array.`, () => {
    cy.checkProps(chartTag, KUL_CHART_PROPS);
  });
});
//#endregion

//#region Props
describe("Props", () => {
  beforeEach(() => {
    cy.navigate(chart);
  });
  it("Should check for the presence of a <style> element with id kup-style.", () => {
    cy.checkKulStyle();
  });
});
//#endregion
