var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if ((from && typeof from === 'object') || typeof from === 'function') {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, {
          get: () => from[key],
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable,
        });
  }
  return to;
};
var __toCommonJS = mod =>
  __copyProps(__defProp({}, '__esModule', { value: true }), mod);
var tongyi_exports = {};
__export(tongyi_exports, {
  tongyiParser: () => tongyiParser,
});
module.exports = __toCommonJS(tongyi_exports);
var import_parserCore = require('../shared/parserCore');
const TONGYI_MESSAGE_CONTAINER_SELECTOR =
  '[class*="message-item"], [class*="questionItem--"], [class*="answerItem"], [class*="contentBox--"]';
const TONGYI_USER_MESSAGE_SELECTOR =
  '[class*="user-message"], [class*="userMessage"], [class*="questionItem--"]';
const TONGYI_ASSISTANT_MESSAGE_SELECTOR =
  '[class*="assistant-message"], [class*="assistantMessage"], [class*="bot-message"], [class*="contentBox--"]';
const TONGYI_TITLE_REPLACE_TEXT = ' - 通义';
const TONGYI_CODE_CONTAINER_SELECTOR = '[class*="contain-layout-style"]';
const LANGUAGE_ALIASES = {
  typescript: 'ts',
  javascript: 'js',
  csharp: 'cs',
  shell: 'bash',
};
function extractTongyiChatData(doc) {
  const questionItems = (0, import_parserCore.toArray)(
    doc.querySelectorAll('[class*="questionItem"]'),
  );
  const answerItems = (0, import_parserCore.toArray)(
    doc.querySelectorAll('[class*="answerItem"]'),
  );
  if (questionItems.length === 0 && answerItems.length === 0) {
    return (0, import_parserCore.createEmptyResult)();
  }
  const title = (0, import_parserCore.readTitleFromDocument)(doc, {
    replacements: [
      TONGYI_TITLE_REPLACE_TEXT,
      ' - 你的超级个人助理',
      ' - 通义千问',
    ],
    invalidTitles: ['通义'],
    fallbackTitle: '通义千问对话',
    deriveFallback() {
      if (questionItems.length === 0) {
        return '';
      }
      const firstQuestion = questionItems[0].textContent?.trim() || '';
      return (
        firstQuestion.slice(0, 50) + (firstQuestion.length > 50 ? '...' : '')
      );
    },
  });
  const model = (0, import_parserCore.readModelFromDocument)(doc, {
    readFromLocalStorage() {
      const selectedModel = localStorage.getItem('selectedQwenModel');
      if (!selectedModel) {
        return '';
      }
      const match = selectedModel.match(
        /qwen(\d+)[\s-]*(max|plus|turbo|pro)?/i,
      );
      if (!match) {
        return '';
      }
      const version = match[1];
      const variant = match[2]
        ? match[2].charAt(0).toUpperCase() + match[2].slice(1).toLowerCase()
        : '';
      return `Qwen${version}${variant ? `-${variant}` : ''}`;
    },
    buttonPattern: /^(通义千问|qwen)[\s-]*(\d+)?[\s-]*(max|plus|turbo)?$/i,
    modelSelectors: ['[class*="model"], [class*="Model"]'],
    modelPattern: /(qwen|通义|千问)/i,
    bodyPattern: /qwen[\s-]?(\d+)[\s-]*(max|plus|turbo|pro)?/i,
    normalize(value) {
      if (!value) {
        return '';
      }
      const match = value.match(/qwen[\s-]?(\d+)[\s-]*(max|plus|turbo|pro)?/i);
      if (!match) {
        return value.trim();
      }
      const version = match[1];
      const variant = match[2]
        ? match[2].charAt(0).toUpperCase() + match[2].slice(1).toLowerCase()
        : '';
      return `Qwen${version}${variant ? `-${variant}` : ''}`;
    },
  });
  const messageContainers = (0, import_parserCore.toArray)(
    doc.querySelectorAll(TONGYI_MESSAGE_CONTAINER_SELECTOR),
  );
  const accumulator = (0, import_parserCore.buildMessageAccumulator)();
  for (const element of messageContainers) {
    let role = 'assistant';
    let contentElem = null;
    if (element.matches(TONGYI_USER_MESSAGE_SELECTOR)) {
      role = 'user';
      contentElem = element.querySelector(
        '[class*="content"], [class*="msgText"], pre, article, div, p',
      );
    } else if (element.matches(TONGYI_ASSISTANT_MESSAGE_SELECTOR)) {
      contentElem = element.querySelector(
        '.tongyi-markdown, pre, [class*="content"], [class*="msgText"], [class*="markdown"], article, div, p',
      );
    }
    if (!contentElem) {
      contentElem = element.querySelector(
        '.tongyi-markdown, pre, [class*="content"], [class*="msgText"], [class*="markdown"], article, div, p',
      );
    }
    accumulator.push({
      role,
      html: sanitizeTongyiContent(contentElem || element).innerHTML,
    });
  }
  return {
    title,
    messages: accumulator.messages,
    assets: [],
    model: model || void 0,
  };
}
function sanitizeTongyiContent(element) {
  const clone = element.cloneNode(true);
  for (const container of (0, import_parserCore.toArray)(
    clone.querySelectorAll(TONGYI_CODE_CONTAINER_SELECTOR),
  )) {
    const rawLanguageLabel = container
      .querySelector('span.font-medium')
      ?.textContent?.trim();
    const languageLabel = rawLanguageLabel?.toLowerCase();
    const lineNumberNodes = (0, import_parserCore.toArray)(
      container.querySelectorAll(
        '[class*="line-number"], [class*="linenumber"]',
      ),
    );
    const hadLineNumbers = lineNumberNodes.length > 0;
    for (const node of lineNumberNodes) node.remove();
    for (const node of (0, import_parserCore.toArray)(
      container.querySelectorAll('[class*="cursor-pointer"], [role="img"]'),
    ))
      node.remove();
    container.querySelector('span.font-medium')?.remove();
    const pre = container.querySelector('pre');
    if (!pre) continue;
    const normalisedLanguage = languageLabel
      ? LANGUAGE_ALIASES[languageLabel] || languageLabel
      : void 0;
    const preClone = pre.cloneNode(true);
    preClone.removeAttribute('style');
    const code = preClone.querySelector('code');
    if (code && normalisedLanguage) {
      const languageClass = `language-${normalisedLanguage}`;
      for (const cls of (0, import_parserCore.toArray)(code.classList).filter(
        cls => cls.startsWith('language-'),
      ))
        code.classList.remove(cls);
      code.classList.add(languageClass);
    }
    if (code && rawLanguageLabel) {
      code.dataset.language = rawLanguageLabel;
    }
    if (code) {
      let textContent = (code.textContent || '').replace(/\u00A0/g, ' ');
      const lines = textContent.split('\n');
      const numericPrefixes = lines
        .map(line => {
          const trimmed = line.trimStart();
          const match = trimmed.match(/^(\d{1,4})(?=\D|$)/);
          if (!match) return null;
          const value = Number.parseInt(match[1], 10);
          if (!Number.isFinite(value) || value > 1e3) return null;
          return value;
        })
        .filter(value => value !== null);
      const sequentialNumbering =
        numericPrefixes.length > 0 &&
        (numericPrefixes[0] === 0 || numericPrefixes[0] === 1) &&
        numericPrefixes.every(
          (value, idx) => idx === 0 || numericPrefixes[idx - 1] + 1 === value,
        );
      const coversMostLines =
        numericPrefixes.length >= Math.max(1, Math.ceil(lines.length * 0.5));
      const shouldStripLineNumbers =
        hadLineNumbers || (sequentialNumbering && coversMostLines);
      const processedLines = shouldStripLineNumbers
        ? lines.map(line => {
            const leadingWhitespaceMatch = line.match(/^\s*/);
            const leadingWhitespace = leadingWhitespaceMatch
              ? leadingWhitespaceMatch[0]
              : '';
            const withoutLeading = line.slice(leadingWhitespace.length);
            const numberMatch = withoutLeading.match(/^(\d{1,5})(\s*)/);
            if (!numberMatch) {
              return line;
            }
            const preservedIndent = numberMatch[2];
            return (
              leadingWhitespace +
              preservedIndent +
              withoutLeading.slice(numberMatch[0].length)
            );
          })
        : lines;
      const nonEmptyLines = processedLines.filter(
        line => line.trim().length > 0,
      );
      const minIndent = nonEmptyLines.reduce((min, line) => {
        const match = line.match(/^\s*/);
        const indent = match ? match[0].length : 0;
        return Math.min(min, indent);
      }, Number.POSITIVE_INFINITY);
      const normalisedLines = processedLines.map(line => {
        if (minIndent === Number.POSITIVE_INFINITY) return line;
        return line.slice(Math.min(minIndent, line.length));
      });
      code.textContent = normalisedLines
        .map(line => line.replace(/\s+$/g, ''))
        .join('\n')
        .replace(/\s+$/g, '');
    }
    container.replaceWith(preClone);
  }
  return clone;
}
const tongyiParser = {
  id: 'tongyi',
  parse: doc => extractTongyiChatData(doc),
};
