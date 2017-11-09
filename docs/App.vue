<template>
  <div id="app">
    <v-stage :config="configKonva"></v-stage>
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
      }
    };
  },
  mounted() {
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
