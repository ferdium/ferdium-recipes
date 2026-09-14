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
var dom_exports = {};
__export(dom_exports, {
  cleanupUIElements: () => cleanupUIElements,
});
module.exports = __toCommonJS(dom_exports);
function cleanupUIElements(container) {
  const selectorsToRemove = [
    '.thoughts-header-button-content',
    '[class*="thoughts-header-button"]',
    '[class*="thinking-header-button"]',
    '.mat-mdc-button-ripple',
    '[class*="button-ripple"]',
    'button',
    '.button',
    '[role="button"]',
    'nav',
    '.navigation',
    '.controls',
    '.tooltip',
    '.overlay',
    '.popup',
    '[hidden]',
    '[style*="display: none"]',
    '[style*="display:none"]',
    '[aria-hidden="true"]',
    '.tabular-nums',
    '[class*="tabular-nums"]',
    'sources-carousel',
    'sources-carousel-inline',
    'card-renderer',
    'default-source-card',
    'url-source-card',
  ];
  for (const selector of selectorsToRemove) {
    try {
      const elements = container.querySelectorAll(selector);
      for (const el of elements) el.remove();
    } catch (error) {
      console.debug('[cleanupUIElements] ignore invalid selector', {
        selector,
        error,
      });
    }
  }
  const textPatternsToRemove = [
    /^导出到\s*google\s*表格$/i,
    /^export to\s*google\s*sheets$/i,
    /^复制$/i,
    /^copy$/i,
    /^下载$/i,
    /^download$/i,
    /^显示思路$/i,
    /^show\s*thinking$/i,
    /^隐藏思路$/i,
    /^hide\s*thinking$/i,
    /^思考过程$/i,
    /^thinking$/i,
    /^您说[:：]\s*$/i,
    /^chatgpt\s*说[:：]\s*$/i,
    /^you\s+said[:：]\s*$/i,
    /^chatgpt\s+said[:：]\s*$/i,
    /^\d+\/\d+$/,
  ];
  const allElements = [...container.querySelectorAll('*')];
  for (const el of allElements) {
    if (el.tagName.toLowerCase() === 'table' || el.querySelector('table')) {
      continue;
    }
    const text = el.textContent?.trim() || '';
    if (
      textPatternsToRemove.some(pattern => pattern.test(text)) &&
      (el.children.length === 0 || text.length < 50)
    ) {
      el.remove();
    }
  }
  const tables = container.querySelectorAll('table');
  for (const table of tables) {
    let nextSibling = table.nextElementSibling;
    while (nextSibling) {
      const text = nextSibling.textContent?.trim() || '';
      const isFooter =
        nextSibling.classList.contains('table-footer') ||
        /导出|export|复制|copy|下载|download/i.test(text);
      if (isFooter && text.length < 100) {
        const toRemove = nextSibling;
        nextSibling = nextSibling.nextElementSibling;
        toRemove.remove();
      } else {
        break;
      }
    }
  }
}
