import type {
  VNode,
  VNodeChild,
  VNodeArrayChildren,
  VNodeNormalizedChildren,
  ComponentInternalInstance,
} from 'vue';
import type Konva from 'konva';

import updatePicture from './updatePicture';
import applyNodeProps from './applyNodeProps';

export const componentPrefix = 'v';

export function findParentKonva(instance: ComponentInternalInstance) {
  function re(instance: ComponentInternalInstance | null): ComponentInternalInstance | null {
    if (instance?.__konvaNode) {
      return instance;
    }
    if (instance?.parent) {
      return re(instance.parent);
    }
    console.error('vue-konva error: Can not find parent node');
    return null;
  }

  return re(instance.parent);
}

export function findKonvaNode(instance: VNode): Konva.Node | null {
  if (!instance.component) return null;

  return (
    instance.component.__konvaNode ||
    findKonvaNode(instance.component.subTree)
  );
}

function checkTagAndGetNode(instance: VNode): Konva.Node | null {
  const { el, component } = instance;
  const __konvaNode = findKonvaNode(instance);

  if (el?.tagName && component && !__konvaNode) {
    const name = el.tagName.toLowerCase();
    console.error(
      `vue-konva error: You are trying to render "${name}" inside your component tree. Looks like it is not a Konva node. You can render only Konva components inside the Stage.`,
    );
    return null;
  }

  return __konvaNode;
}

function getChildren(instance: VNode) {
  const isVNode = (value: VNodeChild | VNodeNormalizedChildren): value is VNode =>
    !!value?.hasOwnProperty('component');
  const isVNodeArrayChildren = (value: VNodeChild | VNodeNormalizedChildren): value is VNodeArrayChildren =>
    Array.isArray(value);

  const recursivelyFindChildren = (item: VNodeChild | VNodeNormalizedChildren): VNode[] => {
    if (isVNode(item)) return [item, ...recursivelyFindChildren(item.children)];
    if (isVNodeArrayChildren(item)) return item.flatMap(recursivelyFindChildren);
    return [];
  };
  return recursivelyFindChildren(instance.children);
}

export function checkOrder(subTree: VNode, konvaNode: Konva.Node) {
  const children = getChildren(subTree);

  const nodes: Konva.Node[] = [];
  children.forEach((child) => {
    const konvaNode = checkTagAndGetNode(child);
    if (konvaNode) {
      nodes.push(konvaNode);
    }
  });

  let needRedraw = false;
  nodes.forEach((konvaNode, index) => {
    if (konvaNode.getZIndex() !== index) {
      konvaNode.setZIndex(index);
      needRedraw = true;
    }
  });

  if (needRedraw) {
    updatePicture(konvaNode);
  }
}

export { updatePicture, applyNodeProps };
