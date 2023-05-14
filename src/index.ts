import type { App } from 'vue';
import Stage from './components/Stage';
import KonvaNode from './components/KonvaNode';
import { componentPrefix } from './utils';
import { KONVA_NODES } from './types';

if (typeof window !== 'undefined' && !window.Konva) {
  require('konva');
}

const VueKonva = {
  install: (app: App, options?: { prefix?: string }) => {
    let prefixToUse = options?.prefix || componentPrefix;

    [Stage, ...KONVA_NODES.map(KonvaNode)].map((k) => {
      app.component(`${prefixToUse}${k.name}`, k);
    });
  },
};

export default VueKonva;
