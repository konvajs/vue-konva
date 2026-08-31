import type { Component } from 'vue';
import Stage from './components/Stage.js';
import KonvaNode from './components/KonvaNode.js';
import { componentPrefix } from './utils/index.js';
import { KonvaNodeConstructor } from './types.js';

export interface VueKonvaOptions {
  prefix?: string;
  customNodes?: Record<string, KonvaNodeConstructor>;
}

// The full and core entries differ only in the component set.
// `app` is typed as any because TypeScript complains when the consumer resolves
// a different copy of Vue than the one we compiled against.
export function createInstall(konvaComponents: Record<string, Component>) {
  return (app: any, options?: VueKonvaOptions) => {
    const customNodes = Object.entries(options?.customNodes ?? {}).map(([name, constructor]) =>
      KonvaNode(name, constructor),
    );

    for (const component of [Stage, ...Object.values(konvaComponents), ...customNodes]) {
      app.component(`${options?.prefix || componentPrefix}${component.name}`, component);
    }
  };
}
