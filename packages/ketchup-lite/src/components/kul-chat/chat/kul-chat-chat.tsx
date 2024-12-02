import { Fragment, h } from '@stencil/core';

import { KulChatAdapter } from '../kul-chat-declarations';
import { prepButtons, prepInputArea } from './kul-chat-input';
import { prepMessages } from './kul-chat-messages';

//#region prepChat
export const prepChat = (adapter: KulChatAdapter) => {
  return (
    <Fragment>
      <div class="chat__request">
        {prepInputArea(adapter)}
        {prepButtons(adapter)}
      </div>
      <div class={`chat__messages`}>{prepMessages(adapter)}</div>
      <div class="chat__spinner-bar">
        <kul-spinner
          kulBarVariant={true}
          ref={(el) => {
            if (el) {
              adapter.components.spinner = el;
            }
          }}
        ></kul-spinner>
      </div>
    </Fragment>
  );
};
//#endregion
