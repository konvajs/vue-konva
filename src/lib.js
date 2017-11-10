import Stage from "./components/Stage";
import KonvaNode from "./components/KonvaNode";
import { componentPrefix } from "./utils";

if (typeof window !== "undefined" && !window.Konva) {
  require("konva");
}

const KONVA_NODES = [
  'Layer',
  'FastLayer',
  'Group',
  'Label',
  'Rect',
  'Circle',
  'Ellipse',
  'Wedge',
  'Line',
  'Sprite',
  'Image',
  'Text',
  'TextPath',
  'Star',
  'Ring',
  'Arc',
  'Tag',
  'Path',
  'RegularPolygon',
  'Arrow',
  'Shape'
];
const components = {
  Stage
};

KONVA_NODES.forEach(function(nodeName) {
  components[nodeName] = KonvaNode();
});

const VueKonva = {
  ...components,
  install: Vue =>
    Object.keys(components).forEach(k =>
      Vue.component(`${componentPrefix}${k}`, components[k])
    )
};

export default VueKonva;

if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use(VueKonva);
}
