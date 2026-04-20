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
var assets_exports = {};
__export(assets_exports, {
  convertBlobImageToBase64: () => convertBlobImageToBase64,
});
module.exports = __toCommonJS(assets_exports);
function convertBlobImageToBase64(imgElement) {
  try {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    canvas.width = imgElement.naturalWidth || imgElement.width;
    canvas.height = imgElement.naturalHeight || imgElement.height;
    if (canvas.width === 0 || canvas.height === 0) {
      console.log('[Image] Image has no dimensions, skipping blob conversion');
      return null;
    }
    ctx.drawImage(imgElement, 0, 0);
    const base64 = canvas.toDataURL('image/jpeg', 0.8);
    const sizeKB = Math.round((base64.length * 0.75) / 1024);
    console.log(`[Image] Converted blob URL to base64 (${sizeKB} KB)`);
    return base64;
  } catch (error) {
    console.error('[Image] Failed to convert blob URL to base64:', error);
    return null;
  }
}
