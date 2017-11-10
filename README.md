# Vue Konva

Vue Konva is a JavaScript library for drawing complex canvas graphics using Vue.

It provides declarative and reactive bindings to the [Konva Framework](http://konvajs.github.io/).

## Demo
* [Demo stars](http://rafaelescala.com/vue-konva/)

All `vue-konva` components correspond to `Konva` components of the same name with the prefix 'v-'. All the parameters available for `Konva` objects can add as `config` in the prop for corresponding `vue-konva` components.

Core shapes are: v-rect, v-circle, v-ellipse, v-line, v-image, v-text, v-textPath, v-star, v-label, SVG Path, v-regularPolygon.
Also you can create custom shape.

To get more info about `Konva` you can read [Konva Overview](http://konvajs.github.io/docs/overview.html).
## Quick Start

[Vue.js](https://vuejs.org) version 2.4+ is required.

### 1 Install via npm
```npm
npm install vue-konva konva --save
```

### 2 Import and use VueKonva

```javascript
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
```javascript
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
      <v-stage ref="stage" :config="configKonva">
        <v-layer ref="layer">
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

## License
[MIT](LICENSE) License

Copyright (c) 2017-present, Rafael Escala
