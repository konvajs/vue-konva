<template>
  <v-stage ref="stage" :config="configKonva">
    <v-layer ref="baseLayer">
      <Target v-for="target in targets" :key="target.id" :target="target"></Target>
    </v-layer>
    <v-layer ref="dragLayer" :config="configDragLayer">
      <Target v-for="target in targetsDragging" :key="target.id" :target="target"></Target>
    </v-layer>
  </v-stage>
</template>

<script>
import Target from "./Target";

export default {
  name: "HelloWorld",
  components: {
    Target
  },
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      configKonva: {
        width: 2000,
        height: 2000
      },
      configDragLayer: {
        listening: false
      },
      configCircle: {
        x: 100,
        y: 100,
        radius: 70,
        fill: "red",
        stroke: "black",
        strokeWidth: 4
      }
    };
  },
  computed: {
    targets() {
      const targets = this.$store.getters.targets.filter(
        target => target.isDragging === false
      );
      // console.log("targets", targets);
      return targets;
    },
    targetsDragging() {
      const targets = this.$store.getters.targets.filter(
        target => target.isDragging === true
      );
      // console.log("targetsDrag", targets);
      return targets;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
