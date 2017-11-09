<template>
  <div>{{this.config}}<slot></slot></div>
</template>

<script>
import {
  applyNodeProps,
  copy,
  getName,
  findParentKonva,
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
    this._parentStage = {};
    this.name = this.$options._componentTag;
  },
  mounted() {
    const parentKonva = findParentKonva(this);
    const _parentStage = parentKonva._stage;

    if (_parentStage && Object.keys(_parentStage).length) {
      this.initKonva(_parentStage);
    }
    parentKonva.StageEmitter.on("mounted", parentStage => {
      this.initKonva(parentStage);
    });
  },
  updated() {
    console.log("updated", this.name);

    this.uploadKonva();
  },
  beforeDestroy() {
    console.log("destruye" + this.name);
    this._stage.destroy();
  },
  methods: {
    getInstance() {
      return this._stage;
    },
    initKonva(parentStage) {
      const tagName = this.name;
      console.log("initKonva", tagName);
      this._parentStage = this.parentStage;
      const nameNode = getName(tagName);
      const NodeClass = window.Konva[nameNode];
      this._stage = new NodeClass();

      this.uploadKonva();
      this.StageEmitter.emit("mounted", this._stage);
      parentStage.add(this._stage);
    },
    uploadKonva() {
      const props = {
        ...this.config,
        ...createListener(this.$listeners)
      };
      applyNodeProps(this._stage, props, cacheConfig);
      cacheConfig = this.props;
    }
  }
};
</script>

