import type { Node } from 'konva/lib/Node';
import type Stage from './components/Stage.js';
import type * as konvaComponents from './components.js';

// install() registers `${prefix}${name}`; only the default `V` prefix is typeable.
type PrefixedKonvaComponents = {
  [Name in keyof typeof konvaComponents as `V${Name}`]: (typeof konvaComponents)[Name];
};

declare module 'vue' {
  export interface GlobalComponents extends PrefixedKonvaComponents {
    VStage: typeof Stage;
  }

  // vue-konva stores the Konva node it owns on the Vue instance and its vnode.
  export interface ComponentInternalInstance {
    __konvaNode?: Node<any>;
  }

  export interface VNode {
    __konvaNode?: Node<any>;
  }
}
