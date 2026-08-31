// tsc emits a single declaration tree. With "type": "module" those .d.ts files
// are ESM, so CJS consumers need a parallel .d.cts tree whose relative
// specifiers point at .cjs siblings. Without it, `require('vue-konva')`
// resolves to ESM-flavoured types ("masquerading as CJS").
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = fileURLToPath(new URL('../dist/', import.meta.url));

async function* declarationFiles(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* declarationFiles(full);
    else if (entry.name.endsWith('.d.ts')) yield full;
  }
}

let count = 0;
for await (const file of declarationFiles(DIST)) {
  const source = await readFile(file, 'utf8');
  const rewritten = source.replace(
    /(from\s+|import\s+)('|")(\.[^'"]*)\.js\2/g,
    (_, keyword, quote, specifier) => `${keyword}${quote}${specifier}.cjs${quote}`,
  );
  await writeFile(file.replace(/\.d\.ts$/, '.d.cts'), rewritten);
  count++;
}

if (count === 0) throw new Error('build-cjs-types: no .d.ts files found in dist/');
console.log(`build-cjs-types: wrote ${count} .d.cts files`);
