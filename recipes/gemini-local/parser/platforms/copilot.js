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
var copilot_exports = {};
__export(copilot_exports, {
  copilotParser: () => copilotParser,
});
module.exports = __toCommonJS(copilot_exports);
var import_parserCore = require('../shared/parserCore');
const COPILOT_MESSAGE_SELECTOR =
  '[data-content="user-message"], [data-content="ai-message"]';
const COPILOT_USER_MESSAGE_SELECTOR = '[data-content="user-message"]';
function extractCopilotChatData(doc) {
  const messageItems = (0, import_parserCore.toArray)(
    doc.querySelectorAll(COPILOT_MESSAGE_SELECTOR),
  );
  if (messageItems.length === 0) {
    return (0, import_parserCore.createEmptyResult)();
  }
  const accumulator = (0, import_parserCore.buildMessageAccumulator)();
  let rawTitle = '';
  const selected = doc.querySelector('[role="option"][aria-selected="true"]');
  if (selected) {
    rawTitle =
      selected.querySelector('p')?.textContent?.trim() ||
      (selected.getAttribute('aria-label') || '')
        .split(',')
        .slice(1)
        .join(',')
        .trim();
  }
  if (!rawTitle) {
    rawTitle = (doc.title || '')
      .replace(/^\s*microsoft[\s_-]*copilot.*$/i, '')
      .replace(/\s*[|–-]\s*copilot.*$/i, '')
      .trim();
  }
  if (!rawTitle) rawTitle = 'Copilot Conversation';
  for (const item of messageItems) {
    accumulator.push({
      role: item.matches(COPILOT_USER_MESSAGE_SELECTOR) ? 'user' : 'assistant',
      html: item.innerHTML,
    });
  }
  return { title: rawTitle, messages: accumulator.messages, assets: [] };
}
const copilotParser = {
  id: 'copilot',
  parse: doc => extractCopilotChatData(doc),
};
