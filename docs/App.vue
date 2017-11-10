<template>
  <div id="app">
    <Stars />
  </div>
</template>

<script>
import Stars from "./components/Stars";

export default {
  name: "app",
  components: {
    Stars
  },
  data() {
    return {
      configKonva: {
        width: "200",
        height: "200",
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
    /*
    setTimeout(() => {
      console.log('cambiazo')
      this.configRect2.width = 90;
    }, 2000);
  */
  }
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>
