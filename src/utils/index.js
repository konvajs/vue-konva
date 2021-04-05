import updatePicture from './updatePicture';
import applyNodeProps from './applyNodeProps';

export const componentPrefix = 'v';
export const konvaNodeMarker = '_konvaNode';

export function copy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export function findParentKonva(instance) {
  function re(instance) {
    if (instance.__konvaNode) {
      return instance;
    }
    if (instance.$parent) {
      return re(instance.$parent);
    }
    return {};
  }
  return re(instance.$parent);
}

export function findKonvaNode(instance) {
  if (!instance) {
    return null;
  }
  if (!instance.component) {
    return null;
  }
  if (!instance.component.ctx) {
    return null;
  }
  return instance.component.ctx.__konvaNode;

  // if (instance.$options[konvaNodeMarker]) {
  //   return instance.getNode();
  // }
  // if (instance.$children.length === 0) {
  //   return null;
  // }
  // return findKonvaNode(instance.$children[0]);
}

export function checkOrder($, konvaNode) {
  let needRedraw = false;

  let children = [];

  if ($.subTree.children) {
    $.subTree.children.forEach((child) => {
      if (!child.component && Array.isArray(child.children)) {
        children.push(...child.children);
      }
      if (child.component) {
        children.push(child);
      }
    });
  }

  const nodes = [];
  children.forEach(($vnode) => {
    const konvaNode = findKonvaNode($vnode);
    if (konvaNode) {
      nodes.push(konvaNode);
    }

    const { elm, componentInstance } = $vnode;
    if (elm && elm.tagName && componentInstance && !konvaNode) {
      const name = elm && elm.tagName.toLowerCase();
      console.error(
        `vue-konva error: You are trying to render "${name}" inside your component tree. Looks like it is not a Konva node. You can render only Konva components inside the Stage.`
      );
    }
  });

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
