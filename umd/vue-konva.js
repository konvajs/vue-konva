/*!
 * vue-konva v3.0.1 - https://github.com/konvajs/vue-konva#readme
 * MIT Licensed
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vue"), require("konva"));
	else if(typeof define === 'function' && define.amd)
		define(["vue", "konva"], factory);
	else if(typeof exports === 'object')
		exports["VueKonva"] = factory(require("vue"), require("konva"));
	else
		root["VueKonva"] = factory(root["Vue"], root["Konva"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE__0__, __WEBPACK_EXTERNAL_MODULE__1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__0__;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__1__;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(3);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external {"root":"Vue","commonjs2":"vue","commonjs":"vue","amd":"vue"}
var external_root_Vue_commonjs2_vue_commonjs_vue_amd_vue_ = __webpack_require__(0);

// EXTERNAL MODULE: external {"root":"Konva","commonjs2":"konva","commonjs":"konva","amd":"konva"}
var external_root_Konva_commonjs2_konva_commonjs_konva_amd_konva_ = __webpack_require__(1);
var external_root_Konva_commonjs2_konva_commonjs_konva_amd_konva_default = /*#__PURE__*/__webpack_require__.n(external_root_Konva_commonjs2_konva_commonjs_konva_amd_konva_);

// CONCATENATED MODULE: ./src/utils/updatePicture.js
// adapted FROM: https://github.com/lavrton/react-konva/blob/master/src/react-konva-fiber.js

function updatePicture(node) {
  if (!external_root_Konva_commonjs2_konva_commonjs_konva_amd_konva_default.a.autoDrawEnabled) {
    var drawingNode = node.getLayer() || node.getStage();
    drawingNode && drawingNode.batchDraw();
  }
}
// CONCATENATED MODULE: ./src/utils/applyNodeProps.js
// adapted FROM: https://github.com/lavrton/react-konva/blob/master/src/react-konva-fiber.js

var propsToSkip = {
  key: true,
  style: true,
  elm: true,
  isRootInsert: true
};
var EVENTS_NAMESPACE = '.vue-konva-event';
function applyNodeProps(vueComponent, props, oldProps, useStrict) {
  if (props === void 0) {
    props = {};
  }

  if (oldProps === void 0) {
    oldProps = {};
  }

  var instance = vueComponent.__konvaNode;
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

    if (!_isEvent && (props[_key] !== oldProps[_key] || useStrict && props[_key] !== instance.getAttr(_key))) {
      hasUpdates = true;
      updatedProps[_key] = props[_key];
    }
  }

  if (hasUpdates) {
    instance.setAttrs(updatedProps);
    updatePicture(instance);
  }
}
// CONCATENATED MODULE: ./src/utils/index.js


var componentPrefix = 'v';
function copy(obj) {
  return JSON.parse(JSON.stringify(obj));
}
function findParentKonva(instance) {
  function re(instance) {
    if (instance.__konvaNode) {
      return instance;
    }

    if (instance.parent) {
      return re(instance.parent);
    }

    console.error('vue-konva error: Can not find parent node');
    return {};
  }

  return re(instance.parent);
}
function findKonvaNode(instance) {
  if (instance === null || instance === void 0 ? void 0 : instance.component) {
    return instance.component.__konvaNode || findKonvaNode(instance.component.subTree);
  }
}

function checkTagAndGetNode(instance) {
  var el = instance.el,
      component = instance.component;

  var __konvaNode = findKonvaNode(instance);

  if ((el === null || el === void 0 ? void 0 : el.tagName) && component && !__konvaNode) {
    var name = el && el.tagName.toLowerCase();
    console.error("vue-konva error: You are trying to render \"" + name + "\" inside your component tree. Looks like it is not a Konva node. You can render only Konva components inside the Stage.");
    return null;
  }

  return __konvaNode;
}

