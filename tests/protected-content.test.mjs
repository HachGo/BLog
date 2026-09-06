import assert from 'node:assert/strict';
import { createCipheriv, pbkdf2Sync, randomBytes, webcrypto } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { setImmediate } from 'node:timers/promises';
import test from 'node:test';
import * as vue from 'vue';
import { compileScript, parse } from 'vue/compiler-sfc';
import { marked } from 'marked';

// Compile the real SFC, supplying only the VitePress page context and browser I/O.
// Vue's reactive state, template, event handlers, and crypto all run unchanged.
const source = readFileSync(new URL('../.vitepress/theme/components/ProtectedContent.vue', import.meta.url), 'utf8');
const { descriptor } = parse(source);
const compiled = compileScript(descriptor, {
  id: 'protected-content-test',
  inlineTemplate: true,
  templateOptions: { compilerOptions: { hoistStatic: false } },
});
const component = new Function('modules', compiled.content
  .replace(/import\s*\{([^}]+)\}\s*from\s*['"]([^'"]+)['"];?/g,
    (_, names, module) => `const {${names.replace(/\bas\b/g, ':')}} = modules[${JSON.stringify(module)}];`)
  .replace('export default', 'return'))({
  vue,
  marked: { marked },
  vitepress: { useData: () => ({ page: vue.ref({ relativePath: '02-年度总结/index.md' }) }) },
});

function encryptedPayload() {
  const salt = randomBytes(16);
  const iv = randomBytes(12);
  const cipher = createCipheriv('aes-256-gcm', pbkdf2Sync('correct-password', salt, 100000, 32, 'sha256'), iv);
  const bytes = Buffer.concat([cipher.update('# Private test content'), cipher.final(), cipher.getAuthTag()]);
  return { salt: salt.toString('base64'), iv: iv.toString('base64'), ciphertext: bytes.toString('base64') };
}

function installGlobal(t, key, value) {
  const previous = Object.getOwnPropertyDescriptor(globalThis, key);
  Object.defineProperty(globalThis, key, { configurable: true, value });
  t.after(() => previous ? Object.defineProperty(globalThis, key, previous) : delete globalThis[key]);
}

function node(type, text = '') {
  // Like native DOM elements, renderer nodes should not become reactive proxies.
  return vue.markRaw({
    type, text, tagName: type.toUpperCase(), children: [], props: {}, listeners: {}, parent: null,
    value: '',
    addEventListener(name, handler) { this.listeners[name] = handler; },
    removeEventListener(name) { delete this.listeners[name]; },
    focus() { if (!this.props.disabled) document.activeElement = this; },
  });
}

const renderer = vue.createRenderer({
  createElement: node,
  createText: (text) => node('#text', text),
  createComment: (text) => node('#comment', text),
  setText: (el, text) => { el.text = text; },
  setElementText: (el, text) => { el.text = text; el.children = []; },
  parentNode: (el) => el.parent,
  nextSibling: (el) => el.parent?.children[el.parent.children.indexOf(el) + 1],
  patchProp: (el, key, previous, value) => { el.props[key] = value; },
  insert(el, parent, anchor) {
    if (el.parent) el.parent.children.splice(el.parent.children.indexOf(el), 1);
    el.parent = parent;
    const index = anchor ? parent.children.indexOf(anchor) : -1;
    if (index < 0) parent.children.push(el);
    else parent.children.splice(index, 0, el);
  },
  remove(el) {
    el.parent.children.splice(el.parent.children.indexOf(el), 1);
    el.parent = null;
  },
});

function find(root, predicate) {
  if (predicate(root)) return root;
  for (const child of root.children) {
    const match = find(child, predicate);
    if (match) return match;
  }
}

async function mount(t) {
  const payload = encryptedPayload();
  const storage = new Map();
  installGlobal(t, 'document', { activeElement: null });
  installGlobal(t, 'crypto', webcrypto);
  installGlobal(t, 'sessionStorage', {
    getItem: (key) => storage.get(key) ?? null,
    setItem: (key, value) => storage.set(key, value),
    removeItem: (key) => storage.delete(key),
  });
  installGlobal(t, 'fetch', async () => ({ ok: true, json: async () => payload }));
  const root = node('root');
  const app = renderer.createApp(component);
  app.mount(root);
  t.after(() => app.unmount());
  await setImmediate();
  await vue.nextTick();
  return { root, storage };
}

async function submit(root, password) {
  const input = find(root, (el) => el.type === 'input');
  input.value = password;
  input.listeners.input({ target: input });
  await vue.nextTick();
  await find(root, (el) => el.type === 'form').props.onSubmit({ preventDefault() {} });
  await vue.nextTick();
}

test('wrong password shows an inline alert and leaves a focused retry form', async (t) => {
  const { root, storage } = await mount(t);
  await submit(root, 'wrong-password');
  const alert = find(root, (el) => el.props.role === 'alert');
  assert.equal(alert?.text, '密码错误，请重试。');
  const input = find(root, (el) => el.type === 'input');
  assert.ok(input, 'retry form remains visible');
  assert.equal(input.value, '');
  assert.equal(input.props.disabled, false);
  assert.equal(document.activeElement, input, 'retry input receives focus after being enabled');
  assert.equal(storage.has('_protected_pw'), false);
});

test('a correct retry clears the alert and decrypts content', async (t) => {
  const { root, storage } = await mount(t);
  await submit(root, 'wrong-password');
  await submit(root, 'correct-password');
  assert.equal(find(root, (el) => el.props.role === 'alert'), undefined);
  assert.equal(find(root, (el) => el.type === 'form'), undefined);
  const content = find(root, (el) => el.props.innerHTML);
  assert.match(content?.props.innerHTML ?? '', /<h1>Private test content<\/h1>/);
  assert.equal(storage.get('_protected_pw'), 'correct-password');
});
