import {
  h,
  ref,
  watch,
  onMounted,
  onBeforeUnmount,
  onUpdated,
  getCurrentInstance,
  reactive,
  defineComponent,
  PropType,
} from 'vue';
import KonvaModule from 'konva/lib/Core';
import type { StageConfig } from 'konva/lib/Stage';
import { applyNodeProps, checkOrder, syncVModelBindings } from '../utils';

const Konva = (KonvaModule as any).default || KonvaModule;

export default defineComponent({
  name: 'Stage',
  props: {
    config: {
      type: Object as PropType<StageConfig>,
      default: function () {
        return {};
      },
    },
    __useStrictMode: {
      type: Boolean,
    },
  },

  inheritAttrs: false,

  setup(props, { attrs, slots, expose }) {
    const instance = getCurrentInstance();
    if (!instance) return;
    const oldProps = reactive({});

    const container = ref<HTMLDivElement | null>(null);

    const __konvaNode = new Konva.Stage({
      width: props.config.width,
      height: props.config.height,
      container: document.createElement('div'),
    });

    instance.__konvaNode = __konvaNode;
    uploadKonva();

    function getNode() {
      return instance?.__konvaNode;
    }

    function getStage() {
      return instance?.__konvaNode;
    }

    function uploadKonva() {
      if (!instance) return;
      const existingProps = oldProps || {};
      const newProps = {
        ...attrs,
        ...props.config,
      };
      applyNodeProps(instance, newProps, existingProps, props.__useStrictMode);
      Object.assign(oldProps, newProps);
    }

    function validateChildren() {
      return null;
    }

    onMounted(() => {
      if (container.value) {
        __konvaNode.container(container.value);
      }
      uploadKonva();
      validateChildren();
      syncVModelBindings(__konvaNode, instance);
    });

    onUpdated(() => {
      uploadKonva();
      checkOrder(instance.subTree, __konvaNode);
      syncVModelBindings(__konvaNode, instance);
    });

    onBeforeUnmount(() => {
      __konvaNode.destroy();
    });

    watch(() => props.config, uploadKonva, { deep: true });

    expose({
      getStage,
      getNode,
    });

    return () =>
      h(
        'div',
        {
          ref: container,
          id: attrs?.id,
          accesskey: attrs?.accesskey,
          class: attrs?.class,
          role: attrs?.role,
          style: attrs?.style,
          tabindex: attrs?.tabindex,
          title: attrs?.title,
        },
        slots.default?.(),
      );
  },
});
