import { h, VNode } from '@stencil/core';
import {
    GenericObject,
    KulDataCyAttributes,
} from '../../../types/GenericTypes';
import {
    KulDataCell,
    KulDataShapes,
} from '../../../managers/kul-data/kul-data-declarations';
import { KulCardAdapter } from '../kul-card-declarations';

export const getShapes = {
    button: (
        buttons: Partial<KulDataCell<'button'>>[],
        eventDispatcher: KulCardAdapter['actions']['dispatchEvent'],
        defaultProps?: Partial<KulDataCell<'button'>>
    ) => {
        const r: VNode[] = [];
        for (let index = 0; buttons && index < buttons.length; index++) {
            const props = buttons[index];
            const toSpread = {};
            if (defaultProps) {
                decorateSpreader(toSpread, defaultProps);
            }
            decorateSpreader(toSpread, props);
            r.push(
                <kul-button
                    data-cy={KulDataCyAttributes.SHAPE}
                    id={`button${index}`}
                    onKul-button-event={(e) => eventDispatcher(e)}
                    {...toSpread}
                ></kul-button>
            );
        }
        return r;
    },
    chart: (
        charts: Partial<KulDataCell<'chart'>>[],
        eventDispatcher: KulCardAdapter['actions']['dispatchEvent'],
        defaultProps?: Partial<KulDataCell<'chart'>>
    ) => {
        const r: VNode[] = [];
        for (let index = 0; charts && index < charts.length; index++) {
            const props = charts[index];
            const toSpread = {};
            if (defaultProps) {
                decorateSpreader(toSpread, defaultProps);
            }
            decorateSpreader(toSpread, props);
            r.push(
                <kul-chart
                    data-cy={KulDataCyAttributes.SHAPE}
                    id={`chart${index}`}
                    onKul-chart-event={(e) => eventDispatcher(e)}
                    {...toSpread}
                ></kul-chart>
            );
        }
        return r;
    },
    chip: (
        chips: Partial<KulDataCell<'chip'>>[],
        eventDispatcher: KulCardAdapter['actions']['dispatchEvent'],
        defaultProps?: Partial<KulDataCell<'chip'>>
    ) => {
        const r: VNode[] = [];
        for (let index = 0; chips && index < chips.length; index++) {
            const props = chips[index];
            const toSpread = {};
            if (defaultProps) {
                decorateSpreader(toSpread, defaultProps);
            }
            decorateSpreader(toSpread, props);
            r.push(
                <kul-chip
                    data-cy={KulDataCyAttributes.SHAPE}
                    id={`chip${index}`}
                    onKul-chip-event={(e) => eventDispatcher(e)}
                    {...toSpread}
                ></kul-chip>
            );
        }
        return r;
    },
    image: (
        images: Partial<KulDataCell<'image'>>[],
        eventDispatcher: KulCardAdapter['actions']['dispatchEvent'],
        defaultProps?: Partial<KulDataCell<'image'>>
    ) => {
        const r: VNode[] = [];
        for (let index = 0; images && index < images.length; index++) {
            const props = images[index];
            const toSpread = {};
            if (defaultProps) {
                decorateSpreader(toSpread, defaultProps);
            }
            decorateSpreader(toSpread, props);
            r.push(
                <kul-image
                    data-cy={KulDataCyAttributes.SHAPE}
                    id={`image${index}`}
                    onKul-image-event={(e) => eventDispatcher(e)}
                    {...toSpread}
                ></kul-image>
            );
        }
        return r;
    },
    text: (text: Partial<KulDataCell<'text'>>[]) => {
        const r: VNode[] = [];
        for (let index = 0; text && index < text.length; index++) {
            const props = text[index].value;
            r.push(<div id={`text${index}`}>{props}</div>);
        }
        return text;
    },
};

const decorateSpreader = (
    toSpread: GenericObject,
    props: Partial<KulDataCell<KulDataShapes>> & {
        htmlProps?: Record<string, any>;
    }
) => {
    if (props.htmlProps) {
        for (const key in props.htmlProps) {
            const prop = props.htmlProps[key];
            if (prop === 'className') {
                toSpread['class'] = prop;
            } else {
                toSpread[key] = prop;
            }
        }
    }
    for (const key in props) {
        const prop = props[key];
        toSpread[key] = prop;
    }
};
