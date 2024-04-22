import { getAssetPath } from '@stencil/core';
import { KulArticleDataset } from '../../../kul-article/kul-article-declarations';
import { ArticleData } from './kul-showcase-article-declarations';
import { DOC_STYLES } from '../../kul-showcase-data';

const kulData: KulArticleDataset = {
    nodes: [
        {
            id: '0',
            value: 'Artificial Intelligence: A Comprehensive Guide',
            children: [
                {
                    id: '1.1',
                    value: 'Introduction',
                    children: [
                        {
                            children: [
                                {
                                    cells: {
                                        1: {
                                            shape: 'image',
                                            value: getAssetPath(
                                                `./assets/media/morana.png`
                                            ),
                                        },
                                    },
                                    id: '1.1.1.1',
                                    value: '',
                                },
                            ],
                            id: '1.1.1',
                            value: '',
                        },
                        {
                            children: [
                                {
                                    id: '1.1.2.1',
                                    value: 'Artificial Intelligence (AI) is a rapidly evolving field that has the potential to revolutionize various aspects of our lives. This article aims to provide a comprehensive overview of AI, its applications, and the challenges it faces.',
                                },
                            ],
                            id: '1.1.2',
                            value: '',
                        },
                    ],
                },
                {
                    id: '1.2',
                    value: 'What is Artificial Intelligence?',
                    children: [
                        {
                            children: [
                                {
                                    id: '1.2.1.1',
                                    value: 'Artificial Intelligence is a branch of computer science that focuses on creating systems capable of performing tasks that typically require human intelligence. These tasks include learning, reasoning, problem-solving, perception, and language understanding.',
                                },
                            ],
                            id: '1.2.1',
                            value: '',
                        },
                        {
                            children: [
                                {
                                    cells: {
                                        1: {
                                            shape: 'code',
                                            shapeProps: {
                                                kulLanguage: 'python',
                                            },
                                            value: `def hello_world():\nprint("Hello, world!")`,
                                        },
                                    },
                                    id: '1.2.2.1',
                                    value: 'Artificial Intelligence is a branch of computer science that focuses on creating systems capable of performing tasks that typically require human intelligence. These tasks include learning, reasoning, problem-solving, perception, and language understanding.',
                                },
                            ],
                            id: '1.2.2',
                            value: ``,
                        },
                    ],
                },
                {
                    id: '1.3',
                    value: 'Applications of Artificial Intelligence',
                    children: [
                        {
                            children: [
                                {
                                    id: '1.3.1.1',
                                    value: 'AI has a wide range of applications across various industries, including healthcare, finance, education, and transportation. For example, AI can help diagnose diseases, predict stock market trends, and personalize learning experiences.',
                                },
                            ],
                            id: '1.3.1',
                            value: '',
                        },
                        {
                            children: [
                                {
                                    cells: {
                                        1: {
                                            shape: 'image',
                                            value: getAssetPath(
                                                `./assets/media/morana.png`
                                            ),
                                        },
                                    },
                                    id: '1.3.2.1',
                                    value: 'AI has a wide range of applications across various industries, including healthcare, finance, education, and transportation. For example, AI can help diagnose diseases, predict stock market trends, and personalize learning experiences.',
                                },
                            ],
                            id: '1.3.2',
                            value: '',
                        },
                    ],
                },
                {
                    id: '1.4',
                    value: 'Challenges and Ethical Considerations',
                    children: [
                        {
                            children: [
                                {
                                    id: '1.4.1.1',
                                    value: 'While AI offers numerous benefits, it also presents several challenges, including privacy concerns, job displacement, and the risk of bias in AI systems. Ethical considerations are crucial in the development and deployment of AI technologies.',
                                },
                            ],
                            id: '1.4.1',
                            value: '',
                        },
                        {
                            id: '1.4.2',
                            value: '',
                        },
                    ],
                },
                {
                    id: '1.5',
                    value: 'Conclusion',
                    children: [
                        {
                            children: [
                                {
                                    value: 'Artificial Intelligence is poised to play a pivotal role in shaping the future of technology and society. As we continue to explore its potential, it is essential to address its challenges and ethical implications to ensure its responsible development and deployment.',
                                    id: '1.5.2.1',
                                },
                            ],
                            id: '1.5.1',
                            value: '',
                        },
                    ],
                },
            ],
        },
    ],
};

