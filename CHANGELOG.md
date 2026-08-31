# Change Log

All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## [4.0.0] - 2026-08-31

### Breaking

- **The package is now ESM only for module consumers.** The CommonJS build is gone; `dist/`
  ships `vue-konva.js`, `vue-konva-core.js` and their declarations, plus a UMD bundle for
  CDN use. Konva has been ESM only for some time, so the CommonJS build could not load its
  own peer dependency on any runtime lacking `require(esm)` — it removed no capability that
  was actually working. Bundlers (Vite, webpack, Rollup) and modern Node are unaffected;
  `require()` needs Node 20.19+ or 22.12+, which supports requiring ESM.
- Built files are renamed: `vue-konva.mjs` is now `vue-konva.js`, and `vue-konva-core.mjs`
  is now `vue-konva-core.js`. Importing `vue-konva` or `vue-konva/core` is unaffected.
- The UMD global is now `VueKonva`, not `window["vue-konva"]` — which was not a usable
  identifier and carried no `install`, so `app.use(...)` could never have worked from a
  script tag. The README's CDN URL, which returned 404 for the whole 3.x line, is corrected.
- `typesVersions` was dropped, so `moduleResolution: "node"` (TypeScript's legacy node10
  mode) is no longer supported. Use `bundler`, `node16` or `nodenext`.
- `engines.node` now says `>=18` instead of `>= 4.0.0`.

### Fixed

- `vue-konva/core` no longer pulls in the full Konva bundle. `updatePicture` imported
  `konva` rather than `konva/lib/Core`, which dragged every shape and filter into the core
  build (#268, thanks @RogerReal)
- Published type declarations no longer reference `index.d.ts`, a file that was never
  included in the package tarball
- Types now resolve correctly under `moduleResolution: node16`/`nodenext`. The package
  previously shipped CommonJS-flavoured declarations for its ESM entry, so
  `import VueKonva from 'vue-konva'` was typed as the module namespace rather than the plugin
- Template type-checking of the global components now works. The `GlobalComponents`
  augmentation declared unprefixed names (`Circle`) while `install()` registers prefixed ones
  (`VCircle`), so `<v-circle>` never matched. It now also covers `v-stage` and the
  `vue-konva/core` entry

### Changed

- Marked the package `sideEffects: false` to improve tree-shaking
- Removed the duplicated `StageCore` component and the duplicated plugin bootstrap; both
  entry points now share one implementation
- Updated the toolchain to TypeScript 7, Vite 8, Vitest 4.1 and jsdom 30

## [3.4.0] - 2026-03-09

- Add `v-model` support for Konva node properties (e.g. `v-model:x`, `v-model:rotation`) using Konva's `*Change` events
- Add `VueKonvaRef<T>` generic type for typed template refs
- Add minimal bundle / tree-shaking support via `vue-konva/core` entry point
- Forward HTML attributes (`class`, `id`, `role`, `style`, `tabindex`, `title`, `accesskey`) to the Stage container div
- Fix dynamically adding layers to stage with `v-for` (#201)
- Fix rendering: use Vue fragments instead of `<template>` elements to avoid non-Konva DOM nodes inside the stage

## [3.3.0] - 2025-12-30

- Export named components from the package

## [3.2.2] - 2025-07-14

- A bit better `useImage` hook implementation
- Update dev deps

## [3.2.0] - 2024-11-21

- Add `useImage` hook

## [3.1.4] - 2024-11-17

- Fix typescript declaration file generation

## [3.1.3] - 2024-11-17

- Pass `style` to stage container

## [3.1.1] - 2024-09-16

- Fix typescript declaration file
