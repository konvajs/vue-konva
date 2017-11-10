Minimal code example:

```jsx
<v-stage :config="{
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
```

### Basic shapes

Also you can create [custom shape](https://konvajs.github.io/docs/shapes/Custom.html):

```jsx
<v-stage :config="{
    width: 400,
    height: 200
  }">
  <v-layer>
    <v-shape :config="{
      sceneFunc: function(context) {
        context.beginPath();
        context.moveTo(20, 50);
        context.lineTo(220, 80);
        context.quadraticCurveTo(150, 100, 260, 170);
        context.closePath();

        // special Konva.js method
        context.fillStrokeShape(this);
      },
      fill: '#00D2FF',
      stroke: 'black',
      strokeWidth: 4
    }"/>
  </v-layer>
</v-stage>

```

### Styles

Each shape supports the following style properties:

* Fill. Solid color, gradients or images
* Stroke (color, width)
* Shadow (color, offset, opacity, blur)
* Opacity

```jsx
<v-stage :config="{
    width: 400,
    height: 200
  }">
  <v-layer>
    <v-regular-polygon :config="{
      x: 100,
      y: 100,
      sides: 5,
      radius: 70,
      fill: 'red',
      stroke: 'black',
      strokeWidth: 4,
      shadowOffsetX : 20,
      shadowOffsetY : 25,
      shadowBlur : 40,
      opacity : 0.5
    }" />
  </v-layer>
</v-stage>
```


