import type { Component } from 'vue';
import Stage from './components/Stage';
import { componentPrefix } from './utils';
import Konva from 'konva';
import KonvaNode from './components/KonvaNode';
import { KonvaNodeConstructor } from './types';
import { useImage } from './use-image';

export { useImage };

const VueKonva = {
  install: (
    app: any,
    // We use any here as it seems TypeScript will complain
    // if the user uses a different version of Vue.
    options?: { prefix?: string; customNodes?: Record<string, KonvaNodeConstructor> },
  ) => {
    const prefixToUse = options?.prefix || componentPrefix;

    const konvaNodeConstructors: Record<string, KonvaNodeConstructor> = {
      Arc: Konva.Arc,
      Arrow: Konva.Arrow,
      Circle: Konva.Circle,
      Ellipse: Konva.Ellipse,
      FastLayer: Konva.FastLayer,
      Group: Konva.Group,
      Image: Konva.Image,
      Label: Konva.Label,
      Layer: Konva.Layer,
      Line: Konva.Line,
      Path: Konva.Path,
      Rect: Konva.Rect,
      RegularPolygon: Konva.RegularPolygon,
      Ring: Konva.Ring,
      Shape: Konva.Shape,
      Sprite: Konva.Sprite,
      Star: Konva.Star,
      Tag: Konva.Tag,
      Text: Konva.Text,
      TextPath: Konva.TextPath,
      Transformer: Konva.Transformer,
      Wedge: Konva.Wedge,
      ...options?.customNodes,
    };

    const components: Component[] = [
      Stage,
      ...Object.entries(konvaNodeConstructors).map(([name, constructor]) =>
        KonvaNode(name, constructor),
      ),
    ];
    components.forEach((component) => {
      app.component(`${prefixToUse}${component.name}`, component);
    });
  },
};

export default VueKonva;
