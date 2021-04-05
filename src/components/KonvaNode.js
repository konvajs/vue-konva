import { h } from 'vue';
import {
  applyNodeProps,
  findParentKonva,
  updatePicture,
  konvaNodeMarker,
  checkOrder,
} from '../utils';
const EVENTS_NAMESPACE = '.vue-konva-event';

const CONTAINERS = {
  Group: true,
  Layer: true,
  FastLayer: true,
  Label: true,
};

export default function (nameNode) {
  return {
    // Mark it to detect whether an Vue instance is KonvaNode or not later
    [konvaNodeMarker]: true,

    render() {
      // containers should be able to draw children
      const isContainer = CONTAINERS[nameNode];
      if (isContainer) {
        return h('template', this.$slots.default?.());
      }
      // other elements are not containers
      return null;
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
      this.initKonva();
    },
    mounted() {
      const parentVueInstance = findParentKonva(this);
      const parentKonvaNode = parentVueInstance.__konvaNode;
      parentKonvaNode.add(this.__konvaNode);
      updatePicture(this.__konvaNode);
    },
    updated() {
      this.uploadKonva();
      checkOrder(this.$, this.__konvaNode);
    },
    unmounted() {
      updatePicture(this.__konvaNode);
      this.__konvaNode.destroy();
      this.__konvaNode.off(EVENTS_NAMESPACE);
    },
    methods: {
      getNode() {
        return this.__konvaNode;
      },
      getStage() {
        return this.__konvaNode;
      },
      initKonva() {
        const NodeClass = window.Konva[nameNode];

        if (!NodeClass) {
          console.error('vue-konva error: Can not find node ' + nameNode);
          return;
        }

        this.__konvaNode = new NodeClass();
        this.$.vnode.__konvaNode = this.__konvaNode;
        this.uploadKonva();
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
    },
  };
}
