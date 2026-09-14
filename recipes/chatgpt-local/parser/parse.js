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
var parse_exports = {};
__export(parse_exports, {
  chatHtmlToMarkdown: () => import_markdown.chatHtmlToMarkdown,
  parseChatDOM: () => parseChatDOM,
});
module.exports = __toCommonJS(parse_exports);
var import_registry = require('./registry');
var import_markdown = require('./shared/markdown');
function parseChatDOM(platform, doc, config) {
  const parser = (0, import_registry.resolveParser)(platform);
  if (!parser) {
    return import_registry.EMPTY_RESULT;
  }
  return parser.parse(doc, config);
}
