import {
  KulCodeEvent,
  KulCodeProps,
  KulCodePropsInterface,
} from '../../../src/components/kul-code/kul-code-declarations';
import { CODE_EXAMPLES_KEYS } from '../../../src/components/kul-showcase/components/code/kul-showcase-code-declarations';
import { KulDataCyAttributes } from '../../../src/types/GenericTypes';

const code = 'code';
const codeCapitalized = code.charAt(0).toUpperCase() + code.slice(1);
const codeTag = 'kul-' + code;

describe('Basic', () => {
  beforeEach(() => {
    cy.navigate(code);
  });

  it(`Should check that all <${codeTag}> exist.`, () => {
    cy.checkComponentExamples(codeTag, new Set(CODE_EXAMPLES_KEYS));
  });

  it(`Should check that the number of <${codeTag}> elements matches the number of examples.`, () => {
    cy.checkComponentExamplesNumber(Array.from(CODE_EXAMPLES_KEYS));
  });
});

describe('Events', () => {
  it(`ready`, () => {
    cy.checkReadyEvent(code);
  });

  it(`unmount`, () => {
    cy.navigate(code);
    const eventType: KulCodeEvent = 'unmount';
    cy.checkEvent(code, eventType);
    cy.get('@eventElement').then(($code) => {
      const kulCodeElement = $code[0] as HTMLKulCodeElement;
      kulCodeElement.unmount();
    });
    cy.getCyElement(KulDataCyAttributes.CHECK).should('exist');
  });
});

describe('Methods', () => {
  beforeEach(() => {
    cy.navigate(code);
  });

  it('getDebugInfo: check the structure of the returned object.', () => {
    cy.checkDebugInfo(codeTag);
  });

  it('getDebugInfo, refresh: check that renderCount has increased after refreshing.', () => {
    cy.checkRenderCountIncrease(codeTag);
  });

  it(`getProps: check keys against Kul${codeCapitalized}Props enum.`, () => {
    cy.checkProps(codeTag, KulCodeProps);
  });

  it(`getProps: check keys against Kul${codeCapitalized}PropsInterface.`, () => {
    cy.checkPropsInterface(codeTag, {
      kulFormat: null,
      kulLanguage: null,
      kulPreserveSpaces: null,
      kulStyle: null,
      kulValue: null,
    } as Required<KulCodePropsInterface>);
  });
});

describe('Props', () => {
  beforeEach(() => {
    cy.navigate(code);
  });

  it('Should check for the presence of a <style> element with id kup-style.', () => {
    cy.checkKulStyle();
  });
});
