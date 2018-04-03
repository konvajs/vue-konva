- [GitHub repository](https://github.com/rafaesc/vue-konva)
- [NPM page](https://www.npmjs.com/package/vue-konva)

<div><iframe src="https://ghbtns.com/github-btn.html?user=rafaesc&repo=vue-konva&type=star&count=true"
            frameborder="0" scrolling="0" width="170px" height="20px"></iframe></div>
<div><iframe src="https://ghbtns.com/github-btn.html?user=rafaesc&repo=vue-konva&type=fork&count=true"
            frameborder="0" scrolling="0" width="170px" height="20px"></iframe></div>
<br>

**Vue Konva** is a JavaScript library for drawing complex canvas graphics using Vue.

It provides declarative and reactive bindings to the [Konva Framework](http://konvajs.github.io/).

## Quick Start

[Vue.js](https://vuejs.org) version 2.4+ is required.

### 1 Install via npm
```html
npm install vue-konva konva --save
```

### 2 Import and use VueKonva

```javascript static
import Vue from 'vue';
import VueKonva from 'vue-konva'

Vue.use(VueKonva)
```

### 3 Reference in your component templates
```html
<template>
  <v-stage ref="stage" :config="configKonva">
    <v-layer ref="layer">
      <v-circle :config="configCircle"></v-circle>
    </v-layer>
  </v-stage>
</template>
```
```javascript static
<script>
export default {
  data() {
    return {
      configKonva: {
        width: 200,
        height: 200
      },
      configCircle: {
        x: 100,
        y: 100,
        radius: 70,
        fill: "red",
        stroke: "black",
        strokeWidth: 4
      }
    };
  }
};

</script>
```

### Or use a CDN
```html
<html>
  <head>
    <meta charset='utf-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no'>
    <meta http-equiv='x-ua-compatible' content='ie=edge'>
  </head>
  <body>
    <div id='app'>
      <v-stage :config="configKonva">
        <v-layer>
          <v-circle :config="configCircle"></v-circle>
        </v-layer>
      </v-stage>
    </div>
    <!--1. Link Vue Javascript & Konva-->
    <script src='https://unpkg.com/vue/dist/vue.js'></script>
    <script src='https://cdnjs.cloudflare.com/ajax/libs/konva/1.7.6/konva.js'></script>
    <!--2. Link VueKonva Javascript (Plugin automatically installed)-->
    <script src='./lib/vue-konva.min.js'></script>
    <script>
      // 3. Create the Vue instance
      new Vue({
        el: '#app',
        data: {
          configKonva: {
            width: 200,
            height: 200
          },
          configCircle: {
            x: 100,
            y: 100,
            radius: 70,
            fill: 'red',
            stroke: 'black',
            strokeWidth: 4
          }
        }
      })
    </script>
  </body>
</html>
```

## [Examples](http://rafaelescala.com/vue-konva/#/)

* [Konva Star Demo](http://rafaelescala.com/vue-konva/#/stars), by [Konva](https://konvajs.github.io/docs/sandbox/Elastic_Stars.html)
* [Demo with Vuex](http://rafaelescala.com/vue-konva/#/vuex-example), by [@Ldoppea](https://github.com/Ldoppea)
* [Radar](http://rafaelescala.com/vue-konva/#/radar-demo), by [@imudin](https://github.com/imudin),[@Ldoppea](https://github.com/Ldoppea)

[Examples sources](https://github.com/rafaesc/vue-konva/tree/master/examples)
