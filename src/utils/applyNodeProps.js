// adapted FROM: https://github.com/lavrton/react-konva/blob/master/src/react-konva-fiber.js

import updatePicture from './updatePicture';

const propsToSkip = { key: true, style: true, elm: true, isRootInsert: true };
const EVENTS_NAMESPACE = '.vue-konva-event';

export default function applyNodeProps(
  vueComponent,
  props = {},
  oldProps = {},
  useStrict
) {
  const instance = vueComponent.__konvaNode;
  var updatedProps = {};
  var hasUpdates = false;
  for (let key in oldProps) {
    if (propsToSkip[key]) {
      continue;
    }
    var isEvent = key.slice(0, 2) === 'on';
    var propChanged = oldProps[key] !== props[key];
    if (isEvent && propChanged) {
      var eventName = key.substr(2).toLowerCase();
      if (eventName.substr(0, 7) === 'content') {
        eventName =
          'content' +
          eventName.substr(7, 1).toUpperCase() +
          eventName.substr(8);
      }
      instance.off(eventName + EVENTS_NAMESPACE, oldProps[key]);
    }
    var toRemove = !props.hasOwnProperty(key);
    if (toRemove) {
      instance.setAttr(key, undefined);
    }
  }
  for (let key in props) {
    if (propsToSkip[key]) {
      continue;
    }
    let isEvent = key.slice(0, 2) === 'on';
    var toAdd = oldProps[key] !== props[key];
    if (isEvent && toAdd) {
      let eventName = key.substr(2).toLowerCase();
      if (eventName.substr(0, 7) === 'content') {
        eventName =
          'content' +
          eventName.substr(7, 1).toUpperCase() +
          eventName.substr(8);
      }
      if (props[key]) {
        instance.off(eventName + EVENTS_NAMESPACE);
        instance.on(eventName + EVENTS_NAMESPACE, props[key]);
      }
    }
    if (
      !isEvent &&
      (props[key] !== oldProps[key] ||
        (useStrict && props[key] !== instance.getAttr(key)))
    ) {
      hasUpdates = true;
      updatedProps[key] = props[key];
    }
  }

  if (hasUpdates) {
    instance.setAttrs(updatedProps);
    updatePicture(instance);
  }
}
