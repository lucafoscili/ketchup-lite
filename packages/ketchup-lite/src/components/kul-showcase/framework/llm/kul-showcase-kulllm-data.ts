import { KulArticleDataset } from "../../../kul-article/kul-article-declarations";
import { PARAGRAPH_FACTORY } from "../../helpers/kul-showcase-paragraph";
import { DOC_IDS, DOC_NODES } from "../../kul-showcase-data";

export const LLM_DATA: KulArticleDataset = {
  nodes: [
    {
      id: DOC_IDS.root,
      value: "KulLLM",
      children: [
        {
          id: DOC_IDS.section,
          value: "Overview",
          children: [
            {
              children: [
                {
                  id: DOC_IDS.content,
                  tagName: "strong",
                  value: "KulLLM",
                },
                {
                  id: DOC_IDS.content,
                  value:
                    " provides utilities to interact with language models, including sending requests for completions, polling results, and handling speech-to-text.",
                },
              ],
              id: DOC_IDS.paragraph,
              value: "",
            },
            {
              children: [
                {
                  id: DOC_IDS.content,
                  value:
                    "KulLLM is designed to facilitate interactions with AI models, such as OpenAI's GPT, enabling developers to integrate natural language processing features into their applications.",
                },
              ],
              id: DOC_IDS.paragraph,
              value: "",
            },
          ],
        },
        {
          id: DOC_IDS.section,
          value: "Basic Types",
          children: [
            PARAGRAPH_FACTORY.asBulletListEntry("KulLLMChoice", [
              {
                title: "index (number)",
                description: ": Index of the choice in the response.",
              },
              {
                title: "message (KulLLMChoiceMessage)",
                description: ": The message generated by the LLM.",
              },
              {
                title: "finish_reason (string)",
                description: ": The reason why the generation was finished.",
              },
            ]),
            DOC_NODES.hiddenSeparator,
            PARAGRAPH_FACTORY.asBulletListEntry("KulLLMRequest", [
              {
                title: "model (string)",
                description: ": The model ID to use for generation.",
              },
              {
                title: "prompt (string)",
                description: ": The input prompt for generating a completion.",
              },
              {
                title: "max_tokens (number)",
                description:
                  ": Maximum number of tokens to generate in the completion.",
              },
              {
                title: "temperature (number)",
                description:
                  ": Controls randomness in generation. Higher values increase diversity.",
              },
            ]),
            DOC_NODES.hiddenSeparator,
            PARAGRAPH_FACTORY.asBulletListEntry("KulLLMRole", [
              {
                title: "system",
                description: ": Represents the AI system role.",
              },
              {
                title: "user",
                description: ": Represents the end-user sending the input.",
              },
              {
                title: "assistant",
                description:
                  ": Represents the AI assistant generating responses.",
              },
            ]),
          ],
        },
        {
          id: DOC_IDS.section,
          value: "Available APIs",
          children: [
            PARAGRAPH_FACTORY.asListEntry(
              "fetch",
              "Sends a request to the specified language model API endpoint for completion.",
              [
                {
                  name: "request",
                  type: "KulLLMRequest",
                  description:
                    "The request payload containing model, prompt, and other parameters.",
                },
                {
                  name: "url",
                  type: "string",
                  description: "The API endpoint URL.",
                },
              ],
            ),
            DOC_NODES.hiddenSeparator,
            PARAGRAPH_FACTORY.asListEntry(
              "poll",
              "Polls the specified URL for responses.",
              [
                {
                  name: "url",
                  type: "string",
                  description: "The URL to poll for data.",
                },
              ],
            ),
            DOC_NODES.hiddenSeparator,
            PARAGRAPH_FACTORY.asListEntry(
              "speechToText",
              "Handles speech-to-text conversion using browser APIs.",
              [
                {
                  name: "textarea",
                  type: "HTMLKulTextfieldElement",
                  description:
                    "The text area to fill with the recognized speech.",
                },
                {
                  name: "button",
                  type: "HTMLKulButtonElement",
                  description: "The button to control speech recognition.",
                },
              ],
            ),
          ],
        },
        {
          id: DOC_IDS.section,
          value: "Examples",
          children: [
            {
              children: [
                {
                  id: DOC_IDS.content,
                  value: "Sending a Request to the LLM:",
                },
                DOC_NODES.hiddenSeparator,
                {
                  cells: {
                    kulCode: {
                      shape: "code",
                      value:
                        "const kulLLM = new KulLLM();\nconst request = { model: 'gpt-3.5-turbo', prompt: 'Tell me a joke.', max_tokens: 50 };\nconst url = 'https://api.openai.com';\nkulLLM.fetch(request, url).then(response => console.log(response));",
                    },
                  },
                  id: DOC_IDS.content,
                },
              ],
              id: DOC_IDS.paragraph,
              value: "",
            },
            {
              children: [
                {
                  id: DOC_IDS.content,
                  value: "Using Speech-to-Text:",
                },
                DOC_NODES.hiddenSeparator,
                {
                  cells: {
                    kulCode: {
                      shape: "code",
                      value:
                        "const kulLLM = new KulLLM();\nconst textarea = document.querySelector('#speechTextArea');\nconst button = document.querySelector('#startSpeechButton');\nbutton.addEventListener('click', () => kulLLM.speechToText(textarea, button));",
                    },
                  },
                  id: DOC_IDS.content,
                },
              ],
              id: DOC_IDS.paragraph,
              value: "",
            },
          ],
        },
      ],
    },
  ],
};
