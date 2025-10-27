import type { Component } from 'vue';
import Stage from './components/Stage';
import { componentPrefix } from './utils';
import KonvaNode from './components/KonvaNode';
import { KonvaNodeConstructor } from './types';
import { useImage } from './use-image';
import * as konvaComponentsModule from './components';

export { useImage };
export type { KonvaNodeConstructor } from './types';

export { Stage };
export * from './components';

const VueKonva = {
  install: (
    app: any,
    // We use any here as it seems TypeScript will complain
    // if the user uses a different version of Vue.
    options?: { prefix?: string; customNodes?: Record<string, KonvaNodeConstructor> },
  ) => {
    const prefixToUse = options?.prefix || componentPrefix;

    const customNodes = options?.customNodes
    ? Object.entries(options.customNodes).map(([name, constructor]) =>
        KonvaNode(name, constructor)
      )
    : []

    const components: Component[] = [
      Stage,
      ...Object.values(konvaComponentsModule),
      ...customNodes,
    ];
    components.forEach((component) => {
      app.component(`${prefixToUse}${component.name}`, component);
    });
  },
};

export default VueKonva;
