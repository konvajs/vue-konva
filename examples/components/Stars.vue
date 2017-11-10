<template>
  <div>
    <v-stage ref="stage"
      :config="configKonva"
      @dragstart="handleDragstart"
      @dragend="handleDragend">
      <v-layer ref="layer">
        <v-star
          v-for="item in list"
          :key="item.id"
          :config="item"></v-star>
      </v-layer>
      <v-layer ref="dragLayer"></v-layer>
    </v-stage>
  </div>
</template>

<script>
const width = window.innerWidth;
const height = window.innerHeight;
let vm = {};

export default {
  data() {
    return {
      list: [],
      configKonva: {
        width: width,
        height: height
      }
    };
  },
  methods: {
    handleDragstart(starComponent) {
      const shape = starComponent.getStage();
      const dragLayer = vm.$refs.dragLayer.getStage();
      const stage = vm.$refs.stage.getStage();

      // moving to another layer will improve dragging performance
      shape.moveTo(dragLayer);
      stage.draw();

      starComponent.config.shadowOffsetX = 15;
      starComponent.config.shadowOffsetY = 15;
      starComponent.config.scaleX = starComponent.config.startScale * 1.2;
      starComponent.config.scaleY = starComponent.config.startScale * 1.2;
    },
    handleDragend(starComponent) {
      const shape = starComponent.getStage();
      const layer = vm.$refs.layer.getStage();
      const stage = vm.$refs.stage.getStage();

      shape.moveTo(layer);
      stage.draw();

      shape.to({
        duration: 0.5,
        easing: Konva.Easings.ElasticEaseOut,
        scaleX: starComponent.config.startScale,
        scaleY: starComponent.config.startScale,
        shadowOffsetX: 5,
        shadowOffsetY: 5
      });
    }
  },
  mounted() {
    vm = this;
    for (let n = 0; n < 30; n++) {
      const scale = Math.random();
      const stage = vm.$refs.stage.getStage();
      vm.list.push({
        x: Math.random() * stage.getWidth(),
        y: Math.random() * stage.getHeight(),
        rotation: Math.random() * 180,
        numPoints: 5,
        innerRadius: 30,
        outerRadius: 50,
        fill: "#89b717",
        opacity: 0.8,
        draggable: true,
        scaleX: scale,
        scaleY: scale,
        shadowColor: "black",
        shadowBlur: 10,
        shadowOffsetX: 5,
        shadowOffsetY: 5,
        shadowOpacity: 0.6,
        startScale: scale
      });
    }
  }
};
</script>
