import {
  KulSpinnerEvent,
  KulSpinnerProps,
  KulSpinnerPropsInterface,
} from "../../../src/components/kul-spinner/kul-spinner-declarations";
import { SPINNER_EXAMPLES_CATEGORIES } from "../../../src/components/kul-showcase/components/spinner/kul-showcase-spinner-declarations";
import { KulDataCyAttributes } from "../../../src/types/GenericTypes";

const spinner = "spinner";
const spinnerCapitalized = spinner.charAt(0).toUpperCase() + spinner.slice(1);
const spinnerTag = "kul-" + spinner;

describe("Basic", () => {
  beforeEach(() => {
    cy.navigate(spinner);
  });

  it(`Should select all <${spinnerTag}> elements matching the composed ID`, () => {
    cy.checkComponentExamplesByCategory(new Set(SPINNER_EXAMPLES_CATEGORIES));
  });

  it(`Should check that all categories have at least 1 <${spinnerTag}>`, () => {
    cy.checkComponentExamplesByCategoryNumber(spinnerTag);
  });
});

describe("Events", () => {
  it(`ready`, () => {
    cy.checkReadyEvent(spinner);
  });

  it(`unmount`, () => {
    cy.navigate(spinner);
    const eventType: KulSpinnerEvent = "unmount";
    cy.checkEvent(spinner, eventType);
    cy.get("@eventElement").then(($spinner) => {
      const kulSpinnerElement = $spinner[0] as HTMLKulSpinnerElement;
      kulSpinnerElement.unmount();
    });
    cy.getCyElement(KulDataCyAttributes.CHECK).should("exist");
  });
});

describe("Methods", () => {
  beforeEach(() => {
    cy.navigate(spinner);
  });

  it("getDebugInfo: check the structure of the returned object.", () => {
    cy.checkDebugInfo(spinnerTag);
  });

  it("getDebugInfo, refresh: check that renderCount has increased after refreshing.", () => {
    cy.checkRenderCountIncrease(spinnerTag);
  });

  it(`getProps: check keys against Kul${spinnerCapitalized}Props enum.`, () => {
    cy.checkProps(spinnerTag, KulSpinnerProps);
  });

  it(`getProps: check keys against Kul${spinnerCapitalized}PropsInterface.`, () => {
    cy.checkPropsInterface(spinnerTag, {
      kulActive: null,
      kulBarVariant: null,
      kulDimensions: null,
      kulFader: null,
      kulFaderTimeout: null,
      kulFullScreen: null,
      kulLayout: null,
      kulStyle: null,
      kulTimeout: null,
    } as Required<KulSpinnerPropsInterface>);
  });
});

describe("Props", () => {
  beforeEach(() => {
    cy.navigate(spinner);
  });

  it("Should check for the presence of a <style> element with id kup-style.", () => {
    cy.checkKulStyle();
  });
});
