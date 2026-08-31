import type KonvaNode from './components/KonvaNode.js';
import type Stage from './components/Stage.js';

// `install()` registers every component as `${prefix}${name}`, so the tags that
// templates actually resolve carry the default `V` prefix. Components registered
// under a custom `prefix` option cannot be typed statically.
type KonvaNodeComponent = ReturnType<typeof KonvaNode>;

declare module 'vue' {
  export interface GlobalComponents {
    VStage: typeof Stage;
    VArc: KonvaNodeComponent;
    VArrow: KonvaNodeComponent;
    VCircle: KonvaNodeComponent;
    VEllipse: KonvaNodeComponent;
    VFastLayer: KonvaNodeComponent;
    VGroup: KonvaNodeComponent;
    VImage: KonvaNodeComponent;
    VLabel: KonvaNodeComponent;
    VLayer: KonvaNodeComponent;
    VLine: KonvaNodeComponent;
    VPath: KonvaNodeComponent;
    VRect: KonvaNodeComponent;
    VRegularPolygon: KonvaNodeComponent;
    VRing: KonvaNodeComponent;
    VShape: KonvaNodeComponent;
    VSprite: KonvaNodeComponent;
    VStar: KonvaNodeComponent;
    VTag: KonvaNodeComponent;
    VText: KonvaNodeComponent;
    VTextPath: KonvaNodeComponent;
    VTransformer: KonvaNodeComponent;
    VWedge: KonvaNodeComponent;
  }
}

export {};
