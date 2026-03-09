import { nextTick, h, defineComponent, ref } from 'vue';
import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest';
import Konva from 'konva';
import { mount, config } from '@vue/test-utils';

import './mocking';
import VueKonva from '../src';
import { useImage } from '../src/use-image';

describe('Test references', () => {
  beforeEach(() => {
    config.global.plugins = [VueKonva];
  });

  afterEach(() => {
    config.global.plugins = [];
  });

  it('create stage on mount', () => {
    const wrapper = mount({
      template: `
        <v-stage ref='stage'></v-stage>
      `,
    });
    const stage = (wrapper.vm.$refs.stage as any).getStage();
    expect(stage).to.not.equal(undefined);
  });

  it('Make sure it does not draw HTML', () => {
    const { vm } = mount({
      template: `
        <v-stage ref='stage'>
        </v-stage>
      `,
    });
    const stage = (vm.$refs.stage as any).getStage();
    expect(stage).to.not.equal(undefined);
  });

  it('set initial stage size', () => {
    const { vm } = mount({
      template: `
        <v-stage ref='stage' :config='stage'>
        </v-stage>
      `,
      data() {
        return {
          stage: {
            width: 300,
            height: 400,
          },
        };
      },
    });
    const stage = (vm.$refs.stage as any).getStage();
    expect(stage.width()).to.equal(300);
    expect(stage.height()).to.equal(400);
  });

  it('create layers', () => {
    const { vm } = mount({
      template: `
        <v-stage ref='stage' :config='stage'>
        <v-layer ref='layer'>
          <v-rect :config='{ width: 50, height: 50 }' />
          <v-circle :config='{ radius: 25 }' />
        </v-layer>
        </v-stage>
      `,
      data() {
        return {
          stage: {
            width: 300,
            height: 400,
          },
        };
      },
    });

    const stage = (vm.$refs.stage as any).getStage();
    expect(stage.children.length).to.equal(1);

    const layer = (vm.$refs.layer as any).getNode();
    expect(layer instanceof Konva.Layer).to.equal(true);

    // Shapes and containers should not create any DOM elements.
    // Only Konva's own content div should be in the stage container.
    const stageContainer = stage.container();
    const allDomElements = stageContainer.querySelectorAll('*');
    const konvaElements = stageContainer.querySelectorAll('.konvajs-content, .konvajs-content *');
    expect(allDomElements.length).to.equal(konvaElements.length);
  });

  it('Make sure it does not draw HTML', () => {
    const { vm } = mount({
      template: `
        <v-stage ref='stage' :config='stage'>
        <v-layer ref='layer'>
        </v-layer>
        </v-stage>
      `,
      data() {
        return {
          stage: {
            width: 300,
            height: 400,
          },
        };
      },
    });

    const stage = (vm.$refs.stage as any).getStage();
    const container = stage.container();

    // Only Konva's own content div should be in the stage container.
    // No Vue DOM elements should leak into it.
    expect(container.children.length).to.equal(1);
    expect(container.children[0].classList.contains('konvajs-content')).to.equal(true);
  });
});

describe('Test stage component', () => {
  beforeEach(() => {
    config.global.plugins = [VueKonva];
  });

  afterEach(() => {
    config.global.plugins = [];
  });
  it('can attach stage events', () => {
    let eventCount = 0;

    const { vm } = mount({
      template: `
        <v-stage ref='stage' :config='stage' @mousedown='handleMouseDown'>
        <v-layer ref='layer'>
          <v-rect />
        </v-layer>
        </v-stage>
      `,
      data() {
        return {
          stage: {
            width: 300,
            height: 400,
          },
          rect: {
            width: 100,
            height: 100,
          },
        };
      },
      methods: {
        handleMouseDown() {
          eventCount += 1;
        },
      },
    });

    const stage = (vm.$refs.stage as any).getStage();
    stage.simulateMouseDown({ x: 50, y: 50 });
    expect(eventCount).to.equal(1);
  });

  it('can set styles', () => {

    const { vm } = mount({
      template: `
        <v-stage ref='stage' :config='stage' style='background-color: red'>
        <v-layer ref='layer'>
          <v-rect />
        </v-layer>
        </v-stage>
      `,
      data() {
        return {
          stage: {
            width: 300,
            height: 400,
          },
          rect: {
            width: 100,
            height: 100,
          },
        };
      },
    });

    const stage = (vm.$refs.stage as any).getStage();
    expect(stage.container().style.backgroundColor).to.equal('red');
  });

  it('can set class', () => {
    const wrapper = mount({
      template: `
        <v-stage ref='stage' :config='stage' class='mt-10 custom-stage'>
        <v-layer>
          <v-rect />
        </v-layer>
        </v-stage>
      `,
      data() {
        return {
          stage: {
            width: 300,
            height: 400,
          },
        };
      },
    });

    const stageDiv = wrapper.find('.mt-10');
    expect(stageDiv.exists()).to.equal(true);
    expect(stageDiv.classes()).to.include('custom-stage');
  });

  it('no DOM events', () => {
    let eventCount = 0;

    const { vm } = mount({
      template: `
        <v-stage ref='stage' :config='stage' @mousedown='handleMouseDown'>
        <v-layer ref='layer'>
          <v-rect />
        </v-layer>
        </v-stage>
      `,
      data() {
        return {
          stage: {
            width: 300,
            height: 400,
          },
          rect: {
            width: 100,
            height: 100,
          },
        };
      },
      methods: {
        handleMouseDown() {
          eventCount += 1;
        },
      },
    });

    const stage = (vm.$refs.stage as any).getStage();
    // trigger DOM event. it should not fire!
    stage.container().dispatchEvent(new Event('mousedown'));
    expect(eventCount).to.equal(0);
  });

  it('unmount stage should destroy it from Konva', () => {
    const { vm } = mount({
      template: `
        <v-stage v-if='drawStage' ref='stage' :config='stage'>
        </v-stage>
      `,
      data() {
        return {
          drawStage: true,
          stage: {
            width: 300,
            height: 400,
          },
        };
      },
    });

    const stagesNumber = Konva.stages.length;
    vm.drawStage = false;
    nextTick(() => {
      expect(Konva.stages.length).to.equal(stagesNumber - 1);
      // done();
    });
  });
});

