import { Node } from 'konva/lib/Node';

export type KonvaNodeConstructor = new (...args: any) => Node<any>;

/**
 * Type for vue-konva component template refs.
 * Use with `ref()` to get typed access to `getNode()` and `getStage()`.
 *
 * @example
 * import type { VueKonvaRef } from 'vue-konva';
 * import type Konva from 'konva';
 *
 * const layerRef = ref<VueKonvaRef<Konva.Layer>>(null);
 * const stageRef = ref<VueKonvaRef<Konva.Stage>>(null);
 *
 * // In setup or methods:
 * const layer = layerRef.value?.getNode(); // typed as Konva.Layer
 * const stage = stageRef.value?.getStage(); // typed as Konva.Stage
 */
export interface VueKonvaRef<T extends Node = Node> {
  getNode(): T;
  getStage(): T;
}
