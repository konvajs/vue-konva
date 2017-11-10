<template>
 <div>{{this.config}}<slot></slot></div>
</template>

<script>
import { applyNodeProps, createListener } from '../utils';
const EventEmitter = require("events");

class StageEmitter extends EventEmitter {}

let cacheConfig = {};

export default {
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
      // container: this.$refs.node
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
    getStage() {
      return this._stage;
    },
    uploadKonva() {
      const props = {
        ...this.config,
        ...createListener(this.$listeners)
      };
      applyNodeProps(this, props, cacheConfig);
      cacheConfig = props;
    }
  }
};
</script>
