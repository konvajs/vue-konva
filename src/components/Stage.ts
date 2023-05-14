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
import type Konva from 'konva';
import { applyNodeProps, checkOrder } from '../utils';

export default defineComponent({
  name: 'Stage',
  props: {
    config: {
      type: Object as PropType<Konva.StageConfig>,
      default: function() {
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

    const __konvaNode = new window.Konva.Stage({
      width: props.config.width,
      height: props.config.height,
      container: document.createElement('div'), // Fake container. Will be replaced
    });

    instance.__konvaNode = __konvaNode; // Save on component instance
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
        container.value.innerHTML = '';
        __konvaNode.container(container.value);
      }
      uploadKonva();
      validateChildren();
    });

    onUpdated(() => {
      uploadKonva();
      checkOrder(instance.subTree, __konvaNode);
    });

    onBeforeUnmount(() => {
      __konvaNode.destroy();
    });

    watch(() => props.config, uploadKonva, { deep: true });

    expose({
      getStage,
      getNode,
    });

    // Loop order test appears to be problem with an empty v-for on layer objects
    //     - When the second item is added to the list we get a Vue internals bug.
    //     - Possibly related to https://github.com/vuejs/vue-next/issues/2715
    return () => h('div', { ref: container }, slots.default?.());
  },
});
