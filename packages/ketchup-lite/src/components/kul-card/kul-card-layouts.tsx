import { h, VNode } from '@stencil/core';
import { KulDataShapesMap } from '../../components';
import { KulCard } from './kul-card';
import { kulManagerInstance } from '../../managers/kul-manager/kul-manager';
import { RIPPLE_SURFACE_CLASS } from '../../variables/GenericVariables';
import { KulCardCSSClasses } from './kul-card-declarations';
import { KulDataCyAttributes } from '../../types/GenericTypes';

export function getLayoutA(component: KulCard, shapes: KulDataShapesMap = {}) {
    // Button
    const hasButtons = !!shapes.button;
    const actions = hasButtons
        ? shapes.button.map((button, index) => {
              return (
                  <kul-button
                      data-cy={KulDataCyAttributes.SHAPE}
                      id={`button${index}`}
                      {...button}
                  ></kul-button>
              );
          })
        : undefined;
    // Image
    const hasImages = !!shapes.image;
    const cover: VNode = hasImages ? (
        <div class="section-1">
            <kul-image
                class={'kul-cover'}
                data-cy={KulDataCyAttributes.SHAPE}
                id="image1"
                {...shapes.image[0]}
                kulSizeX="100%"
                kulSizeY="100%"
            ></kul-image>
        </div>
    ) : null;
    // Text
    const hasText = !!shapes.text;
    const title =
        hasText && shapes.text[0] ? (
            <div class="sub-2 title" id="text1">
                <div>{shapes.text[0]}</div>
            </div>
        ) : undefined;
    const subtitle =
        hasText && shapes.text[1] ? (
            <div class="sub-2 subtitle" id="text2">
                <div>{shapes.text[1]}</div>
            </div>
        ) : undefined;
    const description =
        hasText && shapes.text[2] ? (
            <div class="sub-2 description" id="text3">
                <div>{shapes.text[2]}</div>
            </div>
        ) : undefined;
    return (
        <div
            class={`layout-${component.kulLayout} ${
                hasButtons ? KulCardCSSClasses.HAS_ACTIONS : ''
            }`}
        >
            <div
                class={RIPPLE_SURFACE_CLASS}
                data-cy={KulDataCyAttributes.RIPPLE}
                onPointerDown={(e) => {
                    kulManagerInstance().theme.ripple.trigger(
                        e as PointerEvent,
                        e.currentTarget as HTMLElement
                    );
                }}
            >
                {cover}
                <div class="section-2">
                    {title}
                    {subtitle}
                    {description}
                </div>
            </div>
            {hasButtons ? <div class="section-3">{actions}</div> : null}
        </div>
    );
}
