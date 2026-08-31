import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';

// The core entry ships no shapes; consumers import the ones they use.
import { Rect } from 'konva/lib/shapes/Rect';
import VueKonvaCore from '../src/index-core';

const mountCore = (template: string) =>
  mount({ template }, { global: { plugins: [VueKonvaCore] } });

describe('vue-konva/core entry', () => {
  it('mounts a stage from konva/lib/Core and renders an imported shape', () => {
    const wrapper = mountCore(`
      <v-stage ref="stage" :config="{ width: 50, height: 50 }">
        <v-layer><v-rect :config="{ width: 10, height: 10, fill: 'red' }" /></v-layer>
      </v-stage>
    `);
    const stage = (wrapper.vm.$refs.stage as any).getStage();

    expect(stage.findOne('Rect').fill()).to.equal('red');
    // A Layer is what actually allocates a canvas.
    expect(wrapper.element.querySelectorAll('canvas').length).to.be.greaterThan(0);
  });

  it('registers customNodes alongside the built-in components', () => {
    const wrapper = mount(
      {
        template: `
          <v-stage ref="stage" :config="{ width: 50, height: 50 }">
            <v-layer><v-my-rect :config="{ width: 5, height: 5, fill: 'blue' }" /></v-layer>
          </v-stage>
        `,
      },
      { global: { plugins: [[VueKonvaCore, { customNodes: { MyRect: Rect } }]] } },
    );
    const stage = (wrapper.vm.$refs.stage as any).getStage();

    expect(stage.findOne('Rect').fill()).to.equal('blue');
  });

  it('explains which import is missing for a shape that was not loaded', () => {
    expect(() => mountCore(`<v-stage><v-layer><v-star /></v-layer></v-stage>`)).to.throw(
      /Star is not available.*konva\/lib\/shapes\/Star/s,
    );
  });
});
