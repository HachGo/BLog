/** Build protected pages and restore source files even when a build step fails. */
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { constants } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('../', import.meta.url));
const require = createRequire(import.meta.url);
let child;
let interrupted;
let restoring = false;

function onSignal(signal) {
  interrupted ??= signal;
  // Let restoration finish even if the user interrupts more than once.
  if (!restoring) child?.kill(signal);
}

process.on('SIGINT', onSignal);
process.on('SIGTERM', onSignal);

function run(script, args = []) {
  return new Promise((resolve, reject) => {
    child = spawn(process.execPath, [script, ...args], { cwd: ROOT, stdio: 'inherit' });
    child.once('error', reject);
    child.once('close', (code, signal) => {
      child = undefined;
      if (code === 0) return resolve();
      const failure = new Error(`${script} 执行失败 (${signal || code})`);
      failure.exitCode = code ?? 128 + (constants.signals[signal] || 1);
      reject(failure);
    });
  });
}

async function restore() {
  restoring = true;
  try {
    await run(join(ROOT, 'scripts/restore-pages.mjs'));
  } finally {
    restoring = false;
  }
}

try {
  // Recover leftovers from a previously interrupted build before making backups.
  await restore();
  try {
    if (interrupted) throw new Error('构建已中止');
    await run(join(ROOT, 'scripts/encrypt-pages.mjs'));
    if (interrupted) throw new Error('构建已中止');
    const vitepress = join(dirname(require.resolve('vitepress/package.json')), 'bin/vitepress.js');
    await run(vitepress, ['build', ...process.argv.slice(2)]);
  } finally {
    await restore();
  }
} catch (error) {
  console.error(error.message);
  process.exitCode = error.exitCode || 1;
}

if (interrupted) process.exitCode = 128 + constants.signals[interrupted];
process.off('SIGINT', onSignal);
process.off('SIGTERM', onSignal);
