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
var claude_exports = {};
__export(claude_exports, {
  claudeParser: () => claudeParser,
});
module.exports = __toCommonJS(claude_exports);
var import_parserCore = require('../shared/parserCore');
const CLAUDE_MAIN_CONTAINER_SELECTOR =
  '.flex-1.flex.flex-col.gap-3.px-4.max-w-3xl.mx-auto.w-full.pt-1';
const CLAUDE_USER_MESSAGE_SELECTOR = '[data-testid="user-message"]';
const CLAUDE_ASSISTANT_MESSAGE_SELECTOR = '.font-claude-response';
function extractClaudeChatData(doc) {
  const mainContainer = doc.querySelector(CLAUDE_MAIN_CONTAINER_SELECTOR);
  if (!mainContainer) {
    return (0, import_parserCore.createEmptyResult)();
  }
  const title = (0, import_parserCore.readTitleFromDocument)(doc, {
    replacements: [/ - Claude$/],
    fallbackTitle: 'Conversation',
  });
  const model = (0, import_parserCore.readModelFromDocument)(doc, {
    buttonSelectors: ['button'],
    buttonPattern: /^(sonnet|opus|haiku)\s+[\d.]+$/i,
    normalize(value) {
      return value ? `Claude ${value.trim()}` : '';
    },
  });
  const accumulator = (0, import_parserCore.buildMessageAccumulator)();
  for (const child of (0, import_parserCore.toArray)(mainContainer.children)) {
    const element = child;
    const userMessage = element.querySelector(CLAUDE_USER_MESSAGE_SELECTOR);
    if (userMessage) {
      accumulator.push({ role: 'user', html: userMessage.innerHTML });
      continue;
    }
    const assistantMessage = element.querySelector(
      CLAUDE_ASSISTANT_MESSAGE_SELECTOR,
    );
    if (assistantMessage) {
      const markdownContainer = assistantMessage.querySelector(
        '.standard-markdown, .progressive-markdown',
      );
      if (markdownContainer) {
        accumulator.push({
          role: 'assistant',
          html: markdownContainer.innerHTML,
        });
      }
    }
  }
  return { title, messages: accumulator.messages, assets: [], model };
}
const claudeParser = {
  id: 'claude',
  parse: doc => extractClaudeChatData(doc),
};
