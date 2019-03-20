import {
  applyNodeProps,
  getName,
  findParentKonva,
  createListener,
  updatePicture,
  findKonvaNode
} from '../utils';

const EventEmitter = require('events');

const EVENTS_NAMESPACE = '.vue-konva-event';

export default function() {
  class StageEmitter extends EventEmitter {}
  return {
    render(createElement) {
      return createElement('div', [this.config, this.$slots.default]);
    },
    watch: {
      // $attrs: {
      //   handler(val) {
      //     this.uploadKonva();
      //   },
      //   deep: true
      // },
      config: {
        handler(val) {
          this.uploadKonva();
        },
        deep: true
      }
    },
    props: {
      config: {
        type: Object,
        default: function() {
          return {};
        }
      }
    },
    created() {
      this.StageEmitter = new StageEmitter();
      this.StageEmitter.setMaxListeners(0);
      this._stage = {};
      this._parentStage = {};
      this.name = this.$options._componentTag;
    },
    mounted() {
      const parentKonva = findParentKonva(this);
      const _parentStage = parentKonva._stage;

      if (_parentStage && Object.keys(_parentStage).length) {
        this.initKonva(_parentStage);
      }
      parentKonva.StageEmitter.on('mounted', parentStage => {
        this.initKonva(parentStage);
      });
    },
    updated() {
      this.uploadKonva();
      // check indexes
      // somehow this.$children are not ordered correctly
      // so we have to dive-in into componentOptions of vnode
      let needRedraw = false;
      this.$children.forEach(component => {
        const vnode = component.$vnode;
        const index = this.$vnode.componentOptions.children.filter(vnode => vnode.tag !== undefined).indexOf(vnode);
        const konvaNode = findKonvaNode(component);
        if (konvaNode.getZIndex() !== index) {
          konvaNode.setZIndex(index);
          needRedraw = true;
        }
      });
      if (needRedraw) {
        updatePicture(this._stage);
      }
    },
    destroyed() {
      updatePicture(this._stage);
      this._stage.destroy();
      this._stage.off(EVENTS_NAMESPACE);
    },
    methods: {
      getNode() {
        return this._stage;
      },
      getStage() {
        return this._stage;
      },
      initKonva(parentStage) {
        const vm = this;
        const tagName = this.name;
        const nameNode = getName(tagName);
        const NodeClass = window.Konva[nameNode];

        if (!NodeClass) {
          console.error('vue-konva error: Can not find node ' + nameNode);
          return;
        }

        this._stage = new NodeClass();
        this._stage.VueComponent = this;
        const animationStage = this._stage.to.bind(this._stage);

        this._stage.to = function(newConfig) {
          animationStage(newConfig);
          setTimeout(() => {
            Object.keys(vm._stage.attrs).forEach(key => {
              if (typeof vm._stage.attrs[key] !== 'function') {
                vm.config[key] = vm._stage.attrs[key];
              }
            });
          }, 200);
        };

        this.uploadKonva();
        this.StageEmitter.emit('mounted', this._stage);
        // const index = this.$parent.$children.indexOf(this);
        parentStage.add(this._stage);
        // this._stage.setZIndex(index);
        updatePicture(parentStage);
      },
      uploadKonva() {
        const oldProps = this.oldProps || {};
        const props = {
          ...this.$attrs,
          ...this.config,
          ...createListener(this.$listeners)
        };
        applyNodeProps(this, props, oldProps);
        this.oldProps = props;
      }
    }
  };
}