describe('Test props setting', () => {
  beforeEach(() => {
    config.global.plugins = [VueKonva];
  });

  afterEach(() => {
    config.global.plugins = [];
  });
  it('can pass props directly without config', async () => {
    const { vm } = mount({
      template: `
        <v-stage :config='stage'>
        <v-layer>
          <v-rect ref='rect' :x='x' :y='y' :width='200' :height='100' fill='red' />
        </v-layer>
        </v-stage>
      `,
      data() {
        return {
          stage: { width: 300, height: 400 },
          x: 50,
          y: 100,
        };
      },
    });

    const rect = (vm.$refs.rect as any).getNode();
    expect(rect.x()).to.equal(50);
    expect(rect.y()).to.equal(100);
    expect(rect.width()).to.equal(200);
    expect(rect.fill()).to.equal('red');

    vm.x = 150;
    await nextTick();
    expect(rect.x()).to.equal(150);
  });

  it('can update component props', async () => {
    const { vm } = mount({
      template: `
        <v-stage ref='stage' :config='stage'>
        <v-layer>
          <v-rect :config='rect' ref='rect'>
          </v-rect>
        </v-layer>
        </v-stage>
      `,
      data() {
        return {
          stage: {
            width: 300,
            height: 400,
          },
          rect: {
            width: 100,
            height: 100,
          },
        };
      },
    });

    const rect = (vm.$refs.rect as any).getNode();

    expect(rect.width()).to.equal(100);
    expect(rect.height()).to.equal(100);

    vm.rect.width = 300;
    await nextTick();
    expect(rect.width()).to.equal(300);
    vm.rect = {
      width: 200,
      height: 100,
    };
    await nextTick();
    expect(rect.width()).to.equal(200);
  });

  it('can use v-if', async () => {
    const { vm } = mount({
      template: `
        <v-stage ref='stage' :config='stage'>
        <v-layer ref='layer'>
          <v-text
            v-if='textVisible'
            :config="{ text: 'some text' }"
          />
          <v-rect
            :config="{
              x: 20,
              y: 50,
              width: 100,
              height: 100,
              fill: 'red',
              shadowBlur: 10
            }"
          />
        </v-layer>
        </v-stage>
      `,
      data() {
        return {
          stage: {
            width: 300,
            height: 400,
          },
          textVisible: true,
        };
      },
    });

    const layer = (vm.$refs.layer as any).getNode();

    expect(layer.children.length).to.equal(2);
    const warnSpy = vi.spyOn(Konva.Util, 'warn');
    vm.textVisible = false;
    await nextTick();
    expect(layer.children.length).to.equal(1);
    expect(layer.children[0].className).to.equal('Rect');
    expect(warnSpy).not.toHaveBeenCalled();
    warnSpy.mockRestore();
  });

  it('can set stage props', async () => {
    const { vm } = mount({
      template: `
        <v-stage ref='stage' :config='stage'>
        </v-stage>
      `,
      data() {
        return {
          stage: {
            width: 0,
            height: 400,
          },
        };
      },
      mounted() {
        this.stage.width = 300;
      },
    });

    const stage = (vm.$refs.stage as any).getNode();

    await nextTick();
    expect(stage.width()).to.equal(300);
  });

  it('can update component events', async () => {
    const wrap = mount({
      template: `
        <v-stage :config='stage'>
        <v-layer>
          <v-rect ref='rect' :config='{width: 300}' @click='click' />
        </v-layer>
        </v-stage>
      `,
      props: ['click'],
      data() {
        return {
          stage: {
            width: 300,
            height: 400,
          },
        };
      },
    });

    const rect = (wrap.vm.$refs.rect as any).getNode();
    expect(rect.eventListeners.click).to.equal(undefined);

    const handler = () => {};
    wrap.setProps({
      click: handler,
    });

    await nextTick();
    expect(rect.eventListeners.click.length).to.equal(1);

    wrap.setProps({
      click: null,
    });
    await nextTick();
    expect(rect.eventListeners.click).to.equal(undefined);
  });

  it('updating props should call layer redraw', async () => {
    const { vm } = mount({
      template: `
        <v-stage ref='stage' :config='stage'>
        <v-layer ref='layer'>
          <v-rect :config='rect' ref='rect'>
          </v-rect>
        </v-layer>
        </v-stage>
      `,
      data() {
        return {
          stage: {
            width: 300,
            height: 400,
          },
          rect: {
            width: 100,
            height: 100,
          },
        };
      },
    });

    const layer = (vm.$refs.layer as any).getNode();

    const spyBatchDraw = vi.spyOn(layer, 'batchDraw');

    vm.rect.width = 50;
    vm.rect.width = 150;
    await nextTick();

    expect(spyBatchDraw).toHaveBeenCalledOnce();

    spyBatchDraw.mockRestore();
  });

  it('changing order should redraw layer', async () => {
    const { vm } = mount({
      template: `
        <v-stage ref='stage' :config='stage'>
        <v-layer ref='layer'>
          <v-rect v-for='item in items' :config='item' :key='item.id'>
          </v-rect>
        </v-layer>
        </v-stage>
      `,
      data() {
        return {
          stage: {
            width: 300,
            height: 400,
          },
          items: [
            {
              id: '1',
              width: 100,
              height: 100,
            },
            {
              id: '2',
              width: 100,
              height: 100,
            },
          ],
        };
      },
    });

    const layer = (vm.$refs.layer as any).getNode();
    const spyBatchDraw = vi.spyOn(layer, 'batchDraw');

    const items = vm.items.concat();
    items.reverse();
    vm.items = items;
    await nextTick();

    expect(spyBatchDraw).toHaveBeenCalledOnce();
    spyBatchDraw.mockRestore();
  });

  it('checking for loop order on non-containers', async () => {
    const { vm } = mount({
      template: `
        <v-stage ref='stage' :config='stage'>
        <v-layer :config="{ name: 'Layer 0'}">
          <v-rect v-for='item in items' :config='item' :key='item.id'>
          </v-rect>
        </v-layer>
        <v-layer v-if='show' :config="{ id: '3', name: 'Layer 1' }" />
        </v-stage>
      `,
      data() {
        return {
          stage: {
            width: 300,
            height: 400,
          },
          items: [] as object[],
          show: true,
        };
      },
    });

    const stage = (vm.$refs.stage as any).getNode();

    await nextTick();
    vm.items = [
      { id: '0', name: 'Rect 0' },
      { id: '1', name: 'Rect 1' },
      { id: '2', name: 'Rect 2' },
    ];
    vm.show = true;
    await nextTick();
    expect(stage.children[0].children[0].id()).to.equal('0');
    expect(stage.children[0].children[1].id()).to.equal('1');
    expect(stage.children[0].children[2].id()).to.equal('2');
  });

  it.skip('checking for loop order in layers', async () => {
    const { vm } = mount({
      template: `
        <div>
        <v-stage ref='stage' :config='stage'>
          <v-layer v-for='item in items' :config='item' :key='item.id'>
            <v-rect :config="{name: 'Rect ' + item.id}" />
          </v-layer>
          <v-layer :config="{ id: '3', name: 'Layer 3' }" />
        </v-stage>
        </div>
      `,
      data() {
        return {
          stage: {
            name: 'THE STAGE',
            width: 300,
            height: 400,
          },
          items: [] as object[],
        };
      },
    });

    const stage = (vm.$refs.stage as any).getNode();
    expect(stage.children[0].id()).to.equal('3');

    await nextTick();

    vm.items = [
      {
        id: '1',
        name: 'Layer 1',
      },
      {
        id: '2',
        name: 'Layer 2',
      },
    ];
    // debugger;
    await nextTick();
    expect(stage.children[0].id()).to.equal('1');
    expect(stage.children[1].id()).to.equal('2');
    expect(stage.children[2].id()).to.equal('3');
  });

  it('checking for loop order on internal nodes', async () => {
    const { vm } = mount({
      template: `
        <div>
        <v-stage ref='stage' :config='stage'>
          <v-layer>
            <v-rect v-for='item in items' :config='item' :key='item.id' />
            <v-rect :config="{id: '3'}" />
          </v-layer>
        </v-stage>
        </div>
      `,
      data() {
        return {
          stage: {
            name: 'THE STAGE',
            width: 300,
            height: 400,
          },
          items: [] as object[],
        };
      },
    });

    const stage = (vm.$refs.stage as any).getNode();
    const layer = stage.children[0];
    expect(layer.children[0].id()).to.equal('3');

    await nextTick();

    vm.items = [
      {
        id: '1',
        width: 100,
        height: 100,
      },
      {
        id: '2',
        width: 100,
        height: 100,
      },
    ];
    // debugger;
    await nextTick();
    expect(layer.children[0].id()).to.equal('1');
    expect(layer.children[1].id()).to.equal('2');
    expect(layer.children[2].id()).to.equal('3');
  });

  it('unset props', async () => {
    const { vm } = mount({
      template: `
        <v-stage ref='stage' :config='stage'>
        <v-layer>
          <v-rect :config='rect' ref='rect'>
          </v-rect>
        </v-layer>
        </v-stage>
      `,
      data() {
        return {
          stage: {
            width: 300,
            height: 400,
          },
          rect: {
            x: 10,
            fill: 'red',
          },
        };
      },
    });

    const rect = (vm.$refs.rect as any).getNode();

    expect(rect.fill()).to.equal('red');

    // @ts-ignore TODO
    vm.rect.fill = null;
    // @ts-ignore TODO
    vm.rect.x = null;
    await nextTick();
    expect(!!rect.fill()).to.equal(false);
    expect(rect.x()).to.equal(0);
  });

  it('do not overwrite properties if that changed manually', () => {
    const { vm } = mount({
      template: `
        <v-stage ref='stage' :config='stage'>
        <v-layer>
          <v-rect :config='rect' ref='rect'>
          </v-rect>
        </v-layer>
        </v-stage>
      `,
      data() {
        return {
          stage: {
            width: 300,
            height: 400,
          },
          rect: {
            x: 10,
            fill: 'red',
          },
        };
      },
    });

    const rect = (vm.$refs.rect as any).getNode();

    // change position manually
    rect.x(20);

    vm.rect.fill = 'white';

    expect(rect.x()).to.equal(20);
  });

  it('use with template', async () => {
    const { vm } = mount({
      template: `
        <v-stage ref='stage' :config='stage'>
        <v-layer :config='layer' ref='layer'>
          <template v-for='shape in shapes' :key='shape'>
            <v-rect :config="{name: 'rect1'}"></v-rect>
            <v-rect :config="{name: 'sdf'}" v-if='shape === 3'></v-rect>
          </template>
          <v-rect :config="{name: 'rect2'}"></v-rect>
        </v-layer>
        </v-stage>
      `,
      data() {
        return {
          stage: {
            width: 300,
            height: 400,
          },
          shapes: [1],
          layer: {
            name: 'layer',
          },
        };
      },
    });

    const layer = (vm.$refs.layer as any).getNode();
    const rect1 = layer.findOne('.rect1');
    const rect2 = layer.findOne('.rect2');

    expect(rect1.zIndex()).to.equal(0);
    expect(rect2.zIndex()).to.equal(1);

    vm.shapes = [1];

    await nextTick();
    expect(rect1.zIndex()).to.equal(0);
    expect(rect2.zIndex()).to.equal(1);
  });
});

