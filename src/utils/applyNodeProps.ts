// adapted FROM: https://github.com/lavrton/react-konva/blob/master/src/react-konva-fiber.js
import type { ComponentInternalInstance } from 'vue';
import updatePicture from './updatePicture';

const propsToSkip = { key: true, style: true, elm: true, isRootInsert: true };
const EVENTS_NAMESPACE = '.vue-konva-event';

export default function applyNodeProps(
  vueComponent: ComponentInternalInstance,
  props: Record<string, any>,
  oldProps: Record<string, any>,
  useStrict: boolean,
) {
  const instance = vueComponent.__konvaNode;
  const updatedProps: Record<string, any> = {};
  let hasUpdates = false;

  for (let key in oldProps) {
    if (propsToSkip.hasOwnProperty(key)) {
      continue;
    }
    const isEvent = key.slice(0, 2) === 'on';
    const propChanged = oldProps[key] !== props[key];
    if (isEvent && propChanged) {
      let eventName = key.slice(2).toLowerCase();
      if (eventName.slice(0, 7) === 'content') {
        eventName =
          'content' +
          eventName.slice(7, 1).toUpperCase() +
          eventName.slice(8);
      }
      instance?.off(eventName + EVENTS_NAMESPACE, oldProps[key]);
    }
    const toRemove = !props.hasOwnProperty(key);
    if (toRemove) {
      instance?.setAttr(key, undefined);
    }
  }

  for (let key in props) {
    if (propsToSkip.hasOwnProperty(key)) {
      continue;
    }
    let isEvent = key.slice(0, 2) === 'on';
    const toAdd = oldProps[key] !== props[key];
    if (isEvent && toAdd) {
      let eventName = key.slice(2).toLowerCase();
      if (eventName.slice(0, 7) === 'content') {
        eventName =
          'content' +
          eventName.slice(7, 1).toUpperCase() +
          eventName.slice(8);
      }
      if (props[key]) {
        instance?.off(eventName + EVENTS_NAMESPACE);
        instance?.on(eventName + EVENTS_NAMESPACE, props[key]);
      }
    }
    if (
      !isEvent &&
      (props[key] !== oldProps[key] ||
        (useStrict && props[key] !== instance?.getAttr(key)))
    ) {
      hasUpdates = true;
      updatedProps[key] = props[key];
    }
  }

  if (hasUpdates && instance) {
    instance.setAttrs(updatedProps);
    updatePicture(instance);
  }
}
