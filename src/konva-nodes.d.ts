import type { KonvaNodes } from './src/types';

declare module 'vue' {
  import { ComponentInternalInstance, VNode } from 'vue';

  export interface ComponentInternalInstance {
    __konvaNode?: KonvaNodes;
  }

  export interface VNode {
    __konvaNode?: KonvaNodes;
  }
}