function getChildren(instance) {
  var collection = [];

  if (instance.children) {
    instance.children.forEach(function (child) {
      // TODO: simplify deep nesting with recursion
      if (!child.component && Array.isArray(child.children)) {
        child.children.forEach(function (subChild) {
          if (!subChild.component && Array.isArray(subChild.children)) {
            collection.push.apply(collection, subChild.children);
          } else {
            collection.push(subChild);
          }
        });
      }

      if (child.component) {
        collection.push(child);
      }
    });
  }

  return collection;
}

function checkOrder(subTree, konvaNode) {
  var children = getChildren(subTree);
  var nodes = [];
  children.forEach(function (child) {
    var konvaNode = checkTagAndGetNode(child);

    if (konvaNode) {
      nodes.push(konvaNode);
    }
  });
  var needRedraw = false;
  nodes.forEach(function (konvaNode, index) {
    if (konvaNode.getZIndex() !== index) {
      konvaNode.setZIndex(index);
      needRedraw = true;
    }
  });

  if (needRedraw) {
    updatePicture(konvaNode);
  }
}

// CONCATENATED MODULE: ./src/components/Stage.js
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }



/* harmony default export */ var Stage = ({
  props: {
    config: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    __useStrictMode: {
      type: Boolean
    }
  },
  inheritAttrs: false,
  setup: function setup(props, _ref) {
    var attrs = _ref.attrs,
        slots = _ref.slots,
        expose = _ref.expose,
        emits = _ref.emits;
    var instance = Object(external_root_Vue_commonjs2_vue_commonjs_vue_amd_vue_["getCurrentInstance"])();
    var oldProps = Object(external_root_Vue_commonjs2_vue_commonjs_vue_amd_vue_["reactive"])({});
    var container = Object(external_root_Vue_commonjs2_vue_commonjs_vue_amd_vue_["ref"])(null);

    var __konvaNode = new window.Konva.Stage({
      width: props.config.width,
      height: props.config.height,
      container: document.createElement('div') // Fake container. Will be replaced

    });

    instance.__konvaNode = __konvaNode; // Save on component instance

    uploadKonva();

    function getNode() {
      return instance.__konvaNode;
    }

    function getStage() {
      return instance.__konvaNode;
    }

    function uploadKonva() {
      var existingProps = oldProps || {};

      var newProps = _extends({}, attrs, props.config);

      applyNodeProps(instance, newProps, existingProps, props.__useStrictMode);
      Object.assign(oldProps, newProps);
    }

    function validateChildren() {
      return null;
    }

    Object(external_root_Vue_commonjs2_vue_commonjs_vue_amd_vue_["onMounted"])(function () {
      container.value.innerHTML = '';

      __konvaNode.container(container.value);

      uploadKonva();
      validateChildren();
    });
    Object(external_root_Vue_commonjs2_vue_commonjs_vue_amd_vue_["onUpdated"])(function () {
      uploadKonva();
      checkOrder(instance.subTree, __konvaNode);
    });
    Object(external_root_Vue_commonjs2_vue_commonjs_vue_amd_vue_["onBeforeUnmount"])(function () {
      __konvaNode.destroy();
    });
    Object(external_root_Vue_commonjs2_vue_commonjs_vue_amd_vue_["watch"])(function () {
      return props.config;
    }, uploadKonva, {
      deep: true
    });
    expose({
      getStage: getStage,
      getNode: getNode
    }); // Loop order test appears to be problem with an empty v-for on layer objects
    //     - When the second item is added to the list we get a Vue internals bug.
    //     - Possibly related to https://github.com/vuejs/vue-next/issues/2715

    return function () {
      var _slots$default;

      return Object(external_root_Vue_commonjs2_vue_commonjs_vue_amd_vue_["h"])('div', {
        ref: container
      }, (_slots$default = slots.default) === null || _slots$default === void 0 ? void 0 : _slots$default.call(slots));
    };
  }
});
// CONCATENATED MODULE: ./src/components/KonvaNode.js
function KonvaNode_extends() { KonvaNode_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return KonvaNode_extends.apply(this, arguments); }



