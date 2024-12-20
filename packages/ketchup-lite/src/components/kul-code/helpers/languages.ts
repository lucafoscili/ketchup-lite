export const STATIC_LANGUAGES = {
  //#region CSS
  css: (Prism: Prism.Environment) => {
    var e =
      /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;
    (Prism.languages.css = {
      comment: /\/\*[\s\S]*?\*\//,
      atrule: {
        pattern: RegExp(
          "@[\\w-](?:[^;{\\s\"']|\\s+(?!\\s)|" +
            e.source +
            ")*?(?:;|(?=\\s*\\{))",
        ),
        inside: {
          rule: /^@[\w-]+/,
          "selector-function-argument": {
            pattern:
              /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
            lookbehind: !0,
            alias: "selector",
          },
          keyword: {
            pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
            lookbehind: !0,
          },
        },
      },
      url: {
        pattern: RegExp(
          "\\burl\\((?:" + e.source + "|(?:[^\\\\\r\n()\"']|\\\\[^])*)\\)",
          "i",
        ),
        greedy: !0,
        inside: {
          function: /^url/i,
          punctuation: /^\(|\)$/,
          string: {
            pattern: RegExp("^" + e.source + "$"),
            alias: "url",
          },
        },
      },
      selector: {
        pattern: RegExp(
          "(^|[{}\\s])[^{}\\s](?:[^{};\"'\\s]|\\s+(?![\\s{])|" +
            e.source +
            ")*(?=\\s*\\{)",
        ),
        lookbehind: !0,
      },
      string: { pattern: e, greedy: !0 },
      property: {
        pattern:
          /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
        lookbehind: !0,
      },
      important: /!important\b/i,
      function: {
        pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,
        lookbehind: !0,
      },
      punctuation: /[(){};:,]/,
    }),
      (Prism.languages.css.atrule.inside.rest = Prism.languages.css);
    var t = Prism.languages.markup;
    t && (t.tag.addInlined("style", "css"), t.tag.addAttribute("style", "css"));
  },
  //#endregion

  //#region JavaScript
  javascript: (Prism: Prism.Environment) => {
    (Prism.languages.javascript = Prism.languages.extend("clike", {
      "class-name": [
        Prism.languages.clike["class-name"],
        {
          pattern:
            /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,
          lookbehind: !0,
        },
      ],
      keyword: [
        { pattern: /((?:^|\})\s*)catch\b/, lookbehind: !0 },
        {
          pattern:
            /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
          lookbehind: !0,
        },
      ],
      function:
        /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
      number: {
        pattern: RegExp(
          "(^|[^\\w$])(?:NaN|Infinity|0[bB][01]+(?:_[01]+)*n?|0[oO][0-7]+(?:_[0-7]+)*n?|0[xX][\\dA-Fa-f]+(?:_[\\dA-Fa-f]+)*n?|\\d+(?:_\\d+)*n|(?:\\d+(?:_\\d+)*(?:\\.(?:\\d+(?:_\\d+)*)?)?|\\.\\d+(?:_\\d+)*)(?:[Ee][+-]?\\d+(?:_\\d+)*)?)(?![\\w$])",
        ),
        lookbehind: !0,
      },
      operator:
        /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/,
    })),
      (Prism.languages.javascript["class-name"][0].pattern =
        /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/),
      Prism.languages.insertBefore("javascript", "keyword", {
        regex: {
          pattern: RegExp(
            "((?:^|[^$\\w\\xA0-\\uFFFF.\"'\\])\\s]|\\b(?:return|yield))\\s*)/(?:(?:\\[(?:[^\\]\\\\\r\n]|\\\\.)*\\]|\\\\.|[^/\\\\\\[\r\n])+/[dgimyus]{0,7}|(?:\\[(?:[^[\\]\\\\\r\n]|\\\\.|\\[(?:[^[\\]\\\\\r\n]|\\\\.|\\[(?:[^[\\]\\\\\r\n]|\\\\.)*\\])*\\])*\\]|\\\\.|[^/\\\\\\[\r\n])+/[dgimyus]{0,7}v[dgimyus]{0,7})(?=(?:\\s|/\\*(?:[^*]|\\*(?!/))*\\*/)*(?:$|[\r\n,.;:})\\]]|//))",
          ),
          lookbehind: !0,
          greedy: !0,
          inside: {
            "regex-source": {
              pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
              lookbehind: !0,
              alias: "language-regex",
              inside: Prism.languages.regex,
            },
            "regex-delimiter": /^\/|\/$/,
            "regex-flags": /^[a-z]+$/,
          },
        },
        "function-variable": {
          pattern:
            /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
          alias: "function",
        },
        parameter: [
          {
            pattern:
              /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
            lookbehind: !0,
            inside: Prism.languages.javascript,
          },
          {
            pattern:
              /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
            lookbehind: !0,
            inside: Prism.languages.javascript,
          },
          {
            pattern:
              /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
            lookbehind: !0,
            inside: Prism.languages.javascript,
          },
          {
            pattern:
              /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
            lookbehind: !0,
            inside: Prism.languages.javascript,
          },
        ],
        constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/,
      }),
      Prism.languages.insertBefore("javascript", "string", {
        hashbang: { pattern: /^#!.*/, greedy: !0, alias: "comment" },
        "template-string": {
          pattern:
            /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
          greedy: !0,
          inside: {
            "template-punctuation": {
              pattern: /^`|`$/,
              alias: "string",
            },
            interpolation: {
              pattern:
                /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
              lookbehind: !0,
              inside: {
                "interpolation-punctuation": {
                  pattern: /^\$\{|\}$/,
                  alias: "punctuation",
                },
                rest: Prism.languages.javascript,
              },
            },
            string: /[\s\S]+/,
          },
        },
        "string-property": {
          pattern:
            /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,
          lookbehind: !0,
          greedy: !0,
          alias: "property",
        },
      }),
      Prism.languages.insertBefore("javascript", "operator", {
        "literal-property": {
          pattern:
            /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
          lookbehind: !0,
          alias: "property",
        },
      }),
      Prism.languages.markup &&
        (Prism.languages.markup.tag.addInlined("script", "javascript"),
        Prism.languages.markup.tag.addAttribute(
          "on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)",
          "javascript",
        )),
      (Prism.languages.js = Prism.languages.javascript);
  },
  //#endregion

  //#region JSON
  json: (Prism: Prism.Environment) => {
    (Prism.languages.json = {
      property: {
        pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?=\s*:)/,
        lookbehind: !0,
        greedy: !0,
      },
      string: {
        pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?!\s*:)/,
        lookbehind: !0,
        greedy: !0,
      },
      comment: { pattern: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/, greedy: !0 },
      number: /-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
      punctuation: /[{}[\],]/,
      operator: /:/,
      boolean: /\b(?:false|true)\b/,
      null: { pattern: /\bnull\b/, alias: "keyword" },
    }),
      (Prism.languages.webmanifest = Prism.languages.json);
  },
  //#endregion

  //#region JSX
  jsx: (Prism: Prism.Environment) => {
    var n = Prism.util.clone(Prism.languages.javascript),
      e = "(?:\\{<S>*\\.{3}(?:[^{}]|<BRACES>)*\\})";
    function a(t: string, n?: string) {
      return (
        (t = t
          .replace(/<S>/g, function () {
            return "(?:\\s|//.*(?!.)|/\\*(?:[^*]|\\*(?!/))\\*/)";
          })
          .replace(/<BRACES>/g, function () {
            return "(?:\\{(?:\\{(?:\\{[^{}]*\\}|[^{}])*\\}|[^{}])*\\})";
          })
          .replace(/<SPREAD>/g, function () {
            return e;
          })),
        RegExp(t, n)
      );
    }
    (e = a(e).source),
      (Prism.languages.jsx = Prism.languages.extend("markup", n)),
      (Prism.languages.jsx.tag.pattern = a(
        "</?(?:[\\w.:-]+(?:<S>+(?:[\\w.:$-]+(?:=(?:\"(?:\\\\[^]|[^\\\\\"])*\"|'(?:\\\\[^]|[^\\\\'])*'|[^\\s{'\"/>=]+|<BRACES>))?|<SPREAD>))*<S>*/?)?>",
      )),
      (Prism.languages.jsx.tag.inside.tag.pattern = /^<\/?[^\s>\/]*/),
      (Prism.languages.jsx.tag.inside["attr-value"].pattern =
        /=(?!\{)(?:"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*'|[^\s'">]+)/),
      (Prism.languages.jsx.tag.inside.tag.inside["class-name"] =
        /^[A-Z]\w*(?:\.[A-Z]\w*)*$/),
      (Prism.languages.jsx.tag.inside.comment = n.comment),
      Prism.languages.insertBefore(
        "inside",
        "attr-name",
        {
          spread: {
            pattern: a("<SPREAD>"),
            inside: Prism.languages.jsx,
          },
        },
        Prism.languages.jsx.tag,
      ),
      Prism.languages.insertBefore(
        "inside",
        "special-attr",
        {
          script: {
            pattern: a("=<BRACES>"),
            alias: "language-javascript",
            inside: {
              "script-punctuation": {
                pattern: /^=(?=\{)/,
                alias: "punctuation",
              },
              rest: Prism.languages.jsx,
            },
          },
        },
        Prism.languages.jsx.tag,
      );
    var s = function (t) {
        return t
          ? "string" == typeof t
            ? t
            : "string" == typeof t.content
              ? t.content
              : t.content.map(s).join("")
          : "";
      },
      g = function (n) {
        for (var e = [], a = 0; a < n.length; a++) {
          var o = n[a],
            i = !1;
          if (
            ("string" != typeof o &&
              ("tag" === o.type && o.content[0] && "tag" === o.content[0].type
                ? "</" === o.content[0].content[0].content
                  ? e.length > 0 &&
                    e[e.length - 1].tagName === s(o.content[0].content[1]) &&
                    e.pop()
                  : "/>" === o.content[o.content.length - 1].content ||
                    e.push({
                      tagName: s(o.content[0].content[1]),
                      openedBraces: 0,
                    })
                : e.length > 0 && "punctuation" === o.type && "{" === o.content
                  ? e[e.length - 1].openedBraces++
                  : e.length > 0 &&
                      e[e.length - 1].openedBraces > 0 &&
                      "punctuation" === o.type &&
                      "}" === o.content
                    ? e[e.length - 1].openedBraces--
                    : (i = !0)),
            (i || "string" == typeof o) &&
              e.length > 0 &&
              0 === e[e.length - 1].openedBraces)
          ) {
            var r = s(o);
            a < n.length - 1 &&
              ("string" == typeof n[a + 1] || "plain-text" === n[a + 1].type) &&
              ((r += s(n[a + 1])), n.splice(a + 1, 1)),
              a > 0 &&
                ("string" == typeof n[a - 1] ||
                  "plain-text" === n[a - 1].type) &&
                ((r = s(n[a - 1]) + r), n.splice(a - 1, 1), a--),
              (n[a] = new Prism.Token("plain-text", r, null, r));
          }
          o.content && "string" != typeof o.content && g(o.content);
        }
      };
    Prism.hooks.add("after-tokenize", function (t) {
      ("jsx" !== t.language && "tsx" !== t.language) || g(t.tokens);
    });
  },
  //#endregion

  //#region Markdown
  markdown: (Prism: Prism.Environment) => {
    function e(reg: string) {
      return (
        (reg = reg.replace(/<inner>/g, function () {
          return "(?:\\\\.|[^\\\\\n\r]|(?:\n|\r\n?)(?![\r\n]))";
        })),
        RegExp("((?:^|[^\\\\])(?:\\\\{2})*)(?:" + reg + ")")
      );
    }
    const t = "(?:\\\\.|``(?:[^`\r\n]|`(?!`))+``|`[^`\r\n]+`|[^\\\\|\r\n`])+",
      a = "\\|?__(?:\\|__)+\\|?(?:(?:\n|\r\n?)|(?![^]))".replace(
        /__/g,
        function () {
          return t;
        },
      ),
      i =
        "\\|?[ \t]*:?-{3,}:?[ \t]*(?:\\|[ \t]*:?-{3,}:?[ \t]*)+\\|?(?:\n|\r\n?)";
    (Prism.languages.markdown = Prism.languages.extend("markup", {})),
      Prism.languages.insertBefore("markdown", "prolog", {
        "front-matter-block": {
          pattern: /(^(?:\s*[\r\n])?)---(?!.)[\s\S]*?[\r\n]---(?!.)/,
          lookbehind: !0,
          greedy: !0,
          inside: {
            punctuation: /^---|---$/,
            "front-matter": {
              pattern: /\S+(?:\s+\S+)*/,
              alias: ["yaml", "language-yaml"],
              inside: Prism.languages.yaml,
            },
          },
        },
        blockquote: {
          pattern: /^>(?:[\t ]*>)*/m,
          alias: "punctuation",
        },
        table: {
          pattern: RegExp("^" + a + i + "(?:" + a + ")*", "m"),
          inside: {
            "table-data-rows": {
              pattern: RegExp("^(" + a + i + ")(?:" + a + ")*$"),
              lookbehind: !0,
              inside: {
                "table-data": {
                  pattern: RegExp(t),
                  inside: Prism.languages.markdown,
                },
                punctuation: /\|/,
              },
            },
            "table-line": {
              pattern: RegExp("^(" + a + ")" + i + "$"),
              lookbehind: !0,
              inside: { punctuation: /\||:?-{3,}:?/ },
            },
            "table-header-row": {
              pattern: RegExp("^" + a + "$"),
              inside: {
                "table-header": {
                  pattern: RegExp(t),
                  alias: "important",
                  inside: Prism.languages.markdown,
                },
                punctuation: /\|/,
              },
            },
          },
        },
        code: [
          {
            pattern:
              /((?:^|\n)[ \t]*\n|(?:^|\r\n?)[ \t]*\r\n?)(?: {4}|\t).+(?:(?:\n|\r\n?)(?: {4}|\t).+)*/,
            lookbehind: !0,
            alias: "keyword",
          },
          {
            pattern: /^```[\s\S]*?^```$/m,
            greedy: !0,
            inside: {
              "code-block": {
                pattern: /^(```.*(?:\n|\r\n?))[\s\S]+?(?=(?:\n|\r\n?)^```$)/m,
                lookbehind: !0,
              },
              "code-language": {
                pattern: /^(```).+/,
                lookbehind: !0,
              },
              punctuation: /```/,
            },
          },
        ],
        title: [
          {
            pattern: /\S.*(?:\n|\r\n?)(?:==+|--+)(?=[ \t]*$)/m,
            alias: "important",
            inside: { punctuation: /==+$|--+$/ },
          },
          {
            pattern: /(^\s*)#.+/m,
            lookbehind: !0,
            alias: "important",
            inside: { punctuation: /^#+|#+$/ },
          },
        ],
        hr: {
          pattern: /(^\s*)([*-])(?:[\t ]*\2){2,}(?=\s*$)/m,
          lookbehind: !0,
          alias: "punctuation",
        },
        list: {
          pattern: /(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,
          lookbehind: !0,
          alias: "punctuation",
        },
        "url-reference": {
          pattern:
            /!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,
          inside: {
            variable: { pattern: /^(!?\[)[^\]]+/, lookbehind: !0 },
            string:
              /(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,
            punctuation: /^[\[\]!:]|[<>]/,
          },
          alias: "url",
        },
        bold: {
          pattern: e(
            "\\b__(?:(?!_)<inner>|_(?:(?!_)<inner>)+_)+__\\b|\\*\\*(?:(?!\\*)<inner>|\\*(?:(?!\\*)<inner>)+\\*)+\\*\\*",
          ),
          lookbehind: !0,
          greedy: !0,
          inside: {
            content: {
              pattern: /(^..)[\s\S]+(?=..$)/,
              lookbehind: !0,
              inside: {},
            },
            punctuation: /\*\*|__/,
          },
        },
        italic: {
          pattern: e(
            "\\b_(?:(?!_)<inner>|__(?:(?!_)<inner>)+__)+_\\b|\\*(?:(?!\\*)<inner>|\\*\\*(?:(?!\\*)<inner>)+\\*\\*)+\\*",
          ),
          lookbehind: !0,
          greedy: !0,
          inside: {
            content: {
              pattern: /(^.)[\s\S]+(?=.$)/,
              lookbehind: !0,
              inside: {},
            },
            punctuation: /[*_]/,
          },
        },
        strike: {
          pattern: e("(~~?)(?:(?!~)<inner>)+\\2"),
          lookbehind: !0,
          greedy: !0,
          inside: {
            content: {
              pattern: /(^~~?)[\s\S]+(?=\1$)/,
              lookbehind: !0,
              inside: {},
            },
            punctuation: /~~?/,
          },
        },
        "code-snippet": {
          pattern:
            /(^|[^\\`])(?:``[^`\r\n]+(?:`[^`\r\n]+)*``(?!`)|`[^`\r\n]+`(?!`))/,
          lookbehind: !0,
          greedy: !0,
          alias: ["code", "keyword"],
        },
        url: {
          pattern: e(
            '!?\\[(?:(?!\\])<inner>)+\\](?:\\([^\\s)]+(?:[\t ]+"(?:\\\\.|[^"\\\\])*")?\\)|[ \t]?\\[(?:(?!\\])<inner>)+\\])',
          ),
          lookbehind: !0,
          greedy: !0,
          inside: {
            operator: /^!/,
            content: {
              pattern: /(^\[)[^\]]+(?=\])/,
              lookbehind: !0,
              inside: {},
            },
            variable: {
              pattern: /(^\][ \t]?\[)[^\]]+(?=\]$)/,
              lookbehind: !0,
            },
            url: { pattern: /(^\]\()[^\s)]+/, lookbehind: !0 },
            string: {
              pattern: /(^[ \t]+)"(?:\\.|[^"\\])*"(?=\)$)/,
              lookbehind: !0,
            },
          },
        },
      }),
      ["url", "bold", "italic", "strike"].forEach(function (e) {
        ["url", "bold", "italic", "strike", "code-snippet"].forEach(
          function (t) {
            e !== t &&
              (Prism.languages.markdown[e].inside.content.inside[t] =
                Prism.languages.markdown[t]);
          },
        );
      }),
      Prism.hooks.add("after-tokenize", function (Prism: Prism.Environment) {
        ("markdown" !== Prism.language && "md" !== Prism.language) ||
          (function n(e) {
            if (e && "string" != typeof e)
              for (var t = 0, a = e.length; t < a; t++) {
                var i = e[t];
                if ("code" === i.type) {
                  var r = i.content[1],
                    o = i.content[3];
                  if (
                    r &&
                    o &&
                    "code-language" === r.type &&
                    "code-block" === o.type &&
                    "string" == typeof r.content
                  ) {
                    var l = r.content
                        .replace(/\b#/g, "sharp")
                        .replace(/\b\+\+/g, "pp"),
                      s =
                        "language-" +
                        (l = (/[a-z][\w-]*/i.exec(l) || [""])[0].toLowerCase());
                    o.alias
                      ? "string" == typeof o.alias
                        ? (o.alias = [o.alias, s])
                        : o.alias.push(s)
                      : (o.alias = [s]);
                  }
                } else n(i.content);
              }
          })(Prism.tokens);
      }),
      Prism.hooks.add("wrap", function (e: Prism.Environment) {
        if ("code-block" === e.type) {
          for (var t = "", a = 0, i = e.classes.length; a < i; a++) {
            var s = e.classes[a],
              d = /language-(.+)/.exec(s);
            if (d) {
              t = d[1];
              break;
            }
          }
          var p = Prism.languages[t];
          if (p)
            e.content = Prism.highlight(
              e.content
                .replace(r, "")
                .replace(/&(\w{1,8}|#x?[\da-f]{1,8});/gi, function (Prism, e) {
                  var t;
                  return "#" === (e = e.toLowerCase())[0]
                    ? ((t =
                        "x" === e[1]
                          ? parseInt(e.slice(2), 16)
                          : Number(e.slice(1))),
                      l(t))
                    : o[e] || Prism;
                }),
              p,
              t,
            );
          else if (t && "none" !== t && Prism.plugins.autoloader) {
            var u =
              "md-" +
              new Date().valueOf() +
              "-" +
              Math.floor(1e16 * Math.random());
            (e.attributes.id = u),
              Prism.plugins.autoloader.loadLanguages(t, function () {
                var e = document.getElementById(u);
                e &&
                  (e.innerHTML = Prism.highlight(
                    e.textContent,
                    Prism.languages[t],
                    t,
                  ));
              });
          }
        }
      });
    var r = RegExp(Prism.languages.markup.tag.pattern.source, "gi"),
      o = { amp: "&", lt: "<", gt: ">", quot: '"' },
      l = String.fromCodePoint || String.fromCharCode;
    Prism.languages.md = Prism.languages.markdown;
  },
  //#endregion

  //#region Markup
  markup: (Prism: Prism.Environment) => {
    (Prism.languages.markup = {
      comment: { pattern: /<!--(?:(?!<!--)[\s\S])*?-->/, greedy: !0 },
      prolog: { pattern: /<\?[\s\S]+?\?>/, greedy: !0 },
      doctype: {
        pattern:
          /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
        greedy: !0,
        inside: {
          "internal-subset": {
            pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
            lookbehind: !0,
            greedy: !0,
            inside: null,
          },
          string: { pattern: /"[^"]*"|'[^']*'/, greedy: !0 },
          punctuation: /^<!|>$|[[\]]/,
          "doctype-tag": /^DOCTYPE/i,
          name: /[^\s<>'"]+/,
        },
      },
      cdata: { pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i, greedy: !0 },
      tag: {
        pattern:
          /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
        greedy: !0,
        inside: {
          tag: {
            pattern: /^<\/?[^\s>\/]+/,
            inside: {
              punctuation: /^<\/?/,
              namespace: /^[^\s>\/:]+:/,
            },
          },
          "special-attr": [],
          "attr-value": {
            pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
            inside: {
              punctuation: [
                { pattern: /^=/, alias: "attr-equals" },
                { pattern: /^(\s*)["']|["']$/, lookbehind: !0 },
              ],
            },
          },
          punctuation: /\/?>/,
          "attr-name": {
            pattern: /[^\s>\/]+/,
            inside: { namespace: /^[^\s>\/:]+:/ },
          },
        },
      },
      entity: [
        { pattern: /&[\da-z]{1,8};/i, alias: "named-entity" },
        /&#x?[\da-f]{1,8};/i,
      ],
    }),
      (Prism.languages.markup.tag.inside["attr-value"].inside.entity =
        Prism.languages.markup.entity),
      (Prism.languages.markup.doctype.inside["internal-subset"].inside =
        Prism.languages.markup),
      Prism.hooks.add("wrap", function (a) {
        "entity" === a.type &&
          (a.attributes.title = a.content.replace(/&amp;/, "&"));
      }),
      Object.defineProperty(Prism.languages.markup.tag, "addInlined", {
        value: function (a, e) {
          var s = {};
          (s["language-" + e] = {
            pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
            lookbehind: !0,
            inside: Prism.languages[e],
          }),
            (s["cdata"] = /^<!\[CDATA\[|\]\]>$/i);
          var t = {
            "included-cdata": {
              pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
              inside: s,
            },
          };
          t["language-" + e] = {
            pattern: /[\s\S]+/,
            inside: Prism.languages[e],
          };
          var n = {};
          (n[a] = {
            pattern: RegExp(
              "(<__[^>]*>)(?:<!\\[CDATA\\[(?:[^\\]]|\\](?!\\]>))*\\]\\]>|(?!<!\\[CDATA\\[)[^])*?(?=</__>)".replace(
                /__/g,
                function () {
                  return a;
                },
              ),
              "i",
            ),
            lookbehind: !0,
            greedy: !0,
            inside: t,
          }),
            Prism.languages.insertBefore("markup", "cdata", n);
        },
      }),
      Object.defineProperty(Prism.languages.markup.tag, "addAttribute", {
        value: function (a, e) {
          Prism.languages.markup.tag.inside["special-attr"].push({
            pattern: RegExp(
              "(^|[\"'\\s])(?:" +
                a +
                ")\\s*=\\s*(?:\"[^\"]*\"|'[^']*'|[^\\s'\">=]+(?=[\\s>]))",
              "i",
            ),
            lookbehind: !0,
            inside: {
              "attr-name": /^[^\s=]+/,
              "attr-value": {
                pattern: /=[\s\S]+/,
                inside: {
                  value: {
                    pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
                    lookbehind: !0,
                    alias: [e, "language-" + e],
                    inside: Prism.languages[e],
                  },
                  punctuation: [{ pattern: /^=/, alias: "attr-equals" }, /"|'/],
                },
              },
            },
          });
        },
      }),
      (Prism.languages.html = Prism.languages.markup),
      (Prism.languages.mathml = Prism.languages.markup),
      (Prism.languages.svg = Prism.languages.markup),
      (Prism.languages.xml = Prism.languages.extend("markup", {})),
      (Prism.languages.ssml = Prism.languages.xml),
      (Prism.languages.atom = Prism.languages.xml),
      (Prism.languages.rss = Prism.languages.xml);
  },
  //#endregion

  //#region Python
  python: (Prism: Prism.Environment) => {
    (Prism.languages.python = {
      comment: { pattern: /(^|[^\\])#.*/, lookbehind: !0, greedy: !0 },
      "string-interpolation": {
        pattern:
          /(?:f|fr|rf)(?:("""|''')[\s\S]*?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/i,
        greedy: !0,
        inside: {
          interpolation: {
            pattern:
              /((?:^|[^{])(?:\{\{)*)\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}])+\})+\})+\}/,
            lookbehind: !0,
            inside: {
              "format-spec": {
                pattern: /(:)[^:(){}]+(?=\}$)/,
                lookbehind: !0,
              },
              "conversion-option": {
                pattern: /![sra](?=[:}]$)/,
                alias: "punctuation",
              },
              rest: null,
            },
          },
          string: /[\s\S]+/,
        },
      },
      "triple-quoted-string": {
        pattern: /(?:[rub]|br|rb)?("""|''')[\s\S]*?\1/i,
        greedy: !0,
        alias: "string",
      },
      string: {
        pattern: /(?:[rub]|br|rb)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i,
        greedy: !0,
      },
      function: {
        pattern: /((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g,
        lookbehind: !0,
      },
      "class-name": { pattern: /(\bclass\s+)\w+/i, lookbehind: !0 },
      decorator: {
        pattern: /(^[\t ]*)@\w+(?:\.\w+)*/m,
        lookbehind: !0,
        alias: ["annotation", "punctuation"],
        inside: { punctuation: /\./ },
      },
      keyword:
        /\b(?:_(?=\s*:)|and|as|assert|async|await|break|case|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|match|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/,
      builtin:
        /\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,
      boolean: /\b(?:False|None|True)\b/,
      number:
        /\b0(?:b(?:_?[01])+|o(?:_?[0-7])+|x(?:_?[a-f0-9])+)\b|(?:\b\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\B\.\d+(?:_\d+)*)(?:e[+-]?\d+(?:_\d+)*)?j?(?!\w)/i,
      operator: /[-+%=]=?|!=|:=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,
      punctuation: /[{}[\];(),.:]/,
    }),
      (Prism.languages.python[
        "string-interpolation"
      ].inside.interpolation.inside.rest = Prism.languages.python),
      (Prism.languages.py = Prism.languages.python);
  },
  //#endregion

  //#region RegEx
  regex: (Prism: Prism.Environment) => {
    var e = { pattern: /\\[\\(){}[\]^$+*?|.]/, alias: "escape" },
      n =
        /\\(?:x[\da-fA-F]{2}|u[\da-fA-F]{4}|u\{[\da-fA-F]+\}|0[0-7]{0,2}|[123][0-7]{2}|c[a-zA-Z]|.)/,
      t = "(?:[^\\\\-]|" + n.source + ")",
      s = RegExp(t + "-" + t),
      i = {
        pattern: /(<|')[^<>']+(?=[>']$)/,
        lookbehind: !0,
        alias: "variable",
      };
    Prism.languages.regex = {
      "char-class": {
        pattern: /((?:^|[^\\])(?:\\\\)*)\[(?:[^\\\]]|\\[\s\S])*\]/,
        lookbehind: !0,
        inside: {
          "char-class-negation": {
            pattern: /(^\[)\^/,
            lookbehind: !0,
            alias: "operator",
          },
          "char-class-punctuation": {
            pattern: /^\[|\]$/,
            alias: "punctuation",
          },
          range: {
            pattern: s,
            inside: {
              escape: n,
              "range-punctuation": {
                pattern: /-/,
                alias: "operator",
              },
            },
          },
          "special-escape": e,
          "char-set": {
            pattern: /\\[wsd]|\\p\{[^{}]+\}/i,
            alias: "class-name",
          },
          escape: n,
        },
      },
      "special-escape": e,
      "char-set": {
        pattern: /\.|\\[wsd]|\\p\{[^{}]+\}/i,
        alias: "class-name",
      },
      backreference: [
        { pattern: /\\(?![123][0-7]{2})[1-9]/, alias: "keyword" },
        {
          pattern: /\\k<[^<>']+>/,
          alias: "keyword",
          inside: { "group-name": i },
        },
      ],
      anchor: { pattern: /[$^]|\\[ABbGZz]/, alias: "function" },
      escape: n,
      group: [
        {
          pattern:
            /\((?:\?(?:<[^<>']+>|'[^<>']+'|[>:]|<?[=!]|[idmnsuxU]+(?:-[idmnsuxU]+)?:?))?/,
          alias: "punctuation",
          inside: { "group-name": i },
        },
        { pattern: /\)/, alias: "punctuation" },
      ],
      quantifier: {
        pattern: /(?:[+*?]|\{\d+(?:,\d*)?\})[?+]?/,
        alias: "number",
      },
      alternation: { pattern: /\|/, alias: "keyword" },
    };
  },
  //#endregion

  //#region Scss
  scss: (Prism: Prism.Environment) => {
    (Prism.languages.scss = Prism.languages.extend("css", {
      comment: {
        pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/,
        lookbehind: !0,
      },
      atrule: {
        pattern: /@[\w-](?:\([^()]+\)|[^()\s]|\s+(?!\s))*?(?=\s+[{;])/,
        inside: { rule: /@[\w-]+/ },
      },
      url: /(?:[-a-z]+-)?url(?=\()/i,
      selector: {
        pattern:
          /(?=\S)[^@;{}()]?(?:[^@;{}()\s]|\s+(?!\s)|#\{\$[-\w]+\})+(?=\s*\{(?:\}|\s|[^}][^:{}]*[:{][^}]))/,
        inside: {
          parent: { pattern: /&/, alias: "important" },
          placeholder: /%[-\w]+/,
          variable: /\$[-\w]+|#\{\$[-\w]+\}/,
        },
      },
      property: {
        pattern: /(?:[-\w]|\$[-\w]|#\{\$[-\w]+\})+(?=\s*:)/,
        inside: { variable: /\$[-\w]+|#\{\$[-\w]+\}/ },
      },
    })),
      Prism.languages.insertBefore("scss", "atrule", {
        keyword: [
          /@(?:content|debug|each|else(?: if)?|extend|for|forward|function|if|import|include|mixin|return|use|warn|while)\b/i,
          { pattern: /( )(?:from|through)(?= )/, lookbehind: !0 },
        ],
      }),
      Prism.languages.insertBefore("scss", "important", {
        variable: /\$[-\w]+|#\{\$[-\w]+\}/,
      }),
      Prism.languages.insertBefore("scss", "function", {
        "module-modifier": {
          pattern: /\b(?:as|hide|show|with)\b/i,
          alias: "keyword",
        },
        placeholder: { pattern: /%[-\w]+/, alias: "selector" },
        statement: {
          pattern: /\B!(?:default|optional)\b/i,
          alias: "keyword",
        },
        boolean: /\b(?:false|true)\b/,
        null: { pattern: /\bnull\b/, alias: "keyword" },
        operator: {
          pattern: /(\s)(?:[-+*\/%]|[=!]=|<=?|>=?|and|not|or)(?=\s)/,
          lookbehind: !0,
        },
      }),
      (Prism.languages.scss.atrule.inside.rest = Prism.languages.scss);
  },
  //#endregion

  //#region TSX
  tsx: (Prism: Prism.Environment) => {
    const a = Prism.util.clone(Prism.languages.typescript);
    (Prism.languages.tsx = Prism.languages.extend("jsx", a)),
      delete Prism?.languages?.tsx?.parameter,
      delete Prism?.languages?.tsx?.["literal-property"];
    const t = Prism.languages?.tsx?.tag;
    (t.pattern = RegExp(
      "(^|[^\\w$]|(?=</))(?:" + t.pattern.source + ")",
      t.pattern.flags,
    )),
      (t.lookbehind = !0);
  },
  //#endregion

  //#region TypeScript
  typescript: (Prism: Prism.Environment) => {
    (Prism.languages.typescript = Prism.languages.extend("javascript", {
      "class-name": {
        pattern:
          /(\b(?:class|extends|implements|instanceof|interface|new|type)\s+)(?!keyof\b)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?:\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>)?/,
        lookbehind: !0,
        greedy: !0,
        inside: null,
      },
      builtin:
        /\b(?:Array|Function|Promise|any|boolean|console|never|number|string|symbol|unknown)\b/,
    })),
      Prism.languages.typescript.keyword.push(
        /\b(?:abstract|declare|is|keyof|readonly|require)\b/,
        /\b(?:asserts|infer|interface|module|namespace|type)\b(?=\s*(?:[{_$a-zA-Z\xA0-\uFFFF]|$))/,
        /\btype\b(?=\s*(?:[\{*]|$))/,
      ),
      delete Prism.languages.typescript.parameter,
      delete Prism.languages.typescript["literal-property"];
    var s = Prism.languages.extend("typescript", {});
    delete s["class-name"],
      (Prism.languages.typescript["class-name"].inside = s),
      Prism.languages.insertBefore("typescript", "function", {
        decorator: {
          pattern: /@[$\w\xA0-\uFFFF]+/,
          inside: {
            at: { pattern: /^@/, alias: "operator" },
            function: /^[\s\S]+/,
          },
        },
        "generic-function": {
          pattern:
            /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>(?=\s*\()/,
          greedy: !0,
          inside: {
            function:
              /^#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*/,
            generic: {
              pattern: /<[\s\S]+/,
              alias: "class-name",
              inside: s,
            },
          },
        },
      }),
      (Prism.languages.ts = Prism.languages.typescript);
  },
  //#endregion
};
