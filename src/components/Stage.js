import { h } from 'vue';
import { applyNodeProps, checkOrder } from '../utils';

export default {
  render: function () {
    return h('div', this.$slots.default?.());
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
    this.__konvaNode = new window.Konva.Stage({
      width: this.config.width,
      height: this.config.height,
      // create fake container, later it will be replaced with real div on the page
      container: document.createElement('div'),
    });
  },
  mounted() {
    this.$el.innerHTML = '';
    this.__konvaNode.container(this.$el);
    this.uploadKonva();
    this.validateChildren();
  },
  updated() {
    this.uploadKonva();
    this.uploadKonva();
    checkOrder(this.$, this.__konvaNode);
  },
  beforeUnmount() {
    this.__konvaNode.destroy();
  },
  methods: {
    getNode() {
      return this.__konvaNode;
    },
    getStage() {
      return this.__konvaNode;
    },
    uploadKonva() {
      const oldProps = this.oldProps || {};
      const props = {
        ...this.$attrs,
        ...this.config,
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
};
