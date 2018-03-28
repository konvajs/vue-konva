<template>
  <div>
    <br>Rotation angle: {{wedge.rotation}}
    <br>Direction angle:
      <input type="range" min="-180" max="180" v-model="wedge.direction">
      {{wedge.direction}}
    <br>Field Of View: 
      <input type="range" min="5" max="175" v-model="wedge.angle">
      {{wedge.angle}}

    <v-stage ref="stage"
      :config="configKonva"
      @dragstart="handleDragstart"
      @dragend="handleDragend">
      <v-layer ref="layer">
        <v-radar
          :config="wedge">
        </v-radar>
      </v-layer>
      <v-layer ref="dragLayer"></v-layer>
    </v-stage>
  </div>
</template>

<script>
const width = window.innerWidth;
const height = window.innerHeight;
let vm = {};

import Radar from './Radar'

export default {
  data() {
    return {
      configKonva: {
        width: width,
        height: height
      },
      wedge: {}
    };
  },
  components: {
    'v-radar': Radar
  },
  methods: {
    handleDragstart(component) {
      const shape = component.getStage();
      const dragLayer = vm.$refs.dragLayer.getStage();
      const stage = vm.$refs.stage.getStage();

      // moving to another layer will improve dragging performance
      shape.moveTo(dragLayer);
      stage.draw();

      component.config.shadowOffsetX = 15;
      component.config.shadowOffsetY = 15;
      component.config.scaleX = component.config.startScale * 1.2;
      component.config.scaleY = component.config.startScale * 1.2;
    },
    handleDragend(component) {
      const shape = component.getStage();
      const layer = vm.$refs.layer.getStage();
      const stage = vm.$refs.stage.getStage();

      shape.moveTo(layer);
      stage.draw();

      shape.to({
        duration: 0.5,
        easing: Konva.Easings.ElasticEaseOut,
        scaleX: component.config.startScale,
        scaleY: component.config.startScale,
        shadowOffsetX: 5,
        shadowOffsetY: 5
      });
    }
  },
  mounted() {
    vm = this;

    vm.wedge = {
      x: vm.configKonva.width / 2,
      y: vm.configKonva.height / 2,
      radius: 100,
      angle: 60,
      direction: 90,
      draggable: true,
      fillRadialGradientStartPoint: 0,
      fillRadialGradientStartRadius: 0,
      fillRadialGradientEndPoint: 0,
      fillRadialGradientEndRadius: 100,
      fillRadialGradientColorStops: [0, 'red', 0.5, 'blue', 1, 'rgba(255,255,255,0)'],
      opacity: 0.8,
      stroke: 'transparent',
      strokeWidth: 1,
      scaleX: 1,
      scaleY: 1,
      startScale: 1,
      handler: vm.wedgeHangler
    }

    vm.wedgeHangler = {
      radius: 10,
      angle: 60,
      opacity: 0.8,
      strokeWidth: 1
    }
  }
};
</script>
