import type { App, Component } from 'vue';
import Stage from './components/Stage';
import { componentPrefix } from './utils';
import Konva from 'konva';
import { Node } from 'konva/lib/Node';
import KonvaNode from './components/KonvaNode';
import { KonvaNodeConstructor } from './utils/types';

if (typeof window !== 'undefined' && !window.Konva) {
  require('konva');
}


const VueKonva = {
  install: (app: App, options?: { prefix?: string; customNodes?: KonvaNodeConstructor[] }) => {
    const prefixToUse = options?.prefix || componentPrefix;

    const konvaNodeConstructors: KonvaNodeConstructor[] = [
      Konva.Arrow,
      Konva.Arc,
      Konva.Circle,
      Konva.Ellipse,
      Konva.FastLayer,
      Konva.Image,
      Konva.Label,
      Konva.Line,
      Konva.Path,
      Konva.Rect,
      Konva.RegularPolygon,
      Konva.Ring,
      Konva.Shape,
      Konva.Sprite,
      Konva.Stage,
      Konva.Star,
      Konva.Tag,
      Konva.Text,
      Konva.TextPath,
      Konva.Transformer,
      Konva.Wedge,
      ...(options?.customNodes || []),
    ];

    const components: Component[] = [
      Stage,
      ...konvaNodeConstructors.map((konvaNodeConstructor) =>
        KonvaNode(konvaNodeConstructor.name, konvaNodeConstructor),
      ),
    ];
    components.forEach((component) => {
      app.component(`${prefixToUse}${component.name}`, component);
    });
  },
};

export default VueKonva;
