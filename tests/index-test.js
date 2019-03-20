import { expect } from 'chai';
import './mocking';
import Konva from 'konva';
import sinon from 'sinon/pkg/sinon';
import Vue from 'vue';
import { mount } from '@vue/test-utils';

import VueKonva from '../src/index';

Vue.use(VueKonva);

describe('Test references', function() {
  it('create stage on mount', () => {
    const { vm } = mount({
      template: `
        <v-stage ref="stage">
        </v-stage>
      `
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
            height: 400
          }
        };
      }
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
            height: 400
          }
        };
      }
    });

    const stage = vm.$refs.stage.getStage();
    expect(stage.children.length).to.equal(1);

    const layer = vm.$refs.layer.getNode();
    expect(layer instanceof Konva.Layer).to.equal(true);
  });
});

describe('Test stage component', function() {
  it('can attach stage events', function() {
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
            height: 400
          },
          rect: {
            width: 100,
            height: 100
          }
        };
      },
      methods: {
        handleMouseDown() {
          eventCount += 1;
        }
      }
    });

    const stage = vm.$refs.stage.getStage();
    stage.simulateMouseDown({ x: 50, y: 50 });
    expect(eventCount).to.equal(1);
  });

  it('can attach stage content events', function() {
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
            height: 400
          },
          rect: {
            width: 100,
            height: 100
          }
        };
      },
      methods: {
        handleMouseDown() {
          eventCount += 1;
        }
      }
    });

    const stage = vm.$refs.stage.getStage();
    stage.simulateMouseDown({ x: 50, y: 50 });
    expect(eventCount).to.equal(1);
  });

  it('unmount stage should destroy it from Konva', () => {
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
            height: 400
          }
        };
      }
    });

    const stagesNumber = Konva.stages.length;
    vm.drawStage = false;
    expect(Konva.stages.length).to.equal(stagesNumber - 1);
  });
});

describe('Test props setting', function() {
  it('can update component props', () => {
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
            height: 400
          },
          rect: {
            width: 100,
            height: 100
          }
        };
      }
    });

    const rect = vm.$refs.rect.getNode();

    expect(rect.width()).to.equal(100);
    expect(rect.height()).to.equal(100);

    Vue.set(vm.rect, 'width', 300);
    expect(rect.width()).to.equal(300);

    vm.rect = {
      width: 200,
      height: 100
    };

    expect(rect.width()).to.equal(200);
  });

  it('can set stage props', done => {
    const { vm } = mount({
      template: `
        <v-stage ref="stage" :config="stage">
        </v-stage>
      `,
      data() {
        return {
          stage: {
            width: 0,
            height: 400
          }
        };
      },
      mounted() {
        this.stage.width = 300;
      }
    });

    const stage = vm.$refs.stage.getNode();

    Vue.nextTick(() => {
      expect(stage.width()).to.equal(300);
      done();
    });
  });

  it('can update component events', () => {
    const wrap = mount({
      render(createElement) {
        const events = this.click
          ? {
              click: this.click
            }
          : {};

        return createElement(
          'v-stage',
          {
            config: this.stage
          },
          [
            createElement('v-layer', [
              createElement('v-rect', {
                attrs: {
                  config: {
                    width: 300
                  }
                },
                on: events,
                ref: 'rect'
              })
            ])
          ]
        );
      },
      props: ['click'],
      data() {
        return {
          stage: {
            width: 300,
            height: 400
          }
        };
      }
    });

    const rect = wrap.vm.$refs.rect.getNode();
    expect(rect.eventListeners.click).to.equal(undefined);

    const handler = () => {};
    wrap.setProps({
      click: handler
    });

    expect(rect.eventListeners.click.length).to.equal(1);

    wrap.setProps({
      click: null
    });
    expect(rect.eventListeners.click).to.equal(undefined);
  });

  it('updating props should call layer redraw', () => {
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
            height: 400
          },
          rect: {
            width: 100,
            height: 100
          }
        };
      }
    });

    const layer = vm.$refs.layer.getNode();

    sinon.spy(layer, 'batchDraw');

    vm.rect.width = 50;
    vm.rect.width = 150;
    expect(layer.batchDraw.callCount).to.equal(2);

    layer.batchDraw.restore();
  });

  it('changing order should redraw layer', () => {
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
            height: 400
          },
          items: [
            {
              id: 1,
              width: 100,
              height: 100
            },
            {
              id: 2,
              width: 100,
              height: 100
            }
          ]
        };
      }
    });

    const layer = vm.$refs.layer.getNode();

    sinon.spy(layer, 'batchDraw');

    const items = vm.items.concat();
    items.reverse();
    vm.items = items;
    expect(layer.batchDraw.callCount).to.equal(1);
    layer.batchDraw.restore();
  });

  it('unset props', () => {
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
            height: 400
          },
          rect: {
            x: 10,
            fill: 'red'
          }
        };
      }
    });

    const rect = vm.$refs.rect.getNode();

    expect(rect.fill()).to.equal('red');

    vm.rect.fill = null;
    vm.rect.x = null;

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
            height: 400
          },
          rect: {
            x: 10,
            fill: 'red'
          }
        };
      }
    });

    const rect = vm.$refs.rect.getNode();

    // change position manually
    rect.x(20);

    vm.rect.fill = 'white';

    expect(rect.x()).to.equal(20);
  });
});

