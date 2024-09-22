import {
    KulChatAdapter,
    KulChatChoiceMessage,
    KulChatCompletionObject,
    KulChatSendArguments,
} from '../kul-chat-declarations';

export const send: (
    adapter: KulChatAdapter,
    args: KulChatSendArguments
) => Promise<KulChatChoiceMessage> = async (
    adapter,
    { history, max_tokens, seed, system, temperature, url }
) => {
    const request = {
        temperature,
        max_tokens,
        seed,
        messages: history.map((msg) => ({
            role: msg.role,
            content: msg.content,
        })),
    };

    if (system) {
        request.messages.unshift({
            role: 'system',
            content: system,
        });
    }

    try {
        const response = await callLLM(request, url);
        const message = response.choices?.[0]?.message?.content;
        adapter.set.status.usage(response.usage);
        const llmMessage: KulChatChoiceMessage = {
            role: 'llm',
            content: message,
        };
        adapter;
        return llmMessage;
    } catch (error) {
        console.error('Error calling LLM:', error);
        return undefined;
    }
};

const callLLM: (
    request: Record<string, unknown>,
    url: string
) => Promise<KulChatCompletionObject> = async (request, url) => {
    try {
        const response = await fetch(`${url}/v1/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error calling LLM:', error);
        throw error;
    }
};
