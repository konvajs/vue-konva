import updatePicture from './updatePicture';
import applyNodeProps from './applyNodeProps';

export const componentPrefix = 'v';
export const konvaNodeMarker = '_konvaNode'

export function copy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export function createListener(obj) {
  const output = {};
  Object.keys(obj).forEach(eventName => {
    output['on' + eventName] = obj[eventName];
  });
  return output;
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
  if (instance.$options[konvaNodeMarker]) {
    return instance.getNode();
  } else if (instance.$children.length === 0) {
    return null;
  } else {
    return findKonvaNode(instance.$children[0]);
  }
}

export { updatePicture, applyNodeProps };
