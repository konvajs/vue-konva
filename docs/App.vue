<template>
  <div id="app">
    <v-stage :config="configKonva">
      <v-layer>
        <v-rect :config="configRect"></v-rect>
        <v-rect :config="configRect2" @click="hola()"></v-rect>
      </v-layer>
    </v-stage>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld";

export default {
  name: "app",
  components: {
    HelloWorld
  },
  data() {
    return {
      configKonva: {
        width: "200",
        height: "200",
        id: "ff"
      },
      configRect: {
        x: 10,
        y: 10,
        width: 70,
        height: 50,
        fill: 'green',
        shadowBlur: 5
      },
      configRect2: {
        x: 10,
        y: 50,
        width: 70,
        height: 50,
        fill: 'blue',
        shadowBlur: 5
      }
    };
  },
  methods: {
    hola(){
      console.log('Holaaa')
      this.configRect2.fill = window.Konva.Util.getRandomColor()
    }
  },
  mounted() {
    setTimeout(() => {
      console.log('cambiazo')
      this.configRect2.width = 90;
    }, 2000);

  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
