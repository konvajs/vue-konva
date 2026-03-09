# Change Log

All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

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
