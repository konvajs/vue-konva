# Vue Konva

<span class="badge-npmdownloads">
  <a href="https://www.npmjs.com/package/vue-konva">
    <img src="https://img.shields.io/npm/v/vue-konva.svg" alt="Version">
  </a>
  <a href="https://www.npmjs.com/package/vue-konva">
    <img src="https://img.shields.io/npm/l/vue-konva.svg" alt="License">
  </a>
  </span>

![ReactKonva Logo](https://github.com/rafaesc/vue-konva/raw/master/vue-konva.png)

Vue Konva is a JavaScript library for drawing complex canvas graphics using Vue.

It provides declarative and reactive bindings to the [Konva Framework](https://konvajs.org/).

All `vue-konva` components correspond to `Konva` components of the same name with the prefix 'v-'. All the parameters available for `Konva` objects can add as `config` in the prop for corresponding `vue-konva` components.

Core shapes are: `v-rect`, `v-circle`, `v-ellipse`, `v-line`, `v-image`, `v-text`, `v-text-path`, `v-star`, `v-label`, `v-path`, `v-regular-polygon`.
Also you can create custom shape.

To get more info about `Konva` you can read [Konva Overview](https://konvajs.org/docs/overview.html).


## Documentation / live edit

See [Tutorials page](https://konvajs.org/docs/vue/)

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
  <v-stage :config="configKonva">
    <v-layer>
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
    <script src='https://unpkg.com/konva/konva.js'></script>
    <!--2. Link VueKonva Javascript -->
    <script src='https://unpkg.com/vue-konva/umd/vue-konva.min.js'></script>
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

# Core API

## Getting reference to Konva objects

You can use `ref` feature from `vue`.

```html
<template>
<v-stage ref="stage">
  <v-layer ref="layer">
    <v-rect
      ref="rect"
    />
  </v-layer>
</v-stage>
</template>

<script>
const width = window.innerWidth;
const height = window.innerHeight;

export default {
  mounted() {
    const stage = this.$refs.stage.getNode();
    const layer = this.$refs.layer.getNode();
    const rect = this.$refs.rect.getNode();
  }
};
</script>
```

## Configurable prefix

By default `vue-konva` is using `v-` prefix for all components.

You can use your own prefix if default one conflicts with some other libs or your components.

```javascript
import Vue from 'vue';
import VueKonva from 'vue-konva'

Vue.use(VueKonva, { prefix: 'Konva'});

// in template:
<konva-stage ref="stage" :config="stage">
```

## Change log

The change log can be found on the [Releases page](https://github.com/konvajs/vue-konva/releases).

