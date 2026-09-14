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
var registry_exports = {};
__export(registry_exports, {
  EMPTY_RESULT: () => EMPTY_RESULT,
  listParsers: () => listParsers,
  resolveParser: () => resolveParser,
});
module.exports = __toCommonJS(registry_exports);
var import_constants = require('./shared/constants');
var import_chatgpt = require('./platforms/chatgpt');
var import_claude = require('./platforms/claude');
var import_copilot = require('./platforms/copilot');
var import_gemini = require('./platforms/gemini');
var import_tongyi = require('./platforms/tongyi');
var import_deepseek = require('./platforms/deepseek');
var import_kimi = require('./platforms/kimi');
const registeredParsers = [
  import_chatgpt.chatgptParser,
  import_claude.claudeParser,
  import_copilot.copilotParser,
  import_gemini.geminiParser,
  import_tongyi.tongyiParser,
  import_deepseek.deepseekParser,
  import_kimi.kimiParser,
];
const parserMap = /* @__PURE__ */ new Map();
for (const parser of registeredParsers) {
  parserMap.set(parser.id, parser);
  if (parser.aliases)
    for (const alias of parser.aliases) parserMap.set(alias, parser);
}
function resolveParser(platform) {
  const key = platform.toLowerCase();
  return parserMap.get(key);
}
function listParsers() {
  return [...registeredParsers];
}
const EMPTY_RESULT = {
  title: import_constants.DEFAULT_CHAT_TITLE,
  messages: [],
  assets: [],
};
