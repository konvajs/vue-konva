import { describe, expectTypeOf, it } from 'vitest';
import type { GlobalComponents, Plugin } from 'vue';

// Importing an entry point pulls in its `declare module 'vue'` augmentation.
import VueKonva from '../src/index.js';
import VueKonvaCore from '../src/index-core.js';
import type * as konvaComponents from '../src/components.js';
import type * as konvaCoreComponents from '../src/components-core.js';

// `install()` registers `${prefix}${name}`, so `<v-circle>` resolves to `VCircle`.
// Unprefixed keys are never registered and would type-check nothing.
type Registered = `V${keyof typeof konvaComponents}` | 'VStage';

// The runtime suite mounts with these plugins, but typecheck.ignoreSourceErrors
// means a .test.ts file enforces nothing about their type.
describe('plugin shape', () => {
  it('is accepted by app.use from both entry points', () => {
    expectTypeOf(VueKonva).toExtend<Plugin>();
    expectTypeOf(VueKonvaCore).toExtend<Plugin>();
  });
});

describe('GlobalComponents augmentation', () => {
  it('applies the augmentation, including the stage tag', () => {
    expectTypeOf<Registered>().toExtend<keyof GlobalComponents>();
  });

  // The augmentation derives from components.ts, so a shape added there but
  // forgotten in components-core.ts would silently skip the core entry.
  it('keeps the full and core component sets in step', () => {
    expectTypeOf<keyof typeof konvaComponents>().toEqualTypeOf<keyof typeof konvaCoreComponents>();
  });

  it('does not declare unprefixed tags, which resolve to nothing', () => {
    expectTypeOf<'Circle'>().not.toExtend<keyof GlobalComponents>();
  });
});
