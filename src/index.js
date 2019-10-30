import Stage from './components/Stage';
import KonvaNode from './components/KonvaNode';
import { componentPrefix } from './utils';

if (typeof window !== 'undefined' && !window.Konva) {
  require('konva');
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
  'Shape',
  'Transformer'
];
const components = [
  {
    name: 'Stage',
    component: Stage
  },
  ...KONVA_NODES.map(name => ({
    name,
    component: KonvaNode(name)
  }))
];

const VueKonva = {
  install: (Vue, options) => {
    let prefixToUse = componentPrefix;
    if(options && options.prefix){
      prefixToUse = options.prefix;
    }
    components.forEach(k => {
      console.log(`${prefixToUse}${k.name}`);
      Vue.component(`${prefixToUse}${k.name}`, k.component);
    })
  }
};

export default VueKonva;

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueKonva);
}
