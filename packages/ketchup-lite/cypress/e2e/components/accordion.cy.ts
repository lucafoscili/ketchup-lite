import { KUL_ACCORDION_PROPS } from "src/components/kul-accordion/helpers/constants";
import { KulAccordionEvent } from "../../../src/components/kul-accordion/kul-accordion-declarations";
import { ACCORDION_EXAMPLES_KEYS } from "../../../src/components/kul-showcase/components/accordion/kul-showcase-accordion-declarations";
import { KulDataCyAttributes } from "../../../src/types/GenericTypes";

const accordion = "accordion";
const accordionTag = "kul-" + accordion;

//#region Basic
describe("Basic", () => {
  beforeEach(() => {
    cy.navigate(accordion).waitForWebComponents([accordionTag]);
  });

  it(`Should check that all <${accordionTag}> exist.`, () => {
    cy.checkComponentExamples(accordionTag, new Set(ACCORDION_EXAMPLES_KEYS));
  });

  it(`Should check that the number of <${accordionTag}> elements matches the number of examples.`, () => {
    cy.checkComponentExamplesNumber(Array.from(ACCORDION_EXAMPLES_KEYS));
  });
});
//#endregion

//#region Events
describe("Events", () => {
  it(`click`, () => {
    cy.navigate(accordion);
    const eventType: KulAccordionEvent = "click";
    cy.checkEvent(accordion, eventType);
    cy.get("@eventElement")
      .findCyElement(KulDataCyAttributes.BUTTON)
      .first()
      .click();
    cy.getCyElement(KulDataCyAttributes.CHECK).should("exist");
  });

  it(`pointerdown`, () => {
    cy.navigate(accordion);
    const eventType: KulAccordionEvent = "pointerdown";
    cy.checkEvent(accordion, eventType);
    cy.get("@eventElement")
      .findCyElement(KulDataCyAttributes.BUTTON)
      .first()
      .click();
    cy.getCyElement(KulDataCyAttributes.CHECK).should("exist");
  });

  it(`ready`, () => {
    cy.checkReadyEvent(accordion);
  });

  it(`unmount`, () => {
    cy.navigate(accordion);
    const eventType: KulAccordionEvent = "unmount";
    cy.checkEvent(accordion, eventType);
    cy.get("@eventElement").then(($article) => {
      const kulArticleElement = $article[0] as HTMLKulArticleElement;
      kulArticleElement.unmount();
    });
    cy.getCyElement(KulDataCyAttributes.CHECK).should("exist");
  });
});
//#endregion

//#region Methods
describe("Methods", () => {
  beforeEach(() => {
    cy.navigate(accordion);
  });

  it("getDebugInfo: check the structure of the returned object.", () => {
    cy.checkDebugInfo(accordionTag);
  });

  it("getDebugInfo, refresh: check that renderCount has increased after refreshing.", () => {
    cy.checkRenderCountIncrease(accordionTag);
  });

  it(`getProps: check keys against props array.`, () => {
    cy.checkProps(accordionTag, KUL_ACCORDION_PROPS);
  });

  it(`getSelectedNodes: asserts that the payload of the promise includes the selected node.`, () => {
    cy.get("@kulComponentShowcase")
      .find(`${accordionTag}#simple`)
      .findCyElement(KulDataCyAttributes.BUTTON)
      .click();
    cy.get("@kulComponentShowcase")
      .find(`${accordionTag}#simple`)
      .then(($accordion) => {
        const el = $accordion[0] as HTMLKulAccordionElement;
        el.getSelectedNodes().then((selectedNodes) => {
          expect(selectedNodes.size).to.equal(1);
        });
      });
  });

  it(`toggleNode: asserts that the method correctly selects the node.`, () => {
    cy.get("@kulComponentShowcase")
      .find(`${accordionTag}#simple`)
      .then(($accordion) => {
        const el = $accordion[0] as HTMLKulAccordionElement;
        el.getSelectedNodes().then((selectedNodes) => {
          expect(selectedNodes.size).to.equal(0);
        });
        el.toggleNode("3");
        el.getSelectedNodes().then((selectedNodes) => {
          expect(selectedNodes.size).to.equal(1);
        });
      });
  });
});
//#endregion

//#region Props
describe("Props", () => {
  beforeEach(() => {
    cy.navigate(accordion);
  });

  it("kulData: should check that for each node whose `id` matches a slot name, the accordion is expandable.", () => {
    cy.get("@kulComponentShowcase")
      .find(`${accordionTag}#simple`)
      .should("exist")
      .then(($accordion) => {
        const { kulData } = $accordion[0] as HTMLKulAccordionElement;
        const ids = kulData.nodes.map((node) => node.id);

        const shadowRoot = $accordion[0].shadowRoot;
        expect(shadowRoot).to.exist;

        const slots = Array.from($accordion[0].querySelectorAll("slot")).map(
          (slot) => slot.slot,
        );
        const matchingIds = ids.filter((id) => slots.includes(id));

        cy.wrap($accordion[0])
          .shadow()
          .find(`[data-cy='${KulDataCyAttributes.NODE}']`)
          .should("have.length.at.least", matchingIds.length)
          .then(() => {
            const expandIcons = shadowRoot.querySelectorAll(".node__expand");
            const buttons = shadowRoot.querySelectorAll(
              `[data-cy='${KulDataCyAttributes.BUTTON}']`,
            );

            expect(expandIcons.length).to.equal(matchingIds.length);

            const nonMatchingCount = ids.length - matchingIds.length;
            expect(buttons.length).to.equal(nonMatchingCount);
          });
      });
  });

  it("kulRipple: should check for the presence of a ripple element.", () => {
    cy.checkRipple(`${accordionTag}`);
  });

  it("kulStyle: should check for the presence of a <style> element with id kup-style.", () => {
    cy.checkKulStyle();
  });
});
//#endregion

//#region e2e
describe("e2e", () => {
  beforeEach(() => {
    cy.navigate(accordion);
  });

  it("Should check that when an expandable item is clicked, the content is displayed.", () => {
    cy.get("@kulComponentShowcase")
      .find(`${accordionTag}#simple`)
      .should("exist")
      .within(() => {
        cy.getCyElement(KulDataCyAttributes.NODE)
          .first()
          .should("exist")
          .click();

        cy.get(".node__content").should("exist").and("not.be.empty");
      });
  });

  it("Should check that when a previously expanded item is clicked the node is collapsed.", () => {
    cy.get("@kulComponentShowcase")
      .find(`${accordionTag}#simple`)
      .then(async ($accordion) => {
        const { kulData, toggleNode } =
          $accordion[0] as HTMLKulAccordionElement;

        const { id } = kulData.nodes[0];
        await toggleNode(id);
      })
      .within(() => {
        cy.getCyElement(KulDataCyAttributes.NODE)
          .first()
          .click({ force: true });
        cy.get(".node__content").should("not.exist");
      });
  });
});
//#endregion
