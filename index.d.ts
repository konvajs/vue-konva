import type Konva from 'konva';
import type { KonvaNodes } from './src/types';

declare global {
  interface Window {
    Konva: typeof Konva,
  }
}


declare module 'vue' {
  import { ComponentInternalInstance, VNode } from 'vue';

  export interface ComponentInternalInstance {
    __konvaNode?: KonvaNodes;
  }

  export interface VNode {
    __konvaNode?: KonvaNodes;
  }
}

declare module 'vue-konva' {
  import { PluginFunction, PluginObject } from 'vue';
  const konvaPlugin: PluginObject<{}> | PluginFunction<{}>;
  export default konvaPlugin;
}
