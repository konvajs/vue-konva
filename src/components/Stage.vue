<template>
 <div>{{this.config}}<slot></slot></div>
</template>

<script>
import { applyNodeProps, copy } from '../utils';
const EventEmitter = require("events");

class StageEmitter extends EventEmitter {}

let cacheConfig = {};

export default {
  props: ["config"],
  data() {
    return {
      _stage: {}
    };
  },
  created() {
    this.StageEmitter = new StageEmitter();
    this._stage = {};
  },
  mounted() {
    this._stage = new window.Konva.Stage({
      width: this.config.width,
      height: this.config.height,
      container: this.$el
    });
    this.StageEmitter.emit('mounted', this._stage);
    cacheConfig = this.config;
    applyNodeProps(this._stage, this.config);
  },
  updated() {
    applyNodeProps(this._stage, this, cacheConfig);
    cacheConfig = this.config;
  },
  beforeDestroy() {
    this._stage.destroy();
  }
};
</script>
