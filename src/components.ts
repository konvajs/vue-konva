import type { KonvaNodeConstructor } from './types';
import KonvaModule from 'konva';

const Konva = (KonvaModule as any).default || KonvaModule;

type KonvaComponents = Record<typeof componentNames[number], KonvaNodeConstructor>;

const componentNames = [
  'Arc',
  'Arrow',
  'Circle',
  'Ellipse',
  'FastLayer',
  'Group',
  'Image',
  'Label',
  'Layer',
  'Line',
  'Path',
  'Rect',
  'RegularPolygon',
  'Ring',
  'Shape',
  'Sprite',
  'Star',
  'Tag',
  'Text',
  'TextPath',
  'Transformer',
  'Wedge',
] as const

const konvaComponents = componentNames.reduce((acc, name) => {
  acc[name] = Konva[name];
  return acc;
}, {} as KonvaComponents);

export default konvaComponents