describe('Test strict mode', () => {
  beforeEach(() => {
    config.global.plugins = [VueKonva];
  });

  afterEach(() => {
    config.global.plugins = [];
  });

  it('overwrite properties if changed manually in strict mode', async () => {
    const { vm } = mount({
      template: `
        <v-stage ref='stage' :config='stage'>
        <v-layer>
          <v-rect :config='rect' :__useStrictMode='true' ref='rect'>
          </v-rect>
        </v-layer>
        </v-stage>
      `,
      data() {
        return {
          stage: {
            width: 300,
            height: 400,
          },
          rect: {
            x: 10,
            fill: 'red',
          },
        };
      },
    });

    const rect = (vm.$refs.rect as any).getNode();

    // change position manually
    rect.x(20);
    expect(rect.x()).to.equal(20);

    // trigger a re-render by changing fill
    vm.rect.fill = 'white';
    await nextTick();

    // in strict mode, x should be reset to the config value
    expect(rect.x()).to.equal(10);
    expect(rect.fill()).to.equal('white');
  });
});

describe('Test v-model support', () => {
  beforeEach(() => {
    config.global.plugins = [VueKonva];
  });

  afterEach(() => {
    config.global.plugins = [];
  });

  it('v-model:x and v-model:y update on drag', async () => {
    const { vm } = mount({
      template: `
        <v-stage ref='stage' :config='stage'>
        <v-layer>
          <v-rect ref='rect' v-model:x='x' v-model:y='y'
            :config='{ width: 100, height: 100, draggable: true }' />
        </v-layer>
        </v-stage>
      `,
      data() {
        return {
          stage: { width: 300, height: 400 },
          x: 10,
          y: 20,
        };
      },
    });

    const stage = (vm.$refs.stage as any).getStage();

    // simulate drag
    stage.simulateMouseDown({ x: 50, y: 50 });
    stage.simulateMouseMove({ x: 100, y: 120 });
    stage.simulateMouseUp({ x: 100, y: 120 });

    await nextTick();
    const rect = (vm.$refs.rect as any).getNode();
    expect(vm.x).to.equal(rect.x());
    expect(vm.y).to.equal(rect.y());
  });

  it('v-model updates Vue ref when Konva property changes', async () => {
    const { vm } = mount({
      template: `
        <v-stage ref='stage' :config='stage'>
        <v-layer>
          <v-rect ref='rect' v-model:x='x' v-model:rotation='rotation'
            :config='{ width: 100, height: 100 }' />
        </v-layer>
        </v-stage>
      `,
      data() {
        return {
          stage: { width: 300, height: 400 },
          x: 0,
          rotation: 0,
        };
      },
    });

    const rect = (vm.$refs.rect as any).getNode();

    // change Konva node directly
    rect.x(42);
    await nextTick();
    expect(vm.x).to.equal(42);

    rect.rotation(90);
    await nextTick();
    expect(vm.rotation).to.equal(90);
  });

  it('v-model works alongside config prop', async () => {
    const { vm } = mount({
      template: `
        <v-stage ref='stage' :config='stage'>
        <v-layer>
          <v-rect ref='rect' v-model:x='x'
            :config='{ width: 100, height: 100, fill: "red" }' />
        </v-layer>
        </v-stage>
      `,
      data() {
        return {
          stage: { width: 300, height: 400 },
          x: 50,
        };
      },
    });

    const rect = (vm.$refs.rect as any).getNode();
    expect(rect.x()).to.equal(50);
    expect(rect.fill()).to.equal('red');

    // Vue -> Konva
    vm.x = 100;
    await nextTick();
    expect(rect.x()).to.equal(100);

    // Konva -> Vue
    rect.x(200);
    await nextTick();
    expect(vm.x).to.equal(200);
  });

  it('cleans up v-model listeners on unmount', async () => {
    const { vm } = mount({
      template: `
        <v-stage ref='stage' :config='stage'>
        <v-layer>
          <v-rect v-if='show' ref='rect' v-model:x='x'
            :config='{ width: 100, height: 100 }' />
        </v-layer>
        </v-stage>
      `,
      data() {
        return {
          stage: { width: 300, height: 400 },
          show: true,
          x: 10,
        };
      },
    });

    const rect = (vm.$refs.rect as any).getNode();
    rect.x(50);
    expect(vm.x).to.equal(50);

    vm.show = false;
    await nextTick();

    // after unmount, changing node should not affect Vue data
    rect.x(999);
    await nextTick();
    expect(vm.x).to.equal(50);
  });
});

