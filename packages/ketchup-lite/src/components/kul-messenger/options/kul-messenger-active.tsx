import { Fragment, h } from '@stencil/core';

import { OPTION_TYPE_IDS } from '../kul-messenger-constants';
import { KulMessengerAdapter } from '../kul-messenger-declarations';

export const prepOptions = (adapter: KulMessengerAdapter) => {
  return OPTION_TYPE_IDS.map((options) => {
    const image = adapter.get.image.asCover(options);
    const isEnabled = adapter.get.messenger.ui().options[options];
    const option = options.slice(0, -1);
    return (
      <div class="messenger__options__wrapper">
        {image.node ? (
          <Fragment>
            <img
              class={`messenger__options__cover`}
              alt={image.title}
              src={image.value}
            ></img>
            <div
              class={`messenger__options__blocker ${!isEnabled ? 'messenger__options__blocker--active' : ''}`}
              onClick={() =>
                adapter.set.messenger.ui.options(!isEnabled, options)
              }
            >
              <kul-image
                kulValue={`${isEnabled ? 'touch_app' : 'block'}`}
              ></kul-image>
              <div class={`messenger__options__blocker__label`}>
                {isEnabled ? 'Click to disable' : 'Click to enable'}
              </div>
            </div>
          </Fragment>
        ) : (
          <kul-image
            class={`messenger__options__placeholder`}
            kulValue={image.value}
            title={`No ${option} selected.`}
          ></kul-image>
        )}
        <div class="messenger__options__name">
          <div class="messenger__options__label" title={`Active ${option}.`}>
            {option}
          </div>
          {image.title ? (
            <kul-image
              class={`messenger__options__info`}
              kulSizeX="16px"
              kulSizeY="16px"
              kulValue="information-variant"
              title={image.title}
            ></kul-image>
          ) : undefined}
        </div>
      </div>
    );
  });
};
