import updatePicture from './updatePicture';
import applyNodeProps from './applyNodeProps';

export const componentPrefix = 'v';
export const konvaNodeMarker = '_konvaNode';

export function copy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export function findParentKonva(instance) {
  function re(instance) {
    if (instance._konvaNode) {
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
  if (instance.$options[konvaNodeMarker]) {
    return instance.getNode();
  }
  if (instance.$children.length === 0) {
    return null;
  }
  return findKonvaNode(instance.$children[0]);
}

export function checkOrder($vnode, konvaNode) {
  let needRedraw = false;
  // check indexes
  // somehow this.$children are not ordered correctly
  // so we have to dive-in into componentOptions of vnode
  // also componentOptions.children may have empty nodes, and other non Konva elements so we need to filter them first

  const children = $vnode.componentOptions.children || [];

  const nodes = [];
  children.forEach(($vnode) => {
    const konvaNode = findKonvaNode($vnode.componentInstance);
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
