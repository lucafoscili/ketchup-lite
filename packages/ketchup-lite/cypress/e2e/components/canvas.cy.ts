import { KUL_CANVAS_PROPS } from "src/components/kul-canvas/helpers/constants";
import { CY_ATTRIBUTES } from "src/utils/constants";
import { KulCanvasEvent } from "../../../src/components/kul-canvas/kul-canvas-declarations";
import { CANVAS_EXAMPLES_KEYS } from "../../../src/components/kul-showcase/components/canvas/kul-showcase-canvas-declarations";

const canvas = "canvas";
const canvasTag = "kul-" + canvas;

//#region Basic
describe("Basic", () => {
  beforeEach(() => {
    cy.navigate(canvas).waitForWebComponents([canvasTag]);
  });
  it(`Should check that all <${canvasTag}> exist.`, () => {
    cy.checkComponentExamples(canvasTag, new Set(CANVAS_EXAMPLES_KEYS));
  });
  it(`Should check that the number of <${canvasTag}> elements matches the number of examples.`, () => {
    cy.checkComponentExamplesNumber(Array.from(CANVAS_EXAMPLES_KEYS));
  });
});
//#endregion

//#region Events
describe("Events", () => {
  it(`stroke`, () => {
    cy.navigate(canvas);
    const eventType: KulCanvasEvent = "stroke";
    cy.checkEvent(canvas, eventType);
    cy.get("@eventElement").click();
    cy.getCyElement(CY_ATTRIBUTES.check).should("exist");
  });
  it(`ready`, () => {
    cy.checkReadyEvent(canvas);
  });
  it(`unmount`, () => {
    cy.navigate(canvas);
    const eventType: KulCanvasEvent = "unmount";
    cy.checkEvent(canvas, eventType);
    cy.get("@eventElement").then(($canvas) => {
      const kulCanvasElement = $canvas[0] as HTMLKulCanvasElement;
      kulCanvasElement.unmount();
    });
    cy.getCyElement(CY_ATTRIBUTES.check).should("exist");
  });
});
//#endregion

//#region Methods
describe("Methods", () => {
  beforeEach(() => {
    cy.navigate(canvas);
  });
  it("getDebugInfo: check the structure of the returned object.", () => {
    cy.checkDebugInfo(canvasTag);
  });
  it("getDebugInfo, refresh: check that renderCount has increased after refreshing.", () => {
    cy.checkRenderCountIncrease(canvasTag);
  });
  it(`getProps: check keys against props array.`, () => {
    cy.checkProps(canvasTag, KUL_CANVAS_PROPS);
  });
});
//#endregion

//#region Props
describe("Props", () => {
  beforeEach(() => {
    cy.navigate(canvas);
  });
  it("kulStyle: should check for the presence of a <style> element with id kup-style.", () => {
    cy.checkKulStyle();
  });
});
//#endregion
