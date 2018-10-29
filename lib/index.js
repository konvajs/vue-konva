"use strict";

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _Stage = require("./components/Stage");

var _Stage2 = _interopRequireDefault(_Stage);

var _KonvaNode = require("./components/KonvaNode");

var _KonvaNode2 = _interopRequireDefault(_KonvaNode);

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (typeof window !== "undefined" && !window.Konva) {
  require("konva");
}

var KONVA_NODES = ['Layer', 'FastLayer', 'Group', 'Label', 'Rect', 'Circle', 'Ellipse', 'Wedge', 'Line', 'Sprite', 'Image', 'Text', 'TextPath', 'Star', 'Ring', 'Arc', 'Tag', 'Path', 'RegularPolygon', 'Arrow', 'Shape', 'Transformer'];
var components = {
  Stage: _Stage2.default
};

KONVA_NODES.forEach(function (nodeName) {
  components[nodeName] = (0, _KonvaNode2.default)();
});

var VueKonva = _extends({}, components, {
  install: function install(Vue) {
    return Object.keys(components).forEach(function (k) {
      return Vue.component("" + _utils.componentPrefix + k, components[k]);
    });
  }
});

exports.default = VueKonva;


if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use(VueKonva);
}
module.exports = exports["default"];