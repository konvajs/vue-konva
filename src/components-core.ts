import KonvaModule from 'konva/lib/Core';
import KonvaNode from './components/KonvaNode';

const Konva: any = (KonvaModule as any).default || KonvaModule;

// Lazy constructor wrapper: resolves Konva[name] at instantiation time.
// Users must import the shapes they need, e.g.: import 'konva/lib/shapes/Rect'
function lazyNode(name: string) {
  const LazyConstructor = function (...args: any[]) {
    const RealConstructor = Konva[name];
    if (!RealConstructor) {
      throw new Error(
        `vue-konva: ${name} is not available. Did you forget to import it?\n` +
          `Add: import 'konva/lib/shapes/${name}'`,
      );
    }
    return new RealConstructor(...args);
  } as any;
  return KonvaNode(name, LazyConstructor);
}

export const Arc = lazyNode('Arc');
export const Arrow = lazyNode('Arrow');
export const Circle = lazyNode('Circle');
export const Ellipse = lazyNode('Ellipse');
export const FastLayer = lazyNode('FastLayer');
export const Group = lazyNode('Group');
export const Image = lazyNode('Image');
export const Label = lazyNode('Label');
export const Layer = lazyNode('Layer');
export const Line = lazyNode('Line');
export const Path = lazyNode('Path');
export const Rect = lazyNode('Rect');
export const RegularPolygon = lazyNode('RegularPolygon');
export const Ring = lazyNode('Ring');
export const Shape = lazyNode('Shape');
export const Sprite = lazyNode('Sprite');
export const Star = lazyNode('Star');
export const Tag = lazyNode('Tag');
export const Text = lazyNode('Text');
export const TextPath = lazyNode('TextPath');
export const Transformer = lazyNode('Transformer');
export const Wedge = lazyNode('Wedge');