var KonvaNode_EVENTS_NAMESPACE = '.vue-konva-event';
var CONTAINERS = {
  Group: true,
  Layer: true,
  FastLayer: true,
  Label: true
};
/* harmony default export */ var KonvaNode = (function (nameNode) {
  return {
    props: {
      config: {
        type: Object,
        default: function _default() {
          return {};
        }
      },
      __useStrictMode: {
        type: Boolean
      }
    },
    setup: function setup(props, _ref) {
      var attrs = _ref.attrs,
          slots = _ref.slots,
          expose = _ref.expose;
      var instance = Object(external_root_Vue_commonjs2_vue_commonjs_vue_amd_vue_["getCurrentInstance"])();
      var oldProps = Object(external_root_Vue_commonjs2_vue_commonjs_vue_amd_vue_["reactive"])({});
      var NodeClass = window.Konva[nameNode];

      if (!NodeClass) {
        console.error('vue-konva error: Can not find node ' + nameNode);
        return;
      }

      var __konvaNode = new NodeClass();

      instance.__konvaNode = __konvaNode;
      instance.vnode.__konvaNode = __konvaNode;
      uploadKonva();

      function getNode() {
        return instance.__konvaNode;
      }

      function getStage() {
        return instance.__konvaNode;
      }

      function uploadKonva() {
        var events = {};

        for (var key in instance.vnode.props) {
          if (key.slice(0, 2) === 'on') {
            events[key] = instance.vnode.props[key];
          }
        }

        var existingProps = oldProps || {};

        var newProps = KonvaNode_extends({}, attrs, props.config, events);

        applyNodeProps(instance, newProps, existingProps, props.__useStrictMode);
        Object.assign(oldProps, newProps);
      }

      Object(external_root_Vue_commonjs2_vue_commonjs_vue_amd_vue_["onMounted"])(function () {
        var parentKonvaNode = findParentKonva(instance).__konvaNode;

        parentKonvaNode.add(__konvaNode);
        updatePicture(__konvaNode);
      });
      Object(external_root_Vue_commonjs2_vue_commonjs_vue_amd_vue_["onUnmounted"])(function () {
        updatePicture(__konvaNode);

        __konvaNode.destroy();

        __konvaNode.off(KonvaNode_EVENTS_NAMESPACE);
      });
      Object(external_root_Vue_commonjs2_vue_commonjs_vue_amd_vue_["onUpdated"])(function () {
        uploadKonva();
        checkOrder(instance.subTree, __konvaNode);
      });
      Object(external_root_Vue_commonjs2_vue_commonjs_vue_amd_vue_["watch"])(function () {
        return props.config;
      }, uploadKonva, {
        deep: true
      });
      expose({
        getStage: getStage,
        getNode: getNode
      });
      var isContainer = CONTAINERS[nameNode];
      return isContainer ? function () {
        var _slots$default;

        return Object(external_root_Vue_commonjs2_vue_commonjs_vue_amd_vue_["h"])('template', {}, (_slots$default = slots.default) === null || _slots$default === void 0 ? void 0 : _slots$default.call(slots));
      } : function () {
        return null;
      };
    }
  };
});
// CONCATENATED MODULE: ./src/index.js




if (typeof window !== 'undefined' && !window.Konva) {
  __webpack_require__(1);
}

var KONVA_NODES = ['Layer', 'FastLayer', 'Group', 'Label', 'Rect', 'Circle', 'Ellipse', 'Wedge', 'Line', 'Sprite', 'Image', 'Text', 'TextPath', 'Star', 'Ring', 'Arc', 'Tag', 'Path', 'RegularPolygon', 'Arrow', 'Shape', 'Transformer'];
var components = [{
  name: 'Stage',
  component: Stage
}].concat(KONVA_NODES.map(function (name) {
  return {
    name: name,
    component: KonvaNode(name)
  };
}));
var VueKonva = {
  install: function install(app, options) {
    var prefixToUse = componentPrefix;

    if (options && options.prefix) {
      prefixToUse = options.prefix;
    }

    components.forEach(function (k) {
      app.component("" + prefixToUse + k.name, k.component);
    });
  }
};
/* harmony default export */ var src = __webpack_exports__["default"] = (VueKonva);

/***/ })
/******/ ])["default"];
});