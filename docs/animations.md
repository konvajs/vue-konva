You can create [animations](https://konvajs.github.io/docs/animations/Create_an_Animation.html) in two ways:

* Konva.Animation
* Konva.Tween

```jsx
new Vue({
  template: `
    <v-stage ref="stage" :config="{
      width: 400,
      height: 200
    }">
    <v-layer ref="layer">
      <v-regular-polygon ref="hexagon" :config="{
          x: 200,
          y: 100,
          sides: 6,
          radius: 20,
          fill: 'red',
          stroke: 'black',
          strokeWidth: 4
        }" />
    </v-layer>
  </v-stage>
  `,
  mounted() {
    const vm = this;
    const amplitude = 100;
    const period = 5000;
    // in ms
    const centerX = vm.$refs.stage.getStage().getWidth() / 2;

    const anim = new Konva.Animation(function (frame) {
        vm.$refs.hexagon.getStage().setX(amplitude * Math.sin(frame.time * 2 * Math.PI / period) + centerX);
    }, vm.$refs.layer.getStage());

    anim.start();
  }
})
```
