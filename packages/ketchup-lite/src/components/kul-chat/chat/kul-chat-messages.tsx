import { h, VNode } from "@stencil/core";

import { KulLLMChoiceMessage } from "../../../managers/kul-llm/kul-llm-declarations";
import { KulChatAdapter } from "../kul-chat-declarations";

export const prepMessages = (adapter: KulChatAdapter) => {
  const elements: VNode[] = [];
  const history = adapter.get.history();
  const toolbarMessage = adapter.get.status.toolbarMessage();

  if (history?.length > 0) {
    history.forEach((m) => {
      const element = (
        <div
          class={`chat__messages__container chat__messages__container--${m.role}`}
          onPointerEnter={() => adapter.set.status.toolbarMessage(m)}
          onPointerLeave={() => adapter.set.status.toolbarMessage(null)}
        >
          <div
            class={`chat__messages__content chat__messages__content--${m.role}`}
          >
            {prepContent(m)}
          </div>
          {m === toolbarMessage ? prepToolbar(adapter, m) : null}
        </div>
      );
      elements.push(element);
    });
  } else {
    elements.push(
      <div class="chat__messages__empty">Your chat history is empty!</div>,
    );
  }

  return elements;
};

export const prepToolbar = (
  adapter: KulChatAdapter,
  m: KulLLMChoiceMessage,
) => {
  const cssClass = "chat__messages__toolbar__button kul-slim";
  return (
    <div class="chat__messages__toolbar">
      <kul-button
        class={cssClass + " kul-danger"}
        kulIcon="delete"
        onClick={() => adapter.actions.delete(m)}
        title="Remove this message from history."
      ></kul-button>
      <kul-button
        class={cssClass}
        kulIcon="content_copy"
        onClick={() => navigator.clipboard.writeText(m.content)}
        title="Copy text to clipboard."
      ></kul-button>
      {m.role === "user" ? (
        <kul-button
          class={cssClass}
          kulIcon="refresh"
          onClick={() => adapter.actions.regenerate(m)}
          title="Regenerate answer to this question."
        ></kul-button>
      ) : null}
    </div>
  );
};

export const prepContent = (message: KulLLMChoiceMessage): VNode[] => {
  const elements: VNode[] = [];
  const messageContent = message.content;

  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
  let lastIndex = 0;

  let match: RegExpExecArray | null;
  while ((match = codeBlockRegex.exec(messageContent)) !== null) {
    if (match.index > lastIndex) {
      const textPart = messageContent.slice(lastIndex, match.index);
      elements.push(<div class="paragraph">{textPart}</div>);
    }

    const language = match[1] ? match[1].trim() : "text";
    const codePart = match[2].trim();

    elements.push(
      <kul-code
        class={"code"}
        kulLanguage={language}
        kulValue={codePart}
      ></kul-code>,
    );

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < messageContent.length) {
    const remainingText = messageContent.slice(lastIndex);
    elements.push(<div class="paragraph">{remainingText}</div>);
  }

  return elements;
};