describe('test lifecycle methods', () => {
  let createdCount = 0;
  let updateCount = 0;
  let beforeCreateCount = 0;
  Vue.component('lifecycle', {
    props: ['fill'],
    render(createElement) {
      return createElement('v-rect', {
        attrs: { config: { fill: this.fill } }
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
    }
  });

  beforeEach(() => {
    createdCount = 0;
    updateCount = 0;
  });

  it('test mount', () => {
    mount({
      render(createElement) {
        return createElement('v-stage', { ref: 'stage' }, [
          createElement('v-layer', [createElement('lifecycle', {})])
        ]);
      }
    });

    expect(createdCount).to.equal(1);
  });

  it('test update', () => {
    const wrap = mount({
      props: ['fill'],
      render(createElement) {
        return createElement('v-stage', { ref: 'stage' }, [
          createElement('v-layer', [
            createElement('lifecycle', {
              attrs: {
                fill: this.fill
              }
            })
          ])
        ]);
      }
    });

    wrap.setProps({
      fill: 'white'
    });

    expect(updateCount).to.equal(1);
  });
});

describe('Test Events', function() {
  it('should remove events on unmount', function() {
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
            drawLayer: true
          };
        }
      },
      {
        propsData: {
          click: onClickRect
        }
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

    expect(layer.getParent()).to.equal(undefined);

    rect._fire('click', {});

    expect(onClickRect.callCount).to.equal(1);
    expect(onClickExternal.callCount).to.equal(2);
  });

  it('check arguments', function() {
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
            height: 100
          }
        };
      },
      methods: {
        mousedown(e) {
          expect(this).to.equal(vm);
          expect(e.target instanceof Konva.Rect).to.equal(true);
        }
      }
    });

    const stage = vm.$refs.stage.getNode();

    stage.simulateMouseDown({
      x: 50,
      y: 50
    });
  });
});

describe('Test drawing calls', () => {
  it('Draw layer on mount', function() {
    sinon.spy(Konva.Layer.prototype, 'batchDraw');

    const { vm } = mount({
      template: `
          <v-stage ref="stage">
            <v-layer>
              <v-rect>
              </v-rect>
            </v-layer>
          </v-stage>
        `
    });

    expect(Konva.Layer.prototype.batchDraw.called).to.equal(true);
    Konva.Layer.prototype.batchDraw.restore();
  });

  it('Draw layer on node add', function() {
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
          showRect: false
        };
      }
    });

    expect(Konva.Layer.prototype.batchDraw.callCount).to.equal(1);

    vm.showRect = true;

    expect(Konva.Layer.prototype.batchDraw.callCount).to.equal(2);

    Konva.Layer.prototype.batchDraw.restore();
  });

  it('Draw layer on node remove', function() {
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
          showRect: true
        };
      }
    });

    expect(Konva.Layer.prototype.batchDraw.callCount).to.equal(2);

    vm.showRect = false;

    expect(Konva.Layer.prototype.batchDraw.callCount).to.equal(3);

    Konva.Layer.prototype.batchDraw.restore();
  });
});