describe('Test duplicate events', () => {
  beforeEach(() => {
    config.global.plugins = [VueKonva];
  });

  afterEach(() => {
    config.global.plugins = [];
  });

  it('does not fire shape events twice after config update', async () => {
    const clickHandler = vi.fn();

    const { vm } = mount({
      template: `
        <v-stage ref='stage' :config='stage'>
        <v-layer>
          <v-rect ref='rect' :config='rect' @click='clickHandler'>
          </v-rect>
        </v-layer>
        </v-stage>
      `,
      data() {
        return {
          stage: {
            width: 300,
            height: 400,
          },
          rect: {
            width: 100,
            height: 100,
            fill: 'red',
          },
        };
      },
      methods: {
        clickHandler() {
          clickHandler();
        },
      },
    });

    const rect = (vm.$refs.rect as any).getNode();

    rect._fire('click', {});
    expect(clickHandler).toHaveBeenCalledTimes(1);

    // update config to trigger re-render
    vm.rect.fill = 'blue';
    await nextTick();

    rect._fire('click', {});
    expect(clickHandler).toHaveBeenCalledTimes(2);
  });

  it('does not fire stage events twice after config update', async () => {
    const mousedownHandler = vi.fn();

    const { vm } = mount({
      template: `
        <v-stage ref='stage' :config='stage' @mousedown='mousedownHandler'>
        <v-layer>
          <v-rect :config='rect'>
          </v-rect>
        </v-layer>
        </v-stage>
      `,
      data() {
        return {
          stage: {
            width: 300,
            height: 400,
          },
          rect: {
            width: 100,
            height: 100,
          },
        };
      },
      methods: {
        mousedownHandler() {
          mousedownHandler();
        },
      },
    });

    const stage = (vm.$refs.stage as any).getStage();

    stage.simulateMouseDown({ x: 50, y: 50 });
    expect(mousedownHandler).toHaveBeenCalledTimes(1);

    // update stage config
    vm.stage.width = 400;
    await nextTick();

    stage.simulateMouseDown({ x: 50, y: 50 });
    expect(mousedownHandler).toHaveBeenCalledTimes(2);
  });
});

