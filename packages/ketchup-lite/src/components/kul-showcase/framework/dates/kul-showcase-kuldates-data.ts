import { KulArticleDataset } from "../../../kul-article/kul-article-declarations";
import { PARAGRAPH_FACTORY } from "../../helpers/kul-showcase-paragraph";
import { DOC_IDS, DOC_NODES } from "../../kul-showcase-data";

export const DATES_DOC: KulArticleDataset = {
  nodes: [
    {
      id: DOC_IDS.root,
      value: "KulDates",
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
                  value: "KulDates",
                },
                {
                  id: DOC_IDS.content,
                  value:
                    " is the date management utility for the Ketchup Lite library. It provides powerful APIs for handling localization, formatting, and normalization of dates, times, and timestamps.",
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
                    "KulDates uses the Day.js library for its core date-handling logic and extends it with functionality for managing locales, formatting dates, and more.",
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
            PARAGRAPH_FACTORY.asBulletListEntry("KulDatesNormalize", [
              {
                title: "DATE",
                description:
                  ": Normalizes the input to a standard date format.",
              },
              {
                title: "TIME",
                description:
                  ": Normalizes the input to a standard time format.",
              },
              {
                title: "TIMESTAMP",
                description: ": Normalizes the input to a Unix timestamp.",
              },
            ]),
            DOC_NODES.hiddenSeparator,
            PARAGRAPH_FACTORY.asBulletListEntry("KulDatesLocales", [
              {
                title: "CHINESE (cn)",
                description: ": Sets the locale to Chinese.",
              },
              {
                title: "ENGLISH (en)",
                description: ": Sets the locale to English.",
              },
              {
                title: "FRENCH (fr)",
                description: ": Sets the locale to French.",
              },
              {
                title: "ITALIAN (it)",
                description: ": Sets the locale to Italian.",
              },
              {
                title: "POLISH (pl)",
                description: ": Sets the locale to Polish.",
              },
              {
                title: "RUSSIAN (ru)",
                description: ": Sets the locale to Russian.",
              },
              {
                title: "SPANISH (es)",
                description: ": Sets the locale to Spanish.",
              },
            ]),
          ],
        },
        {
          id: DOC_IDS.section,
          value: "Available APIs",
          children: [
            PARAGRAPH_FACTORY.asListEntry(
              "setLocale",
              "Sets the locale for the KulDates instance.",
              [
                {
                  name: "locale",
                  type: "KulDatesLocales",
                  description: "The locale to set for date formatting.",
                },
              ],
            ),
            DOC_NODES.hiddenSeparator,
            PARAGRAPH_FACTORY.asListEntry(
              "getLocale",
              "Returns the current locale being used by KulDates.",
            ),
            DOC_NODES.hiddenSeparator,
            PARAGRAPH_FACTORY.asListEntry(
              "getDateFormat",
              "Returns the current date format based on the locale.",
            ),
            DOC_NODES.hiddenSeparator,
            PARAGRAPH_FACTORY.asListEntry(
              "getTimeFormat",
              "Returns the current time format based on the locale.",
              [
                {
                  name: "manageSeconds",
                  type: "boolean",
                  description:
                    "Specifies whether to include seconds in the time format.",
                },
              ],
            ),
            DOC_NODES.hiddenSeparator,
            PARAGRAPH_FACTORY.asListEntry(
              "format",
              "Formats a given date input based on the specified format or locale default.",
              [
                {
                  name: "input",
                  type: "dayjs.ConfigType",
                  description: "The date input to format.",
                },
                {
                  name: "format?",
                  type: "string",
                  description: "Optional format to use for output.",
                },
              ],
            ),
            DOC_NODES.hiddenSeparator,
            PARAGRAPH_FACTORY.asListEntry(
              "isValid",
              "Validates if the given date input matches the provided format.",
              [
                {
                  name: "date",
                  type: "dayjs.ConfigType",
                  description: "The date input to validate.",
                },
                {
                  name: "format?",
                  type: "string",
                  description: "Optional format to validate against.",
                },
                {
                  name: "strict?",
                  type: "boolean",
                  description: "If true, strict parsing is applied.",
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
                  value: "Formatting a Date:",
                },
                DOC_NODES.hiddenSeparator,
                {
                  cells: {
                    kulCode: {
                      shape: "code",
                      value:
                        "const kulDates = new KulDates('en');\nconst formattedDate = kulDates.format('2024-11-03', 'YYYY-MM-DD');\nconsole.log(formattedDate);  // Output: '2024-11-03'",
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
                  value: "Setting Locale to Italian:",
                },
                DOC_NODES.hiddenSeparator,
                {
                  cells: {
                    kulCode: {
                      shape: "code",
                      value:
                        "const kulDates = new KulDates();\nkulDates.setLocale('it');\nconsole.log(kulDates.getLocale());  // Output: 'it'",
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
