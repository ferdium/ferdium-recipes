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
var kimi_exports = {};
__export(kimi_exports, {
  kimiParser: () => kimiParser,
});
module.exports = __toCommonJS(kimi_exports);
var import_parserCore = require('../shared/parserCore');
const KIMI_MESSAGE_CONTAINER_SELECTOR =
  '[class*="message"], [class*="Message"], [class*="chat-content-item"]';
const KIMI_USER_MESSAGE_SELECTOR =
  '[class*="user"], [class*="User"], [class*="chat-content-item-user"]';
const KIMI_ASSISTANT_MESSAGE_SELECTOR =
  '[class*="assistant"], [class*="Assistant"], [class*="kimi"], [class*="chat-content-item-assistant"]';
const KIMI_TITLE_REPLACE_TEXT = ' - Kimi';
const KIMI_USER_CONTENT_SELECTORS = [
  '[class*="segment-text"]',
  '[class*="segment-content"]',
  '[class*="content"], [class*="text"]',
];
const KIMI_ASSISTANT_CONTENT_SELECTORS = [
  '[class*="segment-content"]',
  '[class*="segment-markdown"]',
  '[class*="content"], [class*="markdown"], article',
];
const KIMI_REMOVABLE_SECTION_SELECTORS = [
  '[class*="search-plus"]',
  '[class*="product-widget"]',
  '[class*="recommend-prompt"]',
  '[class*="memory-section"]',
  '[class*="create-card"]',
  '[class*="okc-task-bar"]',
  '[class*="okc-continue-button"]',
  '[class*="drop-file-mask"]',
  '[class*="segment-code-header"]',
  '[class*="segment-assistant-actions"]',
  '[class*="share-action"]',
  '[class*="share-btn"]',
  '[class*="share-button"]',
  '[class*="share-icon"]',
  '[data-block-type="feed"]',
];
const KIMI_ACTION_CONTAINER_SELECTOR =
  '[class*="segment-code-header"], [class*="table-actions"], [class*="segment-assistant-actions"], [class*="segment-actions"], header[class*="table"]';
const KIMI_ACTION_TEXTS = /* @__PURE__ */ new Set([
  '分享',
  '复制',
  '预览',
  '重试',
  '编辑',
]);
const KIMI_BLOCK_HEADER_SELECTOR =
  '[class*="segment-block-header"], header[class*="table"], [class*="table-actions"]';
function sanitizeKimiContent(element) {
  const ownerDocument = element.ownerDocument || document;
  const clone = element.cloneNode(true);
  for (const selector of KIMI_REMOVABLE_SECTION_SELECTORS) {
    for (const node of (0, import_parserCore.toArray)(
      clone.querySelectorAll(selector),
    ))
      node.remove();
  }
  for (const node of (0, import_parserCore.toArray)(
    clone.querySelectorAll('span, button, a, div'),
  )) {
    if (!(node instanceof HTMLElement)) continue;
    const text = node.textContent?.trim();
    if (!text) continue;
    if (
      text.toLowerCase() === 'share' ||
      text.toLowerCase() === 'copy' ||
      KIMI_ACTION_TEXTS.has(text)
    ) {
      const actionContainer = node.closest(KIMI_ACTION_CONTAINER_SELECTOR);
      if (actionContainer) {
        node.remove();
      }
    }
  }
  for (const header of (0, import_parserCore.toArray)(
    clone.querySelectorAll(KIMI_BLOCK_HEADER_SELECTOR),
  )) {
    const label = extractHeaderLabel(header)?.trim();
    const table = findNextTable(header);
    if (table && label) {
      table.dataset.kimiLabel = label;
      const fragment = ownerDocument.createDocumentFragment();
      fragment.append(table);
      header.replaceWith(fragment);
      continue;
    }
    if (label) {
      const paragraph = ownerDocument.createElement('p');
      paragraph.textContent = label;
      header.replaceWith(paragraph);
    } else {
      header.remove();
    }
  }
  return clone;
}
function findNextTable(header) {
  let sibling = header.nextElementSibling;
  while (sibling) {
    if (sibling instanceof HTMLElement) {
      if (sibling.tagName.toLowerCase() === 'table') {
        return sibling;
      }
      const nested = sibling.querySelector('table');
      if (nested) {
        return nested;
      }
    }
    sibling = sibling.nextElementSibling;
  }
  const parent = header.parentElement;
  if (parent) {
    return parent.querySelector('table');
  }
  return null;
}
function extractHeaderLabel(header) {
  const labelSelectors = [
    '[class*="table-name"]',
    '[class*="table-title"]',
    '[class*="tag"]',
    '[class*="label"]',
  ];
  for (const selector of labelSelectors) {
    const candidate = header.querySelector(selector);
    const text = candidate?.textContent?.replace(/分享|复制/gi, '').trim();
    if (text) return text;
  }
  for (const child of (0, import_parserCore.toArray)(header.childNodes)) {
    if (child.nodeType === Node.TEXT_NODE) {
      const text = child.textContent?.replace(/分享|复制/gi, '').trim();
      if (text) return text.split(/\s+/)[0];
    } else if (child instanceof HTMLElement) {
      const text = child.textContent?.replace(/分享|复制/gi, '').trim();
      if (text) return text;
    }
  }
  return void 0;
}
function extractKimiChatData(doc) {
  const messageContainers = (0, import_parserCore.toArray)(
    doc.querySelectorAll(KIMI_MESSAGE_CONTAINER_SELECTOR),
  );
  if (messageContainers.length === 0) {
    return (0, import_parserCore.createEmptyResult)();
  }
  const title = (0, import_parserCore.readTitleFromDocument)(doc, {
    replacements: [KIMI_TITLE_REPLACE_TEXT],
    sidebarSelectors: ['[class*="conversation-title"], [class*="chat-title"]'],
    fallbackTitle: 'Kimi 对话',
  });
  const model = (0, import_parserCore.readModelFromDocument)(doc, {
    modelSelectors: [
      '[class*="model"], [class*="Model"]',
      '[data-testid*="model"]',
      'select option[selected]',
    ],
    modelPattern: /(kimi|moonshot|moa)/i,
    bodyPattern: /kimi[\s-]*(1\.5|2\.0|pro|plus|max)|moonshot\s*(ai)?/i,
  });
  const accumulator = (0, import_parserCore.buildMessageAccumulator)();
  for (const element of messageContainers) {
    let role = 'assistant';
    let contentElem = null;
    if (element.matches(KIMI_USER_MESSAGE_SELECTOR)) {
      role = 'user';
      contentElem = (0, import_parserCore.queryFirst)(
        element,
        KIMI_USER_CONTENT_SELECTORS,
      );
    } else if (element.matches(KIMI_ASSISTANT_MESSAGE_SELECTOR)) {
      contentElem = (0, import_parserCore.queryFirst)(
        element,
        KIMI_ASSISTANT_CONTENT_SELECTORS,
      );
    }
    accumulator.push({
      role,
      html: sanitizeKimiContent(contentElem || element).innerHTML,
    });
  }
  return {
    title,
    messages: accumulator.messages,
    assets: [],
    model: model || void 0,
  };
}
const kimiParser = {
  id: 'kimi',
  parse: doc => extractKimiChatData(doc),
};