describe('Test wrapper components', () => {
  beforeEach(() => {
    config.global.plugins = [VueKonva];
  });

  afterEach(() => {
    config.global.plugins = [];
  });

  it('shapes inside a wrapper component are added to the layer', () => {
    const ShapeWrapper = {
      template: `
        <v-rect :config="{ name: 'wrappedRect', width: 50, height: 50, fill: 'green' }" />
      `,
    };

    const { vm } = mount(
      {
        template: `
          <v-stage ref='stage' :config='stage'>
          <v-layer ref='layer'>
            <ShapeWrapper />
            <v-circle :config="{ name: 'directCircle', radius: 25 }" />
          </v-layer>
          </v-stage>
        `,
        data() {
          return {
            stage: {
              width: 300,
              height: 400,
            },
          };
        },
      },
      {
        global: {
          components: {
            ShapeWrapper,
          },
        },
      },
    );

    const layer = (vm.$refs.layer as any).getNode();

    expect(layer.children.length).to.equal(2);
    expect(layer.findOne('.wrappedRect')).to.not.equal(undefined);
    expect(layer.findOne('.directCircle')).to.not.equal(undefined);
  });

  it('multiple shapes inside a wrapper component are added to the layer', () => {
    const MultiShapeWrapper = {
      template: `
        <v-group :config="{ name: 'group' }">
          <v-rect :config="{ name: 'rect1', width: 50, height: 50 }" />
          <v-rect :config="{ name: 'rect2', width: 50, height: 50 }" />
        </v-group>
      `,
    };

    const { vm } = mount(
      {
        template: `
          <v-stage ref='stage' :config='stage'>
          <v-layer ref='layer'>
            <MultiShapeWrapper />
          </v-layer>
          </v-stage>
        `,
        data() {
          return {
            stage: {
              width: 300,
              height: 400,
            },
          };
        },
      },
      {
        global: {
          components: {
            MultiShapeWrapper,
          },
        },
      },
    );

    const layer = (vm.$refs.layer as any).getNode();
    const group = layer.findOne('.group');

    expect(group).to.not.equal(undefined);
    expect(group.children.length).to.equal(2);
    expect(group.findOne('.rect1')).to.not.equal(undefined);
    expect(group.findOne('.rect2')).to.not.equal(undefined);
  });
});

describe('test lifecycle methods', () => {
  beforeEach(() => {
    config.global.plugins = [VueKonva];
  });

  afterEach(() => {
    config.global.plugins = [];
  });
  let createdCount = 0;
  let updateCount = 0;
  let beforeCreateCount = 0;
  const lifecycle = defineComponent({
    props: ['fill'],
    render() {
      return h('v-rect', {
        attrs: { config: { fill: this.fill } },
      });
    },
    beforeCreate() {
      beforeCreateCount += 1;
    },
    created() {
      createdCount += 1;
    },
    updated() {
      updateCount += 1;
    },
  });

  beforeEach(() => {
    createdCount = 0;
    updateCount = 0;
  });

  it('test mount', () => {
    mount({
      render() {
        return h('v-stage', [h('v-layer', [h(lifecycle, {})])]);
      },
    });

    expect(createdCount).to.equal(1);
  });

  it('test update', async () => {
    const wrap = mount({
      props: ['fill'],
      render() {
        return h('v-stage', { ref: 'stage' }, [
          h('v-layer', [
            h(lifecycle, {
              attrs: {
                fill: this.fill,
              },
            }),
          ]),
        ]);
      },
    });

    wrap.setProps({
      fill: 'white',
    });

    await nextTick();
    expect(updateCount).to.equal(1);
  });
});

describe('Test Events', () => {
  beforeEach(() => {
    config.global.plugins = [VueKonva];
  });

  afterEach(() => {
    config.global.plugins = [];
  });
  it('should remove events on unmount', async () => {
    const onClickRect = vi.fn();
    const onClickExternal = vi.fn();
    const { vm } = mount(
      {
        props: ['click'],
        template: `
          <v-stage ref='stage'>
          <v-layer v-if='drawLayer' ref='layer'>
            <v-rect ref='rect' @click='click'> 
            </v-rect>
          </v-layer>
          </v-stage>
        `,
        data() {
          return {
            drawLayer: true,
          };
        },
      },
      {
        propsData: {
          click: onClickRect, // TODO
        },
      },
    );

    // @ts-ignore TODO
    vm.drawStage = false;

    const stage = (vm.$refs.stage as any).getNode();
    const layer = stage.findOne('Layer');
    const rect = stage.findOne('Rect');
    rect.on('click', onClickExternal);

    expect(onClickRect).not.toHaveBeenCalled();
    expect(onClickExternal).not.toHaveBeenCalled();

    rect._fire('click', {});
    expect(onClickRect).toHaveBeenCalledOnce();
    expect(onClickExternal).toHaveBeenCalledOnce();

    // remove layer

    vm.drawLayer = false;

    await nextTick();
    expect(layer.getParent()).to.equal(null);

    rect._fire('click', {});

    expect(onClickRect).toHaveBeenCalledOnce();
    expect(onClickExternal).toHaveBeenCalledTimes(2);
  });

  it('check arguments', () => {
    const { vm } = mount({
      template: `
        <v-stage ref='stage' :config='size'>
        <v-layer ref='layer'>
          <v-rect ref='rect' @mousedown='mousedown' :config='size'>
          </v-rect>
        </v-layer>
        </v-stage>
      `,
      data() {
        return {
          size: {
            width: 100,
            height: 100,
          },
        };
      },
      methods: {
        mousedown(e: MouseEvent) {
          expect(this).to.equal(vm);
          expect(e.target instanceof Konva.Rect).to.equal(true);
        },
      },
    });

    const stage = (vm.$refs.stage as any).getNode();

    stage.simulateMouseDown({
      x: 50,
      y: 50,
    });
  });
});

