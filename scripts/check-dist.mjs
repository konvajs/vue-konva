// vue-konva 3.4.0 shipped `dist/utils/applyNodeProps.d.ts` containing
// `import '../../index.d.ts'` — a file that package.json#files never published.
// attw does not catch that (verified), so check it directly, then confirm the
// built bundles still expose a usable plugin.
import { readdir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { JSDOM } from 'jsdom';

const DIST = fileURLToPath(new URL('../dist/', import.meta.url));
// `from './x.js'`, `import './x.js'`, and the inline `import('./x.js').Type` form.
const SPECIFIER = /(?:from\s+|import\s*\(\s*|import\s+)['"](\.[^'"]*)['"]/g;

const problems = [];
let checked = 0;

const declarations = (await readdir(DIST, { recursive: true })).filter((name) =>
  name.endsWith('.d.ts'),
);

for (const name of declarations) {
  const file = join(DIST, name);
  for (const [, specifier] of (await readFile(file, 'utf8')).matchAll(SPECIFIER)) {
    checked++;
    if (!specifier.endsWith('.js')) problems.push(`${name} -> ${specifier} should end in .js`);
    // Declarations reference the runtime specifier; map it to its sibling type.
    const target = resolve(dirname(file), specifier).replace(/\.js$/, '.d.ts');
    if (relative(DIST, target).startsWith('..') || !existsSync(target)) {
      problems.push(`${name} -> ${specifier} does not resolve inside dist/`);
    }
  }
}
if (checked === 0) problems.push('no declaration specifiers found; is dist/ built?');

for (const bundle of ['vue-konva.js', 'vue-konva-core.js']) {
  const { default: plugin } = await import(pathToFileURL(join(DIST, bundle)));
  if (typeof plugin?.install !== 'function') {
    problems.push(`${bundle}: default export has no install()`);
  }
}

// The CDN path has no other coverage: run the README's snippet for real.
const require = createRequire(import.meta.url);
const dom = new JSDOM(
  '<div id="app"><v-stage :config="c"><v-layer><v-circle :config="c"></v-circle></v-layer></v-stage></div>',
  { runScripts: 'dangerously' },
);
const run = (code) => dom.window.eval(code);
run(await readFile(require.resolve('vue/dist/vue.global.prod.js'), 'utf8'));
run(await readFile(join(dirname(require.resolve('konva')), '../konva.min.js'), 'utf8'));
run(await readFile(join(DIST, 'vue-konva.umd.js'), 'utf8'));

if (typeof dom.window.VueKonva?.install !== 'function') {
  problems.push('vue-konva.umd.js: window.VueKonva.install is not a function');
} else {
  run(`window.__error = null;
    try {
      const app = Vue.createApp({ data: () => ({ c: { width: 40, height: 40 } }) });
      app.use(VueKonva);
      app.mount('#app');
      window.__stage = Konva.stages[0];
    } catch (error) { window.__error = String(error); }`);
  if (dom.window.__error) problems.push(`vue-konva.umd.js: ${dom.window.__error}`);
  if (dom.window.document.querySelectorAll('canvas').length === 0) {
    problems.push('vue-konva.umd.js: mounting <v-stage> rendered no canvas');
  }
  // <v-circle> comes from components.ts, so this is the only check that shapes
  // resolve off the UMD global rather than only Konva's core module.
  if (dom.window.__stage?.findOne('Circle') == null) {
    problems.push('vue-konva.umd.js: <v-circle> did not create a Konva shape');
  }
}

if (problems.length) {
  console.error(`check-dist: ${problems.length} problem(s):`);
  for (const problem of problems) console.error(`  ${problem}`);
  process.exit(1);
}
console.log(
  `check-dist: ${checked} declaration refs resolve; ESM entries and the UMD/CDN build work`,
);
