/**
  Radar is usually used to describe where we are looking at in 360 panorama viewers or VR projects,
  inspired by krpano's radar plugin https://krpano.com/tours/bkeller/index.html
  angle: field of view
  direction: center angle of the view
*/

<template>
<v-group>
  <v-wedge :config='config' ref="wedge"
    @dragstart='onDragStart'
    @dragmove='onDragMove'
    @dragend='onDragEnd'>
  </v-wedge>
  <v-circle 
    :config='handler' 
    ref='handler'
    @dragstart='onHandlerDragStart'
    @dragmove='onHandlerDragMove'
    @dragend='onHandlerDragEnd'>
  </v-circle>   
</v-group>
  
</template>

<script>
import {Werge} from 'konva'

let tween;

export default {
  name: 'Radar',
  extends: Werge,
  props: {
    config: {
      type: Object,
      default: {
        direction: 0
      }
    },
    handler: {
      type: Object,
      default: {
        draggable: true
      }
    }
  },
  watch: {
    'config.angle': function() {
      this.handleAngleChange()
    },
    'config.direction': function() {
      this.handleAngleChange()
    },
    'config.x': function() {
      this.resetHandler()
    },
    'config.y': function() {
      this.resetHandler()
    }
  },
  methods: {
    handleAngleChange(angle) {
      this.config.rotation = this.config.direction - this.config.angle / 2.0
      this.resetHandler()
    },
    resetHandler() {
      var vm = this;

      vm.config.direction = Number(vm.config.direction)
      var r = vm.config.radius * 0.7; // distance from origin of radar is 70% of radar's radiuss

      vm.$refs.handler.getStage().setX(r * Math.cos(vm.config.direction * DEG2RAD) + vm.config.x);
      vm.$refs.handler.getStage().setY(r * Math.sin(vm.config.direction * DEG2RAD) + vm.config.y);
    },
    onDragStart() {
      console.log('onDragStart')
    },
    onDragEnd() {
      console.log('onDragEnd')
    },
    onDragMove(target, e) {
      console.log('onDragMove', e, target)
      this.config.x = e.target._lastPos.x;
      this.config.y = e.target._lastPos.y;
      this.resetHandler()
    },
    onHandlerDragStart(target, e) {
      console.log('onHandlerDragStart');
      target.config.opacity = 0.5;
      this.resetHandler();
    },
    onHandlerDragEnd(target, e) {
      console.log('onHandlerDragEnd')
      target.config.opacity = 1
      this.resetHandler()
    },
    onHandlerDragMove(target, e) {
      console.log('onHandlerDragMove', e, target)

      // radar's position
      var x0 = this.config.x;
      var y0 = this.config.y;

      // handler's position
      var x = e.target._lastPos.x;
      var y = e.target._lastPos.y;

      this.config.direction = RAD2DEG * Math.atan2(y - y0, x - x0);

      this.resetHandler();
    }
  }
};

const RAD2DEG = 180.0 / Math.PI;

const DEG2RAD = Math.PI / 180.0;
</script>