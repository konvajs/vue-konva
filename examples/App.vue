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
