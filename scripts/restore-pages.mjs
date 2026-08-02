/**
 * Post-build script: Restores original .md files from .protected.bak backups
 * and cleans up generated encrypted JSON files.
 *
 * Usage: node scripts/restore-pages.mjs
 */

import { readdirSync, statSync, renameSync, unlinkSync, existsSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const PROTECTED_DIRS = ['02-年度总结'];

console.log('🔓 正在恢复原始文件...\n');

let restoredCount = 0;

// Restore .md files from backups
for (const dir of PROTECTED_DIRS) {
  const dirPath = join(ROOT, dir);
  try {
    const entries = readdirSync(dirPath);
    for (const entry of entries) {
      if (!entry.endsWith('.md.protected.bak')) continue;

      const bakPath = join(dirPath, entry);
      const origPath = bakPath.replace('.protected.bak', '');

      renameSync(bakPath, origPath);
      console.log(`  ✅ ${entry.replace('.md.protected.bak', '.md')} — 已恢复`);
      restoredCount++;
    }
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log(`  📁 ${dir}/ — 目录不存在，跳过`);
    } else {
      throw err;
    }
  }
}

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
