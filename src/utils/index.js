import updatePicture from './updatePicture';
import applyNodeProps from './applyNodeProps';

export const componentPrefix = 'v';

export function copy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export function findParentKonva(instance) {
  function re(instance) {
    if (instance.__konvaNode) {
      return instance;
    }
    if (instance.parent) {
      return re(instance.parent);
    }
    console.error('vue-konva error: Can not find parent node');
    return {};
  }
  return re(instance.parent);
}

export function findKonvaNode(instance) {
  if (!instance?.component) { return null; }

  return instance?.component?.__konvaNode ||
    findKonvaNode(instance.component.subTree);
}

function checkTagAndGetNode(instance) {
  const { el , component } = instance;
  const __konvaNode = findKonvaNode(instance);

  if (el?.tagName && component && !__konvaNode) {
    const name = el && el.tagName.toLowerCase();
    console.error(
      `vue-konva error: You are trying to render "${name}" inside your component tree. Looks like it is not a Konva node. You can render only Konva components inside the Stage.`
    );
    return null;
  }

  return __konvaNode;
}

function getChildren(instance) {
  const collection = [];
  if (instance.children) {
    instance.children.forEach((child) => {
      if (!child.component && Array.isArray(child.children)) { collection.push(...child.children); }
      if (child.component) { collection.push(child); }
    });
  } 
  return collection;
}

export function checkOrder(subTree, konvaNode) {
  const children = getChildren(subTree);

  const nodes = [];
  children.forEach((child) => {
    const konvaNode = checkTagAndGetNode(child);
    if(konvaNode) { nodes.push(konvaNode); }
  });

  let needRedraw = false;
  nodes.forEach((konvaNode, index) => {
    if (konvaNode.getZIndex() !== index) {
      konvaNode.setZIndex(index);
      needRedraw = true;
    }
  });

  if (needRedraw) { updatePicture(konvaNode); }
}


export { updatePicture, applyNodeProps };
