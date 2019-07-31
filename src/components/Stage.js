import Vue from 'vue';
import { applyNodeProps, createListener } from '../utils';

export default Vue.component('v-stage', {
  render: function(createElement) {
    return createElement('div', this.$slots.default);
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
    this._konvaNode = new window.Konva.Stage({
      width: this.config.width,
      height: this.config.height,
      // create fake container, later it will be replaced with real div on the page
      container: document.createElement('div')
    });
  },
  mounted() {
    this.$el.innerHTML = '';
    this._konvaNode.container(this.$el);
    this.uploadKonva();
  },
  updated() {
    this.uploadKonva();
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
        ...createListener(this.$listeners)
      };
      applyNodeProps(this, props, oldProps);
      this.oldProps = props;
    }
  }
});
