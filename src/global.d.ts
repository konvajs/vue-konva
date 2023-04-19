import type Konva from 'konva';

declare global {
  interface Window {
    Konva: typeof Konva,
  }
}
