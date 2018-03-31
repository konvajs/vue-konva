<template>
  <div>
    <br>Rotation angle: {{wedge.rotation}}
    <br>Direction angle:
      <input type="range" min="-180" max="180" v-model="wedge.direction">
      {{wedge.direction}}
    <br>Field Of View: 
      <input type="range" min="5" max="175" v-model="wedge.angle">
      {{wedge.angle}}

    <v-stage ref="stage" :config="configKonva">
      <v-layer ref="layer">
        <v-radar
          :config="wedge"
          :handler="handler">
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
      wedge: {},
      handler: {}
    };
  },
  components: {
    'v-radar': Radar
  },
  mounted() {
    vm = this;

    vm.wedge = {
      x: vm.configKonva.width / 2,
      y: vm.configKonva.height / 2,
      radius: 160,
      angle: 60,
      direction: 90,
      draggable: true,
      fillRadialGradientStartPoint: 0,
      fillRadialGradientStartRadius: 0,
      fillRadialGradientEndPoint: 0,
      fillRadialGradientEndRadius: 160,
      fillRadialGradientColorStops: [0, 'red', 0.3, 'blue', 0.5, 'rgba(0,0,255,0.6)', 1, 'rgba(255,255,255,0)'],
      opacity: 0.8,
      stroke: 'transparent',
      strokeWidth: 1,
      scaleX: 1,
      scaleY: 1,
      startScale: 1
    }

    vm.handler = {
      radius: 10,
      strokeWidth: 2,
      opacity: 1,
      stroke: 'rgba(0,0,255,0.5)',
      fill: 'rgba(255,255,255,1)',
      draggable: true // should be always true always even we don't define
    }
  }
};
</script>
