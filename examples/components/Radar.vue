/**
  Radar is usually used to describe where we are looking at in 360 panorama viewers or VR projects,
  inspired by krpano's radar plugin https://krpano.com/tours/bkeller/index.html
  angle: field of view
  direction: center angle of the view
*/

<template>
<div>
  <v-wedge :config='config' ref="wedge"></v-wedge>

  <!-- not working in the moment, it is handler for diretion -->
  <v-shape :config='config.handler'></v-shape>   
</div>
  
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
      // const shape = this.$parent.getStage().children[0]

      // got better solution now
      const shape = this.$refs.wedge.getStage()

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