import {
    KulCompareEvent,
    KulCompareProps,
    KulComparePropsInterface,
} from '../../../src/components/kul-compare/kul-compare-declarations';
import { COMPARE_EXAMPLES_KEYS } from '../../../src/components/kul-showcase/components/compare/kul-showcase-compare-declarations';
import { KulDataCyAttributes } from '../../../src/types/GenericTypes';

const compare = 'compare';
const compareCapitalized = compare.charAt(0).toUpperCase() + compare.slice(1);
const compareTag = 'kul-' + compare;

describe('Basic', () => {
    beforeEach(() => {
        cy.navigate(compare);
    });

    it(`Should check that all <${compareTag}> exist.`, () => {
        cy.checkComponentExamples(compareTag, new Set(COMPARE_EXAMPLES_KEYS));
    });

    it(`Should check that the number of <${compareTag}> elements matches the number of examples.`, () => {
        cy.checkComponentExamplesNumber(Array.from(COMPARE_EXAMPLES_KEYS));
    });
});

describe('Events', () => {
    it(`kul-event`, () => {
        cy.navigate(compare);
        const eventType: KulCompareEvent = 'kul-event';
        cy.checkEvent(compare, eventType);
        cy.get('@eventElement')
            .findCyElement(KulDataCyAttributes.SHAPE)
            .first()
            .scrollIntoView()
            .trigger('click', { force: true, x: 100, y: 100 });
        cy.getCyElement(KulDataCyAttributes.CHECK).should('exist');
    });

    it(`ready`, () => {
        cy.checkReadyEvent(compare);
    });

    it(`unmount`, () => {
        cy.navigate(compare);
        const eventType: KulCompareEvent = 'unmount';
        cy.checkEvent(compare, eventType);
        cy.get('@eventElement').then(($compare) => {
            const kulCompareElement = $compare[0] as HTMLKulCompareElement;
            kulCompareElement.unmount();
        });
        cy.getCyElement(KulDataCyAttributes.CHECK).should('exist');
    });
});

describe('Methods', () => {
    beforeEach(() => {
        cy.navigate(compare);
    });

    it('getDebugInfo: check the structure of the returned object.', () => {
        cy.checkDebugInfo(compareTag);
    });

    it('getDebugInfo, refresh: check that renderCount has increased after refreshing.', () => {
        cy.checkRenderCountIncrease(compareTag);
    });

    it(`getProps: check keys against Kul${compareCapitalized}Props enum.`, () => {
        cy.checkProps(compareTag, KulCompareProps);
    });

    it(`getProps: check keys against Kul${compareCapitalized}PropsInterface.`, () => {
        cy.checkPropsInterface(compareTag, {
            kulData: null,
            kulShape: null,
            kulStyle: null,
            kulView: null,
        } as Required<KulComparePropsInterface>);
    });
});

describe('Props', () => {
    beforeEach(() => {
        cy.navigate(compare);
    });

    it('kulStyle: should check for the presence of a <style> element with id kup-style.', () => {
        cy.checkKulStyle();
    });
});
