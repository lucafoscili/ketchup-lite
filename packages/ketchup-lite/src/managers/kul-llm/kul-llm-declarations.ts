export interface KulLLMChoice {
  index: number;
  message: KulLLMChoiceMessage;
  finish_reason: string;
}
export interface KulLLMChoiceMessage {
  role: KulLLMRole;
  content: string;
  tool_calls?: unknown[];
}

export interface KulLLMCompletionObject {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: KulLLMChoice[];
}

/**
 * Interface representing the standard request JSON for the OpenAI API.
 *
 * @typedef {Object} OpenAIRquest
 * @property {string} model - The ID of the model to use for generation. This is typically required.
 * @property {string} [prompt] - The input text to generate completions for. If using the `messages` array, this might not be needed.
 * @property {string} [suffix] - A continuation of the prompt after the completion.
 * @property {number} [max_tokens] - The maximum number of tokens to generate.
 * @property {number} [temperature] - Controls randomness in generation. Higher values increase randomness.
 * @property {number} [top_p] - Alternative way of specifying sampling strategy.
 * @property {number} [n] - Number of completions to generate.
 * @property {boolean} [stream] - Whether to stream the response.
 * @property {number|number[]} [logprobs] - Include the log probabilities on the logit lens.
 * @property {boolean} [echo] - Echo back the prompt in addition to the completion.
 * @property {string|string[]} [stop] - Up to four sequences where the API will stop generating further tokens.
 * @property {number} [presence_penalty] - Controls repetition in generation.
 * @property {number} [frequency_penalty] - Controls repetition in generation.
 * @property {number} [best_of] - Generates best_of completions server-side and returns the top result.
 * @property {Record<string, number>} [logit_bias] - Modify the likelihood of certain tokens appearing next.
 * @property {string} [user] - A unique identifier representing your end-user.
 * @property {string} [system] - A string describing the role and purpose of the AI system.
 * @property {Array<{role: 'system' | 'user' | 'assistant', content: string}>} [messages] - An array of message objects, each containing a `role` and `content`.
 */
export interface KulLLMRequest {
  model?: string;
  prompt?: string;
  suffix?: string;
  max_tokens?: number;
  temperature?: number;
  top_p?: number;
  n?: number;
  stream?: boolean;
  logprobs?: number | number[];
  echo?: boolean;
  seed?: number;
  stop?: string | string[];
  presence_penalty?: number;
  frequency_penalty?: number;
  best_of?: number;
  logit_bias?: Record<string, number>;
  user?: string;
  system?: string;
  messages?: Array<{
    role: KulLLMRole;
    content: string;
  }>;
}

export type KulLLMRole = "system" | "user" | "assistant";

export interface KulLLMUsage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}
