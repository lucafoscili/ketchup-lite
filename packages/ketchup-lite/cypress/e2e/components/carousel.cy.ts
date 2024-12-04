import {
  KulCarouselEvent,
  KulCarouselProps,
  KulCarouselPropsInterface,
} from "../../../src/components/kul-carousel/kul-carousel-declarations";
import { CAROUSEL_EXAMPLES_KEYS } from "../../../src/components/kul-showcase/components/carousel/kul-showcase-carousel-declarations";
import { KulDataCyAttributes } from "../../../src/types/GenericTypes";

const carousel = "carousel";
const carouselCapitalized =
  carousel.charAt(0).toUpperCase() + carousel.slice(1);
const carouselTag = "kul-" + carousel;

describe("Basic", () => {
  beforeEach(() => {
    cy.navigate(carousel);
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
      .findCyElement(KulDataCyAttributes.SHAPE)
      .first()
      .scrollIntoView()
      .trigger("click", { force: true, x: 100, y: 100 });
    cy.getCyElement(KulDataCyAttributes.CHECK).should("exist");
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
    cy.getCyElement(KulDataCyAttributes.CHECK).should("exist");
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

  it(`getProps: check keys against Kul${carouselCapitalized}Props enum.`, () => {
    cy.checkProps(carouselTag, KulCarouselProps);
  });

  it(`getProps: check keys against Kul${carouselCapitalized}PropsInterface.`, () => {
    cy.checkPropsInterface(carouselTag, {
      kulAutoPlay: null,
      kulData: null,
      kulInterval: null,
      kulShape: null,
      kulStyle: null,
    } as Required<KulCarouselPropsInterface>);
  });
});

describe("Props", () => {
  beforeEach(() => {
    cy.navigate(carousel);
  });

  it("kulStyle: should check for the presence of a <style> element with id kup-style.", () => {
    cy.checkKulStyle();
  });
});
