import {
  h,
  inject,
  ref,
  reactive,
  watch,
  onMounted,
  onUnmounted,
  onUpdated,
  getCurrentInstance,
} from 'vue';
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

    setup(props, { attrs, slots, expose }) {
      const prefix = inject('prefix');
      const instance = getCurrentInstance();
      const oldProps = reactive({});

      const NodeClass = window.Konva[nameNode];

      if (!NodeClass) {
        console.error('vue-konva error: Can not find node ' + nameNode);
        return;
      }

      const __konvaNode = new NodeClass();
      instance.__konvaNode = __konvaNode;
      instance.vnode.__konvaNode = __konvaNode;
      uploadKonva();

      function getNode() {
        return instance.__konvaNode;
      }
      function getStage() {
        return instance.__konvaNode;
      }

      function uploadKonva() {
        const events = {};
        for (var key in instance.vnode.props) {
          if (key.slice(0, 2) === 'on') {
            events[key] = instance.vnode.props[key];
          }
        }
        const existingProps = oldProps || {};
        const newProps = {
          ...attrs,
          ...props.config,
          ...events,
        };
        applyNodeProps(
          instance,
          newProps,
          existingProps,
          props.__useStrictMode
        );
        Object.assign(oldProps, newProps);
      }

      onMounted(() => {
        const parentKonvaNode = findParentKonva(instance).__konvaNode;
        parentKonvaNode.add(__konvaNode);
        updatePicture(__konvaNode);
      });

      onUnmounted(() => {
        updatePicture(__konvaNode);
        __konvaNode.destroy();
        __konvaNode.off(EVENTS_NAMESPACE);
      });

      onUpdated(() => {
        uploadKonva();
        checkOrder(instance.subTree, __konvaNode);
      });

      watch(() => props.config, uploadKonva, { deep: true });

      expose({
        getStage,
        getNode,
      });

      const isContainer = CONTAINERS[nameNode];
      return isContainer
        ? () => h(`${prefix}Container`, {}, slots.default?.())
        : () => null;
    },
  };
}
