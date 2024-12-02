import {
  KulSliderEvent,
  KulSliderProps,
  KulSliderPropsInterface,
} from '../../../src/components/kul-slider/kul-slider-declarations';
import { SLIDER_EXAMPLES_KEYS } from '../../../src/components/kul-showcase/components/slider/kul-showcase-slider-declarations';
import { KulDataCyAttributes } from '../../../src/types/GenericTypes';

const sliderComponent = 'slider';
const sliderCapitalized =
  sliderComponent.charAt(0).toUpperCase() + sliderComponent.slice(1);
const sliderTag = 'kul-' + sliderComponent;

describe('Basic', () => {
  beforeEach(() => {
    cy.navigate(sliderComponent);
  });

  it(`Should check that all <${sliderTag}> exist.`, () => {
    cy.checkComponentExamples(sliderTag, new Set(SLIDER_EXAMPLES_KEYS));
  });

  it(`Should check that the number of <${sliderTag}> elements matches the number of examples.`, () => {
    cy.checkComponentExamplesNumber(Array.from(SLIDER_EXAMPLES_KEYS));
  });
});

describe('Events', () => {
  it(`blur`, () => {
    cy.navigate(sliderComponent);
    const eventType: KulSliderEvent = 'blur';
    cy.checkEvent(sliderComponent, eventType);
    cy.get('@eventElement')
      .findCyElement(KulDataCyAttributes.INPUT)
      .first()
      .focus()
      .blur();
    cy.getCyElement(KulDataCyAttributes.CHECK).should('exist');
  });

  it(`focus`, () => {
    cy.navigate(sliderComponent);
    const eventType: KulSliderEvent = 'focus';
    cy.checkEvent(sliderComponent, eventType);
    cy.get('@eventElement')
      .findCyElement(KulDataCyAttributes.INPUT)
      .first()
      .focus();
    cy.getCyElement(KulDataCyAttributes.CHECK).should('exist');
  });

  it(`input`, () => {
    cy.navigate(sliderComponent);
    const eventType: KulSliderEvent = 'input';
    cy.checkEvent(sliderComponent, eventType);
    cy.get('@eventElement')
      .findCyElement(KulDataCyAttributes.INPUT)
      .first()
      .invoke('val', '1')
      .trigger('input');
    cy.getCyElement(KulDataCyAttributes.CHECK).should('exist');
  });

  it(`pointerdown`, () => {
    cy.navigate(sliderComponent);
    const eventType: KulSliderEvent = 'pointerdown';
    cy.checkEvent(sliderComponent, eventType);
    cy.get('@eventElement')
      .findCyElement(KulDataCyAttributes.INPUT)
      .first()
      .click({ force: true });
    cy.getCyElement(KulDataCyAttributes.CHECK).should('exist');
  });

  it(`ready`, () => {
    cy.checkReadyEvent(sliderComponent);
  });

  it(`unmount`, () => {
    cy.navigate(sliderComponent);
    const eventType: KulSliderEvent = 'unmount';
    cy.checkEvent(sliderComponent, eventType);
    cy.get('@eventElement').then(($sliderComponent) => {
      const kulSliderElement = $sliderComponent[0] as HTMLKulSliderElement;
      kulSliderElement.unmount();
    });
    cy.getCyElement(KulDataCyAttributes.CHECK).should('exist');
  });
});

describe('Methods', () => {
  beforeEach(() => {
    cy.navigate(sliderComponent);
  });

  it('getDebugInfo: check the structure of the returned object.', () => {
    cy.checkDebugInfo(sliderTag);
  });

  it('getDebugInfo, refresh: check that renderCount has increased after refreshing.', () => {
    cy.checkRenderCountIncrease(sliderTag);
  });

  it(`getProps: check keys against Kul${sliderCapitalized}Props enum.`, () => {
    cy.checkProps(sliderTag, KulSliderProps);
  });

  it(`getProps: check keys against Kul${sliderCapitalized}PropsInterface.`, () => {
    cy.checkPropsInterface(sliderTag, {
      kulDisabled: null,
      kulLabel: null,
      kulLeadingLabel: null,
      kulMax: null,
      kulMin: null,
      kulRipple: null,
      kulStep: null,
      kulStyle: null,
      kulValue: null,
    } as Required<KulSliderPropsInterface>);
  });
});

describe('Props', () => {
  beforeEach(() => {
    cy.navigate(sliderComponent);
  });

  it('kulStyle: hould check for the presence of a <style> element with id kup-style.', () => {
    cy.checkKulStyle();
  });
});
