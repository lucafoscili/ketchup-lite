import { KulArticleDataset } from "../../../kul-article/kul-article-declarations";
import { PARAGRAPH_FACTORY } from "../../helpers/kul-showcase-paragraph";
import { DOC_IDS, DOC_NODES } from "../../kul-showcase-data";

export const THEME_DATA: KulArticleDataset = {
  nodes: [
    {
      id: DOC_IDS.root,
      value: "KulTheme",
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
                  value: "KulTheme",
                },
                {
                  id: DOC_IDS.content,
                  value:
                    " is the central theme manager for the Ketchup Lite library. It controls CSS variables, fonts, and icons for various visual components to ensure a cohesive look and feel across the entire library.",
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
                    "With KulTheme, developers can switch themes, manage CSS variables, define custom icons, and adjust other visual aspects dynamically.",
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
            PARAGRAPH_FACTORY.asBulletListEntry("KulThemeElement", [
              {
                title: "cssVariables",
                description:
                  ": Contains the CSS variables used to define theme colors, sizes, and other visual aspects.",
              },
              {
                title: "icons",
                description:
                  ": Defines the paths to icons used throughout the library.",
              },
              {
                title: "isDark",
                description:
                  ": Boolean flag to indicate if the theme is dark or light.",
              },
              {
                title: "font?",
                description:
                  ": Optional list of fonts associated with this theme.",
              },
              {
                title: "customStyles?",
                description:
                  ": Optional styles that can be applied to components within the theme.",
              },
            ]),
            DOC_NODES.hiddenSeparator,
            PARAGRAPH_FACTORY.asBulletListEntry("KulThemeCSSVariables", [
              {
                title: "Color Variables",
                description:
                  ": A list of CSS color variables (e.g., PRIMARY, SECONDARY) used across the theme.",
              },
              {
                title: "--kul-header-height",
                description: ": Defines the height of the header component.",
              },
              {
                title: "--kul-drawer-width",
                description: ": Defines the width of the drawer component.",
              },
            ]),
            DOC_NODES.hiddenSeparator,
            PARAGRAPH_FACTORY.asBulletListEntry("KulThemeFonts", [
              {
                title: "ABEL",
                description:
                  ": A font choice available for use in the KulTheme.",
              },
              {
                title: "UBUNTU",
                description:
                  ": A different font choice providing a distinctive visual feel.",
              },
            ]),
          ],
        },
        {
          id: DOC_IDS.section,
          value: "Available APIs",
          children: [
            PARAGRAPH_FACTORY.asListEntry(
              "set",
              "Sets a new theme by name and updates all managed components.",
              [
                {
                  name: "name",
                  type: "string",
                  description: "The name of the theme to apply.",
                },
                {
                  name: "list?",
                  type: "KulThemeJSON",
                  description: "Optional custom theme list to use.",
                },
              ],
            ),
            DOC_NODES.hiddenSeparator,
            PARAGRAPH_FACTORY.asListEntry(
              "getThemes",
              "Retrieves the list of available themes.",
              [],
            ),
            DOC_NODES.hiddenSeparator,
            PARAGRAPH_FACTORY.asListEntry(
              "refresh",
              "Refreshes the current theme, reapplying all CSS variables and icons.",
              [],
            ),
            DOC_NODES.hiddenSeparator,
            PARAGRAPH_FACTORY.asListEntry(
              "register",
              "Registers a new component to be managed by KulTheme.",
              [
                {
                  name: "comp",
                  type: "KulComponent<KulComponentName>",
                  description:
                    "The component to be registered for theme management.",
                },
              ],
            ),
            DOC_NODES.hiddenSeparator,
            PARAGRAPH_FACTORY.asListEntry(
              "unregister",
              "Removes a component from theme management.",
              [
                {
                  name: "comp",
                  type: "KulComponent<KulComponentName>",
                  description: "The component to unregister.",
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
                  value: "Applying a Theme:",
                },
                DOC_NODES.hiddenSeparator,
                {
                  cells: {
                    kulCode: {
                      shape: "code",
                      value:
                        "const kulTheme = new KulTheme();\nkulTheme.set('dark');",
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
                  value: "Registering a Component for Theme Updates:",
                },
                DOC_NODES.hiddenSeparator,
                {
                  cells: {
                    kulCode: {
                      shape: "code",
                      value:
                        "const kulTheme = new KulTheme();\nconst component = document.querySelector('#myComponent');\nkulTheme.register(component);",
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
