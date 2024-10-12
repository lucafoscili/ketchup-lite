import { h, VNode } from '@stencil/core';
import { KulDataCyAttributes } from '../../../types/GenericTypes';
import { KulButtonPropsInterface } from '../../kul-button/kul-button-declarations';
import { KulDataCell } from '../../../managers/kul-data/kul-data-declarations';
import { KulImagePropsInterface } from '../../kul-image/kul-image-declarations';

export const getShapes = {
    buttons: (
        buttons: Partial<KulButtonPropsInterface>[],
        extraProps?: Partial<KulButtonPropsInterface>[]
    ) => {
        const r: VNode[] = [];
        for (let index = 0; buttons && index < buttons.length; index++) {
            const b = buttons[index];
            r.push(
                <kul-button
                    data-cy={KulDataCyAttributes.SHAPE}
                    id={`button${index}`}
                    {...b}
                    {...extraProps}
                ></kul-button>
            );
        }
        return r;
    },
    image: (
        images: Partial<KulImagePropsInterface>[],
        extraProps?: Partial<KulImagePropsInterface>[]
    ) => {
        const r: VNode[] = [];
        for (let index = 0; images && index < images.length; index++) {
            const i = images[index];
            r.push(
                <kul-image
                    data-cy={KulDataCyAttributes.SHAPE}
                    id={`image${index}`}
                    {...i}
                    {...extraProps}
                ></kul-image>
            );
        }
        return r;
    },
    text: (text: Partial<KulDataCell<'text'>>[]) => {
        const r: VNode[] = [];
        for (let index = 0; text && index < text.length; index++) {
            const t = text[index].value;
            r.push(<div id={`text${index}`}>{t}</div>);
        }
        return text;
    },
};
