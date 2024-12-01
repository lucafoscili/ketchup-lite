import { KulArticleDataset } from '../../../kul-article/kul-article-declarations';
import { PARAGRAPH_FACTORY } from '../../helpers/kul-showcase-paragraph';
import { DOC_IDS, DOC_NODES } from '../../kul-showcase-data';

export const DEBUG_DATA: KulArticleDataset = {
  nodes: [
    {
      id: DOC_IDS.root,
      value: 'KulDebug',
      children: [
        {
          id: DOC_IDS.section,
          value: 'Overview',
          children: [
            {
              children: [
                {
                  id: DOC_IDS.content,
                  tagName: 'strong',
                  value: 'KulDebug',
                },
                {
                  id: DOC_IDS.content,
                  value:
                    ' is the debugging utility for the Ketchup Lite library. It provides tools to monitor, log, and analyze the component lifecycle and other aspects of the application.',
                },
              ],
              id: DOC_IDS.paragraph,
              value: '',
            },
            {
              children: [
                {
                  id: DOC_IDS.content,
                  value:
                    "KulDebug allows developers to track component rendering, handle log messages, and manage debug sessions for improved insight into the system's inner workings.",
                },
              ],
              id: DOC_IDS.paragraph,
              value: '',
            },
          ],
        },
        {
          id: DOC_IDS.section,
          value: 'Basic Types',
          children: [
            PARAGRAPH_FACTORY.asBulletListEntry('KulDebugLifecycleInfo', [
              {
                title: 'endTime (number)',
                description: ': Timestamp for the end of the lifecycle event.',
              },
              {
                title: 'renderCount (number)',
                description:
                  ': The number of times the component has rendered.',
              },
              {
                title: 'renderEnd (number)',
                description: ': Timestamp when the rendering completed.',
              },
              {
                title: 'renderStart (number)',
                description: ': Timestamp when the rendering started.',
              },
              {
                title: 'startTime (number)',
                description:
                  ': Timestamp for the start of the lifecycle event.',
              },
            ]),
            DOC_NODES.hiddenSeparator,
            PARAGRAPH_FACTORY.asBulletListEntry('KulDebugLog', [
              {
                title: 'category (KulDebugCategory)',
                description:
                  ': The category of the log message, e.g., informational, warning, error.',
              },
              {
                title: 'class (KulDebugLogClass)',
                description:
                  ': The component or class associated with the log.',
              },
              {
                title: 'date (Date)',
                description: ': The timestamp of the log message.',
              },
              {
                title: 'id (string)',
                description: ': Unique identifier for the log entry.',
              },
              {
                title: 'message (string)',
                description: ': The actual log message.',
              },
              {
                title: 'type (KulDebugLogType)',
                description: ': Type of the log, e.g., load, render, resize.',
              },
            ]),
            DOC_NODES.hiddenSeparator,
            PARAGRAPH_FACTORY.asBulletListEntry('KulDebugCategory', [
              {
                title: 'informational',
                description: ': Represents informational log messages.',
              },
              {
                title: 'warning',
                description:
                  ': Represents warnings that may indicate a potential problem.',
              },
              {
                title: 'error',
                description:
                  ': Represents errors that need immediate attention.',
              },
              {
                title: 'success',
                description: ': Represents successful operations.',
              },
            ]),
          ],
        },
        {
          id: DOC_IDS.section,
          value: 'Available APIs',
          children: [
            PARAGRAPH_FACTORY.asListEntry(
              'logs.dump',
              'Clears all the debug logs.',
              [],
            ),
            DOC_NODES.hiddenSeparator,
            PARAGRAPH_FACTORY.asListEntry(
              'logs.new',
              'Creates a new log entry for a component.',
              [
                {
                  name: 'comp',
                  type: 'KulDebugLogClass',
                  description: 'The component for which the log is created.',
                },
                {
                  name: 'message',
                  type: 'string',
                  description: 'The log message.',
                },
                {
                  name: 'category?',
                  type: 'KulDebugCategory',
                  description: 'Optional category for the log entry.',
                },
              ],
            ),
            DOC_NODES.hiddenSeparator,
            PARAGRAPH_FACTORY.asListEntry(
              'logs.print',
              'Prints all current debug logs to the console.',
              [],
            ),
            DOC_NODES.hiddenSeparator,
            PARAGRAPH_FACTORY.asListEntry(
              'isEnabled',
              'Returns whether debugging is currently enabled.',
              [],
            ),
            DOC_NODES.hiddenSeparator,
            PARAGRAPH_FACTORY.asListEntry(
              'register',
              'Registers a component to be monitored by KulDebug.',
              [
                {
                  name: 'comp',
                  type: 'KulDebugManagedComponents',
                  description: 'The component to be registered for debugging.',
                },
              ],
            ),
            DOC_NODES.hiddenSeparator,
            PARAGRAPH_FACTORY.asListEntry(
              'toggle',
              'Toggles the debug state on or off.',
              [
                {
                  name: 'value?',
                  type: 'boolean',
                  description: 'Optional value to set debug state explicitly.',
                },
                {
                  name: 'dispatch?',
                  type: 'boolean',
                  description:
                    'Whether to trigger the switchDispatcher after toggling.',
                },
              ],
            ),
          ],
        },
        {
          id: DOC_IDS.section,
          value: 'Examples',
          children: [
            {
              children: [
                {
                  id: DOC_IDS.content,
                  value: 'Creating a Log Entry:',
                },
                DOC_NODES.hiddenSeparator,
                {
                  cells: {
                    kulCode: {
                      shape: 'code',
                      value:
                        "const kulDebug = new KulDebug(true, 100);\nkulDebug.logs.new('KulComponent', 'This is a debug message', 'informational');",
                    },
                  },
                  id: DOC_IDS.content,
                },
              ],
              id: DOC_IDS.paragraph,
              value: '',
            },
            {
              children: [
                {
                  id: DOC_IDS.content,
                  value: 'Toggling Debug State:',
                },
                DOC_NODES.hiddenSeparator,
                {
                  cells: {
                    kulCode: {
                      shape: 'code',
                      value:
                        'const kulDebug = new KulDebug();\nkulDebug.toggle();\nconsole.log(kulDebug.isEnabled());  // Output: true or false',
                    },
                  },
                  id: DOC_IDS.content,
                },
              ],
              id: DOC_IDS.paragraph,
              value: '',
            },
          ],
        },
      ],
    },
  ],
};
