import type { Component } from 'vue';
import Stage from './components/Stage.js';
import KonvaNode from './components/KonvaNode.js';
import { componentPrefix } from './utils/index.js';
import { KonvaNodeConstructor } from './types.js';

export interface VueKonvaOptions {
  prefix?: string;
  customNodes?: Record<string, KonvaNodeConstructor>;
}

/**
 * Builds the Vue plugin for a set of Konva components. The full and the core
 * entry points differ only in which component set they pass in.
 */
export function createInstall(konvaComponents: Record<string, Component>) {
  return {
    // `app` is typed as any because TypeScript complains when the consumer
    // resolves a different copy of Vue than the one we compiled against.
    install: (app: any, options?: VueKonvaOptions) => {
      const prefixToUse = options?.prefix || componentPrefix;

      const customNodes = options?.customNodes
        ? Object.entries(options.customNodes).map(([name, constructor]) =>
            KonvaNode(name, constructor),
          )
        : [];

      const components: Component[] = [Stage, ...Object.values(konvaComponents), ...customNodes];

      components.forEach((component) => {
        app.component(`${prefixToUse}${component.name}`, component);
      });
    },
  };
}
