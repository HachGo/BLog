/**
 * Post-build script: Restores original .md files from .protected.bak backups
 * and cleans up generated encrypted JSON files.
 *
 * Usage: node scripts/restore-pages.mjs
 */

import { readdirSync, renameSync, existsSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const PROTECTED_DIRS = ['02-年度总结'];

console.log('🔓 正在恢复原始文件...\n');

let restoredCount = 0;

function restoreDirectory(dirPath) {
  let entries;
  try {
    entries = readdirSync(dirPath, { withFileTypes: true });
  } catch (err) {
    if (err.code === 'ENOENT') return;
    throw err;
  }
  for (const entry of entries) {
    const fullPath = join(dirPath, entry.name);
    if (entry.isDirectory()) {
      restoreDirectory(fullPath);
    } else if (entry.isFile() && entry.name.endsWith('.md.protected.bak')) {
      renameSync(fullPath, fullPath.slice(0, -'.protected.bak'.length));
      console.log(`  ✅ ${entry.name.replace('.md.protected.bak', '.md')} — 已恢复`);
      restoredCount++;
    }
  }
}

for (const dir of PROTECTED_DIRS) restoreDirectory(join(ROOT, dir));

// Clean up generated encrypted JSON files
const encryptedDir = join(ROOT, 'public', 'encrypted');
if (existsSync(encryptedDir)) {
  rmSync(encryptedDir, { recursive: true, force: true });
  console.log('  🧹 已清理 public/encrypted/');
}

if (restoredCount === 0) {
  console.log('  ℹ️  无需恢复（无备份文件）。');
} else {
  console.log(`\n📄 已恢复 ${restoredCount} 个文件。`);
}
