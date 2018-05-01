import {
  applyNodeProps,
  copy,
  getName,
  findParentKonva,
  createListener,
  updatePicture
} from "../utils";

const EventEmitter = require("events");

export default function() {
  class StageEmitter extends EventEmitter {}
  let cacheConfig = {};
  return {
    // template: '<div>{{this.config}}<slot></slot></div>',
    render(createElement) {
      return createElement('div', [
        this.config,
        this.$slots.default
      ]);
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
      parentKonva.StageEmitter.on("mounted", parentStage => {
        this.initKonva(parentStage);
      });
    },
    updated() {
      // this._stage.moveToTop();
      this.uploadKonva();
    },
    destroyed() {
      this._stage.destroy();
    },
    methods: {
      getStage() {
        return this._stage;
      },
      initKonva(parentStage) {
        const vm = this;
        const tagName = this.name;
        this._parentStage = this.parentStage;
        const nameNode = getName(tagName);
        const NodeClass = window.Konva[nameNode];

        this._stage = new NodeClass();
        this._stage.VueComponent = this;
        const animationStage = this._stage.to.bind(this._stage);

        this._stage.to = function(newConfig) {
          animationStage(newConfig);
          setTimeout(() => {
            Object.keys(vm._stage.attrs).forEach(key => {
              if (typeof vm._stage.attrs[key] !== "function") {
                vm.config[key] = vm._stage.attrs[key];
              }
            });
          }, 200);
        };

        this.uploadKonva();
        this.StageEmitter.emit("mounted", this._stage);
        parentStage.add(this._stage);
        updatePicture(parentStage);
      },
      uploadKonva() {
        const props = {
          ...this.config,
          ...createListener(this.$listeners)
        };
        applyNodeProps(this, props, cacheConfig);
        cacheConfig = props;
      }
    }
  };
}
