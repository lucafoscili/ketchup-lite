import {
  KulTypewriterEvent,
  KulTypewriterProps,
  KulTypewriterPropsInterface,
} from "../../../src/components/kul-typewriter/kul-typewriter-declarations";
import { TYPEWRITER_EXAMPLES_KEYS } from "../../../src/components/kul-showcase/components/typewriter/kul-showcase-typewriter-declarations";
import { KulDataCyAttributes } from "../../../src/types/GenericTypes";

const typewriter = "typewriter";
const typewriterCapitalized =
  typewriter.charAt(0).toUpperCase() + typewriter.slice(1);
const typewriterTag = "kul-" + typewriter;

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
    cy.getCyElement(KulDataCyAttributes.CHECK).should("exist");
  });
});

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

  it(`getProps: check keys against Kul${typewriterCapitalized}Props enum.`, () => {
    cy.checkProps(typewriterTag, KulTypewriterProps);
  });

  it(`getProps: check keys against Kul${typewriterCapitalized}PropsInterface.`, () => {
    cy.checkPropsInterface(typewriterTag, {
      kulCursor: null,
      kulDeleteSpeed: null,
      kulLoop: null,
      kulPause: null,
      kulSpeed: null,
      kulStyle: null,
      kulTag: null,
      kulValue: null,
    } as Required<KulTypewriterPropsInterface>);
  });
});

describe("Props", () => {
  beforeEach(() => {
    cy.navigate(typewriter);
  });

  it("kulStyle: should check for the presence of a <style> element with id kup-style.", () => {
    cy.checkKulStyle();
  });
});
