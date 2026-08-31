import './augmentations.js';
import Stage from './components/Stage.js';
import { createInstall } from './install.js';
import { useImage } from './use-image.js';
import * as konvaComponents from './components-core.js';

export { useImage, Stage };
export type { KonvaNodeConstructor, VueKonvaRef } from './types.js';
export type { VueKonvaOptions } from './install.js';
export * from './components-core.js';

// The UMD global resolves to this module's namespace, so `install` must be a
// named export for `app.use(VueKonva)` to work after a CDN script tag.
export const install = createInstall(konvaComponents);

export default { install };
