import Stage from './components/Stage'
import Layer from './components/Layer'
import Rect from './components/Rect'
import { componentPrefix } from './utils';

if (typeof window !== 'undefined' && !window.Konva) {
  require('konva');
}

const components = {
  Stage,
  Layer,
  Rect
}

const VueKonva = {
  ...components,
  install: Vue => Object
    .keys(components)
    .forEach(k => Vue.component(`${componentPrefix}${k}`, components[k]))
}

export default VueKonva

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueKonva)
}
