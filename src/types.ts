import Konva from 'konva';

export const KONVA_NODES = [
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
] as const;

export type KonvaNodes =
  Konva.Arrow |
  Konva.Arc |
  Konva.Circle |
  Konva.Ellipse |
  Konva.FastLayer |
  Konva.Image |
  Konva.Label |
  Konva.Line |
  Konva.Path |
  Konva.Rect |
  Konva.RegularPolygon |
  Konva.Ring |
  Konva.Shape |
  Konva.Sprite |
  Konva.Stage |
  Konva.Star |
  Konva.Tag |
  Konva.Text |
  Konva.TextPath |
  Konva.Transformer |
  Konva.Wedge
