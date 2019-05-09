import {
  applyNodeProps,
  getName,
  findParentKonva,
  createListener,
  updatePicture,
  findKonvaNode
} from '../utils';

const EVENTS_NAMESPACE = '.vue-konva-event';

export default function() {
  return {
    render(createElement) {
      return createElement('div', [this.config, this.$slots.default]);
    },
    watch: {
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
      this.name = this.$options._componentTag;
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
      // also componentOptions.children may have empty nodes, so we need to filter them first
      const children =
        this.$vnode.componentOptions.children &&
        this.$vnode.componentOptions.children.filter(c => c.componentInstance);

      children &&
        children.forEach(($vnode, index) => {
          // const vnode = component.$vnode;
          // const index = children.indexOf(vnode);
          const konvaNode = findKonvaNode($vnode.componentInstance);
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
        const tagName = this.name;
        const nameNode = getName(tagName);
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
          ...createListener(this.$listeners)
        };
        applyNodeProps(this, props, oldProps);
        this.oldProps = props;
      }
    }
  };
}
