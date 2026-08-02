/**
 * Pre-build script: Encrypts markdown body content for protected pages.
 *
 * Usage: PROTECTED_PASSWORD=mysecret node scripts/encrypt-pages.mjs
 *
 * For files with `protected: true` in frontmatter:
 * 1. Reads the .md file, encrypts the body with AES-256-GCM
 * 2. Saves encrypted payload to public/encrypted/<relpath>.json
 * 3. Replaces .md body with <ProtectedContent /> component tag
 * 4. Backs up the original as .md.protected.bak
 */

import { readFileSync, writeFileSync, readdirSync, statSync, mkdirSync, copyFileSync } from 'node:fs';
import { join, dirname, basename, relative } from 'node:path';
import { createCipheriv, randomBytes, pbkdf2Sync } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// Directories to scan for protected markdown files
const PROTECTED_DIRS = ['02-年度总结'];

// Get password from environment
const password = process.env.PROTECTED_PASSWORD;
if (!password) {
  console.error('❌ 缺少 PROTECTED_PASSWORD 环境变量。');
  console.error('   用法: PROTECTED_PASSWORD=我的密码 node scripts/encrypt-pages.mjs');
  process.exit(1);
}

console.log('🔐 正在加密受保护页面...\n');

/**
 * Encrypt plaintext with AES-256-GCM using a password-derived key.
 * Returns { salt, iv, ciphertext } as base64 strings.
 */
function encrypt(plaintext, password) {
  const salt = randomBytes(16);
  const key = pbkdf2Sync(password, salt, 100000, 32, 'sha256');
  const iv = randomBytes(12);
  const cipher = createCipheriv('aes-256-gcm', key, iv);

  const encrypted = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
  const authTag = cipher.getAuthTag();

  return {
    salt: salt.toString('base64'),
    iv: iv.toString('base64'),
    ciphertext: Buffer.concat([encrypted, authTag]).toString('base64'),
  };
}

/**
 * Parse frontmatter and body from markdown content.
 */
function parseMarkdown(content) {
  const lines = content.split('\n');
  if (lines[0]?.trim() !== '---') {
    return { frontmatter: '', body: content };
  }

  let end = -1;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === '---') {
      end = i;
      break;
    }
  }

  if (end === -1) {
    return { frontmatter: '', body: content };
  }

  return {
    frontmatter: lines.slice(0, end + 1).join('\n'),
    body: lines.slice(end + 1).join('\n'),
  };
}

/**
 * Check if frontmatter contains `protected: true`
 */
function isProtected(frontmatter) {
  return /^protected:\s*true\s*$/m.test(frontmatter);
}

/**
 * Recursively find all .md files in a directory
 */
function findMdFiles(dir) {
  const files = [];
  const entries = readdirSync(dir);
  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      files.push(...findMdFiles(fullPath));
    } else if (entry.endsWith('.md') && !entry.endsWith('.protected.bak')) {
      files.push(fullPath);
    }
  }
  return files;
}

// Ensure public/encrypted directory exists
const encryptedDir = join(ROOT, 'public', 'encrypted');
mkdirSync(encryptedDir, { recursive: true });

// Process each protected directory
let encryptedCount = 0;

for (const dir of PROTECTED_DIRS) {
  const dirPath = join(ROOT, dir);
  try {
    const mdFiles = findMdFiles(dirPath);

    if (mdFiles.length === 0) {
      console.log(`  📁 ${dir}/ — 无 .md 文件，跳过`);
      continue;
    }

    for (const filePath of mdFiles) {
      const content = readFileSync(filePath, 'utf-8');
      const { frontmatter, body } = parseMarkdown(content);

      if (!isProtected(frontmatter)) {
        console.log(`  ⏭️  ${basename(filePath)} — 未标记 protected，跳过`);
        continue;
      }

      const trimmedBody = body.trim();
      if (!trimmedBody) {
        console.log(`  ⏭️  ${basename(filePath)} — 正文为空，跳过`);
        continue;
      }

      // Backup original
      const bakPath = filePath + '.protected.bak';
      copyFileSync(filePath, bakPath);

      // Encrypt body
      const encrypted = encrypt(trimmedBody, password);

      // Determine the relative path for the JSON key
      const relPath = relative(ROOT, filePath).replace(/\.md$/, '');

      // Ensure subdirectories exist in public/encrypted
      const jsonDir = join(encryptedDir, relative(ROOT, dirPath));
      mkdirSync(jsonDir, { recursive: true });

      // Write encrypted payload to public/encrypted/<relpath>.json
      const jsonPath = join(encryptedDir, relPath + '.json');
      writeFileSync(jsonPath, JSON.stringify(encrypted), 'utf-8');

      // Replace .md body with just the component tag
      const newContent = `${frontmatter}

<ProtectedContent />

`;
      writeFileSync(filePath, newContent, 'utf-8');

      console.log(`  ✅ ${relPath}.md — 已加密 (${trimmedBody.length} 字符 → ${encrypted.ciphertext.length} base64)`);
      encryptedCount++;
    }
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log(`  📁 ${dir}/ — 目录不存在，跳过`);
    } else {
      throw err;
    }
  }
}

console.log(`\n🔒 已加密 ${encryptedCount} 个文件。原始文件备份为 .md.protected.bak`);
