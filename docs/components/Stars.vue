<template>
  <div>
    <v-stage ref="stage" :config="configKonva" @dragstart="handleDragstart($event)">
      <v-layer>
        <v-star
          v-for="item in list"
          :key="item.id"
          :config="item" />
      </v-layer>
      <v-layer ref="dragLayer"></v-layer>
    </v-stage>
  </div>
</template>

<script>
const width = window.innerWidth;
const height = window.innerHeight;
const configGeneric = {
  numPoints: 5,
  innerRadius: 30,
  outerRadius: 50,
  fill: "#89b717",
  opacity: 0.8,
  draggable: true,
  shadowColor: "black",
  shadowBlur: 10,
  shadowOffset: {
    x: 5,
    y: 5
  },
  shadowOpacity: 0.6
};
let vm = {};

export default {
  data() {
    return {
      list: [],
      configKonva: {
        width: width,
        height: "500"
      },
      configRect: {
        x: 10,
        y: 10,
        width: 70,
        height: 50,
        fill: "green",
        shadowBlur: 5
      }
    };
  },
  methods: {
    handleDragstart: (evt) => {
      const shape = evt.target;
      const dragLayer = vm.$refs.dragLayer.getInstance();
      shape.moveTo(dragLayer);
      // stage.draw();
      // moving to another layer will improve dragging performance
      /*
      shape.moveTo(dragLayer);
      stage.draw();

      if (tween) {
        tween.pause();
      }
      shape.setAttrs({
        shadowOffset: {
          x: 15,
          y: 15
        },
        scale: {
          x: shape.getAttr('startScale') * 1.2,
          y: shape.getAttr('startScale') * 1.2
        }
      });
      */
    }
  },
  mounted() {
    vm = this;
    for (var n = 0; n < 7; n++) {
      var scale = Math.random();
      console.log(Math.random())
      const stage = this.$refs.stage.getInstance();
      this.list.push(Object.assign(configGeneric, {
        startScale: scale,
        x: Math.random() * stage.getWidth(),
        y: Math.random() * stage.getHeight(),
      }))
    }
    /*
    setTimeout(() => {
      console.log('cambiooo')
      this.list.push(2, 3, 4, 5);
      this.configKonva.height = '700';
    }, 2000);
    */
  }
};
</script>
