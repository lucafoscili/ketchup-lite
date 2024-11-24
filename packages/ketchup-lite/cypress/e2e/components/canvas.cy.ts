import {
    KulCanvasEvent,
    KulCanvasProps,
    KulCanvasPropsInterface,
} from '../../../src/components/kul-canvas/kul-canvas-declarations';
import { CANVAS_EXAMPLES_KEYS } from '../../../src/components/kul-showcase/components/canvas/kul-showcase-canvas-declarations';
import { KulDataCyAttributes } from '../../../src/types/GenericTypes';

const canvas = 'canvas';
const canvasCapitalized = canvas.charAt(0).toUpperCase() + canvas.slice(1);
const canvasTag = 'kul-' + canvas;

describe('Basic', () => {
    beforeEach(() => {
        cy.navigate(canvas);
    });

    it(`Should check that all <${canvasTag}> exist.`, () => {
        cy.checkComponentExamples(canvasTag, new Set(CANVAS_EXAMPLES_KEYS));
    });

    it(`Should check that the number of <${canvasTag}> elements matches the number of examples.`, () => {
        cy.checkComponentExamplesNumber(Array.from(CANVAS_EXAMPLES_KEYS));
    });
});

describe('Events', () => {
    it(`stroke`, () => {
        cy.navigate(canvas);
        const eventType: KulCanvasEvent = 'stroke';
        cy.checkEvent(canvas, eventType);
        cy.get('@eventElement').click();
        cy.getCyElement(KulDataCyAttributes.CHECK).should('exist');
    });

    it(`ready`, () => {
        cy.checkReadyEvent(canvas);
    });

    it(`unmount`, () => {
        cy.navigate(canvas);
        const eventType: KulCanvasEvent = 'unmount';
        cy.checkEvent(canvas, eventType);
        cy.get('@eventElement').then(($canvas) => {
            const kulCanvasElement = $canvas[0] as HTMLKulCanvasElement;
            kulCanvasElement.unmount();
        });
        cy.getCyElement(KulDataCyAttributes.CHECK).should('exist');
    });
});

describe('Methods', () => {
    beforeEach(() => {
        cy.navigate(canvas);
    });

    it('getDebugInfo: check the structure of the returned object.', () => {
        cy.checkDebugInfo(canvasTag);
    });

    it('getDebugInfo, refresh: check that renderCount has increased after refreshing.', () => {
        cy.checkRenderCountIncrease(canvasTag);
    });

    it(`getProps: check keys against Kul${canvasCapitalized}Props enum.`, () => {
        cy.checkProps(canvasTag, KulCanvasProps);
    });

    it(`getProps: check keys against Kul${canvasCapitalized}PropsInterface.`, () => {
        cy.checkPropsInterface(canvasTag, {
            kulBrush: null,
            kulColor: null,
            kulImageProps: null,
            kulOpacity: null,
            kulPreview: null,
            kulSize: null,
            kulStrokeTolerance: null,
            kulStyle: null,
        } as Required<KulCanvasPropsInterface>);
    });
});

describe('Props', () => {
    beforeEach(() => {
        cy.navigate(canvas);
    });

    it('kulStyle: should check for the presence of a <style> element with id kup-style.', () => {
        cy.checkKulStyle();
    });
});
