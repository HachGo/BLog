import assert from 'node:assert/strict';
import { spawn, spawnSync } from 'node:child_process';
import { once } from 'node:events';
import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { setTimeout } from 'node:timers/promises';
import test from 'node:test';

const project = fileURLToPath(new URL('../', import.meta.url));
const original = '---\ntitle: Test\nprotected: true\n---\n\nPrivate original body.\n';
const buildScript = JSON.parse(readFileSync(join(project, 'package.json'), 'utf8')).scripts['docs:build'];

function fixture(t, { buildCode = 0, nested = false } = {}) {
  const root = mkdtempSync(join(tmpdir(), 'blog-build-test-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  cpSync(join(project, 'scripts'), join(root, 'scripts'), { recursive: true });
  const page = join(root, '02-年度总结', nested ? 'nested/page.md' : 'page.md');
  mkdirSync(dirname(page), { recursive: true });
  writeFileSync(page, original);
  const cli = `#!/usr/bin/env node
const fs = require('node:fs');
const path = require('node:path');
const page = ${JSON.stringify(page)};
if (!fs.readFileSync(page, 'utf8').includes('<ProtectedContent />')) process.exit(90);
const payload = path.join(process.cwd(), 'public/encrypted', path.relative(process.cwd(), page).replace(/\\.md$/, '.json'));
if (!fs.existsSync(payload)) process.exit(91);
fs.mkdirSync('.vitepress/dist', {recursive: true});
fs.copyFileSync(payload, '.vitepress/dist/payload.json');
process.exit(${buildCode});
`;
  mkdirSync(join(root, 'node_modules/vitepress/bin'), { recursive: true });
  writeFileSync(join(root, 'node_modules/vitepress/package.json'), '{"name":"vitepress","version":"0.0.0"}');
  writeFileSync(join(root, 'node_modules/vitepress/bin/vitepress.js'), cli);
  mkdirSync(join(root, 'node_modules/.bin'), { recursive: true });
  writeFileSync(join(root, 'node_modules/.bin/vitepress'), cli, { mode: 0o755 });
  writeFileSync(join(root, 'node_modules/.bin/vitepress.cmd'), '@node "%~dp0../vitepress/bin/vitepress.js" %*\r\n');
  return { root, page };
}

function run(root, script, env = {}) {
  const result = spawnSync(script, {
    cwd: root,
    shell: true,
    encoding: 'utf8',
    timeout: 20000,
    env: { ...process.env, PATH: `${join(root, 'node_modules/.bin')}${process.platform === 'win32' ? ';' : ':'}${process.env.PATH}`, PROTECTED_PASSWORD: 'test-password', ...env },
  });
  assert.ifError(result.error);
  return result;
}

function assertRestored({ root, page }) {
  assert.equal(readFileSync(page, 'utf8'), original, 'must restore the exact original bytes');
  assert.equal(existsSync(page + '.protected.bak'), false, 'must consume restored backup');
  assert.equal(existsSync(join(root, 'public/encrypted')), false, 'must clean intermediate payloads');
}

test('failed build restores originals and preserves its exit status', (t) => {
  const f = fixture(t, { buildCode: 23 });
  const result = run(f.root, buildScript);
  assert.equal(result.status, 23, result.stderr);
  assertRestored(f);
});

test('successful build restores originals and retains the published payload', (t) => {
  const f = fixture(t);
  const result = run(f.root, buildScript);
  assert.equal(result.status, 0, result.stderr);
  assertRestored(f);
  assert.equal(existsSync(join(f.root, '.vitepress/dist/payload.json')), true);
});

test('a leftover backup is recovered before building again', (t) => {
  const f = fixture(t);
  writeFileSync(f.page + '.protected.bak', original);
  writeFileSync(f.page, '---\nprotected: true\n---\n\n<ProtectedContent />\n');
  const result = run(f.root, buildScript);
  assert.equal(result.status, 0, result.stderr);
  assertRestored(f);
});

test('direct encryption refuses to overwrite an existing original backup', (t) => {
  const f = fixture(t);
  assert.equal(run(f.root, 'node scripts/encrypt-pages.mjs').status, 0);
  const result = run(f.root, 'node scripts/encrypt-pages.mjs');
  assert.notEqual(result.status, 0);
  assert.equal(readFileSync(f.page + '.protected.bak', 'utf8'), original);
});

test('partial encryption failure restores pages already replaced', (t) => {
  const f = fixture(t);
  const secondPage = join(dirname(f.page), 'z-failure.md');
  writeFileSync(secondPage, original);
  const script = join(f.root, 'scripts/encrypt-pages.mjs');
  writeFileSync(script, readFileSync(script, 'utf8').replace('// Encrypt body',
    "if (basename(filePath) === 'z-failure.md') throw new Error('Simulated encryption failure');\n      // Encrypt body"));
  const result = run(f.root, buildScript);
  assert.notEqual(result.status, 0);
  assertRestored(f);
  assert.equal(readFileSync(secondPage, 'utf8'), original);
  assert.equal(existsSync(secondPage + '.protected.bak'), false);
  assert.equal(existsSync(join(f.root, '.vitepress/dist/payload.json')), false);
});

test('nested protected pages are encrypted and restored', (t) => {
  const f = fixture(t, { nested: true });
  const result = run(f.root, buildScript);
  assert.equal(result.status, 0, result.stderr);
  assertRestored(f);
});

test('restoration failure fails the command even after a successful build', (t) => {
  const f = fixture(t);
  const script = join(f.root, 'scripts/restore-pages.mjs');
  writeFileSync(script, `import {existsSync} from 'node:fs'; if (existsSync('.vitepress/dist/payload.json')) process.exit(31);\n`);
  const result = run(f.root, buildScript);
  assert.equal(result.status, 31, result.stderr);
  assert.equal(readFileSync(f.page + '.protected.bak', 'utf8'), original);
});

test('missing password fails without changing original pages', (t) => {
  const f = fixture(t);
  const result = run(f.root, buildScript, { PROTECTED_PASSWORD: '' });
  assert.notEqual(result.status, 0);
  assertRestored(f);
});

test('SIGTERM during the build restores originals before exiting', { skip: process.platform === 'win32', timeout: 10000 }, async (t) => {
  const f = fixture(t);
  const cli = join(f.root, 'node_modules/vitepress/bin/vitepress.js');
  writeFileSync(cli, readFileSync(cli, 'utf8').replace('process.exit(0);',
    "fs.writeFileSync('.build-ready', ''); setInterval(() => {}, 1000);"));
  const child = spawn(process.execPath, ['scripts/build-docs.mjs'], {
    cwd: f.root,
    env: { ...process.env, PROTECTED_PASSWORD: 'test-password' },
    stdio: 'ignore',
  });
  const closed = once(child, 'close');
  try {
    const deadline = Date.now() + 5000;
    while (!existsSync(join(f.root, '.build-ready'))) {
      assert.ok(Date.now() < deadline && child.exitCode === null, 'build should reach the running phase');
      await setTimeout(20);
    }
    child.kill('SIGTERM');
    assert.deepEqual(await closed, [143, null]);
    assertRestored(f);
  } finally {
    if (child.exitCode === null && child.signalCode === null) {
      child.kill('SIGTERM');
      await closed;
    }
  }
});
