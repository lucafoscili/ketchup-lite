import {
  KulImageviewerEvent,
  KulImageviewerProps,
  KulImageviewerPropsInterface,
} from '../../../src/components/kul-imageviewer/kul-imageviewer-declarations';
import { IMAGEVIEWER_EXAMPLES_KEYS } from '../../../src/components/kul-showcase/components/imageviewer/kul-showcase-imageviewer-declarations';
import { KulDataCyAttributes } from '../../../src/types/GenericTypes';

const imageviewer = 'imageviewer';
const imageviewerCapitalized =
  imageviewer.charAt(0).toUpperCase() + imageviewer.slice(1);
const imageviewerTag = 'kul-' + imageviewer;

describe('Basic', () => {
  beforeEach(() => {
    cy.navigate(imageviewer);
  });

  it(`Should check that all <${imageviewerTag}> exist.`, () => {
    cy.checkComponentExamples(
      imageviewerTag,
      new Set(IMAGEVIEWER_EXAMPLES_KEYS),
    );
  });

  it(`Should check that the number of <${imageviewerTag}> elements matches the number of examples.`, () => {
    cy.checkComponentExamplesNumber(Array.from(IMAGEVIEWER_EXAMPLES_KEYS));
  });
});

describe('Events', () => {
  it(`kul-event`, () => {
    cy.navigate(imageviewer);
    const eventType: KulImageviewerEvent = 'kul-event';
    cy.checkEvent(imageviewer, eventType);
    cy.get('@eventElement')
      .findCyElement(KulDataCyAttributes.BUTTON)
      .first()
      .click();
    cy.get('@eventElement')
      .findCyElement(KulDataCyAttributes.SHAPE)
      .first()
      .scrollIntoView()
      .click();
    cy.getCyElement(KulDataCyAttributes.CHECK).should('exist');
  });

  it(`ready`, () => {
    cy.checkReadyEvent(imageviewer);
  });

  it(`unmount`, () => {
    cy.navigate(imageviewer);
    const eventType: KulImageviewerEvent = 'unmount';
    cy.checkEvent(imageviewer, eventType);
    cy.get('@eventElement').then(($imageviewer) => {
      const kulImageviewerElement =
        $imageviewer[0] as HTMLKulImageviewerElement;
      kulImageviewerElement.unmount();
    });
    cy.getCyElement(KulDataCyAttributes.CHECK).should('exist');
  });
});

describe('Methods', () => {
  beforeEach(() => {
    cy.navigate(imageviewer);
  });

  it('getDebugInfo: check the structure of the returned object.', () => {
    cy.checkDebugInfo(imageviewerTag);
  });

  it('getDebugInfo, refresh: check that renderCount has increased after refreshing.', () => {
    cy.checkRenderCountIncrease(imageviewerTag);
  });

  it(`getProps: check keys against Kul${imageviewerCapitalized}Props enum.`, () => {
    cy.checkProps(imageviewerTag, KulImageviewerProps);
  });

  it(`getProps: check keys against Kul${imageviewerCapitalized}PropsInterface.`, () => {
    cy.checkPropsInterface(imageviewerTag, {
      kulData: null,
      kulLoadCallback: null,
      kulStyle: null,
      kulValue: null,
    } as Required<KulImageviewerPropsInterface>);
  });
});

describe('Props', () => {
  beforeEach(() => {
    cy.navigate(imageviewer);
  });

  it('kulStyle: should check for the presence of a <style> element with id kup-style.', () => {
    cy.checkKulStyle();
  });
});
