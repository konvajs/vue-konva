import updatePicture from './updatePicture';
import applyNodeProps from './applyNodeProps';
import capitalize from 'lodash/capitalize';

export const componentPrefix = 'v'

export function getName(componentTag) {
  return capitalize(componentTag.replace(componentPrefix + '-', ''));
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

export function findStage(instance) {
  function re(instance) {
    if (instance.StageEmitter) {
      return instance.StageEmitter;
    }
    if (instance.$parent) {
      return re(instance.$parent);
    }
    return null;
  }
  return re(instance.$parent);
}

export {
  updatePicture,
  applyNodeProps
};
