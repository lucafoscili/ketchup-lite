import { KUL_TREE_PROPS } from "src/components/kul-tree/helpers/constants";
import { CY_ATTRIBUTES } from "src/utils/constants";
import { TREE_EXAMPLES_KEYS } from "../../../src/components/kul-showcase/components/tree/kul-showcase-tree-declarations";
import { KulTreeEvent } from "../../../src/components/kul-tree/kul-tree-declarations";

const tree = "tree";
const treeTag = "kul-" + tree;

//#region Basic
describe("Basic", () => {
  beforeEach(() => {
    cy.navigate(tree).waitForWebComponents([treeTag]);
  });
  it(`Should check that all <${treeTag}> exist.`, () => {
    cy.checkComponentExamples(treeTag, new Set(TREE_EXAMPLES_KEYS));
  });
  it(`Should check that the number of <${treeTag}> elements matches the number of examples.`, () => {
    cy.checkComponentExamplesNumber(Array.from(TREE_EXAMPLES_KEYS));
  });
});
//#endregion

//#region Events
describe("Events", () => {
  it(`click`, () => {
    cy.navigate(tree);
    const eventType: KulTreeEvent = "click";
    cy.checkEvent(tree, eventType);
    cy.get("@eventElement").findCyElement(CY_ATTRIBUTES.node).first().click();
    cy.getCyElement(CY_ATTRIBUTES.check).should("exist");
  });
  it(`kul-event`, () => {
    cy.navigate(tree);
    const eventType: KulTreeEvent = "kul-event";
    cy.checkEvent(tree, eventType);
    cy.get("@eventElement").findCyElement(CY_ATTRIBUTES.input).first().focus();
    cy.getCyElement(CY_ATTRIBUTES.check).should("exist");
  });
  it(`pointerdown`, () => {
    cy.navigate(tree);
    const eventType: KulTreeEvent = "pointerdown";
    cy.checkEvent(tree, eventType);
    cy.get("@eventElement").findCyElement(CY_ATTRIBUTES.node).first().click();
    cy.getCyElement(CY_ATTRIBUTES.check).should("exist");
  });
  it(`ready`, () => {
    cy.checkReadyEvent(tree);
  });
  it(`unmount`, () => {
    cy.navigate(tree);
    const eventType: KulTreeEvent = "unmount";
    cy.checkEvent(tree, eventType);
    cy.get("@eventElement").then(($tree) => {
      const kulTreeElement = $tree[0] as HTMLKulTreeElement;
      kulTreeElement.unmount();
    });
    cy.getCyElement(CY_ATTRIBUTES.check).should("exist");
  });
});
//#endregion

//#region Methods
describe("Methods", () => {
  beforeEach(() => {
    cy.navigate(tree);
  });
  it("getDebugInfo: check the structure of the returned object.", () => {
    cy.checkDebugInfo(treeTag);
  });
  it("getDebugInfo, refresh: check that renderCount has increased after refreshing.", () => {
    cy.checkRenderCountIncrease(treeTag);
  });
  it(`getProps: check keys against props array.`, () => {
    cy.checkProps(treeTag, KUL_TREE_PROPS);
  });
});
//#endregion

//#region Props
describe("Props", () => {
  beforeEach(() => {
    cy.navigate(tree);
  });
  it("kulStyle: should check for the presence of a <style> element with id kul-style.", () => {
    cy.checkKulStyle();
  });
});
//#endregion