describe('Test drawing calls', () => {
  beforeEach(() => {
    config.global.plugins = [VueKonva];
  });

  afterEach(() => {
    config.global.plugins = [];
  });
  it('Draw layer on mount', () => {
    const batchDraw = vi.spyOn(Konva.Layer.prototype, 'batchDraw');

    mount({
      template: `
          <v-stage ref='stage'>
            <v-layer>
              <v-rect>
              </v-rect>
            </v-layer>
          </v-stage>
        `,
    });

    expect(batchDraw).toHaveBeenCalled();
    batchDraw.mockRestore();
  });

  it('Draw layer on node add', async () => {
    const batchDraw = vi.spyOn(Konva.Layer.prototype, 'batchDraw');

    const { vm } = mount({
      template: `
        <v-stage ref='stage'>
        <v-layer>
          <v-rect v-if='showRect'>
          </v-rect>
        </v-layer>
        </v-stage>
      `,
      data() {
        return {
          showRect: false,
        };
      },
    });

    expect(batchDraw).toHaveBeenCalledTimes(2);

    vm.showRect = true;
    await nextTick();
    expect(batchDraw).toHaveBeenCalledTimes(3);
    batchDraw.mockRestore();
  });

  it('Draw layer on node remove', async () => {
    const batchDraw = vi.spyOn(Konva.Layer.prototype, 'batchDraw');
    const { vm } = mount({
      template: `
        <v-stage ref='stage'>
        <v-layer>
          <v-rect v-if='showRect'>
          </v-rect>
        </v-layer>
        </v-stage>
      `,
      data() {
        return {
          showRect: true,
        };
      },
    });

    expect(batchDraw).toHaveBeenCalledTimes(3);

    vm.showRect = false;

    await nextTick();
    expect(batchDraw).toHaveBeenCalledTimes(4);

    batchDraw.mockRestore();
  });
});

