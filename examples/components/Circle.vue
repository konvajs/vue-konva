<template>
  <div>
    <v-stage @contentMousedown.right="right"
    @contentMousedown.left="left"
    @contentMousedown.middle="middle" :config="{
        width: 400,
        height: 200
      }">
      <v-layer>
        <v-circle :config="{
              x: 200,
              y: 100,
              radius: 70,
              fill: 'red',
              stroke: 'black',
              strokeWidth: 4
            }" />
      </v-layer>
    </v-stage>
    <div>Last click: {{ text }}</div>
  </div>
</template>

<script>
let vm;
export default {
  data() {
    return {
      text: ""
    };
  },
  methods: {
    left() {
      vm.text = "Click Left";
    },
    right() {
      vm.text = "Click Right";
    },
    middle() {
      vm.text = "Click Middle";
    }
  },
  mounted() {
    vm = this;
  }
};
</script>
