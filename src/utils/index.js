import updatePicture from './updatePicture';
import capitalize from 'lodash/capitalize';

export const componentPrefix = 'v'

export function getName(componentTag) {
  return capitalize(componentTag.replace(componentPrefix + '-', ''));
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
  updatePicture
};
