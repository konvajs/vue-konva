<template>
  <div>{{this.config}}<slot></slot></div>
</template>

<script>
import {
  applyNodeProps,
  copy,
  getName,
  findStage,
  createListener
} from "../utils";
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
  created() {
    this.StageEmitter = new StageEmitter();
    this._stage = {};
  },
  mounted() {
    const eventStage = findStage(this);
    eventStage.on("mounted", parentStage => {
      const tagName = this.$options._componentTag;
      const nameNode = getName(tagName);
      const NodeClass = window.Konva[nameNode];
      this._stage = new NodeClass();

      const props = {
        ...this.config,
        ...createListener(this.$listeners)
      };
      cacheConfig = this.props;
      applyNodeProps(this._stage, props);
      this.StageEmitter.emit("mounted", this._stage);
      parentStage.add(this._stage);
    });
  },
  updated() {
    const props = {
      ...this.config,
      ...createListener(this.$listeners)
    };
    applyNodeProps(this._stage, props, cacheConfig);
    cacheConfig = this.props;
  },
  beforeDestroy() {
    this._stage.destroy();
  }
};
</script>

