import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import { createMarkdownRenderer, resolveConfig } from 'vitepress';

// Use the site's configuration so disabling the plugin also fails this check.
const root = fileURLToPath(new URL('../', import.meta.url));
const config = await resolveConfig(root);
const md = await createMarkdownRenderer(config.srcDir, config.markdown, config.site.base);

test('task lists render their states and keep labels, links and nested items', () => {
  const html = md.render(`- [ ] Anthropic 招股书研读：梳理**商业模式**。
- [x] 阅读完成
  - [X] [嵌套笔记](/notes)
- 普通列表项
`);
  assert.equal((html.match(/type="checkbox"/g) || []).length, 3);
  assert.equal((html.match(/checked=""/g) || []).length, 2);
  assert.equal((html.match(/disabled=""/g) || []).length, 3);
  assert.match(html, /<label><input[^>]+> Anthropic 招股书研读/);
  assert.match(html, /<strong>商业模式<\/strong>/);
  assert.match(html, /<a href="\/notes(?:\.html)?">嵌套笔记<\/a>/);
  assert.match(html, /<li>普通列表项<\/li>/);
  assert.doesNotMatch(html, /\[[ xX]\]/);
});

test('numbered tasks render checkboxes without changing literal examples', () => {
  const html = md.render('1. [ ] 有序任务\n\n`[ ] 行内示例`\n\n```markdown\n- [ ] 笔记模板\n```\n');
  assert.equal((html.match(/type="checkbox"/g) || []).length, 1);
  assert.match(html, /<ol class="contains-task-list">/);
  assert.match(html, /\[ \] 行内示例/);
  assert.match(html, /笔记模板/);
});