describe('test reconciler', () => {
  beforeEach(() => {
    config.global.plugins = [VueKonva];
  });

  afterEach(() => {
    config.global.plugins = [];
  });
  it('add before', async () => {
    const { vm } = mount({
      template: `
        <v-stage>
        <v-layer ref='layer'>
          <template v-if='drawMany'>
            <v-rect key='k1' :config="{ name: 'rect1'}" />
            <v-rect key='k2' :config="{ name: 'rect2'}" />
          </template>
          <v-rect v-else key='2' :config="{ name: 'rect2'}" />
        </v-layer>
        </v-stage>
      `,
      // render() {
      //   const kids = this.drawMany
      //     ? [
      //       h('v-rect', {
      //         key: 'k1',
      //         attrs: { config: { name: 'rect1' } },
      //       }),
      //       h('v-rect', {
      //         key: 'k2',
      //         attrs: { config: { name: 'rect2' } },
      //       }),
      //     ]
      //     : [
      //       h('v-rect', {
      //         key: '2',
      //         attrs: { config: { name: 'rect2' } },
      //       }),
      //     ];
      //   return h('v-stage', [
      //     h('v-layer', { ref: 'layer' }, kids),
      //   ]);
      // },
      data() {
        return {
          drawMany: false,
        };
      },
    });

    const batchDraw = vi.spyOn(Konva.Layer.prototype, 'batchDraw');

    vm.drawMany = true;
    await nextTick();
    const layer = (vm.$refs.layer as any).getNode();
    expect(layer.children[0].name()).to.equal('rect1');
    expect(layer.children[1].name()).to.equal('rect2');
    expect(batchDraw).toHaveBeenCalledTimes(3);
    batchDraw.mockRestore();
  });

  it('add before', async () => {
    const { vm } = mount({
      template: `
        <v-stage ref='stage'>
        <v-layer ref='layer'>
          <v-rect v-for='item in items' :config="{name: 'rect' + item}" :key='item'>
          </v-rect>
        </v-layer>
        </v-stage>
      `,
      data() {
        return {
          items: [1, 3],
        };
      },
    });

    vm.items = [1, 2, 3];
    const layer = (vm.$refs.layer as any).getNode();
    await nextTick();
    expect(layer.children[0].name()).to.equal('rect1');
    expect(layer.children[1].name()).to.equal('rect2');
    expect(layer.children[2].name()).to.equal('rect3');
  });

  it('add after', async () => {
    const { vm } = mount({
      template: `
        <v-stage ref='stage'>
        <v-layer ref='layer'>
          <v-rect v-for='item in items' :config="{name: 'rect' + item}" :key='item'>
          </v-rect>
        </v-layer>
        </v-stage>
      `,
      data() {
        return {
          items: [1],
        };
      },
    });

    vm.items = [1, 2];

    await nextTick();
    const layer = (vm.$refs.layer as any).getNode();

    expect(layer.children[0].name()).to.equal('rect1');
    expect(layer.children[1].name()).to.equal('rect2');
  });

  it('change order', async () => {
    const { vm } = mount({
      template: `
        <v-stage ref='stage'>
        <v-layer ref='layer'>
          <v-rect v-for='item in items' :config="{name: 'rect' + item}" :key='item'>
          </v-rect>
        </v-layer>
        </v-stage>
      `,
      data() {
        return {
          items: [1, 2, 3],
        };
      },
    });
    const layer = (vm.$refs.layer as any).getNode();

    expect(layer.children[0].name()).to.equal('rect1');
    expect(layer.children[1].name()).to.equal('rect2');
    expect(layer.children[2].name()).to.equal('rect3');

    vm.items = [3, 2, 1];

    await nextTick();

    expect(layer.children[0].name()).to.equal('rect3');
    expect(layer.children[1].name()).to.equal('rect2');
    expect(layer.children[2].name()).to.equal('rect1');

    vm.items = [1, 3, 2];
    await nextTick();
    expect(layer.children[0].name()).to.equal('rect1');
    expect(layer.children[1].name()).to.equal('rect3');
    expect(layer.children[2].name()).to.equal('rect2');
  });

  it('change deep order', async () => {
    const Deep = {
      props: ['name'],
      template: `
        <v-rect :config='{ name: name}' />
      `,
    };
    const { vm } = mount(
      {
        template: `
          <v-stage ref='stage'>
          <v-layer ref='layer'>
            <Deep v-for='item in items' :name="'rect' + item" :key='item'>
            </Deep>
          </v-layer>
          </v-stage>
        `,
        data() {
          return {
            items: [1, 2, 3],
          };
        },
      },
      {
        global: {
          components: {
            Deep,
          },
        },
      },
    );
    const layer = (vm.$refs.layer as any).getNode();

    expect(layer.children[0].name()).to.equal('rect1');
    expect(layer.children[1].name()).to.equal('rect2');
    expect(layer.children[2].name()).to.equal('rect3');

    vm.items = [3, 2, 1];
    await nextTick();
    expect(layer.children[0].name()).to.equal('rect3');
    expect(layer.children[1].name()).to.equal('rect2');
    expect(layer.children[2].name()).to.equal('rect1');

    vm.items = [1, 3, 2];
    await nextTick();
    expect(layer.children[0].name()).to.equal('rect1');
    expect(layer.children[1].name()).to.equal('rect3');
    expect(layer.children[2].name()).to.equal('rect2');
  });

  it('change deep order with detecting konva node correctly', async () => {
    const Deep = {
      props: ['name'],
      template: `
        <v-rect :config='{name: name}' />
      `,
      methods: {
        getNode() {
          return {};
        },
      },
    };

    const { vm } = mount(
      {
        template: `
          <v-stage ref='stage'>
          <v-layer ref='layer'>
            <Deep v-for='item in items' :name="'rect' + item" :key='item'>
            </Deep>
          </v-layer>
          </v-stage>
        `,
        data() {
          return {
            items: [1, 2, 3],
          };
        },
      },
      {
        global: {
          components: {
            Deep,
          },
        },
      },
    );
    const layer = (vm.$refs.layer as any).getNode();

    expect(layer.children[0].name()).to.equal('rect1');
    expect(layer.children[1].name()).to.equal('rect2');
    expect(layer.children[2].name()).to.equal('rect3');

    vm.items = [3, 2, 1];
    await nextTick();
    expect(layer.children[0].name()).to.equal('rect3');
    expect(layer.children[1].name()).to.equal('rect2');
    expect(layer.children[2].name()).to.equal('rect1');
  });

  it('can draw several stages', () => {
    mount({
      template: `
      <div>
          <v-stage ref='stage'>
            <v-layer ref='layer'>
            </v-layer>
          </v-stage>
          <v-stage ref='stage'>
            <v-layer ref='layer'>
            </v-layer>
          </v-stage>
          </div>
        `,
    });
  });

  it('can dynamically add layers with v-for', async () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    const { vm } = mount({
      template: `
        <v-stage ref='stage' :config='stage'>
          <v-layer v-for='layer in layers' :key='layer.id' :config='{ name: layer.name }'>
            <v-rect :config='{ width: 50, height: 50 }' />
          </v-layer>
        </v-stage>
      `,
      data() {
        return {
          stage: { width: 300, height: 400 },
          layers: [{ id: 1, name: 'layer1' }],
        };
      },
    });

    const stage = (vm.$refs.stage as any).getStage();
    expect(stage.children.length).to.equal(1);

    // dynamically add a layer
    vm.layers.push({ id: 2, name: 'layer2' });
    await nextTick();
    expect(stage.children.length).to.equal(2);

    expect(consoleError).not.toHaveBeenCalled();
    consoleError.mockRestore();
  });

  it('can toggle layers with v-if', async () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    const { vm } = mount({
      template: `
        <v-stage ref='stage' :config='stage'>
          <v-layer :config="{ name: 'base' }">
            <v-rect :config='{ width: 50, height: 50 }' />
          </v-layer>
          <v-layer v-if='showExtra' :config="{ name: 'extra' }">
            <v-rect :config='{ width: 50, height: 50 }' />
          </v-layer>
        </v-stage>
      `,
      data() {
        return {
          stage: { width: 300, height: 400 },
          showExtra: false,
        };
      },
    });

    const stage = (vm.$refs.stage as any).getStage();
    expect(stage.children.length).to.equal(1);

    vm.showExtra = true;
    await nextTick();
    expect(stage.children.length).to.equal(2);

    vm.showExtra = false;
    await nextTick();
    expect(stage.children.length).to.equal(1);

    expect(consoleError).not.toHaveBeenCalled();
    consoleError.mockRestore();
  });
});

