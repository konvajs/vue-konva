import updatePicture from './updatePicture';
import applyNodeProps from './applyNodeProps';
import camelCase from 'lodash/camelCase';

export const componentPrefix = 'v'

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getName(componentTag) {
  return capitalizeFirstLetter(camelCase(componentTag.replace(componentPrefix + '-', '')));
}

export function copy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export function createListener(obj) {
  const output = {};
  Object.keys(obj).forEach((eventName) => {
    output['on' + eventName] = obj[eventName];
  })
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

export {
  updatePicture,
  applyNodeProps
};
