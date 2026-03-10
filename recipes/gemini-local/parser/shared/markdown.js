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
var markdown_exports = {};
__export(markdown_exports, {
  chatHtmlToMarkdown: () => chatHtmlToMarkdown,
  nodeToMarkdown: () => nodeToMarkdown,
});
module.exports = __toCommonJS(markdown_exports);
var import_dom = require('./dom');
const LANGUAGE_ALIAS_MAP = {
  'c++': 'cpp',
  'c#': 'csharp',
  'f#': 'fsharp',
  'plain text': 'text',
  plaintext: 'text',
  shell: 'bash',
  sh: 'bash',
  ps: 'powershell',
  ps1: 'powershell',
  objc: 'objective-c',
  'objective c': 'objective-c',
  'objective-c': 'objective-c',
  js: 'javascript',
  ts: 'typescript',
};
const CODE_LABEL_SKIP_SELECTOR =
  'button, .button, [role="button"], [class*="copy" i], [class*="action" i], [class*="toolbar" i]';
const KNOWN_LANGUAGE_LABELS = /* @__PURE__ */ new Set([
  'bash',
  'c',
  'c++',
  'cpp',
  'c#',
  'csharp',
  'clojure',
  'cmake',
  'cmd',
  'css',
  'dart',
  'dockerfile',
  'elixir',
  'erlang',
  'fish',
  'f#',
  'fsharp',
  'fortran',
  'go',
  'golang',
  'graphql',
  'groovy',
  'haskell',
  'html',
  'ini',
  'java',
  'javascript',
  'json',
  'julia',
  'kotlin',
  'latex',
  'less',
  'lua',
  'makefile',
  'markdown',
  'matlab',
  'md',
  'nim',
  'objective c',
  'objective-c',
  'objc',
  'ocaml',
  'perl',
  'php',
  'plain text',
  'plaintext',
  'powershell',
  'proto',
  'protobuf',
  'python',
  'r',
  'jsx',
  'reasonml',
  'ruby',
  'rust',
  'sas',
  'scala',
  'scheme',
  'scss',
  'shell',
  'sh',
  'sql',
  'stata',
  'swift',
  'tex',
  'text',
  'toml',
  'ts',
  'tsx',
  'typescript',
  'vb',
  'vb.net',
  'visual basic',
  'wasm',
  'webassembly',
  'xml',
  'yaml',
  'yml',
  'zig',
]);
let headingLevelOffset = 0;
let pendingCodeLanguageLabel = null;
function resolveLanguageLabel(label) {
  if (!label) return null;
  const trimmed = label.trim().replace(/[：:]+$/u, '');
  if (!trimmed) return null;
  const lower = trimmed.toLowerCase();
  if (LANGUAGE_ALIAS_MAP[lower]) {
    return LANGUAGE_ALIAS_MAP[lower];
  }
  if (KNOWN_LANGUAGE_LABELS.has(lower)) {
    return trimmed === trimmed.toUpperCase() ? lower : trimmed;
  }
  const collapsedLower = lower.replace(/\s+/g, '');
  if (LANGUAGE_ALIAS_MAP[collapsedLower]) {
    return LANGUAGE_ALIAS_MAP[collapsedLower];
  }
  if (KNOWN_LANGUAGE_LABELS.has(collapsedLower)) {
    const collapsedOriginal = trimmed.replace(/\s+/g, '');
    if (collapsedOriginal === collapsedOriginal.toUpperCase()) {
      return collapsedLower;
    }
    return collapsedOriginal;
  }
  return null;
}
function findAssociatedPreElement(elem) {
  let current = elem.nextElementSibling;
  while (current) {
    if (current.matches(CODE_LABEL_SKIP_SELECTOR)) {
      current = current.nextElementSibling;
      continue;
    }
    if (current.tagName.toLowerCase() === 'pre') {
      return current;
    }
    const nestedPre = current.querySelector?.('pre');
    if (nestedPre) {
      return nestedPre;
    }
    break;
  }
  const parent = elem.parentElement;
  if (parent) {
    const candidate = parent.querySelector('pre');
    if (candidate) {
      const relation = elem.compareDocumentPosition(candidate);
      if (relation & Node.DOCUMENT_POSITION_FOLLOWING) {
        return candidate;
      }
    }
  }
  return null;
}
function isLikelyLanguageLabel(elem, text) {
  const preElement = findAssociatedPreElement(elem);
  if (!preElement) {
    return false;
  }
  const hasCodeChild = !!preElement.querySelector('code');
  if (!hasCodeChild) {
    return false;
  }
  const classAttr = elem.getAttribute('class') || '';
  const attrLanguage =
    elem.dataset.language || elem.dataset.codeLanguage || elem.dataset.lang;
  if (attrLanguage) {
    return true;
  }
  if (resolveLanguageLabel(text)) {
    return true;
  }
  if (
    /\b(language|lang|syntax|code|chip|badge|toolbar|label)\b/i.test(classAttr)
  ) {
    return true;
  }
  if (text && text === text.toUpperCase() && text.length <= 15) {
    return true;
  }
  return false;
}
function normalizeLanguageTag(label) {
  const resolved = resolveLanguageLabel(label);
  if (resolved) {
    return resolved;
  }
  const trimmed = label.trim();
  if (!trimmed) {
    return '';
  }
  return trimmed === trimmed.toUpperCase() ? trimmed.toLowerCase() : trimmed;
}
function captureLanguageLabel(elem) {
  if (elem.querySelector('pre')) {
    return false;
  }
  const textContent = elem.textContent?.trim() || '';
  if (!textContent) {
    return false;
  }
  if (!isLikelyLanguageLabel(elem, textContent)) {
    return false;
  }
  const attrLanguage =
    elem.dataset.language || elem.dataset.codeLanguage || elem.dataset.lang;
  const labelSource = attrLanguage || textContent;
  let normalized = normalizeLanguageTag(labelSource);
  if (!normalized) {
    normalized = labelSource.trim();
  }
  pendingCodeLanguageLabel = normalized || null;
  return true;
}
function captureLanguageLabelFromTextNode(node, rawText) {
  const resolvedLabel = resolveLanguageLabel(rawText);
  if (!resolvedLabel) {
    return false;
  }
  let sibling = node.nextSibling;
  while (sibling) {
    if (sibling.nodeType === Node.TEXT_NODE) {
      const siblingText = sibling.textContent || '';
      if (siblingText.trim() === '') {
        sibling = sibling.nextSibling;
        continue;
      }
      return false;
    }
    if (sibling.nodeType === Node.ELEMENT_NODE) {
      const elem = sibling;
      if (elem.matches(CODE_LABEL_SKIP_SELECTOR)) {
        sibling = elem.nextSibling;
        continue;
      }
      if (elem.tagName.toLowerCase() === 'pre') {
        pendingCodeLanguageLabel = normalizeLanguageTag(resolvedLabel);
        return true;
      }
      const nestedPre = elem.querySelector('pre');
      if (nestedPre) {
        pendingCodeLanguageLabel = normalizeLanguageTag(resolvedLabel);
        return true;
      }
      break;
    }
    break;
  }
  const parent = node.parentElement;
  if (parent) {
    const associatedPre = findAssociatedPreElement(parent);
    if (associatedPre) {
      pendingCodeLanguageLabel = normalizeLanguageTag(resolvedLabel);
      return true;
    }
  }
  return false;
}
function nodeToMarkdown(node, indent = '') {
  if (node.nodeType === Node.TEXT_NODE) {
    const textContent = node.textContent || '';
    if (captureLanguageLabelFromTextNode(node, textContent)) {
      return '';
    }
    return textContent;
  }
  if (node.nodeType === Node.ELEMENT_NODE) {
    const elem = node;
    if (captureLanguageLabel(elem)) {
      return '';
    }
    const tagName = elem.tagName.toLowerCase();
    if (tagName === 'source-footnote') {
      const sup = elem.querySelector('sup');
      if (sup) {
        let number = sup.textContent?.trim();
        if (!number) {
          const sourceIndex = sup.dataset.turnSourceIndex;
          if (sourceIndex) {
            number = sourceIndex;
          }
        }
        if (number) {
          return `[${number}]`;
        }
      }
      return '';
    }
    if (
      elem.classList.contains('katex') ||
      elem.classList.contains('math-inline')
    ) {
      const annotation = elem.querySelector(
        'annotation[encoding="application/x-tex"]',
      );
      if (annotation?.textContent) {
        return `$${annotation.textContent}$`;
      }
      const mathml = elem.querySelector('math');
      if (mathml?.textContent) {
        return mathml.textContent.trim();
      }
      const katexHtml = elem.querySelector('.katex-html');
      if (katexHtml) {
        let result = '';
        const bases = katexHtml.querySelectorAll('.base');
        for (const base of bases) {
          for (const child of base.children) {
            const childElem = child;
            const className = childElem.className || '';
            if (className.includes('strut')) continue;
            if (className.includes('mord') || className.includes('mbin')) {
              const msupsub = childElem.querySelector('.msupsub');
              if (msupsub) {
                const baseText = [...childElem.childNodes]
                  .filter(
                    n =>
                      n.nodeType === Node.TEXT_NODE ||
                      (n.nodeType === Node.ELEMENT_NODE &&
                        !n.classList.contains('msupsub')),
                  )
                  .map(n => n.textContent)
                  .join('');
                const mtight = msupsub.querySelector('.mtight');
                const supText = mtight?.textContent || '';
                const superscriptMap = {
                  0: '\u2070',
                  1: '\u00B9',
                  2: '\u00B2',
                  3: '\u00B3',
                  4: '\u2074',
                  5: '\u2075',
                  6: '\u2076',
                  7: '\u2077',
                  8: '\u2078',
                  9: '\u2079',
                  '+': '\u207A',
                  '-': '\u207B',
                  '=': '\u207C',
                  '(': '\u207D',
                  ')': '\u207E',
                };
                const superscript = [...supText]
                  .map(char => superscriptMap[char] || char)
                  .join('');
                result += `${baseText}${superscript}`;
              } else {
                result += childElem.textContent || '';
              }
            } else if (className.includes('mop')) {
              result += childElem.textContent || '';
            }
          }
        }
        return result.trim();
      }
      const textContent = elem.textContent?.trim();
      if (textContent) {
        return textContent;
      }
      return '';
    }
    if (tagName === 'table') {
      return processTable(elem);
    }
    if (tagName === 'ul' || tagName === 'ol') {
      const items = [...elem.children].filter(
        child => child.tagName.toLowerCase() === 'li',
      );
      const isOrdered = tagName === 'ol';
      const startAttr = elem.getAttribute('start');
      let startNumber = 1;
      if (isOrdered && startAttr) {
        const parsed = Number.parseInt(startAttr, 10);
        if (!Number.isNaN(parsed)) {
          startNumber = parsed;
        }
      }
      return items
        .map((li, index) =>
          processListItem(li, indent, isOrdered ? startNumber + index : void 0),
        )
        .join('');
    }
    if (tagName === 'pre') {
      const tableInside = elem.querySelector('table');
      if (tableInside) {
        return `
${processChildren(elem, indent)}
`;
      }
      const codeElem = elem.querySelector('code');
      if (codeElem) {
        let language =
          codeElem
            .getAttribute('class')
            ?.split(' ')
            .find(cls => cls.startsWith('language-'))
            ?.replace('language-', '')
            ?.trim() ?? '';
        const attrLanguage =
          codeElem.dataset.language ||
          elem.dataset.language ||
          elem.dataset.codeLanguage ||
          elem.dataset.lang ||
          '';
        if (attrLanguage) {
          language = attrLanguage;
        }
        if (!language && pendingCodeLanguageLabel) {
          language = pendingCodeLanguageLabel;
        }
        pendingCodeLanguageLabel = null;
        const normalizedLanguage = language
          ? normalizeLanguageTag(language)
          : '';
        const codeContent = codeElem.textContent || '';
        const languageFence = normalizedLanguage || '';
        return `

\`\`\`${languageFence}
${codeContent}
\`\`\`

`;
      }
      pendingCodeLanguageLabel = null;
      return `

\`\`\`
${elem.textContent || ''}
\`\`\`

`;
    }
    if (tagName === 'code') {
      return '`' + (elem.textContent || '') + '`';
    }
    if (tagName === 'strong' || tagName === 'b') {
      const content = processChildren(elem, indent);
      const prevSibling = elem.previousSibling;
      const nextSibling = elem.nextSibling;
      const needSpaceBefore = !!(
        prevSibling &&
        prevSibling.nodeType === Node.TEXT_NODE &&
        prevSibling.textContent &&
        /\S$/.test(prevSibling.textContent)
      );
      const needSpaceAfter = !!(
        nextSibling &&
        nextSibling.nodeType === Node.TEXT_NODE &&
        nextSibling.textContent &&
        /^\S/.test(nextSibling.textContent)
      );
      return (
        (needSpaceBefore ? ' ' : '') +
        '**' +
        content +
        '**' +
        (needSpaceAfter ? ' ' : '')
      );
    }
    if (tagName === 'em' || tagName === 'i') {
      const content = processChildren(elem, indent);
      const prevSibling = elem.previousSibling;
      const nextSibling = elem.nextSibling;
      const needSpaceBefore = !!(
        prevSibling &&
        prevSibling.nodeType === Node.TEXT_NODE &&
        prevSibling.textContent &&
        /\S$/.test(prevSibling.textContent)
      );
      const needSpaceAfter = !!(
        nextSibling &&
        nextSibling.nodeType === Node.TEXT_NODE &&
        nextSibling.textContent &&
        /^\S/.test(nextSibling.textContent)
      );
      return (
        (needSpaceBefore ? ' ' : '') +
        '*' +
        content +
        '*' +
        (needSpaceAfter ? ' ' : '')
      );
    }
    if (tagName === 'a') {
      const href = elem.getAttribute('href') || '';
      const text = processChildren(elem, indent);
      return `[${text}](${href})`;
    }
    if (tagName === 'img') {
      let src = elem.getAttribute('src') || '';
      const alt = elem.getAttribute('alt') || '';
      if (src.startsWith('blob:')) {
        console.log(
          '[Image] Warning: Found unconverted blob URL during markdown conversion',
        );
        return '\n> \u26A0\uFE0F **[User uploaded image - not available]**\n> Gemini uses temporary blob URLs for uploaded images. The image could not be converted.\n\n';
      }
      if (!src) {
        src =
          elem.dataset.src ||
          elem.dataset.originalSrc ||
          elem.dataset.imageUrl ||
          elem.dataset.url ||
          '';
        if (!src) {
          console.log('[Image] Skipping image with empty URL');
          return '';
        }
      }
      if (src.startsWith('data:image/')) {
        console.log('[Image] Including base64 image in markdown');
      }
      return `![${alt}](${src})`;
    }
    if (
      tagName === 'image-query' ||
      tagName === 'uploaded-image' ||
      elem.classList.contains('uploaded-image') ||
      elem.classList.contains('image-container')
    ) {
      const imgElement = elem.querySelector('img');
      if (imgElement) {
        let src =
          imgElement.getAttribute('src') ||
          imgElement.dataset.src ||
          imgElement.dataset.originalSrc ||
          '';
        const alt = imgElement.getAttribute('alt') || 'Image';
        if (src && !src.startsWith('blob:')) {
          return `![${alt}](${src})`;
        }
      }
      let imageUrl =
        elem.dataset.imageUrl ||
        elem.dataset.src ||
        elem.dataset.url ||
        elem.getAttribute('src') ||
        '';
      if (imageUrl && !imageUrl.startsWith('blob:')) {
        return `![Image](${imageUrl})`;
      }
      console.log('[Image] Skipping custom image element with no valid URL');
      return '';
    }
    if (/^h[1-6]$/.test(tagName)) {
      const level = Number.parseInt(tagName[1]);
      const adjustedLevel = Math.max(
        2,
        Math.min(level + headingLevelOffset, 6),
      );
      return (
        '\n' +
        '#'.repeat(adjustedLevel) +
        ' ' +
        processChildren(elem, indent) +
        '\n\n'
      );
    }
    if (tagName === 'p') {
      const content = processChildren(elem, indent);
      return content + '\n\n';
    }
    if (tagName === 'br') {
      return '\n';
    }
    if (tagName === 'blockquote') {
      const quoteLines = processChildren(elem, indent)
        .split('\n')
        .map(line => (line ? `> ${line}` : '>'))
        .join('\n');
      return `
${quoteLines}

`;
    }
    if (tagName === 'hr') {
      return '\n---\n\n';
    }
    if (tagName === 'div' || tagName === 'span') {
      if (captureLanguageLabel(elem)) {
        return '';
      }
      return processChildren(elem, indent);
    }
    return processChildren(elem, indent);
  }
  return '';
}
function processChildren(elem, indent = '') {
  let result = '';
  for (const child of elem.childNodes) {
    result += nodeToMarkdown(child, indent);
  }
  return result;
}
function processTable(table) {
  const rows = [];
  let hasHeader = false;
  const kimiLabel = table.dataset.kimiLabel?.trim();
  const thead = table.querySelector('thead');
  if (thead) {
    const headerRows = thead.querySelectorAll('tr');
    for (const tr of headerRows) {
      const cells = [];
      for (const cell of tr.querySelectorAll('th, td')) {
        const cellContent = getCellContent(cell);
        cells.push(cellContent);
      }
      if (cells.length > 0) {
        rows.push(cells);
        hasHeader = true;
      }
    }
  }
  const tbody = table.querySelector('tbody');
  if (tbody) {
    const bodyRows = tbody.querySelectorAll('tr');
    for (const tr of bodyRows) {
      const cells = [];
      for (const cell of tr.querySelectorAll('td, th')) {
        const cellContent = getCellContent(cell);
        cells.push(cellContent);
      }
      if (cells.length > 0) {
        rows.push(cells);
      }
    }
  }
  if (!hasHeader && rows.length > 0) {
    hasHeader = true;
  }
  if (rows.length === 0) {
    return '';
  }
  if (kimiLabel && rows.length > 0 && rows[0].length > 0) {
    const headerRow = rows[0];
    rows[0] = [kimiLabel, ...headerRow];
    for (let i = 1; i < rows.length; i++) {
      rows[i] = [...rows[i], ''];
    }
  }
  let result = '\n\n';
  if (hasHeader) {
    const headerRow = rows[0];
    result += '| ' + headerRow.join(' | ') + ' |\n';
    result += '| ' + headerRow.map(() => '---').join(' | ') + ' |\n';
    for (let i = 1; i < rows.length; i++) {
      result += '| ' + rows[i].join(' | ') + ' |\n';
    }
  } else {
    for (const row of rows) {
      result += '| ' + row.join(' | ') + ' |\n';
    }
  }
  result += '\n';
  return result;
}
function getCellContent(cell) {
  let content = '';
  for (const child of cell.childNodes) {
    if (child.nodeType === Node.TEXT_NODE) {
      content += child.textContent || '';
    } else if (child.nodeType === Node.ELEMENT_NODE) {
      const elem = child;
      const tagName = elem.tagName.toLowerCase();
      if (
        elem.classList.contains('katex') ||
        elem.classList.contains('math-inline')
      ) {
        content += nodeToMarkdown(elem, '');
      } else
        switch (tagName) {
          case 'strong':
          case 'b': {
            const hasKatex = elem.querySelector('.katex, .math-inline');
            if (hasKatex) {
              content += '**';
              for (const grandChild of elem.childNodes) {
                if (grandChild.nodeType === Node.TEXT_NODE) {
                  content += grandChild.textContent || '';
                } else if (grandChild.nodeType === Node.ELEMENT_NODE) {
                  const grandElem = grandChild;
                  content +=
                    grandElem.classList.contains('katex') ||
                    grandElem.classList.contains('math-inline')
                      ? nodeToMarkdown(grandElem, '')
                      : grandElem.textContent || '';
                }
              }
              content += '**';
            } else {
              content += '**' + (elem.textContent || '') + '**';
            }

            break;
          }
          case 'em':
          case 'i': {
            content += '*' + (elem.textContent || '') + '*';

            break;
          }
          case 'code': {
            content += '`' + (elem.textContent || '') + '`';

            break;
          }
          case 'a': {
            const href = elem.getAttribute('href') || '';
            const text = elem.textContent || '';
            content += `[${text}](${href})`;

            break;
          }
          case 'br': {
            content += ' ';

            break;
          }
          case 'sup': {
            content += '^' + (elem.textContent || '') + '^';

            break;
          }
          case 'sub': {
            content += '~' + (elem.textContent || '') + '~';

            break;
          }
          default: {
            content += nodeToMarkdown(elem, '');
          }
        }
    }
  }
  content = content.trim();
  content = content.replace(/\s+/g, ' ');
  return content;
}
function processListItem(li, indent, itemNumber) {
  let result = '';
  const marker = itemNumber === void 0 ? '- ' : `${itemNumber}. `;
  const blockElements = [];
  const inlineFragments = [];
  for (const child of li.childNodes) {
    if (child.nodeType === Node.TEXT_NODE) {
      const text = child.textContent?.trim();
      if (text) {
        inlineFragments.push(text);
      }
      continue;
    }
    if (child.nodeType === Node.ELEMENT_NODE) {
      const elem = child;
      const tag = elem.tagName.toLowerCase();
      if (['ul', 'ol', 'table', 'pre', 'blockquote'].includes(tag)) {
        blockElements.push(elem);
        continue;
      }
      if (tag === 'p' || tag === 'div' || tag === 'span') {
        if (inlineFragments.length === 0 && blockElements.length === 0) {
          const collapsed = nodeToMarkdown(elem, indent + '  ')
            .replace(/\s+/g, ' ')
            .trim();
          const looksLikeNested = /^([*+-]|\d+\.)\s/.test(collapsed);
          if (collapsed && !looksLikeNested) {
            inlineFragments.push(collapsed);
            continue;
          }
        }
        blockElements.push(elem);
        continue;
      }
      inlineFragments.push(nodeToMarkdown(elem, indent + '  '));
    }
  }
  const inlineContent = inlineFragments.join(' ').trim();
  const remainingBlocks = blockElements;
  result += `${indent}${marker}${inlineContent}`;
  const blockContents = remainingBlocks
    .map(block => nodeToMarkdown(block, indent + '  ').replace(/\s+$/g, ''))
    .filter(content => content.trim().length > 0);
  if (blockContents.length > 0) {
    const prefix = inlineContent ? '\n\n' : '\n';
    result += prefix + blockContents.join('\n\n');
    return result + '\n\n';
  }
  return result + '\n';
}
function fixDanglingLanguageLabels(markdown) {
  if (!markdown.includes('```')) {
    return markdown;
  }
  const lines = markdown.split('\n');
  const result = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    if (trimmed) {
      const resolved = resolveLanguageLabel(trimmed);
      if (resolved) {
        let j = i + 1;
        while (j < lines.length && lines[j].trim() === '') {
          j++;
        }
        if (j < lines.length) {
          const fenceLine = lines[j];
          const fenceTrimmed = fenceLine.trim();
          if (fenceTrimmed === '```') {
            const indentMatch = fenceLine.match(/^\s*/);
            const indent = indentMatch ? indentMatch[0] : '';
            result.push(`${indent}\`\`\`${normalizeLanguageTag(resolved)}`);
            i = j;
            continue;
          }
        }
      }
    }
    result.push(line);
  }
  return result.join('\n');
}
function chatHtmlToMarkdown(html) {
  if (!html) return '';
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  (0, import_dom.cleanupUIElements)(tempDiv);
  const headings = tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6');
  let minHeadingLevel = 7;
  for (const h of headings) {
    const level = Number.parseInt(h.tagName[1]);
    if (level < minHeadingLevel) {
      minHeadingLevel = level;
    }
  }
  headingLevelOffset = minHeadingLevel <= 6 ? 2 - minHeadingLevel : 0;
  let markdown = processChildren(tempDiv);
  if (markdown.includes('TypeScript') || markdown.includes('typescript')) {
    console.debug('[markdown] intermediate result:', markdown);
  }
  markdown = markdown
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');
  markdown = markdown
    .replace(/\n\s*\n\s*\n/g, '\n\n')
    .replace(/^\s+|\s+$/g, '');
  markdown = fixDanglingLanguageLabels(markdown);
  if (markdown.includes('```TypeScript')) {
    console.debug('[markdown] final result:', markdown);
  }
  return markdown;
}
