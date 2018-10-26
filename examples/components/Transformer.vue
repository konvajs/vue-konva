<template>
  <v-stage ref="stage" :config="configKonva">
    <v-layer ref="baseLayer">
      <v-rect :config="configRect"></v-rect>
      <v-transformer ref="transformer" :config="configTransformer"></v-transformer>
    </v-layer>
  </v-stage>

</template>

<script>
export default {
  name: "HelloTransformer",
  data() {
    return {
      selectedNode: null,
      configKonva: {
        width: 2000,
        height: 2000
      },
      configRect: {
        x: 100,
        y: 100,
        width: 200,
        height: 200,
        fill: "red",
        name: 'red',
        draggable: true
      },
      configTransformer: {
        rotationSnaps: [45, 90, 135, 180, 225, 270, 315, 360]
      }
    };
  },
  mounted() {
    this.selectedNode = this.$refs.stage.getStage().findOne('.red')
    const transformer = this.$refs.transformer._stage
    transformer.attachTo(this.selectedNode)
    transformer.getLayer().batchDraw()
  }
}
</script>
