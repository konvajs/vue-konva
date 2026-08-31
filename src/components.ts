import KonvaModule from 'konva';
import KonvaNode from './components/KonvaNode.js';

// hack for umd build
const Konva = (KonvaModule as any).default || KonvaModule;

export const Arc = KonvaNode('Arc', Konva.Arc);
export const Arrow = KonvaNode('Arrow', Konva.Arrow);
export const Circle = KonvaNode('Circle', Konva.Circle);
export const Ellipse = KonvaNode('Ellipse', Konva.Ellipse);
export const FastLayer = KonvaNode('FastLayer', Konva.FastLayer);
export const Group = KonvaNode('Group', Konva.Group);
export const Image = KonvaNode('Image', Konva.Image);
export const Label = KonvaNode('Label', Konva.Label);
export const Layer = KonvaNode('Layer', Konva.Layer);
export const Line = KonvaNode('Line', Konva.Line);
export const Path = KonvaNode('Path', Konva.Path);
export const Rect = KonvaNode('Rect', Konva.Rect);
export const RegularPolygon = KonvaNode('RegularPolygon', Konva.RegularPolygon);
export const Ring = KonvaNode('Ring', Konva.Ring);
export const Shape = KonvaNode('Shape', Konva.Shape);
export const Sprite = KonvaNode('Sprite', Konva.Sprite);
export const Star = KonvaNode('Star', Konva.Star);
export const Tag = KonvaNode('Tag', Konva.Tag);
export const Text = KonvaNode('Text', Konva.Text);
export const TextPath = KonvaNode('TextPath', Konva.TextPath);
export const Transformer = KonvaNode('Transformer', Konva.Transformer);
export const Wedge = KonvaNode('Wedge', Konva.Wedge);
