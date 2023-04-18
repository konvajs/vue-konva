import { ComponentInternalInstance, VNode } from 'vue';
import type Konva from 'konva';
import updatePicture from './updatePicture';
import applyNodeProps from './applyNodeProps';

export const componentPrefix = 'v';

export function copy(obj: object) {
  return JSON.parse(JSON.stringify(obj));
}

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

export function findKonvaNode(instance: VNode): null | Konva.Node {
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
    const name = el && el.tagName.toLowerCase();
    console.error(
      `vue-konva error: You are trying to render "${name}" inside your component tree. Looks like it is not a Konva node. You can render only Konva components inside the Stage.`,
    );
    return null;
  }

  return __konvaNode;
}

// const isVNode = (checkMe: VNode | any): checkMe is VNode => checkMe.hasOwnProperty('component');
// const hasChildren = (checkMe: { children: VNodeArrayChildren } | any): checkMe is {
//   children: VNodeArrayChildren
// } => checkMe.hasOwnProperty('children') && Array.isArray(checkMe.children);


function getChildren(instance: VNode) {
  const collection: VNode[] = [];

  if (instance.children) {
    // @ts-ignore
    instance.children.forEach((child) => {
      // TODO: simplify deep nesting with recursion
      if (!child.component && Array.isArray(child.children)) {
        // @ts-ignore
        child.children.forEach((subChild) => {
          if (!subChild.component && Array.isArray(subChild.children)) {
            collection.push(...subChild.children);
          } else {
            collection.push(subChild);
          }
        });
      }
      if (child.component) {
        collection.push(child);
      }
    });
  }
  return collection;
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
