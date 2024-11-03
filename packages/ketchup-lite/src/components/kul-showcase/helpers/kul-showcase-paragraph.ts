import { KulComponentName, KulComponentTag } from '../../../types/GenericTypes';
import { KulArticleNode } from '../../kul-article/kul-article-declarations';
import { KUL_DOC } from '../assets/doc';
import { DOC_IDS, DOC_NODES, DOC_STYLES } from '../kul-showcase-data';
import {
    KulShowcaseDocMethod,
    KulShowcaseDocProp,
    KulShowcaseDocStyle,
} from '../kul-showcase-declarations';

export const PARAGRAPH_FACTORY = {
    asBulletListEntry: (
        title: string,
        children: { title: string; description: string }[]
    ): KulArticleNode => {
        const nodes: KulArticleNode[] = [];
        children.forEach((child) => {
            nodes.push({
                id: DOC_IDS.content,
                value: '- ',
            });
            nodes.push({
                cssStyle: DOC_STYLES.monoPrimaryContent,
                id: DOC_IDS.content,
                tagName: 'strong',
                value: child.title,
            });
            nodes.push({
                id: DOC_IDS.content,
                value: child.description,
            });
        });
        return {
            children: nodes,
            cssStyle: DOC_STYLES.monoPrimaryH3Large,
            id: DOC_IDS.paragraph,
            value: title,
        };
    },
    asListEntry: (
        title: string,
        description: string,
        args?: { name: string; type: string; description: string }[]
    ): KulArticleNode => {
        const signature = (): KulArticleNode => {
            let value = '(';
            args?.forEach((a, index) => {
                value += `${a.name}:${a.type}${index < args.length - 1 ? ',' : ''}`;
            });
            value += ')';
            return {
                id: DOC_IDS.content,
                tagName: 'strong',
                value,
            };
        };
        const params = () => {
            const content: KulArticleNode[] = [];
            args?.forEach((a) => {
                content.push(DOC_NODES.lineBreak);
                content.push({
                    id: DOC_IDS.content,
                    value: `- `,
                });
                content.push({
                    id: DOC_IDS.content,
                    cssStyle: DOC_STYLES.monoPrimaryContent,
                    tagName: 'strong',
                    value: `${a.name} (${a.type})`,
                });
                content.push({
                    id: DOC_IDS.content,
                    value: `: ${a.description}`,
                });
            });
            return content;
        };
        const hasArgs = !!args?.length;
        return {
            children: [
                {
                    id: DOC_IDS.content,
                    value: description,
                },
                DOC_NODES.lineBreak,
                ...((hasArgs && params()) || []),
            ],
            id: DOC_IDS.paragraph,
            cssStyle: DOC_STYLES.monoPrimaryH3Large,
            value: `${title} ${hasArgs ? signature().value : '()'}`,
        };
    },
    asSimpleListEntry: (
        title: string,
        description: string
    ): KulArticleNode => ({
        children: [
            {
                id: DOC_IDS.content,
                cssStyle: DOC_STYLES.monoPrimaryContent,
                tagName: 'strong',
                value: title.toString(),
            },
            {
                id: DOC_IDS.content,
                value: description.toString(),
            },
        ],
        id: DOC_IDS.paragraph,
        value: '',
    }),
    methods: (tag: KulComponentTag<KulComponentName>) => {
        const nodes: KulArticleNode[] = [];

        const docMethods = KUL_DOC[tag].methods as KulShowcaseDocMethod[];
        docMethods.forEach((method) => {
            const node: KulArticleNode = {
                children: [],
                cssStyle: DOC_STYLES.monoPrimaryH3,
                id: DOC_IDS.paragraph,
                value: `${method.name} ${method.signature}`,
            };
            const propDescription: KulArticleNode = {
                children: [
                    {
                        id: DOC_IDS.content,
                        value: method.docs,
                    },
                ],
                id: DOC_IDS.contentWrapper,
                value: '',
            };
            node.children.push(propDescription);
            nodes.push(node);
        });

        return nodes;
    },
    props: (tag: KulComponentTag<KulComponentName>) => {
        const nodes: KulArticleNode[] = [];

        const docProps = KUL_DOC[tag].props as KulShowcaseDocProp[];
        docProps.forEach((prop) => {
            const node: KulArticleNode = {
                children: [],
                cssStyle: DOC_STYLES.monoPrimaryH3,
                id: DOC_IDS.paragraph,
                value: prop.name,
            };
            const propTitle: KulArticleNode = {
                children: [
                    {
                        id: DOC_IDS.content,
                        value: 'Type:',
                    },
                    {
                        id: DOC_IDS.content,
                        tagName: 'strong',
                        value: prop.type,
                    },
                ],
                id: DOC_IDS.contentWrapper,
                value: '',
            };
            const propDescription: KulArticleNode = {
                children: [
                    {
                        id: DOC_IDS.content,
                        value: prop.docs,
                    },
                ],
                id: DOC_IDS.contentWrapper,
                value: '',
            };
            node.children.push(propTitle);
            node.children.push(propDescription);
            nodes.push(node);
        });

        return nodes;
    },
    styles: (tag: KulComponentTag<KulComponentName>) => {
        const nodes: KulArticleNode[] = [];

        const docStyles = KUL_DOC[tag].styles as KulShowcaseDocStyle[];
        const kulStyle: KulArticleNode = {
            children: [
                {
                    id: DOC_IDS.contentWrapper,
                    value: 'The component uses Shadow DOM for encapsulation, ensuring that its styles do not leak into the global scope. However, custom styles can be applied using the ',
                },
                {
                    id: DOC_IDS.contentWrapper,
                    tagName: 'strong',
                    value: 'kulStyle',
                },
                {
                    id: DOC_IDS.contentWrapper,
                    value: ' property.',
                },
                {
                    cells: {
                        kulCode: {
                            shape: 'code',
                            kulLanguage: 'markup',
                            value: `<${tag} kul-style="#kul-component { max-height: 20vh; }"></${tag}>`,
                        },
                    },
                    id: DOC_IDS.contentWrapper,
                    value: '',
                },
            ],
            id: DOC_IDS.paragraph,
            tagName: 'strong',
            value: 'kulStyle',
        };
        const listNode: KulArticleNode = {
            children: [],
            id: DOC_IDS.contentWrapper,
            value: 'Additionally, the following CSS variables can be used to customize the appearance of the component:',
        };
        const wrapperNode: KulArticleNode = {
            children: [],
            id: DOC_IDS.paragraph,
            value: 'CSS Variables',
        };
        docStyles?.forEach((style) => {
            const styleNode: KulArticleNode = {
                children: [
                    {
                        cssStyle: DOC_STYLES.monoPrimaryContent,
                        id: DOC_IDS.contentListItem,
                        tagName: 'strong',
                        value: style.name,
                    },
                    {
                        id: DOC_IDS.contentListItem,
                        value: `: ${style.docs}`,
                    },
                ],
                id: DOC_IDS.contentList,
                tagName: 'li',
                value: '',
            };
            listNode.children.push(styleNode);
        });
        nodes.push(kulStyle);
        if (listNode.children.length > 0) {
            nodes.push(wrapperNode);
            wrapperNode.children.push(listNode);
        }

        return nodes;
    },
};
