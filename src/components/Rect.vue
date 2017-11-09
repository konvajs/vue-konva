<template>
  <div>{{this.config}}</div>
</template>

<script>
import { updatePicture, getName, findStage } from '../utils';

export default {
  props: ["config"],
  mounted() {
    const eventStage = findStage(this);
    eventStage.on('mounted', parentStage => {
      const tagName = this.$options._componentTag;
      const nameNode = getName(tagName);
      const NodeKonva = window.Konva[nameNode];
      console.log(this.config.fill);
      parentStage.add(new NodeKonva(this.config));
    })
  }
};
</script>

