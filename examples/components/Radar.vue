/**
  Radar is usually used to describe where we are looking at in 360 panorama viewers or VR projects,
  inspired by krpano's radar plugin https://krpano.com/tours/bkeller/index.html
  angle: field of view
  direction: center angle of the view
*/

<template>
<v-group>
  <v-wedge 
    :config='config' 
    ref="wedge"
    @mouseover='onMouseOver'
    @mouseout='onMouseOut'
    @dragmove='onDragMove'>
  </v-wedge>
  <v-circle 
    :config='handler' 
    ref='handler'
    @mouseover='onHandlerMouseOver'
    @mouseout='onHandlerMouseOut'
    @mousedown='onHandlerMouseDown'
    @dragmove='onHandlerDragMove'
    @dragend='onHandlerDragEnd'
    @mouseup='onHandlerMouseUp'>
  </v-circle>   
</v-group>
  
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
    },
    handler: {
      type: Object,
      default: {
        draggable: true
      }
    }
  },
  mounted() {
    this.handler.draggable = true;
  },
  watch: {
    'config.angle': function() {
      this.handleAngleChange()
    },
    'config.direction': function() {
      this.handleAngleChange()
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
    onDragMove(target, e) {
      this.config.x = e.target._lastPos.x;
      this.config.y = e.target._lastPos.y;
      this.resetHandler()
    },
    onMouseOver() {
      document.body.style.cursor = 'move';
    },
    onMouseOut() {
      document.body.style.cursor = 'default';
    },
    onHandlerMouseOver() {
      document.body.style.cursor = 'ew-resize';
    },
    onHandlerMouseOut() {
      document.body.style.cursor = 'default';
    },
    onHandlerMouseDown() {
      console.log('mousedown')
      this.handler.stroke = 'rgba(0,0,255,1)';
      this.resetHandler();
    },
    onHandlerMouseUp() {
      this.onHandlerDragEnd();
    },
    onHandlerDragEnd() {
      this.handler.stroke = 'rgba(0,0,255,0.5)';
      this.resetHandler()
    },
    onHandlerDragMove(target, e) {
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