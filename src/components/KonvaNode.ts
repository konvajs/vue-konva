import {
  h,
  reactive,
  watch,
  onMounted,
  onUnmounted,
  onUpdated,
  getCurrentInstance,
  defineComponent,
  VNode,
} from 'vue';
import { applyNodeProps, findParentKonva, updatePicture, checkOrder } from '../utils';
import { KonvaNodeConstructor } from '../types';

const EVENTS_NAMESPACE = '.vue-konva-event';

const CONTAINERS = {
  Group: true,
  Layer: true,
  FastLayer: true,
  Label: true,
};

export default function (componentName: string, NodeConstructor: KonvaNodeConstructor) {
  return defineComponent({
    name: componentName,
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
      const instance = getCurrentInstance();
      if (!instance) return;
      const oldProps = reactive({});

      const __konvaNode = new NodeConstructor();
      instance.__konvaNode = __konvaNode;
      instance.vnode.__konvaNode = __konvaNode;
      uploadKonva();

      function getNode() {
        return instance?.__konvaNode;
      }

      function getStage() {
        return instance?.__konvaNode;
      }

      function uploadKonva() {
        if (!instance) return;
        const events: VNode['props'] = {};
        for (const key in instance?.vnode.props) {
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
        applyNodeProps(instance, newProps, existingProps, props.__useStrictMode);
        Object.assign(oldProps, newProps);
      }

      onMounted(() => {
        const parentKonvaNode = findParentKonva(instance)?.__konvaNode;
        if (parentKonvaNode && 'add' in parentKonvaNode)
          (parentKonvaNode as { add: (node: Konva.Node) => void }).add(__konvaNode);
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

      const isContainer = CONTAINERS.hasOwnProperty(componentName);
      return () => (isContainer ? h('template', {}, slots.default?.()) : null);
    },
  });
}
