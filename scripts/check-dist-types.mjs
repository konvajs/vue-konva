// vue-konva 3.4.0 shipped `dist/utils/applyNodeProps.d.ts` containing
// `import '../../index.d.ts'` — a file that package.json#files never published.
// Neither tsc's rootDir nor attw catches that, so check it directly: every
// relative specifier in a published declaration must resolve inside dist/.
import { readdir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = fileURLToPath(new URL('../dist/', import.meta.url));
const SPECIFIER = /(?:from|import)\s*['"](\.[^'"]*)['"]/g;

async function* declarations(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* declarations(full);
    else if (/\.d\.[cm]?ts$/.test(entry.name)) yield full;
  }
}

const problems = [];
let checked = 0;

for await (const file of declarations(DIST)) {
  const source = await readFile(file, 'utf8');
  for (const [, specifier] of source.matchAll(SPECIFIER)) {
    checked++;
    const target = resolve(dirname(file), specifier);
    if (relative(DIST, target).startsWith('..')) {
      problems.push(`${relative(DIST, file)} -> ${specifier} escapes dist/`);
      continue;
    }
    // Declarations reference the runtime specifier (./foo.js), so map it back.
    const candidates = [
      target.replace(/\.js$/, '.d.ts'),
      target.replace(/\.cjs$/, '.d.cts'),
      target.replace(/\.mjs$/, '.d.mts'),
      target,
    ];
    if (!candidates.some((candidate) => existsSync(candidate))) {
      problems.push(`${relative(DIST, file)} -> ${specifier} does not resolve`);
    }
  }
}

if (checked === 0) throw new Error('check-dist-types: no specifiers checked; is dist/ built?');
if (problems.length) {
  console.error(`check-dist-types: ${problems.length} broken reference(s):`);
  for (const problem of problems) console.error(`  ${problem}`);
  process.exit(1);
}
console.log(`check-dist-types: ${checked} declaration references resolve inside dist/`);
