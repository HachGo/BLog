/**
 * 全站外链自检脚本
 *
 * 用法:
 *   node scripts/check-links.mjs            # 检查并输出报告，发现死链时退出码为 1
 *   node scripts/check-links.mjs --warn     # 只警告，退出码恒为 0
 *   node scripts/check-links.mjs --concurrency 8 --timeout 20000
 *
 * 说明:
 * - 扫描仓库内所有 .md（排除 node_modules/.git/docs/dist）
 * - 2xx/3xx 视为正常；401/403/412/418/429 归为“疑似反爬”，需人工复核
 * - 404/5xx/网络错误归为“疑似失效”
 */

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';
import { execFile as execFileCb } from 'node:child_process';

const execFile = promisify(execFileCb);

const ROOT = join(fileURLToPath(import.meta.url), '..', '..');
const EXCLUDE_DIRS = new Set(['node_modules', '.git', 'docs', 'dist', '.vitepress']);
const SKIP_PATTERN = /127\.0\.0\.1|localhost|用户名|username/i;
const BLOCKED_CODES = new Set([401, 403, 412, 418, 429]);

const args = process.argv.slice(2);
const opt = {
  warn: args.includes('--warn'),
  concurrency: Number(argValue('--concurrency')) || 10,
  timeout: Number(argValue('--timeout')) || 15000,
};

function argValue(name) {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
}

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    if (EXCLUDE_DIRS.has(name)) continue;
    const path = join(dir, name);
    const stat = statSync(path);
    if (stat.isDirectory()) yield* walk(path);
    else if (name.endsWith('.md')) yield path;
  }
}

// 收集链接及其出现位置
const locations = new Map(); // url -> ["file:line", ...]
for (const file of walk(ROOT)) {
  const rel = relative(ROOT, file);
  const lines = readFileSync(file, 'utf8').split('\n');
  lines.forEach((line, i) => {
    for (const m of line.matchAll(/https?:\/\/[^\s)\]>"'`]+/g)) {
      const url = m[0].replace(/[.,;!]+$/, '');
      if (SKIP_PATTERN.test(url)) continue;
      if (!locations.has(url)) locations.set(url, []);
      locations.get(url).push(`${rel}:${i + 1}`);
    }
  });
}

const urls = [...locations.keys()];
console.log(`共发现 ${urls.length} 个唯一外链，开始检查...\n`);

const results = { dead: [], blocked: [], ok: 0 };
let cursor = 0;

async function check(url) {
  // 用 curl 实际请求（自动遵循 http_proxy/https_proxy 环境变量，Node fetch 不支持）
  let status = 0;
  try {
    const { stdout } = await execFile('curl', [
      '-L', '-o', '/dev/null', '-s', '-w', '%{http_code}',
      '--max-time', String(Math.ceil(opt.timeout / 1000)),
      '--connect-timeout', '8',
      '-A', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36',
      url,
    ]);
    status = Number(stdout.trim()) || 0;
  } catch {
    status = 0;
  }
  const locs = locations.get(url).join(', ');
  if (status >= 200 && status < 400) {
    results.ok++;
  } else if (BLOCKED_CODES.has(status)) {
    results.blocked.push({ url, status, locs });
  } else {
    results.dead.push({ url, status: status || 'TIMEOUT', locs });
  }
}

async function worker() {
  while (cursor < urls.length) await check(urls[cursor++]);
}
await Promise.all(Array.from({ length: opt.concurrency }, worker));

const byStatus = (a, b) => String(a.status).localeCompare(String(b.status));
results.dead.sort(byStatus);
results.blocked.sort(byStatus);

console.log(`正常: ${results.ok}  疑似失效: ${results.dead.length}  疑似反爬(需人工复核): ${results.blocked.length}\n`);

if (results.dead.length) {
  console.log('=== 疑似失效 ===');
  for (const { url, status, locs } of results.dead) console.log(`[${status}] ${url}\n    ${locs}`);
}
if (results.blocked.length) {
  console.log('\n=== 疑似反爬（多为误报，人工抽查即可） ===');
  for (const { url, status, locs } of results.blocked) console.log(`[${status}] ${url}\n    ${locs}`);
}

if (results.dead.length && !opt.warn) process.exit(1);
