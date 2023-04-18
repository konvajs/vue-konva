import Konva from 'konva';

export const KONVA_NODES = [
  'Layer',
  'FastLayer',
  'Group',
  'Label',
  'Rect',
  'Circle',
  'Ellipse',
  'Wedge',
  'Line',
  'Sprite',
  'Image',
  'Text',
  'TextPath',
  'Star',
  'Ring',
  'Arc',
  'Tag',
  'Path',
  'RegularPolygon',
  'Arrow',
  'Shape',
  'Transformer',
] as const;

export type KonvaNodes =
  Konva.Stage |
  Konva.Label |
  Konva.Rect |
  Konva.Circle |
  Konva.Ellipse |
  Konva.Wedge |
  Konva.Line |
  Konva.Text |
  Konva.TextPath |
  Konva.Star |
  Konva.Ring |
  Konva.Arc |
  Konva.Tag |
  Konva.Path |
  Konva.RegularPolygon |
  Konva.Arrow |
  Konva.Transformer |
  Konva.Sprite |
  Konva.Image |
  Konva.Shape |
  Konva.FastLayer
