<template>
  <v-group ref="container" :config="configGroup" @dragmove="dragmove" @dragstart="dragstart" @dragend="dragend">
    <v-rect ref="rect" :config="configRectangle"></v-rect>
    <v-text :config="configText"></v-text>
  </v-group>
</template>

<script>
import * as mutations from "../store/mutation-types";

export default {
  name: "Target",
  props: ["target"],
  data() {
    return {};
  },
  computed: {
    configGroup() {
      return {
        name: this.target.id + "group",
        x: this.target.x,
        y: this.target.y,
        draggable: true
      };
    },
    configRectangle() {
      return {
        name: this.target.id + "rectangle",
        fill: "cyan",
        width: 20,
        height: 20,
        shadowColor: "black",
        shadowOffset: {
          x: 5,
          y: 5
        },
        shadowOpacity: 0.6
      };
    },
    configText() {
      return {
        name: this.target.id + "text",
        text: "id" + this.target.id,
        fill: this.target.isDragging ? "red" : "blue",
        shadowBlur: 5
      };
    }
  },
  mounted() {
    console.log("mounted", this.target);

    console.log("isDragging", this.target.isDragging);
    if (this.target.isDragging) {
      console.log("$container", this.$refs.$container);
      this.$refs.container.getStage().startDrag();
    }
  },
  destroyed() {
    console.log("destroyed");
  },
  methods: {
    dragstart(targetGroup) {
      console.log("dratstart", this.target.id);

      this.$store.commit(mutations.START_MOVE, {
        targetId: this.target.id
      });
    },
    dragend(playerGroup) {
      if (this.$refs.rect === undefined) {
        return;
      }

      console.log("dragend", this.target.id);

      this.$store.commit(mutations.STOP_MOVE, {
        targetId: this.target.id
      });
    },
    dragmove(element, evt) {
      let parent = element.getStage().parent;

      this.$store.commit(mutations.MOVE, {
        targetId: this.target.id,
        position: {
          x: element.getStage().getAbsolutePosition().x,
          y: element.getStage().getAbsolutePosition().y
        }
      });
    }
  }
};
</script>

<style scoped>

</style>
