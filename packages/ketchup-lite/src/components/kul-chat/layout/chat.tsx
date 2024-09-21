import { Fragment, h, VNode } from '@stencil/core';
import { KulChatAdapter, KulChatChoiceMessage } from '../kul-chat-declarations';

export const prepChat = (adapter: KulChatAdapter) => {
    const nodes: VNode[] = [];
    const history = adapter.get.history();

    if (history?.length > 0) {
        history.forEach((m) => {
            nodes.push(
                <div class={`message-container message-container--${m.role}`}>
                    {prepMessage(adapter, m)}
                </div>
            );
        });
    } else {
        nodes.push(<div class="empty">Your chat history is empty!</div>);
    }

    return nodes;
};

export const prepMessage = (
    adapter: KulChatAdapter,
    m: KulChatChoiceMessage
) => {
    const cssClass = 'kul-slim toolbar__button';
    return (
        <Fragment>
            <div class={m.role}>{prepContent(m)}</div>
            <div class="toolbar">
                <kul-button
                    class={cssClass + ' kul-danger'}
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
                {m.role === 'user' ? (
                    <kul-button
                        class={cssClass}
                        kulIcon="refresh"
                        onClick={() => adapter.actions.regenerate(m)}
                        title="Regenerate answer to this question."
                    ></kul-button>
                ) : null}
            </div>
        </Fragment>
    );
};

export const prepContent = (message: KulChatChoiceMessage): VNode[] => {
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

        const language = match[1] ? match[1].trim() : 'text';
        const codePart = match[2].trim();

        elements.push(
            <kul-code
                class={'code'}
                kulLanguage={language}
                kulValue={codePart}
            ></kul-code>
        );

        lastIndex = match.index + match[0].length;
    }

    if (lastIndex < messageContent.length) {
        const remainingText = messageContent.slice(lastIndex);
        elements.push(<div class="paragraph">{remainingText}</div>);
    }

    return elements;
};
