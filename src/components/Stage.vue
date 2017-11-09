<template>
 <div>{{this.config}}<slot></slot></div>
</template>

<script>
import { updatePicture } from '../utils';
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
    applyNodeProps(this._stage, this.config, cacheConfig);
    cacheConfig = this.config;
  },
  beforeDestroy() {
    // this._stage.destroy();
  }
};

function applyNodeProps(instance, props, oldProps = {}) {
  if ("id" in props) {
    const message = `VueKonva: You are using "id" attribute for Konva node. In some very rare cases it may produce bugs. Currently we recommend not to use it and use "name" attribute instead.`;
    console.warn(message);
  }

  var updatedProps = {};
  var hasUpdates = false;
  for (let key in oldProps) {
    var isEvent = key.slice(0, 2) === "on";
    var propChanged = oldProps[key] !== props[key];
    if (isEvent && propChanged) {
      var eventName = key.substr(2).toLowerCase();
      if (eventName.substr(0, 7) === "content") {
        eventName =
          "content" +
          eventName.substr(7, 1).toUpperCase() +
          eventName.substr(8);
      }
      instance.off(eventName, oldProps[key]);
    }
    var toRemove = !props.hasOwnProperty(key);
    if (toRemove) {
      instance.setAttr(key, undefined);
    }
  }
  for (let key in props) {
    let isEvent = key.slice(0, 2) === "on";
    var toAdd = oldProps[key] !== props[key];
    if (isEvent && toAdd) {
      let eventName = key.substr(2).toLowerCase();
      if (eventName.substr(0, 7) === "content") {
        eventName =
          "content" +
          eventName.substr(7, 1).toUpperCase() +
          eventName.substr(8);
      }
      if (props[key]) {
        instance.on(eventName, props[key]);
      }
    }
    if (
      !isEvent &&
      (props[key] !== oldProps[key] || props[key] !== instance.getAttr(key))
    ) {
      hasUpdates = true;
      updatedProps[key] = props[key];
    }
  }

  if (hasUpdates) {
    instance.setAttrs(updatedProps);
    updatePicture(instance);
    var val, prop;
    for (prop in updatedProps) {
      val = updatedProps[prop];
      if (val instanceof window.Image && !val.complete) {
        var node = instance;
        val.addEventListener("load", function() {
          var layer = node.getLayer();
          layer && layer.batchDraw();
        });
      }
    }
  }
}
</script>
