import type Konva from 'konva';
import type { KonvaNodes } from './src/types';
import { Node } from 'konva/lib/Node';

declare global {
  interface Window {
    Konva: typeof Konva,
  }
}


declare module 'vue' {
  import { ComponentInternalInstance, VNode } from 'vue';

  export interface ComponentInternalInstance {
    __konvaNode?: Node<any>;
  }

  export interface VNode {
    __konvaNode?: Node<any>;
  }
}
