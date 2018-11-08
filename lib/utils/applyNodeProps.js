'use strict';

exports.__esModule = true;
exports.default = applyNodeProps;

var _updatePicture = require('./updatePicture');

var _updatePicture2 = _interopRequireDefault(_updatePicture);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propsToSkip = { key: true, style: true, elm: true, isRootInsert: true }; // adapted FROM: https://github.com/lavrton/react-konva/blob/master/src/react-konva-fiber.js

var EVENTS_NAMESPACE = '.vue-konva-event';

function applyNodeProps(vueComponent) {
  var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var oldProps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if ('id' in props) {
    var message = 'VueKonva: You are using "id" attribute for Konva node. In some very rare cases it may produce bugs. Currently we recommend not to use it and use "name" attribute instead.';
    console.warn(message);
  }
  var instance = vueComponent._stage;
  var updatedProps = {};
  var hasUpdates = false;
  for (var key in oldProps) {
    if (propsToSkip[key]) {
      continue;
    }
    var isEvent = key.slice(0, 2) === 'on';
    var propChanged = oldProps[key] !== props[key];
    if (isEvent && propChanged) {
      var eventName = key.substr(2).toLowerCase();
      if (eventName.substr(0, 7) === 'content') {
        eventName = 'content' + eventName.substr(7, 1).toUpperCase() + eventName.substr(8);
      }
      instance.off(eventName + EVENTS_NAMESPACE, oldProps[key]);
    }
    var toRemove = !props.hasOwnProperty(key);
    if (toRemove) {
      instance.setAttr(key, undefined);
    }
  }
  for (var _key in props) {
    if (propsToSkip[_key]) {
      continue;
    }
    var _isEvent = _key.slice(0, 2) === 'on';
    var toAdd = oldProps[_key] !== props[_key];
    if (_isEvent && toAdd) {
      var _eventName = _key.substr(2).toLowerCase();
      if (_eventName.substr(0, 7) === 'content') {
        _eventName = 'content' + _eventName.substr(7, 1).toUpperCase() + _eventName.substr(8);
      }
      if (props[_key]) {
        instance.off(_eventName + EVENTS_NAMESPACE);
        instance.on(_eventName + EVENTS_NAMESPACE, props[_key]);
      }
    }
    if (!_isEvent && props[_key] !== oldProps[_key]) {
      hasUpdates = true;
      updatedProps[_key] = props[_key];
    }
  }

  if (hasUpdates) {
    instance.setAttrs(updatedProps);
    (0, _updatePicture2.default)(instance);
    // var val, prop;
    // for (prop in updatedProps) {
    //   val = updatedProps[prop];
    //   if (val instanceof window.Image && !val.complete) {
    //     var node = instance;
    //     val.addEventListener('load', function() {
    //       var layer = node.getLayer();
    //       layer && layer.batchDraw();
    //     });
    //   }
    // }
  }
}
module.exports = exports['default'];