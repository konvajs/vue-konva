<template>
  <v-wedge :config='config'></v-wedge>
</template>

<script>
import {Werge} from 'konva'
export default {
  name: 'Radar',
  extends: Werge,
  props: {
    config: {
      type: Object,
      default: {
        direction: 0
      }
    }
  },
  watch: {
    'config.angle': function (newVal, oldVal) {
      this.handleAngleChange(true);
    },
    'config.direction': function (newVal, oldVal) {
      this.handleDirectionChange(false);
    }
  },
  methods: {
    handleAngleChange(angle) {
      this.config.rotation = this.config.direction - this.config.angle / 2.0
    },
    handleDirectionChange(angle) {
      // todo need better solution
      const shape = this.$parent.getStage().children[0]

      var tween = new Konva.Tween({
        node: shape,
        duration: 0.3,
        rotation: this.config.direction - this.config.angle / 2.0
      });
      tween.play()
    }
  }
};
</script>