import Vue from 'vue2';
import { applyNodeProps, createListener, checkOrder } from '../utils';

export default Vue.component('v-stage', {
  render: function (createElement) {
    return createElement('div', this.$slots.default);
  },
  watch: {
    config: {
      handler(val) {
        this.uploadKonva();
      },
      deep: true,
    },
  },
  props: {
    config: {
      type: Object,
      default: function () {
        return {};
      },
    },
    __useStrictMode: {
      type: Boolean,
    },
  },

  created() {
    this._konvaNode = new window.Konva.Stage({
      width: this.config.width,
      height: this.config.height,
      // create fake container, later it will be replaced with real div on the page
      container: document.createElement('div'),
    });
  },
  mounted() {
    this.$el.innerHTML = '';
    this._konvaNode.container(this.$el);
    this.uploadKonva();
    this.validateChildren();
  },
  updated() {
    this.uploadKonva();
    this.uploadKonva();
    checkOrder(this.$vnode, this._konvaNode);
  },
  beforeDestroy() {
    this._konvaNode.destroy();
  },
  methods: {
    getNode() {
      return this._konvaNode;
    },
    getStage() {
      return this._konvaNode;
    },
    uploadKonva() {
      const oldProps = this.oldProps || {};
      const props = {
        ...this.$attrs,
        ...this.config,
        ...createListener(this.$listeners),
      };
      applyNodeProps(this, props, oldProps, this.__useStrictMode);
      this.oldProps = props;
    },
    validateChildren() {
      // TODO: add a waring if we see non-Konva element here
      // this.$vnode.componentOptions.children.forEach(child => {
      //   console.log(child);
      // })
    },
  },
});
