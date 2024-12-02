import {
  KulMasonryEvent,
  KulMasonryProps,
  KulMasonryPropsInterface,
} from '../../../src/components/kul-masonry/kul-masonry-declarations';
import { MASONRY_EXAMPLES_KEYS } from '../../../src/components/kul-showcase/components/masonry/kul-showcase-masonry-declarations';
import { KulDataCyAttributes } from '../../../src/types/GenericTypes';

const masonry = 'masonry';
const masonryCapitalized = masonry.charAt(0).toUpperCase() + masonry.slice(1);
const masonryTag = 'kul-' + masonry;

describe('Basic', () => {
  beforeEach(() => {
    cy.navigate(masonry);
  });

  it(`Should check that all <${masonryTag}> exist.`, () => {
    cy.checkComponentExamples(masonryTag, new Set(MASONRY_EXAMPLES_KEYS));
  });

  it(`Should check that the number of <${masonryTag}> elements matches the number of examples.`, () => {
    cy.checkComponentExamplesNumber(Array.from(MASONRY_EXAMPLES_KEYS));
  });
});

describe('Events', () => {
  it(`kul-event`, () => {
    cy.navigate(masonry);
    const eventType: KulMasonryEvent = 'kul-event';
    cy.checkEvent(masonry, eventType);
    cy.get('@eventElement')
      .findCyElement(KulDataCyAttributes.SHAPE)
      .first()
      .scrollIntoView()
      .click();
    cy.getCyElement(KulDataCyAttributes.CHECK).should('exist');
  });

  it(`ready`, () => {
    cy.checkReadyEvent(masonry);
  });

  it(`unmount`, () => {
    cy.navigate(masonry);
    const eventType: KulMasonryEvent = 'unmount';
    cy.checkEvent(masonry, eventType);
    cy.get('@eventElement').then(($masonry) => {
      const kulMasonryElement = $masonry[0] as HTMLKulMasonryElement;
      kulMasonryElement.unmount();
    });
    cy.getCyElement(KulDataCyAttributes.CHECK).should('exist');
  });
});

describe('Methods', () => {
  beforeEach(() => {
    cy.navigate(masonry);
  });

  it('getDebugInfo: check the structure of the returned object.', () => {
    cy.checkDebugInfo(masonryTag);
  });

  it('getDebugInfo, refresh: check that renderCount has increased after refreshing.', () => {
    cy.checkRenderCountIncrease(masonryTag);
  });

  it(`getProps: check keys against Kul${masonryCapitalized}Props enum.`, () => {
    cy.checkProps(masonryTag, KulMasonryProps);
  });

  it(`getProps: check keys against Kul${masonryCapitalized}PropsInterface.`, () => {
    cy.checkPropsInterface(masonryTag, {
      kulColumns: null,
      kulData: null,
      kulSelectable: null,
      kulShape: null,
      kulStyle: null,
      kulView: null,
    } as Required<KulMasonryPropsInterface>);
  });
});

describe('Props', () => {
  beforeEach(() => {
    cy.navigate(masonry);
  });

  it('kulStyle: should check for the presence of a <style> element with id kup-style.', () => {
    cy.checkKulStyle();
  });
});
