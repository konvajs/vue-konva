import updatePicture from './updatePicture';
import applyNodeProps from './applyNodeProps';

export const componentPrefix = 'v';

function camelize(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
      return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
    })
    .replace(/(\s|-)+/g, '');
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getName(componentTag) {
  return capitalizeFirstLetter(
    camelize(componentTag.replace(componentPrefix + '-', ''))
  );
}

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
    if (instance.StageEmitter) {
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
  if (instance.getNode) {
    return instance.getNode();
  } else if (instance.$children.length === 0) {
    return null;
  } else {
    return findKonvaNode(instance.$children[0]);
  }
}

export { updatePicture, applyNodeProps };
