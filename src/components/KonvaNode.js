import {
  applyNodeProps,
  findParentKonva,
  createListener,
  updatePicture,
  findKonvaNode,
  konvaNodeMarker,
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

    render(createElement) {
      // containers should be able to draw children
      const isContainer = CONTAINERS[nameNode];
      if (isContainer) {
        return createElement('template', this.$slots.default);
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
      let needRedraw = false;
      // check indexes
      // somehow this.$children are not ordered correctly
      // so we have to dive-in into componentOptions of vnode
      // also componentOptions.children may have empty nodes, and other non Konva elements so we need to filter them first

      const children = this.$vnode.componentOptions.children || [];

      const nodes = [];
      children.forEach(($vnode) => {
        const konvaNode = findKonvaNode($vnode.componentInstance);
        if (konvaNode) {
          nodes.push(konvaNode);
        }

        const { elm, componentInstance } = $vnode;
        if (elm && elm.tagName && componentInstance && !konvaNode) {
          const name = elm && elm.tagName.toLowerCase();
          console.error(
            `vue-konva error: You are trying to render "${name}" inside your component tree. Looks like it is not a Konva node. You can render only Konva components inside the Stage.`
          );
        }
      });

      nodes.forEach((konvaNode, index) => {
        if (konvaNode.getZIndex() !== index) {
          konvaNode.setZIndex(index);
          needRedraw = true;
        }
      });

      if (needRedraw) {
        updatePicture(this._konvaNode);
      }
    },
    destroyed() {
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
          ...createListener(this.$listeners),
        };
        applyNodeProps(this, props, oldProps);
        this.oldProps = props;
      },
    },
  };
}
