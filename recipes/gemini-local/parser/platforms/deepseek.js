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
var deepseek_exports = {};
__export(deepseek_exports, {
  deepseekParser: () => deepseekParser,
});
module.exports = __toCommonJS(deepseek_exports);
var import_parserCore = require('../shared/parserCore');
const DEEPSEEK_MESSAGE_CONTAINER_SELECTOR =
  '[class*="message"], [class*="Message"]';
const DEEPSEEK_USER_MESSAGE_SELECTOR = '[class*="user"], [class*="User"]';
const DEEPSEEK_ASSISTANT_MESSAGE_SELECTOR =
  '[class*="assistant"], [class*="Assistant"], [class*="bot"]';
const DEEPSEEK_TITLE_REPLACE_TEXT = ' - DeepSeek';
function extractDeepSeekChatData(doc) {
  const messageContainers = (0, import_parserCore.toArray)(
    doc.querySelectorAll(DEEPSEEK_MESSAGE_CONTAINER_SELECTOR),
  );
  if (messageContainers.length === 0) {
    return (0, import_parserCore.createEmptyResult)();
  }
  const title = (0, import_parserCore.readTitleFromDocument)(doc, {
    replacements: [DEEPSEEK_TITLE_REPLACE_TEXT],
    sidebarSelectors: ['[class*="conversation-title"], [class*="chat-title"]'],
    fallbackTitle: 'DeepSeek 对话',
  });
  const model = (0, import_parserCore.readModelFromDocument)(doc, {
    modelSelectors: [
      '[class*="model"], [class*="Model"]',
      '[data-testid*="model"]',
      'select option[selected]',
    ],
    modelPattern: /(deepseek|r1|chat)/i,
    bodyPattern:
      /deepseek[\s-]*(?:v3|r1|coder|chat|general|math|reasoning|vision|turbo|pro)/i,
    fallback: 'DeepSeek',
  });
  const accumulator = (0, import_parserCore.buildMessageAccumulator)();
  for (const element of messageContainers) {
    let role = 'assistant';
    let contentElem = null;
    if (element.matches(DEEPSEEK_USER_MESSAGE_SELECTOR)) {
      role = 'user';
      contentElem = element.querySelector(
        '[class*="content"], [class*="text"], article, div, p',
      );
    } else if (element.matches(DEEPSEEK_ASSISTANT_MESSAGE_SELECTOR)) {
      role = 'assistant';
      contentElem = element.querySelector(
        '[class*="content"], [class*="markdown"], article, div, p',
      );
    }
    accumulator.push({
      role,
      html: (contentElem || element).innerHTML,
    });
  }
  return {
    title,
    messages: accumulator.messages,
    assets: [],
    model: model || void 0,
  };
}
const deepseekParser = {
  id: 'deepseek',
  parse: doc => extractDeepSeekChatData(doc),
};
