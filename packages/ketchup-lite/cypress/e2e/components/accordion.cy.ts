import {
  KulAccordionEvent,
  KulAccordionProps,
  KulAccordionPropsInterface,
} from "../../../src/components/kul-accordion/kul-accordion-declarations";
import { ACCORDION_EXAMPLES_KEYS } from "../../../src/components/kul-showcase/components/accordion/kul-showcase-accordion-declarations";
import { KulDataCyAttributes } from "../../../src/types/GenericTypes";

const accordion = "accordion";
const accordionCapitalized =
  accordion.charAt(0).toUpperCase() + accordion.slice(1);
const accordionTag = "kul-" + accordion;

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

  it(`getProps: check keys against Kul${accordionCapitalized}Props enum.`, () => {
    cy.checkProps(accordionTag, KulAccordionProps);
  });

  it(`getProps: check keys against Kul${accordionCapitalized}PropsInterface.`, () => {
    cy.checkPropsInterface(accordionTag, {
      kulData: null,
      kulRipple: null,
      kulStyle: null,
    } as Required<KulAccordionPropsInterface>);
  });
});

describe("Props", () => {
  beforeEach(() => {
    cy.navigate(accordion);
  });

  it("kulStyle: should check for the presence of a <style> element with id kup-style.", () => {
    cy.checkKulStyle();
  });
});
