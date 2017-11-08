import Rect from './components/Rect'

const componentPrefix = 'v'

const components = {
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
