import type { Plugin } from 'vue';
import Stage from './components/Stage';
import KonvaNode from './components/KonvaNode';
import { componentPrefix } from './utils';
import { KONVA_NODES } from './types';

if (typeof window !== 'undefined' && !window.Konva) {
  require('konva');
}

const VueKonva: Plugin = {
  install: (app, options?: { prefix: string }) => {
    let prefixToUse = options?.prefix || componentPrefix;
    // app.component(`${prefixToUse}${Stage.name}`, Stage);
    const components = [Stage, ...KONVA_NODES.map(KonvaNode)];
    // const components = [Stage];
    components.map((k) => {
      app.component(`${prefixToUse}${k.name}`, k);
    });
  },
};

export default VueKonva;
