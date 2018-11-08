'use strict';

exports.__esModule = true;
exports.applyNodeProps = exports.updatePicture = exports.componentPrefix = undefined;
exports.getName = getName;
exports.copy = copy;
exports.createListener = createListener;
exports.findParentKonva = findParentKonva;
exports.findKonvaNode = findKonvaNode;

var _updatePicture = require('./updatePicture');

var _updatePicture2 = _interopRequireDefault(_updatePicture);

var _applyNodeProps = require('./applyNodeProps');

var _applyNodeProps2 = _interopRequireDefault(_applyNodeProps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var componentPrefix = exports.componentPrefix = 'v';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getName(componentTag) {
  return capitalizeFirstLetter(componentTag.replace(componentPrefix + '-', ''));
}

function copy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function createListener(obj) {
  var output = {};
  Object.keys(obj).forEach(function (eventName) {
    output['on' + eventName] = obj[eventName];
  });
  return output;
}

function findParentKonva(instance) {
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

function findKonvaNode(instance) {
  if (instance.getNode) {
    return instance.getNode();
  } else if (instance.$children.length === 0) {
    return null;
  } else {
    return findKonvaNode(instance.$children[0]);
  }
}

exports.updatePicture = _updatePicture2.default;
exports.applyNodeProps = _applyNodeProps2.default;