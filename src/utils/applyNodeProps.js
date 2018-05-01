// adapted FROM: https://github.com/lavrton/react-konva/blob/master/src/react-konva-fiber.js

import updatePicture from "./updatePicture";

export default function applyNodeProps(
  vueComponent,
  props = {},
  oldProps = {}
) {
  if ("id" in props) {
    const message = `VueKonva: You are using "id" attribute for Konva node. In some very rare cases it may produce bugs. Currently we recommend not to use it and use "name" attribute instead.`;
    console.warn(message);
  }
  const instance = vueComponent._stage;
  var updatedProps = {};
  var hasUpdates = false;
  for (let key in oldProps) {
    var isEvent = key.slice(0, 2) === "on";
    var propChanged = oldProps[key] !== props[key];
    if (isEvent && propChanged) {
      var eventName = key.substr(2).toLowerCase();
      if (eventName.substr(0, 7) === "content") {
        eventName =
          "content" +
          eventName.substr(7, 1).toUpperCase() +
          eventName.substr(8);
      }
      instance.off(eventName, oldProps[key]);
    }
    var toRemove = !props.hasOwnProperty(key);
    if (toRemove) {
      instance.setAttr(key, undefined);
    }
  }
  for (let key in props) {
    let isEvent = key.slice(0, 2) === "on";
    var toAdd = oldProps[key] !== props[key];
    if (isEvent && toAdd) {
      let eventName = key.substr(2).toLowerCase();
      if (eventName.substr(0, 7) === "content") {
        eventName =
          "content" +
          eventName.substr(7, 1).toUpperCase() +
          eventName.substr(8);
      }
      if (props[key]) {
        instance.off(eventName);
        instance.on(eventName, evt => {
          if (evt.target) {
            props[key](evt.target.VueComponent, evt);
          } else {
            props[key](evt.evt, evt);
          }
        });
      }
    }
    if (
      !isEvent &&
      (props[key] !== oldProps[key] || props[key] !== instance.getAttr(key))
    ) {
      hasUpdates = true;
      updatedProps[key] = props[key];
    }
  }

  if (hasUpdates) {
    instance.setAttrs(updatedProps);
    updatePicture(instance);
    var val, prop;
    for (prop in updatedProps) {
      val = updatedProps[prop];
      if (val instanceof window.Image && !val.complete) {
        var node = instance;
        val.addEventListener("load", function() {
          var layer = node.getLayer();
          layer && layer.batchDraw();
        });
      }
    }
  }
}
