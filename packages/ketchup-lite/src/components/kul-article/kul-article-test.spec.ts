import { newSpecPage } from '@stencil/core/testing';
import { KulArticle } from './kul-article';
import { KulArticleDataset } from './kul-article-declarations';

const kulData: KulArticleDataset = {
    nodes: [
        {
            id: '1',
            description: 'This is an article',
            value: 'Article',
            children: [
                {
                    children: [
                        { id: '1.1.2', value: 'First paragraph' },
                        {
                            id: '1.1.1',
                            tagName: 'strong',
                            value: 'Second paragraph',
                        },
                    ],
                    id: '1.1',
                    description: 'This is the first section',
                    value: 'Section 1',
                },
                {
                    id: '1.2',
                    description: 'This is the second section',
                    value: 'Section 2',
                },
            ],
        },
    ],
};

const init = async () => {
    const page = await newSpecPage({
        components: [KulArticle],
        html: `<kul-article></kul-article>`,
    });

    await page.waitForChanges();

    page.rootInstance;
    return {
        component: page.rootInstance.rootElement as HTMLKulArticleElement,
        componentInstance: page.rootInstance as KulArticle,
    };
};

const onReadyCallback = (component: HTMLKulArticleElement, cb: () => void) => {
    component.addEventListener('kul-article-event', (e) => {
        if (e.detail.eventType === 'ready') {
            cb();
        }
    });
};

describe('kul-article', () => {
    it('applies custom styles when kulStyle is set', async () => {
        const { component, componentInstance } = await init();
        componentInstance.kulData = kulData;
        componentInstance.kulStyle = 'color: red;';

        const callback = () => {
            const styleElement = component.shadowRoot.querySelector('style');
            expect(styleElement.textContent).toContain('color: red;');
        };
        onReadyCallback(component, callback);
    });
    it('check article tag existence', async () => {
        const { component, componentInstance } = await init();
        componentInstance.kulData = kulData;
        const callback = () => {
            expect(component.shadowRoot.querySelector('article')).toContain(
                'This is an article'
            );
        };
        onReadyCallback(component, callback);
    });
    it('check section tag existence (x2)', async () => {
        const { component, componentInstance } = await init();
        componentInstance.kulData = kulData;
        const callback = () => {
            expect(
                component.shadowRoot.querySelectorAll('section')
            ).toHaveLength(2);
        };
        onReadyCallback(component, callback);
    });
    it('check section tags content', async () => {
        const { component, componentInstance } = await init();
        componentInstance.kulData = kulData;
        const callback = () => {
            const sectionElements =
                component.shadowRoot.querySelectorAll('section');
            expect(sectionElements.length).toBe(2);
            expect(sectionElements[0].textContent).toContain(
                'This is the first section'
            );
            expect(sectionElements[1].textContent).toContain(
                'This is the second section'
            );
        };
        onReadyCallback(component, callback);
    });
    it('renders elements based on tagName property', async () => {
        const { component } = await init();

        const callback = () => {
            const strongElement = component.shadowRoot.querySelector('strong');
            expect(strongElement).toBeTruthy();
            expect(strongElement.textContent).toContain('Second paragraph');
        };
        onReadyCallback(component, callback);
    });
    it('renders empty data message when kulData is empty', async () => {
        const { component, componentInstance } = await init();
        componentInstance.kulData = kulData;

        const callback = () => {
            const articleElement =
                component.shadowRoot.querySelector('article');
            expect(articleElement.textContent).toContain('Empty data');
        };
        onReadyCallback(component, callback);
    });
    it('renders with data', async () => {
        const { component, componentInstance } = await init();
        componentInstance.kulData = kulData;
        const callback = () => {
            expect(component).toHaveClass('hydrated');
        };
        onReadyCallback(component, callback);
    });
    it('updates based on property changes', async () => {
        const { component, componentInstance } = await init();
        componentInstance.kulData = kulData;
        const callback = () => {
            const articleElement =
                component.shadowRoot.querySelector('article');
            expect(articleElement.textContent).toContain('Initial article');

            component.kulData = {
                nodes: [
                    {
                        id: '2',
                        description: 'Updated article',
                        value: 'Article',
                    },
                ],
            };

            expect(articleElement.textContent).toContain('Updated article');
        };
        onReadyCallback(component, callback);
    });
});
