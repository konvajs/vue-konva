<template>
  <div>{{this.config}}<slot></slot></div>
</template>

<script>
import { updatePicture, getName, findStage } from "../utils";
const EventEmitter = require("events");

class StageEmitter extends EventEmitter {}

export default {
  props: ["config"],
  created() {
    this.StageEmitter = new StageEmitter();
    this._stage = {};
  },
  mounted() {
    const eventStage = findStage(this);
    eventStage.on("mounted", parentStage => {
      const tagName = this.$options._componentTag;
      const nameNode = getName(tagName);
      const NodeKonva = window.Konva[nameNode];
      this._stage = new NodeKonva(this.config);
      this.StageEmitter.emit("mounted", this._stage);
      parentStage.add(this._stage);
    });
  },
  updated() {
    console.log("Hola cambiaso");
  }
};
</script>

