import './augmentations.js';
import './global-components.js';
import Stage from './components/Stage.js';
import { createInstall } from './install.js';
import { useImage } from './use-image.js';
import * as konvaComponents from './components.js';

export { useImage, Stage };
export type { KonvaNodeConstructor, VueKonvaRef } from './types.js';
export type { VueKonvaOptions } from './install.js';
export * from './components.js';

const VueKonva = createInstall(konvaComponents);

// Exposing `install` as a named export makes the module namespace itself a
// valid Vue plugin, which is what the UMD global resolves to.
export const install = VueKonva.install;

export default VueKonva;