describe('test reconciler', () => {
  it('add before', function() {
    const { vm } = mount({
      render(createElement) {
        const kids = this.drawMany
          ? [
              createElement('v-rect', {
                key: 'k1',
                attrs: { config: { name: 'rect1' } }
              }),
              createElement('v-rect', {
                key: 'k2',
                attrs: { config: { name: 'rect2' } }
              })
            ]
          : [
              createElement('v-rect', {
                key: '2',
                attrs: { config: { name: 'rect2' } }
              })
            ];
        return createElement('v-stage', [
          createElement('v-layer', { ref: 'layer' }, kids)
        ]);
      },
      data() {
        return {
          drawMany: false
        };
      }
    });

    sinon.spy(Konva.Layer.prototype, 'batchDraw');
    vm.drawMany = true;

    const layer = vm.$refs.layer.getNode();
    expect(layer.children[0].name()).to.equal('rect1');
    expect(layer.children[1].name()).to.equal('rect2');
    expect(Konva.Layer.prototype.batchDraw.callCount).to.equal(3);
    Konva.Layer.prototype.batchDraw.restore();
  });

  it('add before', function() {
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
          items: [1, 3]
        };
      }
    });

    vm.items = [1, 2, 3];

    const layer = vm.$refs.layer.getNode();
    expect(layer.children[0].name()).to.equal('rect1');
    expect(layer.children[1].name()).to.equal('rect2');
    expect(layer.children[2].name()).to.equal('rect3');
  });

  it('add after', function() {
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
          items: [1]
        };
      }
    });

    vm.items = [1, 2];

    const layer = vm.$refs.layer.getNode();

    expect(layer.children[0].name()).to.equal('rect1');
    expect(layer.children[1].name()).to.equal('rect2');
  });

  it('change order', function() {
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
          items: [1, 2, 3]
        };
      }
    });
    const layer = vm.$refs.layer.getNode();

    expect(layer.children[0].name()).to.equal('rect1');
    expect(layer.children[1].name()).to.equal('rect2');
    expect(layer.children[2].name()).to.equal('rect3');

    vm.items = [3, 2, 1];
    expect(layer.children[0].name()).to.equal('rect3');
    expect(layer.children[1].name()).to.equal('rect2');
    expect(layer.children[2].name()).to.equal('rect1');

    vm.items = [1, 3, 2];
    expect(layer.children[0].name()).to.equal('rect1');
    expect(layer.children[1].name()).to.equal('rect3');
    expect(layer.children[2].name()).to.equal('rect2');
  });

  it('change deep order', function() {
    Vue.component('deep', {
      props: ['name'],
      render(createElement) {
        return createElement('v-rect', {
          attrs: { config: { name: this.name } }
        });
      }
    });
    const { vm } = mount({
      template: `
          <v-stage ref="stage">
            <v-layer ref="layer">
              <deep v-for="item in items" :name="'rect' + item" :key="item">
              </deep>
            </v-layer>
          </v-stage>
        `,
      data() {
        return {
          items: [1, 2, 3]
        };
      }
    });
    const layer = vm.$refs.layer.getNode();

    expect(layer.children[0].name()).to.equal('rect1');
    expect(layer.children[1].name()).to.equal('rect2');
    expect(layer.children[2].name()).to.equal('rect3');

    vm.items = [3, 2, 1];
    expect(layer.children[0].name()).to.equal('rect3');
    expect(layer.children[1].name()).to.equal('rect2');
    expect(layer.children[2].name()).to.equal('rect1');

    vm.items = [1, 3, 2];
    expect(layer.children[0].name()).to.equal('rect1');
    expect(layer.children[1].name()).to.equal('rect3');
    expect(layer.children[2].name()).to.equal('rect2');
  });
});
