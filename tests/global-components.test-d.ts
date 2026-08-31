import { describe, expectTypeOf, it } from 'vitest';
import type { GlobalComponents } from 'vue';

// Importing an entry point pulls in its `declare module 'vue'` augmentation.
import '../src/index';
import '../src/index-core';

type HasKey<K extends string> = K extends keyof GlobalComponents ? true : false;

describe('GlobalComponents augmentation', () => {
  // `install()` registers every component as `${prefix}${name}` with a default
  // prefix of `V`, so templates using the documented `<v-circle>` resolve to
  // `VCircle`. Unprefixed keys are never registered by the plugin.
  it('declares the prefixed names that install() actually registers', () => {
    expectTypeOf<HasKey<'VStage'>>().toEqualTypeOf<true>();
    expectTypeOf<HasKey<'VLayer'>>().toEqualTypeOf<true>();
    expectTypeOf<HasKey<'VCircle'>>().toEqualTypeOf<true>();
    expectTypeOf<HasKey<'VRect'>>().toEqualTypeOf<true>();
    expectTypeOf<HasKey<'VTransformer'>>().toEqualTypeOf<true>();
  });

  it('covers every shape, not just a sample', () => {
    expectTypeOf<HasKey<'VArc'>>().toEqualTypeOf<true>();
    expectTypeOf<HasKey<'VArrow'>>().toEqualTypeOf<true>();
    expectTypeOf<HasKey<'VEllipse'>>().toEqualTypeOf<true>();
    expectTypeOf<HasKey<'VFastLayer'>>().toEqualTypeOf<true>();
    expectTypeOf<HasKey<'VGroup'>>().toEqualTypeOf<true>();
    expectTypeOf<HasKey<'VImage'>>().toEqualTypeOf<true>();
    expectTypeOf<HasKey<'VLabel'>>().toEqualTypeOf<true>();
    expectTypeOf<HasKey<'VLine'>>().toEqualTypeOf<true>();
    expectTypeOf<HasKey<'VPath'>>().toEqualTypeOf<true>();
    expectTypeOf<HasKey<'VRegularPolygon'>>().toEqualTypeOf<true>();
    expectTypeOf<HasKey<'VRing'>>().toEqualTypeOf<true>();
    expectTypeOf<HasKey<'VShape'>>().toEqualTypeOf<true>();
    expectTypeOf<HasKey<'VSprite'>>().toEqualTypeOf<true>();
    expectTypeOf<HasKey<'VStar'>>().toEqualTypeOf<true>();
    expectTypeOf<HasKey<'VTag'>>().toEqualTypeOf<true>();
    expectTypeOf<HasKey<'VText'>>().toEqualTypeOf<true>();
    expectTypeOf<HasKey<'VTextPath'>>().toEqualTypeOf<true>();
    expectTypeOf<HasKey<'VWedge'>>().toEqualTypeOf<true>();
  });
});
