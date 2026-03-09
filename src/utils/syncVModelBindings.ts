import type { ComponentInternalInstance } from 'vue';
import type { Node } from 'konva/lib/Node';

export const VMODEL_NAMESPACE = '.vue-konva-vmodel';
const UPDATE_PREFIX = 'onUpdate:';

export default function syncVModelBindings(
  konvaNode: Node,
  instance: ComponentInternalInstance,
) {
  konvaNode.off(VMODEL_NAMESPACE);
  const vnodeProps = instance.vnode.props || {};
  for (const key in vnodeProps) {
    if (key.startsWith(UPDATE_PREFIX)) {
      const propName = key.slice(UPDATE_PREFIX.length);
      const handler = vnodeProps[key];
      konvaNode.on(`${propName}Change${VMODEL_NAMESPACE}`, () => {
        handler(konvaNode.getAttr(propName));
      });
    }
  }
}
