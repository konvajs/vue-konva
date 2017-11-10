With `Konva` you can easily listen to user input events (`click`, `dblclick`, `mouseover`, `tap`, `dbltap`, `touchstart` [etc...](https://konvajs.github.io/docs/events/Binding_Events.html)),
attributes change events (`scaleXChange`, `fillChange`) and drag&drop events (`dragstart`, `dragmove`, `dragend`).

```jsx
new Vue({
  template: `
    <v-stage ref="stage" :config="{
        width: 300,
        height: 200
      }">
      <v-layer ref="layer">
        <v-regular-polygon
        @mousemove="handleMouseMove"
        @mouseout="handleMouseOut"
        :config="{
          x: 80,
          y: 120,
          sides: 3,
          radius: 80,
          fill: '#00D2FF',
          stroke: 'black',
          strokeWidth: 4
        }"
        />
        <v-text ref="text" :config="{
          x: 10,
          y: 10,
          fontFamily: 'Calibri',
          fontSize: 24,
          text: '',
          fill: 'black'
        }" />
      </v-layer>
    </v-stage>
  `,
  methods: {
    writeMessage(message) {
      this.$refs.text.getStage().setText(message);
      this.$refs.layer.getStage().draw();
    },
    handleMouseOut(vueComponent, event) {
      this.writeMessage('Mouseout triangle');
    },
    handleMouseMove(vueComponent, event) {
      const mousePos = this.$refs.stage.getStage().getPointerPosition();
      const x = mousePos.x - 190;
      const y = mousePos.y - 40;
      this.writeMessage('x: ' + x + ', y: ' + y);
    }
  }
});
```
