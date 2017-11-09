import Stage from './components/Stage'

if (typeof window !== 'undefined' && !window.Konva) {
  require('konva');
}

const componentPrefix = 'v'
const components = {
  Stage
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
