import Vue from 'vue';
import { applyNodeProps, createListener } from '../utils';
const EventEmitter = require('events');

class StageEmitter extends EventEmitter {}

let cacheConfig = {};

export default Vue.component('v-stage', {
  render: function(createElement) {
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
  data() {
    return {
      _stage: {}
    };
  },
  created() {
    this.StageEmitter = new StageEmitter();
    this.StageEmitter.setMaxListeners(0);
    this._stage = {};
  },
  mounted() {
    this._stage = new window.Konva.Stage({
      width: this.config.width,
      height: this.config.height,
      container: this.$el
    });
    this.StageEmitter.emit('mounted', this._stage);
    this.uploadKonva();
  },
  updated() {
    this.uploadKonva();
  },
  beforeDestroy() {
    this._stage.destroy();
  },
  methods: {
    getNode() {
      return this._stage;
    },
    getStage() {
      return this._stage;
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
