import { expect } from 'chai';
import './mocking';
import Konva from 'konva';
import sinon from 'sinon/pkg/sinon';
import { nextTick, h, ref } from 'vue/dist/vue.esm-bundler.js';
import {
  mount,
  config,
} from '@vue/test-utils/dist/vue-test-utils.esm-bundler.js';
import VueKonva from '../src/index';

describe('Test references', function () {
  beforeEach(() => {
    config.global.plugins = [VueKonva];
  });

  afterEach(() => {
    config.global.plugins = [];
  });

  it('create stage on mount', () => {
    const wrapper = mount({
      template: `
        <v-stage ref="stage">
        </v-stage>
      `,
    });
    const stage = wrapper.vm.$refs.stage.getStage();
    expect(stage).to.not.equal(undefined);
  });

  it('Make sure it does not draw HTML', () => {
    const { vm } = mount({
      template: `
        <v-stage ref="stage">
        </v-stage>
      `,
    });
    const stage = vm.$refs.stage.getStage();
    expect(stage).to.not.equal(undefined);
  });

  it('set initial stage size', () => {
    const { vm } = mount({
      template: `
        <v-stage ref="stage" :config="stage">
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
    const stage = vm.$refs.stage.getStage();
    expect(stage.width()).to.equal(300);
    expect(stage.height()).to.equal(400);
  });

  it('create layers', () => {
    const { vm } = mount({
      template: `
        <v-stage ref="stage" :config="stage">
          <v-layer ref="layer">
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

    const stage = vm.$refs.stage.getStage();
    expect(stage.children.length).to.equal(1);

    const layer = vm.$refs.layer.getNode();
    expect(layer instanceof Konva.Layer).to.equal(true);
  });

  it('Make sure it does not draw HTML', (done) => {
    const { vm } = mount({
      template: `
        <v-stage ref="stage" :config="stage">
          <v-layer ref="layer">
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

    const stage = vm.$refs.stage.getStage();

    setTimeout(() => {
      const container = stage.container();

      expect(container.children.length).to.equal(1);
      done();
    }, 50);
  });
});

describe('Test stage component', function () {
  beforeEach(() => {
    config.global.plugins = [VueKonva];
  });

  afterEach(() => {
    config.global.plugins = [];
  });
  it('can attach stage events', function () {
    let eventCount = 0;

    const { vm } = mount({
      template: `
        <v-stage ref="stage" :config="stage" @mousedown="handleMouseDown">
          <v-layer ref="layer">
            <v-rect/>
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

    const stage = vm.$refs.stage.getStage();
    stage.simulateMouseDown({ x: 50, y: 50 });
    expect(eventCount).to.equal(1);
  });

  it('can attach stage content events', function () {
    let eventCount = 0;

    const { vm } = mount({
      template: `
        <v-stage ref="stage" :config="stage" @contentMousedown="handleMouseDown">
          <v-layer ref="layer">
            <v-rect/>
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

    const stage = vm.$refs.stage.getStage();
    stage.simulateMouseDown({ x: 50, y: 50 });
    expect(eventCount).to.equal(1);
  });

  it('unmount stage should destroy it from Konva', (done) => {
    const { vm } = mount({
      template: `
        <v-stage v-if="drawStage" ref="stage" :config="stage">
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
      done();
    });
  });
});

describe('Test props setting', function () {
  beforeEach(() => {
    config.global.plugins = [VueKonva];
  });

  afterEach(() => {
    config.global.plugins = [];
  });
  it('can update component props', async () => {
    const { vm } = mount({
      template: `
        <v-stage ref="stage" :config="stage">
          <v-layer>
            <v-rect :config="rect" ref="rect">
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

    const rect = vm.$refs.rect.getNode();

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
        <v-stage ref="stage" :config="stage">
          <v-layer ref="layer">
          <v-text
            v-if="textVisible"
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

    const layer = vm.$refs.layer.getNode();

    expect(layer.children.length).to.equal(2);
    sinon.spy(Konva.Util, 'warn');
    vm.textVisible = false;
    await nextTick();
    expect(layer.children.length).to.equal(1);
    expect(layer.children[0].className).to.equal('Rect');
    expect(Konva.Util.warn.callCount).to.equal(0);
    Konva.Util.warn.restore();
  });

  it('can set stage props', async () => {
    const { vm } = mount({
      template: `
        <v-stage ref="stage" :config="stage">
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

    const stage = vm.$refs.stage.getNode();

    await nextTick();
    expect(stage.width()).to.equal(300);
  });

  it('can update component events', async () => {
    const wrap = mount({
      template: `
        <v-stage :config="stage">
          <v-layer>
            <v-rect ref="rect" :config="{width: 300}" @click="click" />
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

    const rect = wrap.vm.$refs.rect.getNode();
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
          <v-stage ref="stage" :config="stage">
            <v-layer ref="layer">
              <v-rect :config="rect" ref="rect">
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

    const layer = vm.$refs.layer.getNode();

    sinon.spy(layer, 'batchDraw');

    vm.rect.width = 50;
    vm.rect.width = 150;
    await nextTick();

    expect(layer.batchDraw.callCount).to.equal(1);

    layer.batchDraw.restore();
  });

  it('changing order should redraw layer', async () => {
    window.nodes = [];
    const { vm } = mount({
      template: `
          <v-stage ref="stage" :config="stage">
            <v-layer ref="layer">
            <v-rect v-for="item in items" :config="item" :key="item.id">
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
              id: 1,
              width: 100,
              height: 100,
            },
            {
              id: 2,
              width: 100,
              height: 100,
            },
          ],
        };
      },
    });

    const layer = vm.$refs.layer.getNode();
    sinon.spy(layer, 'batchDraw');

    const items = vm.items.concat();
    items.reverse();
    vm.items = items;
    await nextTick();

    expect(layer.batchDraw.callCount).to.equal(1);
    layer.batchDraw.restore();
  });

  xit('checking for loop order', async () => {
    const { vm } = mount({
      template: `
        <div>
          <v-stage ref="stage" :config="stage">
            <v-layer v-for="item in items" :config="item" :key="item.id">
              <v-rect />
            </v-layer>
            <v-layer :config="{ id: '3' }" />
          </v-stage>
        </div>
      `,
      data() {
        return {
          stage: {
            width: 300,
            height: 400,
          },
          items: [],
        };
      },
    });

    const stage = vm.$refs.stage.getNode();
    expect(stage.children[0].id()).to.equal('3');

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
    debugger;
    await nextTick();
    expect(stage.children[0].id()).to.equal('1');
    expect(stage.children[1].id()).to.equal('2');
    expect(stage.children[2].id()).to.equal('3');
  });

  it('unset props', async () => {
    const { vm } = mount({
      template: `
          <v-stage ref="stage" :config="stage">
            <v-layer>
              <v-rect :config="rect" ref="rect">
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

    const rect = vm.$refs.rect.getNode();

    expect(rect.fill()).to.equal('red');

    vm.rect.fill = null;
    vm.rect.x = null;
    await nextTick();
    expect(!!rect.fill()).to.equal(false);
    expect(rect.x()).to.equal(0);
  });

  it('do not overwrite properties if that changed manually', () => {
    const { vm } = mount({
      template: `
          <v-stage ref="stage" :config="stage">
            <v-layer>
              <v-rect :config="rect" ref="rect">
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

    const rect = vm.$refs.rect.getNode();

    // change position manually
    rect.x(20);

    vm.rect.fill = 'white';

    expect(rect.x()).to.equal(20);
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
  const lifecycle = {
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
  };

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

describe('Test Events', (done) => {
  beforeEach(() => {
    config.global.plugins = [VueKonva];
  });

  afterEach(() => {
    config.global.plugins = [];
  });
  it('should remove events on unmount', async () => {
    const onClickRect = sinon.spy();
    const onClickExternal = sinon.spy();
    const { vm } = mount(
      {
        props: ['click'],
        template: `
        <v-stage ref="stage">
          <v-layer v-if="drawLayer" ref="layer">
            <v-rect ref="rect" @click="click">
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
          click: onClickRect,
        },
      }
    );

    vm.drawStage = false;

    const stage = vm.$refs.stage.getNode();
    const layer = stage.findOne('Layer');
    const rect = stage.findOne('Rect');
    rect.on('click', onClickExternal);

    expect(onClickRect.callCount).to.equal(0);
    expect(onClickExternal.callCount).to.equal(0);

    rect._fire('click', {});
    expect(onClickRect.callCount).to.equal(1);
    expect(onClickExternal.callCount).to.equal(1);

    // remove layer

    vm.drawLayer = false;

    await nextTick();
    expect(layer.getParent()).to.equal(null);

    rect._fire('click', {});

    expect(onClickRect.callCount).to.equal(1);
    expect(onClickExternal.callCount).to.equal(2);
  });

  it('check arguments', () => {
    const { vm } = mount({
      template: `
        <v-stage ref="stage" :config="size">
          <v-layer ref="layer">
            <v-rect ref="rect" @mousedown="mousedown" :config="size">
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
        mousedown(e) {
          expect(this).to.equal(vm);
          expect(e.target instanceof Konva.Rect).to.equal(true);
        },
      },
    });

    const stage = vm.$refs.stage.getNode();

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
    sinon.spy(Konva.Layer.prototype, 'batchDraw');

    const { vm } = mount({
      template: `
          <v-stage ref="stage">
            <v-layer>
              <v-rect>
              </v-rect>
            </v-layer>
          </v-stage>
        `,
    });

    expect(Konva.Layer.prototype.batchDraw.called).to.equal(true);
    Konva.Layer.prototype.batchDraw.restore();
  });

  it('Draw layer on node add', async () => {
    sinon.spy(Konva.Layer.prototype, 'batchDraw');

    const { vm } = mount({
      template: `
          <v-stage ref="stage">
            <v-layer>
              <v-rect v-if="showRect">
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

    expect(Konva.Layer.prototype.batchDraw.callCount).to.equal(1);

    vm.showRect = true;
    await nextTick();
    expect(Konva.Layer.prototype.batchDraw.callCount).to.equal(2);

    Konva.Layer.prototype.batchDraw.restore();
  });

  it('Draw layer on node remove', async () => {
    sinon.spy(Konva.Layer.prototype, 'batchDraw');
    const { vm } = mount({
      template: `
          <v-stage ref="stage">
            <v-layer>
              <v-rect v-if="showRect">
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

    expect(Konva.Layer.prototype.batchDraw.callCount).to.equal(2);

    vm.showRect = false;

    await nextTick();
    expect(Konva.Layer.prototype.batchDraw.callCount).to.equal(3);

    Konva.Layer.prototype.batchDraw.restore();
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
          <v-layer ref="layer">
            <template v-if="drawMany">
              <v-rect key="k1" :config="{ name: 'rect1'}"/>
              <v-rect key="k2" :config="{ name: 'rect2'}"/>
            </template>
            <v-rect v-else key="2" :config="{ name: 'rect2'}"/>
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

    sinon.spy(Konva.Layer.prototype, 'batchDraw');

    vm.drawMany = true;
    await nextTick();
    const layer = vm.$refs.layer.getNode();
    expect(layer.children[0].name()).to.equal('rect1');
    expect(layer.children[1].name()).to.equal('rect2');
    expect(Konva.Layer.prototype.batchDraw.callCount).to.equal(3);
    Konva.Layer.prototype.batchDraw.restore();
  });

  it('add before', async () => {
    const { vm } = mount({
      template: `
          <v-stage ref="stage">
            <v-layer ref="layer">
              <v-rect v-for="item in items" :config="{name: 'rect' + item}" :key="item">
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
    const layer = vm.$refs.layer.getNode();
    await nextTick();
    expect(layer.children[0].name()).to.equal('rect1');
    expect(layer.children[1].name()).to.equal('rect2');
    expect(layer.children[2].name()).to.equal('rect3');
  });

  it('add after', async () => {
    const { vm } = mount({
      template: `
          <v-stage ref="stage">
            <v-layer ref="layer">
              <v-rect v-for="item in items" :config="{name: 'rect' + item}" :key="item">
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
    const layer = vm.$refs.layer.getNode();

    expect(layer.children[0].name()).to.equal('rect1');
    expect(layer.children[1].name()).to.equal('rect2');
  });

  it('change order', async () => {
    const { vm } = mount({
      template: `
          <v-stage ref="stage">
            <v-layer ref="layer">
              <v-rect v-for="item in items" :config="{name: 'rect' + item}" :key="item">
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
    const layer = vm.$refs.layer.getNode();

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
        <v-rect :config="{ name: name}" />
      `,
    };
    const { vm } = mount(
      {
        template: `
          <v-stage ref="stage">
            <v-layer ref="layer">
              <Deep v-for="item in items" :name="'rect' + item" :key="item">
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
      }
    );
    const layer = vm.$refs.layer.getNode();

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
        <v-rect :config="{name: name}" />
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
          <v-stage ref="stage">
            <v-layer ref="layer">
              <Deep v-for="item in items" :name="'rect' + item" :key="item">
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
      }
    );
    const layer = vm.$refs.layer.getNode();

    expect(layer.children[0].name()).to.equal('rect1');
    expect(layer.children[1].name()).to.equal('rect2');
    expect(layer.children[2].name()).to.equal('rect3');

    vm.items = [3, 2, 1];
    await nextTick();
    expect(layer.children[0].name()).to.equal('rect3');
    expect(layer.children[1].name()).to.equal('rect2');
    expect(layer.children[2].name()).to.equal('rect1');
  });

  it('can draw several stages', function () {
    const { vm } = mount({
      template: `
      <div>
          <v-stage ref="stage">
            <v-layer ref="layer">
            </v-layer>
          </v-stage>
          <v-stage ref="stage">
            <v-layer ref="layer">
            </v-layer>
          </v-stage>
          </div>
        `,
    });
  });
});

describe('Test plugin', function () {
  it('registers components with custom prefix', () => {
    const { vm } = mount(
      {
        template: `
        <konva-stage ref="stage" :config="stage">
          <konva-layer ref="layer">
            <konva-rect ref="rect"/>
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
          plugins: [[VueKonva, { prefix: 'Konva' }]],
        },
      }
    );

    const stage = vm.$refs.stage.getStage();
    expect(stage.children.length).to.equal(1);

    const layer = vm.$refs.layer.getNode();
    expect(layer.children.length).to.equal(1);
    expect(layer instanceof Konva.Layer).to.equal(true);

    const rect = vm.$refs.rect.getNode();
    expect(rect instanceof Konva.Rect).to.equal(true);
  });
});

describe('validations', function (done) {
  beforeEach(() => {
    config.global.plugins = [VueKonva];
  });

  afterEach(() => {
    config.global.plugins = [];
  });

  it('Make sure no other DOM tags are used', async () => {
    const { vm } = mount({
      data() {
        return {
          stage: {
            width: 0,
            height: 400,
          },
          items: [{ id: 1 }, { id: 2 }],
        };
      },
      template: `
        <v-stage ref="stage" :config="stage">
          <v-layer>
            <test-counter />
            <v-rect />
            <v-circle v-for="item in items" :key="item.id" :config="item" />
          </v-layer>
        </v-stage>
      `,
    },
    {
      global: {
        components: {
          TestCounter: { template: '<span/>' },
        },
      }
    });
    const stage = vm.$refs.stage.getStage();

    sinon.spy(console, 'error');
    vm.items = [{ id: 2 }, { id: 1 }];
    await nextTick();
    const circles = stage.find('Circle');
    expect(circles[0].id()).to.equal(2);
    expect(circles[1].id()).to.equal(1);
    expect(console.error.callCount).to.equal(1);
    console.error.restore();
  });

  it('Should not throw on hidden objects', async () => {
    const { vm } = mount({
      data() {
        return {
          stage: {
            width: 0,
            height: 400,
          },
          items: [{ id: 1 }, { id: 2 }],
        };
      },
      template: `
        <v-stage ref="stage" :config="stage">
          <v-layer>
            <div v-if="false"/>
            <v-rect />
            <v-circle v-for="item in items" :key="item.id" :config="item" />
          </v-layer>
        </v-stage>
      `,
    });
    const stage = vm.$refs.stage.getStage();

    sinon.spy(console, 'error');
    vm.items = [{ id: 2 }, { id: 1 }];
    await nextTick();
    const circles = stage.find('Circle');
    expect(circles[0].id()).to.equal(2);
    expect(circles[1].id()).to.equal(1);
    expect(console.error.callCount).to.equal(0);
    console.error.restore();
  });
});
