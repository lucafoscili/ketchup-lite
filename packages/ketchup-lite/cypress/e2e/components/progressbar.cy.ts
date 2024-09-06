import {
    KulProgressbarProps,
    KulProgressbarPropsInterface,
} from '../../../src/components/kul-progressbar/kul-progressbar-declarations';
import { PROGRESSBAR_EXAMPLES_KEYS } from '../../../src/components/kul-showcase/components/progressbar/kul-showcase-progressbar-declarations';

const progressbar = 'progressbar';
const progressbarCapitalized =
    progressbar.charAt(0).toUpperCase() + progressbar.slice(1);
const progressbarTag = 'kul-' + progressbar;

describe('Basic', () => {
    beforeEach(() => {
        cy.navigate(progressbar);
    });

    it(`Should check that all <${progressbarTag}> exist.`, () => {
        cy.checkComponentExamples(
            progressbarTag,
            new Set(PROGRESSBAR_EXAMPLES_KEYS)
        );
    });

    it(`Should check that the number of <${progressbarTag}> elements matches the number of examples.`, () => {
        cy.checkComponentExamplesNumber(Array.from(PROGRESSBAR_EXAMPLES_KEYS));
    });
});

describe('Events', () => {
    it(`ready`, () => {
        cy.checkReadyEvent(progressbar);
    });
});

describe('Methods', () => {
    beforeEach(() => {
        cy.navigate(progressbar);
    });

    it('getDebugInfo: check the structure of the returned object.', () => {
        cy.checkDebugInfo(progressbarTag);
    });

    it('getDebugInfo, refresh: check that renderCount has increased after refreshing.', () => {
        cy.checkRenderCountIncrease(progressbarTag);
    });

    it(`getProps: check keys against Kul${progressbarCapitalized}Props enum.`, () => {
        cy.checkProps(progressbarTag, KulProgressbarProps);
    });

    it(`getProps: check keys against Kul${progressbarCapitalized}PropsInterface.`, () => {
        cy.checkPropsInterface(progressbarTag, {
            kulCenteredLabel: null,
            kulIcon: null,
            kulIsRadial: null,
            kulLabel: null,
            kulShowLabel: null,
            kulStyle: null,
            kulValue: null,
        } as Required<KulProgressbarPropsInterface>);
    });
});

describe('Props', () => {
    beforeEach(() => {
        cy.navigate(progressbar);
    });

    it('Should check for the presence of a <style> element with id kup-style.', () => {
        cy.checkKulStyle();
    });
});
