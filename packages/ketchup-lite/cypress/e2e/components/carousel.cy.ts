import { KUL_CAROUSEL_PROPS } from "src/components/kul-carousel/helpers/constants";
import { CY_ATTRIBUTES } from "src/utils/constants";
import { KulCarouselEvent } from "../../../src/components/kul-carousel/kul-carousel-declarations";
import { CAROUSEL_EXAMPLES_KEYS } from "../../../src/components/kul-showcase/components/carousel/kul-showcase-carousel-declarations";

const carousel = "carousel";
const carouselTag = "kul-" + carousel;

describe("Basic", () => {
  beforeEach(() => {
    cy.navigate(carousel).waitForWebComponents([carouselTag]);
  });

  it(`Should check that all <${carouselTag}> exist.`, () => {
    cy.checkComponentExamples(carouselTag, new Set(CAROUSEL_EXAMPLES_KEYS));
  });

  it(`Should check that the number of <${carouselTag}> elements matches the number of examples.`, () => {
    cy.checkComponentExamplesNumber(Array.from(CAROUSEL_EXAMPLES_KEYS));
  });
});

describe("Events", () => {
  it(`kul-event`, () => {
    cy.navigate(carousel);
    const eventType: KulCarouselEvent = "kul-event";
    cy.checkEvent(carousel, eventType);
    cy.get("@eventElement")
      .findCyElement(CY_ATTRIBUTES.shape)
      .first()
      .scrollIntoView()
      .trigger("click", { force: true, x: 100, y: 100 });
    cy.getCyElement(CY_ATTRIBUTES.check).should("exist");
  });

  it(`ready`, () => {
    cy.checkReadyEvent(carousel);
  });

  it(`unmount`, () => {
    cy.navigate(carousel);
    const eventType: KulCarouselEvent = "unmount";
    cy.checkEvent(carousel, eventType);
    cy.get("@eventElement").then(($carousel) => {
      const kulCarouselElement = $carousel[0] as HTMLKulCarouselElement;
      kulCarouselElement.unmount();
    });
    cy.getCyElement(CY_ATTRIBUTES.check).should("exist");
  });
});

describe("Methods", () => {
  beforeEach(() => {
    cy.navigate(carousel);
  });

  it("getDebugInfo: check the structure of the returned object.", () => {
    cy.checkDebugInfo(carouselTag);
  });

  it("getDebugInfo, refresh: check that renderCount has increased after refreshing.", () => {
    cy.checkRenderCountIncrease(carouselTag);
  });
  it(`getProps: check keys against props array.`, () => {
    cy.checkProps(carouselTag, KUL_CAROUSEL_PROPS);
  });
});

describe("Props", () => {
  beforeEach(() => {
    cy.navigate(carousel);
  });

  it("kulStyle: should check for the presence of a <style> element with id kul-style.", () => {
    cy.checkKulStyle();
  });
});
