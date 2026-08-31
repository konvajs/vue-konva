# Change Log

All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]

### Fixed

- `vue-konva/core` no longer pulls the full Konva bundle. `updatePicture` imported `konva` instead of `konva/lib/Core`, which dragged every shape and filter into the core build (#268, thanks @RogerReal)
- Published type declarations no longer reference `index.d.ts`, a file that was never included in the package tarball
- Types now resolve correctly under `moduleResolution: node16`/`nodenext` from ESM. The package previously shipped CJS-flavoured declarations for its ESM entry, so `import VueKonva from 'vue-konva'` was typed as the module namespace rather than the plugin
- `vue-konva/core` now resolves under the legacy `moduleResolution: node`
- Template type-checking of the global components now works. The `GlobalComponents` augmentation declared unprefixed names (`Circle`) while `install()` registers prefixed ones (`VCircle`), so `<v-circle>` never matched. The augmentation also now covers `v-stage` and the `vue-konva/core` entry
- The UMD build exposes a usable `VueKonva` global. It was previously `window["vue-konva"]`, and the namespace object had no `install`, so `app.use(...)` could not work
- Corrected the CDN example in the README, which pointed at a 404 URL and used the Vue 2 API

### Changed

- **Breaking (UMD/CDN only):** the UMD global is now `VueKonva` instead of `window["vue-konva"]`
- **Breaking (deep imports only):** built files are renamed for the dual-package layout — `vue-konva.mjs` becomes `vue-konva.js`, `vue-konva.umd.js` stays for CDN use, and `require()` now resolves to `vue-konva.cjs`. Importing `vue-konva` or `vue-konva/core` is unaffected
- Added `install` as a named export on both entry points
- Marked the package `sideEffects: false` to improve tree-shaking
- Removed the duplicated `StageCore` component and the duplicated plugin bootstrap; both entry points now share one implementation
- Updated the toolchain to TypeScript 7, Vite 8, Vitest 4.1 and jsdom 30
- `engines.node` now says `>=18` instead of `>= 4.0.0`

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
