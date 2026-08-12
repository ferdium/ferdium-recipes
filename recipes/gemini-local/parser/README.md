# AI Parser Vendor

This directory vendors the multi-platform AI chat DOM parsing strategy from AllinOB's `ai-chat-exporter`, converted to executable CommonJS for recipe-side use.

Included platform parsers:
- chatgpt
- claude
- copilot
- deepseek
- gemini
- kimi
- tongyi

Shared parser infrastructure:
- `shared/markdown.js`: HTML to Markdown conversion
- `shared/dom.js`: generic UI-noise cleanup
- `shared/parserCore.js`: shared title/model/message parsing helpers extracted during integration

Current runtime integration in this recipe only uses the `chatgpt` parser.
`gemini` remains specialized because it contains deep-research and canvas-specific handling.
The other platform parsers now share a lighter common parsing skeleton and remain available for future recipe work.
