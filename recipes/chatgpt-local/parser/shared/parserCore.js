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
var parserCore_exports = {};
__export(parserCore_exports, {
  buildMessageAccumulator: () => buildMessageAccumulator,
  buildParsedMessage: () => buildParsedMessage,
  createEmptyResult: () => createEmptyResult,
  queryFirst: () => queryFirst,
  readModelFromDocument: () => readModelFromDocument,
  readTitleFromDocument: () => readTitleFromDocument,
  toArray: () => toArray,
});
module.exports = __toCommonJS(parserCore_exports);
var import_constants = require('./constants');
var import_markdown = require('./markdown');
function toArray(value) {
  return [...(value || [])];
}
function createEmptyResult() {
  return {
    title: import_constants.DEFAULT_CHAT_TITLE,
    messages: [],
    assets: [],
  };
}
function queryFirst(element, selectors) {
  for (const selector of selectors) {
    const match = element.querySelector(selector);
    if (match) {
      return match;
    }
  }
  return null;
}
function readTitleFromDocument(doc, options = {}) {
  const {
    docTitle = doc.title || '',
    replacements = [],
    sidebarSelectors = [],
    invalidTitles = [],
    fallbackTitle = import_constants.DEFAULT_CHAT_TITLE,
    deriveFallback,
  } = options;
  let title = docTitle;
  for (const replacement of replacements) {
    title = title.replace(replacement, '');
  }
  title = title.trim();
  if (!title || invalidTitles.includes(title)) {
    for (const selector of sidebarSelectors) {
      const candidate = doc.querySelector(selector);
      const text = candidate?.textContent?.trim();
      if (text) {
        title = text;
        break;
      }
    }
  }
  if (
    (!title || invalidTitles.includes(title)) &&
    typeof deriveFallback === 'function'
  ) {
    title = deriveFallback(doc)?.trim() || '';
  }
  return title || fallbackTitle;
}
function readModelFromDocument(doc, options = {}) {
  const {
    buttonSelectors = ['button, [role="button"]'],
    buttonPattern,
    modelSelectors = [],
    modelPattern,
    bodyPattern,
    fallback = '',
    readFromLocalStorage,
    normalize = value => value?.trim() || '',
  } = options;
  let model = '';
  if (typeof readFromLocalStorage === 'function') {
    try {
      model = normalize(readFromLocalStorage());
    } catch (error) {
      console.debug('[parserCore] localStorage model lookup failed', error);
    }
  }
  if (!model && buttonPattern) {
    for (const selector of buttonSelectors) {
      const buttons = toArray(doc.querySelectorAll(selector));
      for (const button of buttons) {
        const text = button.textContent?.trim() || '';
        const match = text.match(buttonPattern);
        if (match) {
          model = normalize(match[1] || match[0] || text);
          break;
        }
      }
      if (model) {
        break;
      }
    }
  }
  if (!model && modelPattern && modelSelectors.length > 0) {
    for (const selector of modelSelectors) {
      const elements = toArray(doc.querySelectorAll(selector));
      for (const element of elements) {
        const text = element.textContent?.trim() || '';
        const match = text.match(modelPattern);
        if (match) {
          model = normalize(match[1] || match[0] || text);
          break;
        }
      }
      if (model) {
        break;
      }
    }
  }
  if (!model && bodyPattern) {
    const bodyText = doc.body?.textContent || '';
    const match = bodyText.match(bodyPattern);
    if (match) {
      model = normalize(match[1] || match[0]);
    }
  }
  return model || fallback;
}
function buildParsedMessage(options) {
  const { state, role, html, transformMarkdown } = options;
  let markdown = (0, import_markdown.chatHtmlToMarkdown)(html);
  if (typeof transformMarkdown === 'function') {
    markdown = transformMarkdown(markdown, { role, html });
  }
  if (!markdown.trim()) {
    return null;
  }
  const id = `msg-${state.chatIndex++}`;
  return {
    id,
    role,
    html,
    md: markdown,
    text: markdown,
  };
}
function buildMessageAccumulator(startAt = 1) {
  return {
    messages: [],
    state: { chatIndex: startAt },
    push(options) {
      const message = buildParsedMessage({
        ...options,
        state: this.state,
      });
      if (message) {
        this.messages.push(message);
      }
      return message;
    },
  };
}
