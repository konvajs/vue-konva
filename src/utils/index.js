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

function checkTags({ el , component }) {
  if (el && el.tagName && component) {
    const name = el && el.tagName.toLowerCase();
    console.error(
      `vue-konva error: You are trying to render "${name}" inside your component tree. Looks like it is not a Konva node. You can render only Konva components inside the Stage.`
    );
    return false;
  }
  return true;
}

export function checkOrder(subTree, konvaNode) {
  let children = [];

  function getChildren(instance) {
    if (instance.children) {
      instance.children.forEach((child) => {
        const validTags = checkTags(child);
        if (validTags && !child.component && Array.isArray(child.children)) {
          children.push(...child.children.map((subChild) => findKonvaNode(subChild)));
        }
        if (validTags && child.component) {
          children.push(child.component?.__konvaNode);
        }
      });
    }
    if(instance.__konvaNode) { children.push(instance.__konvaNode); }
  }

  getChildren(subTree);

  let needRedraw = false;
  children.forEach((konvaNode, index) => {
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
