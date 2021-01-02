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
    },
    created() {
      this.initKonva();
    },
    mounted() {
      const parentVueInstance = findParentKonva(this);
      const parentKonvaNode = parentVueInstance._konvaNode;
      parentKonvaNode.add(this._konvaNode);
      updatePicture(this._konvaNode);
    },
    updated() {
      this.uploadKonva();
      checkOrder(this.$.vnode, this._konvaNode);
    },
    unmounted() {
      updatePicture(this._konvaNode);
      this._konvaNode.destroy();
      this._konvaNode.off(EVENTS_NAMESPACE);
    },
    methods: {
      getNode() {
        return this._konvaNode;
      },
      getStage() {
        return this._konvaNode;
      },
      initKonva() {
        const NodeClass = window.Konva[nameNode];

        if (!NodeClass) {
          console.error('vue-konva error: Can not find node ' + nameNode);
          return;
        }

        this._konvaNode = new NodeClass();
        this._konvaNode.VueComponent = this;

        this.uploadKonva();
      },
      uploadKonva() {
        const oldProps = this.oldProps || {};
        const props = {
          ...this.$attrs,
          ...this.config,
        };
        applyNodeProps(this, props, oldProps);
        this.oldProps = props;
      },
    },
  };
}
