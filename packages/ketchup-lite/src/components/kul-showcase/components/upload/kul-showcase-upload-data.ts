import { KulArticleDataset } from '../../../kul-article/kul-article-declarations';
import { DOC_STYLES } from '../../kul-showcase-data';
import { UploadData } from './kul-showcase-upload-declarations';

export const UPLOAD_EXAMPLES: UploadData = {
    simple: {
        ['data-description']: 'Simple upload component',
    },
    style: {
        ['data-description']: 'Upload component with custom style',
        ['data-dynamic']: 'custom',
    },
};

export const UPLOAD_DOC: KulArticleDataset = {
    nodes: [
        {
            children: [
                {
                    children: [
                        {
                            children: [
                                {
                                    children: [
                                        { id: '0.1.1.1.1', value: 'The ' },
                                        {
                                            id: '0.1.1.2',
                                            tagName: 'strong',
                                            value: 'KulUpload',
                                        },
                                        {
                                            id: '0.1.1.3',
                                            value: ' component is a customizable and reusable web component designed to handle file uploads. It is part of the Ketchup Lite library, a collection of reusable web components aimed at enhancing web development with encapsulated UI elements. This component is built using Stencil, a compiler that generates Web Components, and is designed to work seamlessly across different frameworks and platforms.',
                                        },
                                    ],
                                    id: '0.1.1.1',
                                },
                            ],
                            id: '0.1.1',
                        },
                    ],
                    id: '0.1',
                    value: 'Overview',
                },
                {
                    children: [
                        {
                            children: [
                                {
                                    id: '0.1.1.1',
                                    tagName: 'strong',
                                    value: 'File Selection and Upload',
                                },
                                {
                                    id: '0.1.1.2',
                                    value: ': The component allows users to select files from their device and provides a visual representation of the selected files, including their type, name, and size. It also supports removing selected files.',
                                },
                            ],
                            id: '0.1.1',
                            tagName: 'li',
                        },
                        {
                            children: [
                                {
                                    id: '0.1.1.1',
                                    tagName: 'strong',
                                    value: 'Customizable Styling',
                                },
                                {
                                    id: '0.1.1.2',
                                    value: ": Offers the ability to customize the component's style through the ",
                                },
                                {
                                    id: '0.1.1.3',
                                    tagName: 'strong',
                                    value: 'kulStyle',
                                },
                                {
                                    id: '0.1.1.4',
                                    value: ' property.',
                                },
                            ],
                            id: '0.2.1',
                            tagName: 'li',
                        },
                        {
                            children: [
                                {
                                    id: '0.1.2.1',
                                    tagName: 'strong',
                                    value: 'Debug Information',
                                },
                                {
                                    id: '0.1.2.2',
                                    value: ": Provides debug information about the component's rendering process, useful for development and debugging purposes.",
                                },
                            ],
                            id: '0.2.1',
                            tagName: 'li',
                        },
                        {
                            children: [
                                {
                                    id: '0.1.2.1',
                                    tagName: 'strong',
                                    value: 'Event handling',
                                },
                                {
                                    id: '0.1.2.2',
                                    value: ': Emits custom events for various lifecycle stages, allowing for integration with other components or frameworks.',
                                },
                            ],
                            id: '0.2.1',
                            tagName: 'li',
                        },
                    ],
                    id: '0.2',
                    value: 'Features',
                },
                {
                    children: [
                        {
                            children: [
                                {
                                    children: [
                                        {
                                            id: '0.3.1.1.1',
                                            value: 'To use the ',
                                        },
                                        {
                                            id: '0.3.1.1.2',
                                            tagName: 'strong',
                                            value: 'KulUpload',
                                        },
                                        {
                                            id: '0.3.1.1.3',
                                            value: ' component, include it in your HTML and optionally set the ',
                                        },
                                        {
                                            id: '0.3.1.1.4',
                                            tagName: 'strong',
                                            value: 'kulLabel',
                                        },
                                        {
                                            id: '0.3.1.1.5',
                                            value: " property to customize the button's label.",
                                        },
                                    ],
                                    id: '0.3.1.1',
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
                                                    value: '<kul-upload></kul-upload>',
                                                },
                                            },
                                            id: '0.3.1.2.1',
                                            value: '',
                                        },
                                    ],
                                    id: '0.3.1.2',
                                },
                            ],
                            id: '0.3.1',
                            value: 'Basic Usage',
                        },
                        {
                            children: [
                                {
                                    children: [
                                        {
                                            id: '0.3.1.1.1',
                                            value: "You can customize the component's style by setting the ",
                                        },
                                        {
                                            id: '0.3.1.1.2',
                                            tagName: 'strong',
                                            value: 'kulStyle',
                                        },
                                        {
                                            id: '0.3.1.1.3',
                                            value: ' property.',
                                        },
                                    ],
                                    id: '0.3.1.1',
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
                                                    value: '<kul-upload kul-style="#kul-component .file-upload { max-height: 20vh; }"></kul-upload>',
                                                },
                                            },
                                            id: '0.3.1.2.2',
                                            value: '',
                                        },
                                    ],
                                    id: '0.3.1.2',
                                },
                            ],
                            id: '0.3.2',
                            value: 'Custom Styling',
                        },
                    ],
                    id: '0.3',
                    value: 'Usage',
                },
                {
                    children: [
                        {
                            children: [
                                {
                                    children: [
                                        { id: '0.4.1.2.1', value: 'Type:' },
                                        {
                                            id: '0.4.1.1.1',
                                            tagName: 'strong',
                                            value: 'string',
                                        },
                                    ],
                                    id: '0.4.1.1',
                                    value: '',
                                },
                                {
                                    children: [
                                        {
                                            id: '0.4.1.2.1',
                                            value: "Sets the button's label. This property accepts a string that will be displayed on the upload button.",
                                        },
                                    ],
                                    id: '0.4.1.2',
                                    value: '',
                                },
                            ],
                            cssStyle: DOC_STYLES.monoPrimaryH3,
                            id: '0.4.1',
                            value: 'kulLabel',
                        },
                        {
                            children: [
                                {
                                    children: [
                                        { id: '0.4.2.1.1', value: 'Type:' },
                                        {
                                            id: '0.4.2.1.1',
                                            tagName: 'strong',
                                            value: 'string',
                                        },
                                    ],
                                    id: '0.4.2.1',
                                    value: '',
                                },
                                {
                                    children: [
                                        {
                                            id: '0.4.2.2.1',
                                            value: "Enables customization of the component's style. This property accepts a string of CSS styles that will be applied to the component.",
                                        },
                                    ],
                                    id: '0.4.2.2',
                                    value: '',
                                },
                            ],
                            cssStyle: DOC_STYLES.monoPrimaryH3,
                            id: '0.4.2',
                            value: 'kulStyle',
                        },
                    ],
                    id: '0.4',
                    value: 'Properties',
                },
                {
                    children: [
                        {
                            children: [
                                {
                                    id: '0.5.1.1',
                                    value: 'This event is emitted during various lifecycle stages of the component. It carries a payload of type ',
                                },
                                {
                                    id: '0.5.1.2',
                                    value: 'KulUploadEventPayload',
                                },
                                {
                                    id: '0.5.1.3',
                                    value: ', which includes information about the component and the event type.',
                                },
                            ],
                            cssStyle: DOC_STYLES.monoPrimaryH3,
                            id: '0.5.1',
                            tagName: 'strong',
                            value: 'kul-upload-event',
                        },
                    ],
                    id: '0.5',
                    value: 'Events',
                },
                {
                    children: [
                        {
                            children: [
                                {
                                    id: '0.6.1.1',
                                    value: 'Returns a promise that resolves to a ',
                                },
                                {
                                    id: '0.6.1.2',
                                    tagName: 'strong',
                                    value: 'KulDebugComponentInfo',
                                },
                                {
                                    id: '0.6.1.3',
                                    value: " object containing debug information about the component's rendering process.",
                                },
                            ],
                            cssStyle: DOC_STYLES.monoPrimaryH3,
                            id: '0.6.1',
                            tagName: 'strong',
                            value: 'getDebugInfo()',
                        },
                        {
                            children: [
                                {
                                    id: '0.6.2.1',
                                    value: 'Returns a promise that resolves to an object where each key is a property name, optionally with its description.',
                                },
                            ],
                            cssStyle: DOC_STYLES.monoPrimaryH3,
                            id: '0.6.2',
                            tagName: 'strong',
                            value: 'getProps(descriptions?: boolean)',
                        },
                        {
                            children: [
                                {
                                    id: '0.6.3.1',
                                    value: 'Triggers a re-render of the component to reflect any state changes.',
                                },
                            ],
                            cssStyle: DOC_STYLES.monoPrimaryH3,
                            id: '0.6.3',
                            tagName: 'strong',
                            value: 'refresh()',
                        },
                        {
                            children: [
                                {
                                    id: '0.6.4.1',
                                    value: 'Assigns a set of properties to the component, triggering updates if necessary.',
                                },
                            ],
                            cssStyle: DOC_STYLES.monoPrimaryH3,
                            id: '0.6.4',
                            tagName: 'strong',
                            value: 'setProps(props: GenericObject)',
                        },
                    ],
                    id: '0.6',
                    value: 'Methods',
                },
                {
                    children: [
                        {
                            children: [
                                {
                                    id: '0.7.1.1',
                                    value: 'The component utilizes various lifecycle hooks to manage its state and behavior. These include ',
                                },
                                {
                                    id: '0.7.1.2',
                                    tagName: 'strong',
                                    value: 'componentWillLoad',
                                },
                                {
                                    id: '0.7.1.3',
                                    value: ', ',
                                },
                                {
                                    id: '0.7.1.4',
                                    tagName: 'strong',
                                    value: 'componentDidLoad',
                                },
                                {
                                    id: '0.7.1.5',
                                    value: ', ',
                                },
                                {
                                    id: '0.7.1.6',
                                    tagName: 'strong',
                                    value: 'componentWillRender',
                                },
                                {
                                    id: '0.7.1.7',
                                    value: ' and ',
                                },
                                {
                                    id: '0.7.1.8',
                                    tagName: 'strong',
                                    value: 'componentDidRender',
                                },
                            ],
                            id: '0.7.1',
                            tagName: 'strong',
                            value: '',
                        },
                    ],
                    id: '0.7',
                    value: 'Lifecycle Hooks',
                },
                {
                    children: [
                        {
                            children: [
                                {
                                    id: '0.8.1.1',
                                    value: 'The component uses Shadow DOM for encapsulation, ensuring that its styles do not leak into the global scope. However, custom styles can be applied using the ',
                                },
                                {
                                    id: '0.8.1.2',
                                    tagName: 'strong',
                                    value: 'kulStyle',
                                },
                                {
                                    id: '0.8.1.3',
                                    value: ' property.',
                                },
                            ],
                            id: '0.8.1',
                            tagName: 'strong',
                            value: '',
                        },
                    ],
                    id: '0.8',
                    value: 'Styling',
                },
                {
                    children: [
                        {
                            children: [
                                {
                                    id: '0.8.1.1',
                                    value: 'The ',
                                },
                                {
                                    id: '0.8.1.2',
                                    tagName: 'strong',
                                    value: 'KulUpload',
                                },
                                {
                                    id: '0.8.1.3',
                                    value: ' component is a powerful tool for handling file uploads in web applications. Its customizable styling and event handling capabilities make it a versatile choice for web developers looking to enhance their applications with dynamic, encapsulated UI elements.',
                                },
                            ],
                            id: '0.8.1',
                            tagName: 'strong',
                            value: '',
                        },
                    ],
                    id: '0.9',
                    value: 'Conclusion',
                },
            ],
            id: '0',
            value: 'KulUpload',
        },
    ],
};
