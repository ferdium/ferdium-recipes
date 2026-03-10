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
var chatgpt_exports = {};
__export(chatgpt_exports, {
  chatgptParser: () => chatgptParser,
});
module.exports = __toCommonJS(chatgpt_exports);
var import_parserCore = require('../shared/parserCore');
const CHATGPT_ARTICLE_SELECTOR = 'article, [data-message-author-role]';
const CHATGPT_HEADER_SELECTOR = 'h5';
const CHATGPT_TITLE_REPLACE_TEXT = ' - ChatGPT';
function isElementVisible(element) {
  if (!element) {
    return false;
  }
  if (element.getAttribute('aria-hidden') === 'true' || element.hidden) {
    return false;
  }
  const style = window.getComputedStyle(element);
  if (
    style.display === 'none' ||
    style.visibility === 'hidden' ||
    style.opacity === '0'
  ) {
    return false;
  }
  return element.getClientRects().length > 0;
}
function getVisibleArticles(doc) {
  const allArticles = (0, import_parserCore.toArray)(
    doc.querySelectorAll(CHATGPT_ARTICLE_SELECTOR),
  );
  const uniqueArticles = allArticles.filter(
    (article, index) => allArticles.indexOf(article) === index,
  );
  const visibleArticles = uniqueArticles.filter(
    article => isElementVisible(article) && (article.textContent || '').trim(),
  );
  return visibleArticles.length > 0 ? visibleArticles : uniqueArticles;
}
function extractChatGPTChatData(doc) {
  const articles = getVisibleArticles(doc);
  if (articles.length === 0) {
    return (0, import_parserCore.createEmptyResult)();
  }
  const title = (0, import_parserCore.readTitleFromDocument)(doc, {
    replacements: [CHATGPT_TITLE_REPLACE_TEXT],
    fallbackTitle: 'Conversation',
  });
  const model = (0, import_parserCore.readModelFromDocument)(doc, {
    buttonPattern:
      /^(gpt-[\d.]+[a-z]*|o1(?:-mini|-preview)?|chatgpt\s*[\d.]*[a-z]*)$/i,
    modelSelectors: [
      '[class*="model"]',
      '[class*="Model"]',
      '[data-testid*="model"]',
      '.text-token-text-secondary',
      'select option[selected]',
    ],
    modelPattern:
      /(gpt-[\d.]+[a-z]*|o1(?:-mini|-preview)?|chatgpt\s*[\d.]*[a-z]*)/i,
    bodyPattern:
      /(?:model|模型)[\s:]*(gpt-[\d.]+[a-z]*|o1(?:-mini|-preview)?|chatgpt\s*[\d.]*[a-z]*)/i,
  });
  const accumulator = (0, import_parserCore.buildMessageAccumulator)();
  for (const article of articles) {
    const header =
      article.querySelector(CHATGPT_HEADER_SELECTOR)?.textContent?.trim() || '';
    const headerLower = header.toLowerCase();
    const isUser =
      headerLower.includes('you said') ||
      headerLower.includes('you') ||
      headerLower.includes('您说') ||
      headerLower.includes('您') ||
      article.classList.contains('user') ||
      article.dataset.messageAuthorRole === 'user' ||
      article.querySelector('[data-message-author-role="user"]') !== null;
    accumulator.push({
      role: isUser ? 'user' : 'assistant',
      html: article.innerHTML,
      transformMarkdown(markdown) {
        return markdown
          .replace(/^您说[:：]\s*/gm, '')
          .replace(/^ChatGPT\s*说[:：]\s*/gm, '')
          .replace(/^you\s+said[:：]\s*/gim, '')
          .replace(/^chatgpt\s+said[:：]\s*/gim, '')
          .replace(/您说[:：]\s*/g, '')
          .replace(/ChatGPT\s*说[:：]\s*/g, '')
          .replace(/you\s+said[:：]\s*/gi, '')
          .replace(/chatgpt\s+said[:：]\s*/gi, '')
          .trim();
      },
    });
  }
  return {
    title,
    messages: accumulator.messages,
    assets: [],
    model: model || void 0,
  };
}
const chatgptParser = {
  id: 'chatgpt',
  parse: doc => extractChatGPTChatData(doc),
};
