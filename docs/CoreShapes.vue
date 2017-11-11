<template>

</template>

<script>
export default {
  name: "CoreShapes",
  props: {
    /**
     * All the parameters available for Konva objects
     */
    config: {
      type: Object
    }
  },
  methods: {
    /**
     * Getting reference to Konva objects
     * @public
     * @returns Konva object
     */
    getStage() {
      return this._stage;

      /**
       * [and more events...](https://konvajs.github.io/docs/events/Binding_Events.html)
			 * @event dragend
			 * @type {}
			 */

      /**
			 * @event dragmove
			 * @type {}
			 */

      /**
			 * @event dragstart
			 * @type {}
			 */

      /**
			 * @event fillChange
			 * @type {}
			 */

      /**
			 * @event scaleXChange
			 * @type {}
			 */

      /**
			 * @event touchstart
			 * @type {}
			 */

      /**
			 * @event dbltap
			 * @type {}
			 */

      /**
			 * @event tap
			 * @type {}
			 */

      /**
			 * @event mouseover
			 * @type {}
			 */

      /**
			 * @event dblclick
			 * @type {}
			 */

      /**
       * Return VueComponent & event
			 * @event click
			 * @type {}
			 */
    }
  }
};
</script>
