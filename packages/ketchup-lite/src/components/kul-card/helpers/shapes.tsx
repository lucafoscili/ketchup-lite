import { h, VNode } from '@stencil/core';
import {
    GenericObject,
    KulComponent,
    KulComponentName,
    KulDataCyAttributes,
    KulEventPayload,
    KulEventType,
} from '../../../types/GenericTypes';
import {
    KulDataCell,
    KulDataShapes,
} from '../../../managers/kul-data/kul-data-declarations';
import { KulCardAdapter } from '../kul-card-declarations';

type ShapeCallback<
    C extends KulComponentName,
    S extends KulDataShapes | 'text',
> = S extends 'text'
    ? never
    : (
          e: CustomEvent<KulEventPayload<C, KulEventType<KulComponent<C>>>>
      ) => void;

export const getShapes = <
    C extends KulComponentName,
    S extends KulDataShapes | 'text',
>(
    _component: C,
    shape: S,
    items: Partial<KulDataCell<S>>[],
    eventDispatcher: KulCardAdapter['actions']['dispatchEvent'],
    defaultProps?: Partial<KulDataCell<S>>,
    defaultCb?: S extends 'text' ? never : ShapeCallback<C, S>
): VNode[] => {
    const r: VNode[] = [];

    switch (shape) {
        case 'text':
            for (let index = 0; items && index < items.length; index++) {
                const props = items[index].value;
                r.push(<div id={`text${index}`}>{props}</div>);
            }
            return r;

        default:
            for (let index = 0; items && index < items.length; index++) {
                const props = items[index];
                const toSpread = {};
                if (defaultProps) {
                    decorateSpreader(
                        toSpread,
                        defaultProps as Partial<KulDataCell<KulDataShapes>>
                    );
                }
                decorateSpreader(
                    toSpread,
                    props as Partial<KulDataCell<KulDataShapes>>
                );

                const TagName = 'kul-' + shape;
                const eventHandler = {
                    ['onKul-' + shape + '-event']: (
                        e: CustomEvent<
                            KulEventPayload<C, KulEventType<KulComponent<C>>>
                        >
                    ) => {
                        if (defaultCb) {
                            defaultCb(e);
                        }
                        eventDispatcher(e);
                    },
                };

                r.push(
                    <TagName
                        data-cy={KulDataCyAttributes.SHAPE}
                        id={`${shape}${index}`}
                        {...eventHandler}
                        {...toSpread}
                    ></TagName>
                );
            }
            break;
    }

    return r;
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
