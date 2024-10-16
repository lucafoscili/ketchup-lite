import { h, VNode } from '@stencil/core';
import {
    GenericObject,
    KulDataCyAttributes,
} from '../../../types/GenericTypes';
import {
    KulDataCell,
    KulDataShapes,
} from '../../../managers/kul-data/kul-data-declarations';

export const getShapes = {
    button: (
        buttons: Partial<KulDataCell<'button'>>[],
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
                    {...toSpread}
                ></kul-button>
            );
        }
        return r;
    },
    image: (
        images: Partial<KulDataCell<'image'>>[],
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
