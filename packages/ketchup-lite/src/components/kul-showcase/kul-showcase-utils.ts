import { KUL_DOC } from './assets/doc';
import {
    KulShowcaseDocMethod,
    KulShowcaseDocProp,
    KulShowcaseDocStyle,
    KulShowcaseDynamicExampleType,
} from './kul-showcase-declarations';
import { DOC_IDS, DOC_NODES, DOC_STYLES } from './kul-showcase-data';
import { KulArticleNode } from '../kul-article/kul-article-declarations';

export class Documentation {
    get = {
        methods: (compName: string) => {
            const component = 'kul-' + compName;
            const nodes: KulArticleNode[] = [];
            const docMethods = KUL_DOC[component]
                .methods as KulShowcaseDocMethod[];
            docMethods.forEach((method) => {
                const node: KulArticleNode = {
                    children: [],
                    cssStyle: DOC_STYLES.monoPrimaryH3,
                    id: '',
                    value: `${method.name} ${method.signature}`,
                };
                const propDescription: KulArticleNode = {
                    children: [
                        {
                            id: '',
                            value: method.docs,
                        },
                    ],
                    id: '',
                    value: '',
                };
                node.children.push(propDescription);
                nodes.push(node);
            });
            return nodes;
        },
        props: (compName: string) => {
            const component = 'kul-' + compName;
            const nodes: KulArticleNode[] = [];
            const docProps = KUL_DOC[component].props as KulShowcaseDocProp[];
            docProps.forEach((prop) => {
                const node: KulArticleNode = {
                    children: [],
                    cssStyle: DOC_STYLES.monoPrimaryH3,
                    id: '',
                    value: prop.name,
                };
                const propTitle: KulArticleNode = {
                    children: [
                        {
                            id: '',
                            value: 'Type:',
                        },
                        {
                            id: '',
                            tagName: 'strong',
                            value: prop.type,
                        },
                    ],
                    id: '',
                    value: '',
                };
                const propDescription: KulArticleNode = {
                    children: [
                        {
                            id: '',
                            value: prop.docs,
                        },
                    ],
                    id: '',
                    value: '',
                };
                node.children.push(propTitle);
                node.children.push(propDescription);
                nodes.push(node);
            });
            return nodes;
        },
        styles: (compName: string) => {
            const component = 'kul-' + compName;
            const nodes: KulArticleNode[] = [];
            const docStyles = KUL_DOC[component]
                .styles as KulShowcaseDocStyle[];
            const kulStyle: KulArticleNode = {
                children: [
                    {
                        id: '',
                        value: 'The component uses Shadow DOM for encapsulation, ensuring that its styles do not leak into the global scope. However, custom styles can be applied using the ',
                    },
                    {
                        id: '',
                        tagName: 'strong',
                        value: 'kulStyle',
                    },
                    {
                        id: '',
                        value: ' property.',
                    },
                    {
                        cells: {
                            kulCode: {
                                shape: 'code',
                                kulLanguage: 'markup',
                                value: `<${component} kul-style="#kul-component { max-height: 20vh; }"></${component}>`,
                            },
                        },
                        id: '',
                        value: '',
                    },
                ],
                id: '',
                tagName: 'strong',
                value: 'kulStyle',
            };
            const listNode: KulArticleNode = {
                children: [],
                id: '',
                value: 'Additionally, the following CSS variables can be used to customize the appearance of the component:',
            };
            const wrapperNode: KulArticleNode = {
                children: [],
                id: '',
                value: 'CSS Variables',
            };
            docStyles?.forEach((style) => {
                const styleNode: KulArticleNode = {
                    children: [
                        {
                            cssStyle: DOC_STYLES.monoPrimaryContent,
                            id: '',
                            tagName: 'strong',
                            value: style.name,
                        },
                        { id: '', value: `: ${style.docs}` },
                    ],
                    id: '',
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
    create = {
        paragraph: {
            asBulletListEntry: (
                title: string,
                children: { title: string; description: string }[]
            ): KulArticleNode => {
                const c = [];
                children.forEach((child) => {
                    c.push({
                        id: DOC_IDS.content,
                        value: '- ',
                    });
                    c.push({
                        cssStyle: DOC_STYLES.monoPrimaryContent,
                        id: DOC_IDS.content,
                        tagName: 'strong',
                        value: child.title,
                    });
                    c.push({
                        id: DOC_IDS.content,
                        value: child.description,
                    });
                });
                return {
                    children: c,
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
                    args.forEach((a, index) => {
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
                    args.forEach((a) => {
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
                        ...(hasArgs && params()),
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
        },
    };
}
export const SHOWCASE_DOC = new Documentation();

export class DynamicExampleManager {
    #componentsIds: { [index: string]: number } = {};
    styles = {
        custom: [
            '#kul-component { background-color: var(--kul-secondary-color)} ',
            '#kul-component { color: var(--kul-primary-color);} ',
            '#kul-component { border-radius: 8px;} ',
            '#kul-component { box-shadow: 0px 0px 5px var(--kul-shadow-color);} ',
            '#kul-component { transition: all 0.3s ease;} ',
            '#kul-component { opacity: 0.5;} ',
            '#kul-component { text-transform: uppercase;} ',
        ],
        ['state-colors']: [
            '',
            'kul-secondary',
            'kul-info',
            'kul-success',
            'kul-warning',
            'kul-danger',
        ],
        positions: ['', 'kul-top-right', 'kul-bottom-left', 'kul-bottom-right'],
    };

    #getStyle(type: KulShowcaseDynamicExampleType, id: string): string {
        if (this.#componentsIds[id] === undefined) {
            this.#componentsIds[id] = 0;
        }
        if (++this.#componentsIds[id] === this.styles[type].length) {
            this.#componentsIds[id] = 0;
        }
        return this.styles[type][this.#componentsIds[id]];
    }

    custom = {
        get: (id: string) => {
            return this.#getStyle('custom', id);
        },
    };

    position = {
        get: (id: string) => {
            return this.#getStyle('positions', id);
        },
    };

    stateColors = {
        get: (id: string) => {
            return this.#getStyle('state-colors', id);
        },
    };
}
export const SHOWCASE_DYN_EXAMPLES = new DynamicExampleManager();

export function random2digitsNumber() {
    return Math.floor(Math.random() * 99) + 1;
}
