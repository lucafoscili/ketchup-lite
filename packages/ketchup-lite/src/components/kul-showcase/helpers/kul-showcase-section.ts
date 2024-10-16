import {
    KulComponent,
    KulComponentEventName,
    KulComponentEventPayloadName,
    KulComponentName,
    KulComponentTag,
    KulEventType,
} from '../../../types/GenericTypes';
import { KulArticleNode } from '../../kul-article/kul-article-declarations';
import { DOC_IDS, DOC_STYLES } from '../kul-showcase-data';
import { PARAGRAPH_FACTORY } from './kul-showcase-paragraph';

export const SECTION_FACTORY = {
    events: <C extends KulComponentName, T extends KulComponent<C>>(
        _componentName: C,
        payloadType: KulComponentEventPayloadName<C>,
        eventList: { type: KulEventType<T>; description: string }[],
        eventName: KulComponentEventName<C>
    ): KulArticleNode => {
        const nodes: KulArticleNode[] = [];
        eventList.forEach((ev) => {
            nodes.push({
                children: [
                    {
                        id: DOC_IDS.contentListItem,
                        tagName: 'strong',
                        value: ev.type,
                    },
                    {
                        id: DOC_IDS.contentListItem,
                        value: `: ${ev.description}.`,
                    },
                ],
                id: DOC_IDS.contentList,
                tagName: 'li',
                value: '',
            });
        });
        return {
            children: [
                {
                    children: [
                        {
                            id: DOC_IDS.content,
                            value: 'This event is emitted during various lifecycle stages of the component. It carries a payload of type ',
                        },
                        {
                            id: DOC_IDS.content,
                            value: payloadType,
                        },
                        {
                            id: DOC_IDS.content,
                            value: ', which includes information about the component, its state and the event type.',
                        },
                        {
                            children: [
                                {
                                    children: nodes,
                                    id: DOC_IDS.content,
                                    value: '',
                                },
                            ],
                            id: DOC_IDS.contentWrapper,
                            value: '',
                        },
                    ],
                    cssStyle: DOC_STYLES.monoPrimaryH3,
                    id: DOC_IDS.paragraph,
                    tagName: 'strong',
                    value: eventName,
                },
            ],
            id: DOC_IDS.section,
            value: 'Events',
        };
    },
    methods: (tag: KulComponentTag<KulComponentName>): KulArticleNode => {
        const nodes = PARAGRAPH_FACTORY.methods(tag);

        return {
            children: nodes,
            id: DOC_IDS.section,
            value: 'Methods',
        };
    },
    overview: <C extends KulComponentName>(
        componentName: C,
        description: string
    ): KulArticleNode => {
        return {
            children: [
                {
                    children: [
                        {
                            children: [
                                {
                                    id: DOC_IDS.content,
                                    value: 'The ',
                                },
                                {
                                    id: DOC_IDS.content,
                                    tagName: 'strong',
                                    value: componentName,
                                },
                                {
                                    id: DOC_IDS.content,
                                    value: ` component ${description}.`,
                                },
                            ],
                            id: DOC_IDS.contentWrapper,
                        },
                    ],
                    id: DOC_IDS.paragraph,
                },
            ],
            id: DOC_IDS.section,
            value: 'Overview',
        };
    },
    props: (tag: KulComponentTag<KulComponentName>): KulArticleNode => {
        const nodes = PARAGRAPH_FACTORY.props(tag);

        return {
            children: nodes,
            id: DOC_IDS.section,
            value: 'Properties',
        };
    },
    styling: (tag: KulComponentTag<KulComponentName>): KulArticleNode => {
        const nodes = PARAGRAPH_FACTORY.styles(tag);

        return {
            children: nodes,
            id: DOC_IDS.section,
            value: 'Styling',
        };
    },
    usage: <C extends KulComponentName>(
        componentName: C,
        code: { data?: string; tag?: KulComponentTag<C> }
    ): KulArticleNode => {
        const codeShape = (type: 'json' | 'markup'): KulArticleNode => {
            return {
                cells: {
                    kulCode: {
                        shape: 'code',
                        kulLanguage: type,
                        value:
                            type === 'markup'
                                ? `<${code.tag}></${code.tag}>`
                                : code.data,
                    },
                },
                id: DOC_IDS.content,
                value: '',
            };
        };

        const codeNodes: KulArticleNode[] = [];
        if (code?.tag) {
            codeNodes.push(codeShape('markup'));
        }
        if (code?.data) {
            codeNodes.push(codeShape('json'));
        }

        return {
            children: [
                {
                    children: [
                        {
                            children: [
                                {
                                    id: DOC_IDS.content,
                                    value: 'To use the ',
                                },
                                {
                                    id: DOC_IDS.content,
                                    tagName: 'strong',
                                    value: componentName,
                                },
                                {
                                    id: DOC_IDS.content,
                                    value: ' component, include it in your HTML and provide the required props either as attributes (for primitive-typed props) or via JavaScript (for object-typed props).',
                                },
                            ],
                            id: DOC_IDS.contentWrapper,
                            value: '',
                        },
                        code && {
                            children: codeNodes,
                            id: DOC_IDS.contentWrapper,
                            value: '',
                        },
                    ],
                    id: DOC_IDS.paragraph,
                    value: 'Basic Usage',
                },
            ],
            id: DOC_IDS.section,
            value: 'Usage',
        };
    },
};
