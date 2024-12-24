import { KUL_LIST_PROPS } from "src/components/kul-list/helpers/constants";
import { CY_ATTRIBUTES } from "src/utils/constants";
import { KulDataDataset } from "../../../src/components";
import { KulListEvent } from "../../../src/components/kul-list/kul-list-declarations";
import { LIST_EXAMPLES_KEYS } from "../../../src/components/kul-showcase/components/list/kul-showcase-list-declarations";

const list = "list";
const listTag = "kul-" + list;

//#region Basic
describe("Basic", () => {
  beforeEach(() => {
    cy.navigate(list).waitForWebComponents([listTag]);
  });
  it(`Should check that all <${listTag}> exist.`, () => {
    cy.checkComponentExamples(listTag, new Set(LIST_EXAMPLES_KEYS));
  });
  it(`Should check that the number of <${listTag}> elements matches the number of examples.`, () => {
    cy.checkComponentExamplesNumber(Array.from(LIST_EXAMPLES_KEYS));
  });
});
//#endregion

//#region Events
describe("Events", () => {
  it(`blur`, () => {
    cy.navigate(list);
    const eventType: KulListEvent = "blur";
    cy.checkEvent(list, eventType);
    cy.get("@eventElement")
      .findCyElement(CY_ATTRIBUTES.node)
      .first()
      .focus()
      .blur();
    cy.getCyElement(CY_ATTRIBUTES.check).should("exist");
  });
  it(`click`, () => {
    cy.navigate(list);
    const eventType: KulListEvent = "click";
    cy.checkEvent(list, eventType);
    cy.get("@eventElement").findCyElement(CY_ATTRIBUTES.node).first().click();
    cy.getCyElement(CY_ATTRIBUTES.check).should("exist");
  });
  it("delete", () => {
    cy.navigate(list);
    const eventType: KulListEvent = "delete";
    cy.checkEvent(list, eventType);

    cy.get(`${listTag}#enableDeletion`)
      .shadow()
      .find(".list-item")
      .first()
      .trigger("mouseover");

    cy.get(`${listTag}#enableDeletion`)
      .findCyElement(CY_ATTRIBUTES.button)
      .first()
      .click({ force: true });

    cy.getCyElement(CY_ATTRIBUTES.check).should("exist");
  });
  it(`focus`, () => {
    cy.navigate(list);
    const eventType: KulListEvent = "focus";
    cy.checkEvent(list, eventType);
    cy.get("@eventElement").findCyElement(CY_ATTRIBUTES.node).first().focus();
    cy.getCyElement(CY_ATTRIBUTES.check).should("exist");
  });
  it(`ready`, () => {
    cy.checkReadyEvent(list);
  });
  it(`unmount`, () => {
    cy.navigate(list);
    const eventType: KulListEvent = "unmount";
    cy.checkEvent(list, eventType);
    cy.get("@eventElement").then(($list) => {
      const kulListElement = $list[0] as HTMLKulListElement;
      kulListElement.unmount();
    });
    cy.getCyElement(CY_ATTRIBUTES.check).should("exist");
  });
});
//#endregion

//#region Methods
describe("Methods", () => {
  beforeEach(() => {
    cy.navigate(list);
  });
  it("getDebugInfo: check the structure of the returned object.", () => {
    cy.checkDebugInfo(listTag);
  });
  it("getDebugInfo, refresh: check that renderCount has increased after refreshing.", () => {
    cy.checkRenderCountIncrease(listTag);
  });
  it(`getProps: check keys against props array.`, () => {
    cy.checkProps(listTag, KUL_LIST_PROPS);
  });
});
//#endregion

//#region Props
describe("Props", () => {
  beforeEach(() => {
    cy.navigate(list);
  });
  it(`kulEnableDeletion: should check for the presence of deletion buttons and that their click actually removes the item from the dataset.`, () => {
    cy.get("@kulComponentShowcase")
      .find(`${listTag}#enableDeletion`)
      .invoke("prop", "kulData")
      .then((initialKulData: KulDataDataset) => {
        const initialCopy = JSON.parse(JSON.stringify(initialKulData));

        console.log("Initial dataset length:", initialKulData.nodes.length);

        cy.get("@kulComponentShowcase")
          .find(`${listTag}#enableDeletion`)
          .shadow()
          .find(".list-item")
          .first()
          .trigger("mouseover");

        cy.get("@kulComponentShowcase")
          .find(`${listTag}#enableDeletion`)
          .findCyElement(CY_ATTRIBUTES.button)
          .first()
          .click({ force: true });

        cy.get("@kulComponentShowcase")
          .find(`${listTag}#enableDeletion`)
          .invoke("prop", "kulData")
          .then((finalKulData: KulDataDataset) => {
            const delta = initialCopy.nodes.length - finalKulData.nodes.length;
            console.log("Delta:", delta);

            assert(
              delta === 1,
              `One item was not removed from the dataset. Expected difference: 1, Actual difference: ${delta}`,
            );
          });
      });
  });
  it("kulStyle: should check for the presence of a <style> element with id kup-style.", () => {
    cy.checkKulStyle();
  });
});
//#endregion