export const ARTICLE_DOC: KulArticleDataset = {
    nodes: [
        {
            children: [
                {
                    children: [
                        {
                            children: [
                                {
                                    children: [
                                        {
                                            id: '0.0.0.0.0',
                                            value: 'The ',
                                        },
                                        {
                                            id: '0.0.0.0.1',
                                            tagName: 'strong',
                                            value: 'KulArticle',
                                        },
                                        {
                                            id: '0.0.0.0.2',
                                            value: ' component is a versatile and customizable web component designed to render articles based on a JSON structure. ',
                                        },
                                    ],
                                    id: '0.0.0.0',
                                },
                            ],
                            id: '0.0.0',
                        },
                    ],
                    id: '0.0',
                    value: 'Overview',
                },
                {
                    children: [
                        {
                            children: [
                                {
                                    children: [
                                        {
                                            children: [
                                                {
                                                    id: '0.1.0.0.0.0',
                                                    tagName: 'strong',
                                                    value: 'Dynamic Content Rendering',
                                                },
                                                {
                                                    id: '0.1.0.0.0.1',
                                                    value: ': The component dynamically generates an ',
                                                },
                                                {
                                                    id: '0.1.0.0.0.2',
                                                    tagName: 'strong',
                                                    value: '<article>',
                                                },
                                                {
                                                    id: '0.1.0.0.0.3',
                                                    value: ' element based on the JSON structure provided.',
                                                },
                                            ],
                                            id: '0.1.0.0.0',
                                            tagName: 'li',
                                            value: '',
                                        },
                                    ],
                                    id: '0.1.0.0',
                                    value: '',
                                },
                                {
                                    children: [
                                        {
                                            children: [
                                                {
                                                    id: '0.1.0.1.0.0',
                                                    tagName: 'strong',
                                                    value: 'Customizable Styling',
                                                },
                                                {
                                                    id: '0.1.0.1.0.1',
                                                    value: ": Offers the ability to customize the component's style through the ",
                                                },
                                                {
                                                    id: '0.1.0.1.0.2',
                                                    tagName: 'strong',
                                                    value: '<kulStyle>',
                                                },
                                                {
                                                    id: '0.1.0.1.0.3',
                                                    value: ' property.',
                                                },
                                            ],
                                            id: '0.1.0.1.0',
                                            tagName: 'li',
                                            value: '',
                                        },
                                    ],
                                    id: '0.1.0.1',
                                    value: '',
                                },
                                {
                                    children: [
                                        {
                                            children: [
                                                {
                                                    id: '0.1.0.2.0.0',
                                                    tagName: 'strong',
                                                    value: 'Debug Information',
                                                },
                                                {
                                                    id: '0.1.0.2.0.1',
                                                    value: ": Provides debug information about the component's rendering process, useful for development and debugging purposes.",
                                                },
                                            ],
                                            id: '0.1.0.2.0',
                                            tagName: 'li',
                                            value: '',
                                        },
                                    ],
                                    id: '0.1.0.2',
                                    value: '',
                                },
                                {
                                    children: [
                                        {
                                            children: [
                                                {
                                                    id: '0.1.0.3.0.0',
                                                    tagName: 'strong',
                                                    value: 'Event handling',
                                                },
                                                {
                                                    id: '0.1.0.3.0.1',
                                                    value: ': Emits custom events for various lifecycle stages, allowing for integration with other components or frameworks.',
                                                },
                                            ],
                                            id: '0.1.0.3.0',
                                            tagName: 'li',
                                            value: '',
                                        },
                                    ],
                                    id: '0.1.0.3',
                                    value: '',
                                },
                            ],
                            id: '0.1.0',
                            value: '',
                        },
                    ],
                    id: '0.1',
                    value: 'Features',
                },
                {
                    children: [
                        {
                            children: [
                                {
                                    children: [
                                        {
                                            id: '0.2.0.0.0',
                                            value: 'To use the ',
                                        },
                                        {
                                            id: '0.2.0.0.1',
                                            tagName: 'strong',
                                            value: 'KulArticle',
                                        },
                                        {
                                            id: '0.2.0.0.2',
                                            value: ' component, include it in your HTML and provide the ',
                                        },
                                        {
                                            id: '0.2.0.0.3',
                                            tagName: 'strong',
                                            value: 'kulData',
                                        },
                                        {
                                            id: '0.2.0.0.4',
                                            value: ' property with the JSON structure representing the article.',
                                        },
                                    ],
                                    id: '0.2.0.0',
                                },
                                {
                                    children: [
                                        {
                                            cells: {
                                                code: {
                                                    shape: 'code',
                                                    shapeProps: {
                                                        kulLanguage: 'markup',
                                                    },
                                                    value: '<kul-article></kul-article>',
                                                },
                                            },
                                            id: '0.2.0.1.0',
                                            value: '',
                                        },
                                        {
                                            cells: {
                                                code: {
                                                    shape: 'code',
                                                    shapeProps: {
                                                        kulLanguage: 'json',
                                                    },
                                                    value: '{ "nodes": [{"value": "Article Title", "id": "0", "children": [{"value": "Section Title", "id": "0.1", "children": [{"value": "Paragraph title", "id": "0.1.1", "children": [{"value": "Text", "id": "0.1.1.1"}, {"value": "Strong text", "id": "0.1.1.2", "tagName": "strong"}]}]}]}]}',
                                                },
                                            },
                                            id: '0.2.0.1.1',
                                            value: '',
                                        },
                                    ],
                                    id: '0.2.0.1',
                                },
                            ],
                            id: '0.2.0',
                            value: 'Basic Usage',
                        },
                        {
                            children: [
                                {
                                    children: [
                                        {
                                            id: '0.2.1.0.0',
                                            value: "You can customize the component's style by setting the ",
                                        },
                                        {
                                            id: '0.2.1.0.1',
                                            tagName: 'strong',
                                            value: 'kulStyle',
                                        },
                                        {
                                            id: '0.2.1.0.2',
                                            value: ' property.',
                                        },
                                    ],
                                    id: '0.2.1.0',
                                },
                                {
                                    children: [
                                        {
                                            cells: {
                                                code: {
                                                    shape: 'code',
                                                    shapeProps: {
                                                        kulLanguage: 'markup',
                                                    },
                                                    value: '<kul-article kul-style="#kul-component article { max-height: 20vh; }"></kul-article>',
                                                },
                                            },
                                            id: '0.2.1.1.0',
                                            value: '',
                                        },
                                    ],
                                    id: '0.2.1.1',
                                },
                            ],
                            id: '0.2.1',
                            value: 'Custom Styling',
                        },
                    ],
                    id: '0.2',
                    value: 'Usage',
                },
                {
                    children: [
                        {
                            children: [
                                {
                                    children: [
                                        {
                                            id: '0.3.0.0.0',
                                            value: 'Type:',
                                        },
                                        {
                                            id: '0.3.0.0.1',
                                            tagName: 'strong',
                                            value: 'KulArticleDataset',
                                        },
                                    ],
                                    id: '0.3.0.0',
                                    value: '',
                                },
                                {
                                    children: [
                                        {
                                            id: '0.3.0.1.0',
                                            value: 'The actual data of the article. This property should be an object that matches the ',
                                        },
                                        {
                                            id: '0.3.0.1.1',
                                            tagName: 'strong',
                                            value: 'KulArticleDataset',
                                        },
                                        {
                                            id: '0.3.0.1.2',
                                            value: ' interface, which includes a ',
                                        },
                                        {
                                            id: '0.3.0.1.3',
                                            tagName: 'strong',
                                            value: 'nodes',
                                        },
                                        {
                                            id: '0.3.0.1.4',
                                            value: ' array representing the structure of the article.',
                                        },
                                    ],
                                    id: '0.3.0.1',
                                    value: '',
                                },
                            ],
                            cssStyle: DOC_STYLES.monoPrimaryH3,
                            id: '0.3.0',
                            value: 'kulData',
                        },
                        {
                            children: [
                                {
                                    children: [
                                        {
                                            id: '0.3.1.0.0',
                                            value: 'Type:',
                                        },
                                        {
                                            id: '0.3.1.0.1',
                                            tagName: 'strong',
                                            value: 'string',
                                        },
                                    ],
                                    id: '0.3.1.0',
                                    value: '',
                                },
                                {
                                    children: [
                                        {
                                            id: '0.3.1.1.0',
                                            value: "Enables customization of the component's style. This property accepts a string of CSS styles that will be applied to the component.",
                                        },
                                    ],
                                    id: '0.3.1.1',
                                    value: '',
                                },
                            ],
                            cssStyle: DOC_STYLES.monoPrimaryH3,
                            id: '0.3.1',
                            value: 'kulStyle',
                        },
                    ],
                    id: '0.3',
                    value: 'Properties',
                },
                {
                    children: [
                        {
                            children: [
                                {
                                    id: '0.4.0.0',
                                    value: 'This event is emitted during various lifecycle stages of the component. It carries a payload of type ',
                                },
                                {
                                    id: '0.4.0.1',
                                    value: 'KulEventPayload',
                                },
                                {
                                    id: '0.4.0.2',
                                    value: ', which includes information about the component and the event type.',
                                },
                            ],
                            cssStyle: DOC_STYLES.monoPrimaryH3,
                            id: '0.4.0',
                            tagName: 'strong',
                            value: 'kul-article-event',
                        },
                    ],
                    id: '0.4',
                    value: 'Events',
                },
                {
                    children: [
                        {
                            children: [
                                {
                                    id: '0.5.0.0',
                                    value: 'Returns a promise that resolves to a ',
                                },
                                {
                                    id: '0.5.0.1',
                                    tagName: 'strong',
                                    value: 'KulDebugComponentInfo',
                                },
                                {
                                    id: '0.5.0.2',
                                    value: " object containing debug information about the component's rendering process.",
                                },
                            ],
                            cssStyle: DOC_STYLES.monoPrimaryH3,
                            id: '0.5.0',
                            tagName: 'strong',
                            value: 'getDebugInfo()',
                        },
                        {
                            children: [
                                {
                                    id: '0.5.1.0',
                                    value: 'Returns a promise that resolves to an object where each key is a property name, optionally with its description.',
                                },
                            ],
                            cssStyle: DOC_STYLES.monoPrimaryH3,
                            id: '0.5.1',
                            tagName: 'strong',
                            value: 'getProps(descriptions?: boolean)',
                        },
                        {
                            children: [
                                {
                                    id: '0.5.2.0',
                                    value: 'Triggers a re-render of the component to reflect any state changes.',
                                },
                            ],
                            cssStyle: DOC_STYLES.monoPrimaryH3,
                            id: '0.5.2',
                            tagName: 'strong',
                            value: 'refresh()',
                        },
                        {
                            children: [
                                {
                                    id: '0.5.3.0',
                                    value: 'Assigns a set of properties to the component, triggering updates if necessary.',
                                },
                            ],
                            cssStyle: DOC_STYLES.monoPrimaryH3,
                            id: '0.5.3',
                            tagName: 'strong',
                            value: 'setProps(props: GenericObject)',
                        },
                    ],
                    id: '0.5',
                    value: 'Methods',
                },
                {
                    children: [
                        {
                            children: [
                                {
                                    id: '0.6.0.0',
                                    value: 'The component utilizes various lifecycle hooks to manage its state and behavior. These include ',
                                },
                                {
                                    id: '0.6.0.1',
                                    tagName: 'strong',
                                    value: 'componentWillLoad',
                                },
                                {
                                    id: '0.6.0.2',
                                    value: ', ',
                                },
                                {
                                    id: '0.6.0.3',
                                    tagName: 'strong',
                                    value: 'componentDidLoad',
                                },
                                {
                                    id: '0.6.0.4',
                                    value: ', ',
                                },
                                {
                                    id: '0.6.0.5',
                                    tagName: 'strong',
                                    value: 'componentWillRender',
                                },
                                {
                                    id: '0.6.0.6',
                                    value: ' and ',
                                },
                                {
                                    id: '0.6.0.7',
                                    tagName: 'strong',
                                    value: 'componentDidRender',
                                },
                            ],
                            id: '0.6.0',
                            tagName: 'strong',
                            value: '',
                        },
                    ],
                    id: '0.6',
                    value: 'Lifecycle Hooks',
                },
                {
                    children: [
                        {
                            children: [
                                {
                                    id: '0.7.0.0',
                                    value: 'The component uses Shadow DOM for encapsulation, ensuring that its styles do not leak into the global scope. However, custom styles can be applied using the ',
                                },
                                {
                                    id: '0.7.0.1',
                                    tagName: 'strong',
                                    value: 'kulStyle',
                                },
                                {
                                    id: '0.7.0.2',
                                    value: ' property.',
                                },
                            ],
                            id: '0.7.0',
                            tagName: 'strong',
                            value: '',
                        },
                        {
                            children: [
                                {
                                    children: [
                                        {
                                            children: [
                                                {
                                                    cssStyle:
                                                        DOC_STYLES.monoPrimaryContent,
                                                    id: '0.7.1.0.0.0',
                                                    tagName: 'strong',
                                                    value: '--kul-article-content-color',
                                                },
                                                {
                                                    id: '0.7.1.0.0.1',
                                                    value: ': Sets the color for .content elements. Defaults to var(--kul-text-color).',
                                                },
                                            ],
                                            id: '0.7.1.0.0',
                                            tagName: 'li',
                                            value: '',
                                        },
                                        {
                                            children: [
                                                {
                                                    cssStyle:
                                                        DOC_STYLES.monoPrimaryContent,
                                                    id: '0.7.1.0.1.0',
                                                    tagName: 'strong',
                                                    value: '--kul-article-content-font-family',
                                                },
                                                {
                                                    id: '0.7.1.0.1.1',
                                                    value: ': Sets the font family for .content elements. Defaults to var(--kul-font-family).',
                                                },
                                            ],
                                            id: '0.7.1.0.1',
                                            tagName: 'li',
                                            value: '',
                                        },
                                        {
                                            children: [
                                                {
                                                    cssStyle:
                                                        DOC_STYLES.monoPrimaryContent,
                                                    id: '0.7.1.0.2.0',
                                                    tagName: 'strong',
                                                    value: '--kul-article-content-font-size',
                                                },
                                                {
                                                    id: '0.7.1.0.2.1',
                                                    value: ': Sets the font size for .content elements. Defaults to var(--kul-font-size).',
                                                },
                                            ],
                                            id: '0.7.1.0.2',
                                            tagName: 'li',
                                            value: '',
                                        },
                                        {
                                            children: [
                                                {
                                                    cssStyle:
                                                        DOC_STYLES.monoPrimaryContent,
                                                    id: '0.7.1.0.0.0',
                                                    tagName: 'strong',
                                                    value: '--kul-article-h3-color',
                                                },
                                                {
                                                    id: '0.7.1.0.0.1',
                                                    value: ': Sets the color for <h3> elements. Defaults to var(--kul-text-color).',
                                                },
                                            ],
                                            id: '0.7.1.0.0',
                                            tagName: 'li',
                                            value: '',
                                        },
                                        {
                                            children: [
                                                {
                                                    cssStyle:
                                                        DOC_STYLES.monoPrimaryContent,
                                                    id: '0.7.1.0.1.0',
                                                    tagName: 'strong',
                                                    value: '--kul-article-h3-font-family',
                                                },
                                                {
                                                    id: '0.7.1.0.1.1',
                                                    value: ': Sets the font family for <h3> elements. Defaults to var(--kul-font-family).',
                                                },
                                            ],
                                            id: '0.7.1.0.1',
                                            tagName: 'li',
                                            value: '',
                                        },
                                        {
                                            children: [
                                                {
                                                    cssStyle:
                                                        DOC_STYLES.monoPrimaryContent,
                                                    id: '0.7.1.0.2.0',
                                                    tagName: 'strong',
                                                    value: '--kul-article-h3-font-size',
                                                },
                                                {
                                                    id: '0.7.1.0.2.1',
                                                    value: ': Sets the font size for <h3> elements. Defaults to 1.5em.',
                                                },
                                            ],
                                            id: '0.7.1.0.2',
                                            tagName: 'li',
                                            value: '',
                                        },
                                        {
                                            children: [
                                                {
                                                    cssStyle:
                                                        DOC_STYLES.monoPrimaryContent,
                                                    id: '0.7.1.0.3.0',
                                                    tagName: 'strong',
                                                    value: '--kul-article-margin',
                                                },
                                                {
                                                    id: '0.7.1.0.3.1',
                                                    value: ': Sets the margin of the article tag. Defaults to automatic.',
                                                },
                                            ],
                                            id: '0.7.1.0.3',
                                            tagName: 'li',
                                            value: '',
                                        },
                                        {
                                            children: [
                                                {
                                                    cssStyle:
                                                        DOC_STYLES.monoPrimaryContent,
                                                    id: '0.7.1.0.4.0',
                                                    tagName: 'strong',
                                                    value: '--kul-article-max-width',
                                                },
                                                {
                                                    id: '0.7.1.0.4.1',
                                                    value: ': Sets the max-width of the article tag. Defaults to 1200px.',
                                                },
                                            ],
                                            id: '0.7.1.0.4',
                                            tagName: 'li',
                                            value: '',
                                        },
                                        {
                                            children: [
                                                {
                                                    cssStyle:
                                                        DOC_STYLES.monoPrimaryContent,
                                                    id: '0.7.1.0.5.0',
                                                    tagName: 'strong',
                                                    value: '--kul-article-padding',
                                                },
                                                {
                                                    id: '0.7.1.0.5.1',
                                                    value: ': Sets the padding of the article tag. Defaults to 40px vertically.',
                                                },
                                            ],
                                            id: '0.7.1.0.5',
                                            tagName: 'li',
                                            value: '',
                                        },
                                    ],
                                    id: '0.7.1.0',
                                    value: 'Additionally, the following CSS variables can be used to customize the appearance of the component:',
                                },
                            ],
                            id: '0.7.1',
                            value: 'CSS Variables',
                        },
                    ],
                    id: '0.7',
                    value: 'Styling',
                },
                {
                    children: [
                        {
                            children: [
                                {
                                    id: '0.8.0.0',
                                    value: 'The ',
                                },
                                {
                                    id: '0.8.0.1',
                                    tagName: 'strong',
                                    value: 'KulArticle',
                                },
                                {
                                    id: '0.8.0.2',
                                    value: ' component is a powerful tool for rendering articles based on JSON structures. Its customizable styling and event handling capabilities make it a versatile choice for web developers looking to enhance their applications with dynamic, encapsulated UI elements.',
                                },
                            ],
                            id: '0.8.0',
                            tagName: 'strong',
                            value: '',
                        },
                    ],
                    id: '0.8',
                    value: 'Conclusion',
                },
            ],
            id: '0',
            value: 'KulArticle',
        },
    ],
};

export const ARTICLE_EXAMPLES: ArticleData = {
    simple: {
        ['data-description']: 'Simple article',
        kulData,
    },
    style: {
        ['data-description']: 'Article with custom style',
        'data-dynamic': 'custom',
        kulData,
    },
};