import { h } from '@stencil/core';

import {
  KulButtonEventPayload,
  KulButtonStyling,
} from '../../kul-button/kul-button-declarations';
import { KulMasonryAdapter } from '../kul-masonry-declarations';

const STYLING: KulButtonStyling = 'floating';

const MASONRY_ICON = 'view_quilt';
const HORIZONTAL_ICON = 'view_column';
const MINUS_ICON = 'remove';
const PLUS_ICON = 'plus';
const VERTICAL_ICON = 'view_day';

const buttonHandler = (
  adapter: KulMasonryAdapter,
  e: CustomEvent<KulButtonEventPayload>,
) => {
  const { eventType, id } = e.detail;

  switch (eventType) {
    case 'click':
      switch (id) {
        case MASONRY_ICON:
          adapter.actions.changeView();
          break;
        case MINUS_ICON:
          adapter.actions.removeColumn();
          break;
        case PLUS_ICON:
          adapter.actions.addColumn();
          break;
      }
      break;
  }
};

export const ACTIONS = {
  masonry: {
    add: (adapter: KulMasonryAdapter) => {
      return (
        <kul-button
          class={'grid__add-column kul-slim'}
          id={PLUS_ICON}
          key={PLUS_ICON}
          kulIcon={PLUS_ICON}
          kulStyling={STYLING}
          onKul-button-event={buttonHandler.bind(buttonHandler, adapter)}
          ref={(el) => {
            if (el) {
              adapter.components.buttons.addColumn = el;
            }
          }}
          title="Click to add a column to the masonry."
        ></kul-button>
      );
    },
    remove: (adapter: KulMasonryAdapter) => {
      return (
        <kul-button
          class={'grid__remove-column kul-slim'}
          id={MINUS_ICON}
          key={MINUS_ICON}
          kulIcon={MINUS_ICON}
          kulStyling={STYLING}
          onKul-button-event={buttonHandler.bind(buttonHandler, adapter)}
          ref={(el) => {
            if (el) {
              adapter.components.buttons.removeColumn = el;
            }
          }}
          title="Click to remove a column from the masonry."
        ></kul-button>
      );
    },
  },
  changeView: (adapter: KulMasonryAdapter) => {
    return (
      <kul-button
        class={'grid__change-view'}
        id={MASONRY_ICON}
        key={MASONRY_ICON}
        kulIcon={
          adapter.isMasonry()
            ? VERTICAL_ICON
            : adapter.isVertical()
              ? HORIZONTAL_ICON
              : MASONRY_ICON
        }
        kulStyling={STYLING}
        onKul-button-event={buttonHandler.bind(buttonHandler, adapter)}
        ref={(el) => {
          if (el) {
            adapter.components.buttons.changeView = el;
          }
        }}
        title={
          adapter.isMasonry()
            ? 'Click to view the images arranged vertically.'
            : adapter.isVertical()
              ? 'Click to view the images arranged horizontally.'
              : 'Click to view the images arranged in a masonry.'
        }
      ></kul-button>
    );
  },
};
