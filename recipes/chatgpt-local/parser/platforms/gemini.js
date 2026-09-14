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
var gemini_exports = {};
__export(gemini_exports, {
  geminiParser: () => geminiParser,
});
module.exports = __toCommonJS(gemini_exports);
var import_constants = require('../shared/constants');
var import_assets = require('../shared/assets');
var import_markdown = require('../shared/markdown');
const GEMINI_MESSAGE_ITEM_SELECTOR = 'user-query, model-response';
const GEMINI_SIDEBAR_ACTIVE_CHAT_SELECTOR =
  'div[data-test-id="conversation"].selected .conversation-title';
const GEMINI_TITLE_REPLACE_TEXT = 'Gemini - ';
const DEEP_RESEARCH_SELECTORS = [
  'deep-research-immersive-panel',
  'deep-research-confirmation-widget',
  'deep-research-processing-indicator',
];
const GeminiDeepResearchHelper = {
  SELECTORS: DEEP_RESEARCH_SELECTORS,
  CLASS_MATCHER: '[class*="deep-research"]',
  isDeepResearchSession(doc) {
    return Boolean(
      this.SELECTORS.some(selector => doc.querySelector(selector)) ||
        doc.querySelector(this.CLASS_MATCHER),
    );
  },
  queryAllDeep(root, selector) {
    const results = [];
    const visited = /* @__PURE__ */ new Set();
    const queue = [];
    const enqueue = node => {
      if (!node || visited.has(node)) return;
      visited.add(node);
      queue.push(node);
    };
    enqueue(root instanceof Document ? root : root);
    while (queue.length > 0) {
      const current = queue.shift();
      if (!current) continue;
      if ('querySelectorAll' in current) {
        for (const el of current.querySelectorAll(selector)) {
          results.push(el);
        }
      }
      let childElements = [];
      if (current instanceof Document) {
        if (current.documentElement) {
          childElements = [current.documentElement];
        }
      } else if (current instanceof ShadowRoot) {
        childElements = [...current.children];
      } else if (current instanceof Element) {
        childElements = [...current.children];
      }
      for (const child of childElements) {
        enqueue(child);
        if (child.shadowRoot) {
          enqueue(child.shadowRoot);
        }
      }
    }
    return results;
  },
  normalizeTextForComparison(text) {
    return text
      .replace(/\u200B/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .toLowerCase();
  },
  sanitizeSourceText(text) {
    return text
      .replace(/\u200B/g, '')
      .replace(/opens in a new window/gi, '')
      .replace(/\s+/g, ' ')
      .trim();
  },
  extractDomain(href) {
    try {
      return new URL(href).hostname.replace(/^www\./i, '');
    } catch {
      return '';
    }
  },
  findDeepResearchPanel(doc) {
    const panels = this.queryAllDeep(doc, 'deep-research-immersive-panel');
    return panels.length > 0 ? panels[0] : null;
  },
  collectSources(root) {
    const anchors = this.queryAllDeep(root, 'a[href]');
    const seen = /* @__PURE__ */ new Set();
    const sources = [];
    for (const anchor of anchors) {
      const href = anchor.getAttribute('href') || '';
      if (!href || seen.has(href)) continue;
      seen.add(href);
      const rawText = (anchor.textContent || '').replace(/\u200B/g, '');
      const lines = rawText
        .split(/\n+/)
        .map(line => line.trim())
        .filter(Boolean);
      const text = this.sanitizeSourceText(rawText);
      const title = lines.length > 0 ? lines.at(-1) : text;
      sources.push({
        href,
        text,
        title,
        domain: this.extractDomain(href),
      });
    }
    return sources;
  },
  collectPlanSteps(messageElem) {
    const steps = [];
    const seen = /* @__PURE__ */ new Set();
    const stepElements = this.queryAllDeep(messageElem, '.research-step');
    for (const step of stepElements) {
      const titleNode = this.queryAllDeep(step, '.research-step-title')[0];
      const descriptionNode = this.queryAllDeep(
        step,
        '.research-step-description',
      )[0];
      const title = titleNode?.textContent?.trim() || '';
      const description = descriptionNode?.textContent?.trim() || '';
      if (title || description) {
        const key = `${title}|||${description}`;
        if (!seen.has(key)) {
          seen.add(key);
          steps.push({ title, description });
        }
      }
    }
    return steps;
  },
  extractSummaryStructure(root, sources) {
    const reportHost = this.queryAllDeep(root, 'message-content')[0];
    const target = reportHost || root;
    const rawContent = (target?.textContent || '').replace(/\u200B/g, '');
    if (!rawContent.trim()) {
      return { paragraphs: [], bulletGroups: [] };
    }
    const sourceComparisons = new Set(
      sources.map(source => this.normalizeTextForComparison(source.text)),
    );
    const lines = rawContent
      .split(/\n+/)
      .map(line => line.replace(/\s+/g, ' ').trim())
      .filter(line => {
        if (!line) return false;
        if (/opens in a new window/i.test(line)) return false;
        const normalized = this.normalizeTextForComparison(line);
        return !sourceComparisons.has(normalized);
      });
    const paragraphs = [];
    const bulletGroups = [];
    const paragraphSet = /* @__PURE__ */ new Set();
    const bulletItemSet = /* @__PURE__ */ new Set();
    let currentParagraph = [];
    let currentBulletGroup = [];
    const flushParagraph = () => {
      if (currentParagraph.length === 0) return;
      const paragraph = currentParagraph.join(' ').replace(/\s+/g, ' ').trim();
      if (paragraph && !paragraphSet.has(paragraph)) {
        paragraphSet.add(paragraph);
        paragraphs.push(paragraph);
      }
      currentParagraph = [];
    };
    const flushBullets = () => {
      if (currentBulletGroup.length === 0) return;
      bulletGroups.push([...currentBulletGroup]);
      currentBulletGroup = [];
    };
    const bulletPattern = /^((?:\d+\.)|(?:\d+\))|(?:[a-z]\))|[*•-])\s+/i;
    for (const line of lines) {
      if (bulletPattern.test(line)) {
        flushParagraph();
        const cleaned = line.replace(bulletPattern, '').trim();
        if (cleaned && !bulletItemSet.has(cleaned)) {
          bulletItemSet.add(cleaned);
          currentBulletGroup.push(cleaned);
        }
        continue;
      }
      if (currentBulletGroup.length > 0) {
        const lastIndex = currentBulletGroup.length - 1;
        const merged = `${currentBulletGroup[lastIndex]} ${line}`
          .replace(/\s+/g, ' ')
          .trim();
        if (!bulletItemSet.has(merged)) {
          bulletItemSet.add(merged);
          currentBulletGroup[lastIndex] = merged;
        }
        continue;
      }
      currentParagraph.push(line);
      if (/[!.?。！？]$/.test(line) || line.length > 160) {
        flushParagraph();
      }
    }
    flushParagraph();
    flushBullets();
    return {
      paragraphs,
      bulletGroups: bulletGroups.filter(group => group.length > 0),
    };
  },
  applyCitations(text, sources) {
    return text.replace(/\[(\d+)]/g, (match, number) => {
      const index = Number(number);
      const source = sources[index - 1];
      if (!index || !source) {
        return match;
      }
      return `[${number}](${source.href})`;
    });
  },
  buildReportMarkdown(doc, messageElem) {
    const hasWidget =
      this.queryAllDeep(messageElem, 'deep-research-confirmation-widget')
        .length > 0;
    const panel = this.findDeepResearchPanel(doc);
    if (!hasWidget && !panel) {
      return null;
    }
    const sources = panel ? this.collectSources(panel) : [];
    const planSteps = this.collectPlanSteps(messageElem);
    const summaryElement = panel || (hasWidget ? messageElem : null);
    const summary = summaryElement
      ? this.extractSummaryStructure(summaryElement, sources)
      : { paragraphs: [], bulletGroups: [] };
    if (
      planSteps.length === 0 &&
      summary.paragraphs.length === 0 &&
      summary.bulletGroups.length === 0 &&
      sources.length === 0
    ) {
      return null;
    }
    const markdownLines = ['\n---', '**Gemini Deep Research Report**', ''];
    const titleNode = this.queryAllDeep(
      messageElem,
      '[data-test-id="title"]',
    ).shift();
    const titleText = titleNode?.textContent?.trim();
    if (titleText) {
      markdownLines.push(`# ${titleText}`, '');
    }
    if (planSteps.length > 0) {
      markdownLines.push('## Research Plan', '');
      for (const [index, step] of planSteps.entries()) {
        const heading = step.title || `Step ${index + 1}`;
        markdownLines.push(`### ${index + 1}. ${heading}`);
        if (step.description) {
          markdownLines.push(
            '',
            this.applyCitations(step.description, sources),
          );
        }
        markdownLines.push('');
      }
    }
    if (summary.paragraphs.length > 0 || summary.bulletGroups.length > 0) {
      markdownLines.push('## Report Overview', '');
      for (const paragraph of summary.paragraphs) {
        const formatted = this.applyCitations(paragraph, sources);
        if (formatted) {
          markdownLines.push(formatted, '');
        }
      }
      for (const group of summary.bulletGroups) {
        const renderedItems = [];
        for (const item of group) {
          const formatted = this.applyCitations(item, sources);
          if (formatted && !renderedItems.includes(formatted)) {
            renderedItems.push(formatted);
          }
        }
        if (renderedItems.length > 0) {
          for (const formatted of renderedItems) {
            markdownLines.push(`- ${formatted}`);
          }
          markdownLines.push('');
        }
      }
    }
    if (sources.length > 0) {
      markdownLines.push('### References', '');
      for (const [index, source] of sources.entries()) {
        const label =
          source.title || source.text || source.domain || source.href;
        const domainText = source.domain ? ` (${source.domain})` : '';
        markdownLines.push(
          `[${index + 1}] [${label}](${source.href})${domainText}`,
        );
      }
      markdownLines.push('');
    }
    markdownLines.push('---', '');
    return markdownLines.join('\n');
  },
};
function extractCanvasContent(doc) {
  const immersivePanel = doc.querySelector(
    'immersive-container, immersive-panel, canvas-immersive-panel',
  );
  if (!immersivePanel) {
    return null;
  }
  const canvasContent = immersivePanel.querySelector(
    'canvas-content, immersive-canvas, immersive-page',
  );
  if (!canvasContent) {
    return null;
  }
  let markdown = '\n\n---\n**Gemini Canvas Snapshot**\n\n';
  const titleElement = canvasContent.querySelector(
    'h1, h2, .title, [data-test-id="title"]',
  );
  if (titleElement?.textContent) {
    const title = titleElement.textContent.trim();
    if (title) {
      markdown += `### ${title}

`;
    }
  }
  const textContent = canvasContent.querySelector(
    '[data-test-id="canvas-body"], [class*="content"], section',
  );
  if (textContent) {
    const canvasHtml = textContent.innerHTML;
    const canvasMarkdown = (0, import_markdown.chatHtmlToMarkdown)(canvasHtml);
    if (canvasMarkdown.trim()) {
      markdown += canvasMarkdown + '\n\n';
    }
  }
  const images = [...canvasContent.querySelectorAll('img')];
  if (images.length > 0) {
    markdown += '#### Attached Images\n\n';
    for (const [index, img] of images.entries()) {
      const src =
        img.getAttribute('src') ||
        img.dataset.src ||
        img.dataset.originalSrc ||
        '';
      if (src && !src.startsWith('blob:')) {
        const alt = img.getAttribute('alt') || `Canvas Image ${index + 1}`;
        markdown += `![${alt}](${src})

`;
      }
    }
  }
  markdown += '---\n';
  return markdown;
}
function extractGeminiChatData(doc, config) {
  const deepResearchConfig = config?.deepResearch || {};
  const pureMode = deepResearchConfig.pureMode || false;
  if (pureMode) {
    const modelResponses = [...doc.querySelectorAll('model-response')];
    for (const modelResponse of modelResponses) {
      const report = GeminiDeepResearchHelper.buildReportMarkdown(
        doc,
        modelResponse,
      );
      if (report) {
        return {
          title: 'Deep Research Report',
          messages: [
            {
              id: 'deep-research-report',
              role: 'assistant',
              md: report,
              text: report,
            },
          ],
          assets: [],
        };
      }
    }
    return {
      title: import_constants.DEFAULT_CHAT_TITLE,
      messages: [],
      assets: [],
    };
  }
  const messageItems = [...doc.querySelectorAll(GEMINI_MESSAGE_ITEM_SELECTOR)];
  if (messageItems.length === 0) {
    return {
      title: import_constants.DEFAULT_CHAT_TITLE,
      messages: [],
      assets: [],
    };
  }
  const isDeepResearchSession =
    GeminiDeepResearchHelper.isDeepResearchSession(doc);
  let title = import_constants.DEFAULT_CHAT_TITLE;
  const sidebarActiveChatItem = doc.querySelector(
    GEMINI_SIDEBAR_ACTIVE_CHAT_SELECTOR,
  );
  title =
    sidebarActiveChatItem && sidebarActiveChatItem.textContent?.trim()
      ? sidebarActiveChatItem.textContent.trim()
      : doc.title;
  if (title.startsWith(GEMINI_TITLE_REPLACE_TEXT)) {
    title = title.replace(GEMINI_TITLE_REPLACE_TEXT, '').trim();
  }
  let model = '';
  const modeSwitcher = doc.querySelector('bard-mode-switcher');
  if (modeSwitcher) {
    model = modeSwitcher.textContent?.trim() || '';
  }
  if (!model) {
    const buttons = [...doc.querySelectorAll('button')];
    for (const btn of buttons) {
      const text = btn.textContent?.trim() || '';
      if (/^(gemini )?(2\.5|2\.0|1\.5)\s*(pro|flash|advanced)/i.test(text)) {
        model = text;
        break;
      }
    }
  }
  const messages = [];
  let chatIndex = 1;
  const canvasContent = extractCanvasContent(doc);
  let deepResearchAppended = false;
  for (const item of messageItems) {
    let role = 'assistant';
    let messageContentElem = null;
    const tagName = item.tagName.toLowerCase();
    if (tagName === 'user-query') {
      role = 'user';
      messageContentElem = item.querySelector(
        '[role="presentation"], [class*="query"]',
      );
      if (!messageContentElem) {
        messageContentElem = item.querySelector('rich-text, div, p');
      }
    } else {
      role = 'assistant';
      messageContentElem = item.querySelector(
        'cib-shared-markdown, message-content, response-content, rich-text, model-output, article',
      );
    }
    if (!messageContentElem) {
      messageContentElem = item;
    }
    if (messageContentElem) {
      const blobImages = [
        ...messageContentElem.querySelectorAll('img[src^="blob:"]'),
      ];
      if (blobImages.length > 0) {
        console.log(
          `[Gemini] Found ${blobImages.length} blob URL images, converting to base64...`,
        );
        for (const [index, img] of blobImages.entries()) {
          const imgElement = img;
          const base64 = (0, import_assets.convertBlobImageToBase64)(
            imgElement,
          );
          if (base64) {
            console.log(
              `[Gemini] Converted blob image ${index + 1} to base64 (${Math.round((base64.length * 0.75) / 1024)} KB)`,
            );
            imgElement.src = base64;
            if (imgElement.hasAttribute('srcset')) {
              imgElement.removeAttribute('srcset');
            }
          } else {
            console.log(`[Gemini] Failed to convert blob image ${index + 1}`);
          }
        }
      }
      const html = messageContentElem.innerHTML;
      let markdown = (0, import_markdown.chatHtmlToMarkdown)(html);
      const hasCanvasChip = messageContentElem.querySelector(
        'immersive-entry-chip',
      );
      if (hasCanvasChip && canvasContent) {
        markdown += canvasContent;
      }
      if (
        role === 'assistant' &&
        !deepResearchAppended &&
        isDeepResearchSession
      ) {
        const deepResearchMarkdown =
          GeminiDeepResearchHelper.buildReportMarkdown(doc, messageContentElem);
        if (deepResearchMarkdown) {
          markdown += deepResearchMarkdown;
          deepResearchAppended = true;
        }
      }
      if (markdown.trim()) {
        messages.push({
          id: `msg-${chatIndex++}`,
          role,
          html,
          md: markdown,
          text: markdown,
        });
      }
    }
  }
  return { title, messages, assets: [], model };
}
const geminiParser = {
  id: 'gemini',
  parse: (doc, config) => extractGeminiChatData(doc, config),
};