describe('Test plugin', () => {
  it('registers components with custom prefix', () => {
    const { vm } = mount(
      {
        template: `
          <konva-stage ref='stage' :config='stage'>
          <konva-layer ref='layer'>
            <konva-rect ref='rect' />
          </konva-layer>
          </konva-stage>
        `,
        data() {
          return {
            stage: {
              width: 300,
              height: 400,
            },
          };
        },
      },
      {
        global: {
          plugins: [[VueKonva, { prefix: 'konva' }]],
        },
      },
    );

    const stage = (vm.$refs.stage as any).getStage();
    expect(stage.children.length).to.equal(1);

    const layer = (vm.$refs.layer as any).getNode();
    expect(layer.children.length).to.equal(1);
    expect(layer instanceof Konva.Layer).to.equal(true);

    const rect = (vm.$refs.rect as any).getNode();
    expect(rect instanceof Konva.Rect).to.equal(true);
  });
});

describe('validations', () => {
  beforeEach(() => {
    config.global.plugins = [VueKonva];
  });

  afterEach(() => {
    config.global.plugins = [];
  });

  it('Make sure no other DOM tags are used', async () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    const { vm } = mount(
      {
        data() {
          return {
            stage: {
              width: 0,
              height: 400,
            },
            items: [{ id: '1' }, { id: '2' }],
          };
        },
        template: `
          <v-stage ref='stage' :config='stage'>
          <v-layer>
            <test-counter />
            <v-rect />
            <v-circle v-for='item in items' :key='item.id' :config='item' />
          </v-layer>
          </v-stage>
        `,
      },
      {
        global: {
          components: {
            TestCounter: { template: '<span/>' },
          },
        },
      },
    );
    const stage = (vm.$refs.stage as any).getStage();

    vm.items = [{ id: '2' }, { id: '1' }];
    await nextTick();
    const circles = stage.find('Circle');
    expect(circles[0].id()).to.equal('2');
    expect(circles[1].id()).to.equal('1');
    expect(consoleError).toHaveBeenCalledTimes(1);
    consoleError.mockRestore();
  });

  it('Should not throw on hidden objects', async () => {
    const { vm } = mount({
      data() {
        return {
          stage: {
            width: 0,
            height: 400,
          },
          items: [{ id: '1' }, { id: '2' }],
        };
      },
      template: `
        <v-stage ref='stage' :config='stage'>
        <v-layer>
          <div v-if='false' />
          <v-rect />
          <v-circle v-for='item in items' :key='item.id' :config='item' />
        </v-layer>
        </v-stage>
      `,
    });
    const stage = (vm.$refs.stage as any).getStage();

    const consoleError = vi.spyOn(console, 'error');
    vm.items = [{ id: '2' }, { id: '1' }];
    await nextTick();
    const circles = stage.find('Circle');
    expect(circles[0].id()).to.equal('2');
    expect(circles[1].id()).to.equal('1');
    expect(consoleError).not.toHaveBeenCalled();
    consoleError.mockRestore();
  });

  it('Accept template tag in Konva Groups', async () => {
    const { vm } = mount(
      {
        data() {
          return {
            stage: {
              width: 0,
              height: 400,
            },
            items: [{ id: '1' }, { id: '2' }],
          };
        },
        template: `
          <v-stage ref='stage' :config='stage'>
          <v-layer>
            <test-counter />
            <v-rect />
            <v-circle v-for='item in items' :key='item.id' :config='item' />
          </v-layer>
          </v-stage>
        `,
      },
      {
        global: {
          components: {
            TestCounter: { template: '<v-group><v-group></v-group></v-group>' },
          },
        },
      },
    );
    const stage = (vm.$refs.stage as any).getStage();

    const consoleError = vi.spyOn(console, 'error');
    vm.items = [{ id: '2' }, { id: '1' }];
    await nextTick();
    const circles = stage.find('Circle');
    expect(circles[0].id()).to.equal('2');
    expect(circles[1].id()).to.equal('1');
    expect(consoleError).not.toHaveBeenCalled();
    consoleError.mockRestore();
  });
});

// jsdom's Image doesn't fire onload/onerror, so we use the canvas package's
// Image which actually loads data URIs and fires events.
describe('Test useImage', () => {
  const OriginalImage = globalThis.Image;
  const DATA_URI = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

  beforeEach(async () => {
    const canvas = await import('canvas');
    globalThis.Image = canvas.Image as any;
  });

  afterEach(() => {
    globalThis.Image = OriginalImage;
  });

  it('status is loaded after successful load', () => {
    const wrapper = mount({
      setup() {
        const [image, status] = useImage(DATA_URI);
        return { image, status };
      },
      template: '<div />',
    });

    expect(wrapper.vm.status).to.equal('loaded');
    expect(wrapper.vm.image).to.not.equal(null);
  });

  it('status changes to error on load failure', async () => {
    const wrapper = mount({
      setup() {
        const [image, status] = useImage('bad-url');
        return { image, status };
      },
      template: '<div />',
    });

    await new Promise((r) => setTimeout(r, 50));

    expect(wrapper.vm.status).to.equal('error');
    expect(wrapper.vm.image).to.equal(null);
  });

  it('reloads when url changes', async () => {
    const wrapper = mount({
      setup() {
        const url = ref(DATA_URI);
        const [image, status] = useImage(url);
        return { image, status, url };
      },
      template: '<div />',
    });

    expect(wrapper.vm.status).to.equal('loaded');

    wrapper.vm.url = DATA_URI + '?v2';
    await nextTick();

    // new data URI loads synchronously too
    expect(wrapper.vm.status).to.equal('loaded');
  });

  it('sets crossOrigin when provided', async () => {
    let imgEl: any;
    const { Image: CanvasImage } = await import('canvas');
    globalThis.Image = class extends (CanvasImage as any) {
      constructor() {
        super();
        imgEl = this;
      }
    } as any;

    mount({
      setup() {
        const [image, status] = useImage(DATA_URI, 'anonymous');
        return { image, status };
      },
      template: '<div />',
    });

    expect(imgEl.crossOrigin).to.equal('anonymous');
  });
});
