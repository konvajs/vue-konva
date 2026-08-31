import type { Node } from 'konva/lib/Node';

// vue-konva stores the Konva node it owns on the Vue instance and its vnode.
declare module 'vue' {
  export interface ComponentInternalInstance {
    __konvaNode?: Node<any>;
  }

  export interface VNode {
    __konvaNode?: Node<any>;
  }
}

export {};
