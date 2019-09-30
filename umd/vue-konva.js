/*!
 * vue-konva v2.0.10 - https://github.com/konvajs/vue-konva#readme
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
})(this, function(__WEBPACK_EXTERNAL_MODULE__0__, __WEBPACK_EXTERNAL_MODULE__2__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(3);


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__2__;

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external {"root":"Vue","commonjs2":"vue","commonjs":"vue","amd":"vue"}
var external_root_Vue_commonjs2_vue_commonjs_vue_amd_vue_ = __webpack_require__(0);
var external_root_Vue_commonjs2_vue_commonjs_vue_amd_vue_default = /*#__PURE__*/__webpack_require__.n(external_root_Vue_commonjs2_vue_commonjs_vue_amd_vue_);

// CONCATENATED MODULE: ./src/utils/updatePicture.js
// adapted FROM: https://github.com/lavrton/react-konva/blob/master/src/react-konva-fiber.js

function updatePicture(node) {
  var drawingNode = node.getLayer() || node.getStage();
  drawingNode && drawingNode.batchDraw();
}
// CONCATENATED MODULE: ./src/utils/applyNodeProps.js
// adapted FROM: https://github.com/lavrton/react-konva/blob/master/src/react-konva-fiber.js



var propsToSkip = { key: true, style: true, elm: true, isRootInsert: true };
var EVENTS_NAMESPACE = '.vue-konva-event';

function applyNodeProps(vueComponent) {
  var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var oldProps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var instance = vueComponent._konvaNode;
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
    updatePicture(instance);
  }
}
// CONCATENATED MODULE: ./src/utils/index.js



var componentPrefix = 'v';
var konvaNodeMarker = '_konvaNode';

function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (letter, index) {
    return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
  }).replace(/(\s|-)+/g, '');
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getName(componentTag) {
  return capitalizeFirstLetter(camelize(componentTag.replace(componentPrefix + '-', '')));
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
    if (instance._konvaNode) {
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
  if (instance.$options[konvaNodeMarker]) {
    return instance.getNode();
  } else if (instance.$children.length === 0) {
    return null;
  } else {
    return findKonvaNode(instance.$children[0]);
  }
}


// CONCATENATED MODULE: ./src/components/Stage.js
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };




/* harmony default export */ var Stage = (external_root_Vue_commonjs2_vue_commonjs_vue_amd_vue_default.a.component('v-stage', {
  render: function render(createElement) {
    return createElement('div', this.$slots.default);
  },
  watch: {
    config: {
      handler: function handler(val) {
        this.uploadKonva();
      },

      deep: true
    }
  },
  props: {
    config: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  },

  created: function created() {
    this._konvaNode = new window.Konva.Stage({
      width: this.config.width,
      height: this.config.height,
      // create fake container, later it will be replaced with real div on the page
      container: document.createElement('div')
    });
  },
  mounted: function mounted() {
    this.$el.innerHTML = '';
    this._konvaNode.container(this.$el);
    this.uploadKonva();
  },
  updated: function updated() {
    this.uploadKonva();
  },
  beforeDestroy: function beforeDestroy() {
    this._konvaNode.destroy();
  },

  methods: {
    getNode: function getNode() {
      return this._konvaNode;
    },
    getStage: function getStage() {
      return this._konvaNode;
    },
    uploadKonva: function uploadKonva() {
      var oldProps = this.oldProps || {};
      var props = _extends({}, this.$attrs, this.config, createListener(this.$listeners));
      applyNodeProps(this, props, oldProps);
      this.oldProps = props;
    }
  }
}));
// CONCATENATED MODULE: ./src/components/KonvaNode.js
var KonvaNode_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



var KonvaNode_EVENTS_NAMESPACE = '.vue-konva-event';

/* harmony default export */ var KonvaNode = (function () {
  var _ref;

  return _ref = {}, _ref[konvaNodeMarker] = true, _ref.render = function render(createElement) {
    return createElement('div', this.$slots.default);
  }, _ref.watch = {
    config: {
      handler: function handler(val) {
        this.uploadKonva();
      },

      deep: true
    }
  }, _ref.props = {
    config: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  }, _ref.created = function created() {
    this.name = this.$options._componentTag;
    this.initKonva();
  }, _ref.mounted = function mounted() {
    var parentVueInstance = findParentKonva(this);
    var parentKonvaNode = parentVueInstance._konvaNode;
    parentKonvaNode.add(this._konvaNode);
    updatePicture(this._konvaNode);
  }, _ref.updated = function updated() {
    this.uploadKonva();
    var needRedraw = false;
    // check indexes
    // somehow this.$children are not ordered correctly
    // so we have to dive-in into componentOptions of vnode
    // also componentOptions.children may have empty nodes, so we need to filter them first
    var children = this.$vnode.componentOptions.children && this.$vnode.componentOptions.children.filter(function (c) {
      return c.componentInstance;
    });

    children && children.forEach(function ($vnode, index) {
      // const vnode = component.$vnode;
      // const index = children.indexOf(vnode);
      var konvaNode = findKonvaNode($vnode.componentInstance);
      if (konvaNode.getZIndex() !== index) {
        konvaNode.setZIndex(index);
        needRedraw = true;
      }
    });
    if (needRedraw) {
      updatePicture(this._konvaNode);
    }
  }, _ref.destroyed = function destroyed() {
    updatePicture(this._konvaNode);
    this._konvaNode.destroy();
    this._konvaNode.off(KonvaNode_EVENTS_NAMESPACE);
  }, _ref.methods = {
    getNode: function getNode() {
      return this._konvaNode;
    },
    getStage: function getStage() {
      return this._konvaNode;
    },
    initKonva: function initKonva() {
      var tagName = this.name;
      var nameNode = getName(tagName);
      var NodeClass = window.Konva[nameNode];

      if (!NodeClass) {
        console.error('vue-konva error: Can not find node ' + nameNode);
        return;
      }

      this._konvaNode = new NodeClass();
      this._konvaNode.VueComponent = this;

      this.uploadKonva();
    },
    uploadKonva: function uploadKonva() {
      var oldProps = this.oldProps || {};
      var props = KonvaNode_extends({}, this.$attrs, this.config, createListener(this.$listeners));
      applyNodeProps(this, props, oldProps);
      this.oldProps = props;
    }
  }, _ref;
});
// CONCATENATED MODULE: ./src/index.js
var src_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };





if (typeof window !== 'undefined' && !window.Konva) {
  __webpack_require__(2);
}

var KONVA_NODES = ['Layer', 'FastLayer', 'Group', 'Label', 'Rect', 'Circle', 'Ellipse', 'Wedge', 'Line', 'Sprite', 'Image', 'Text', 'TextPath', 'Star', 'Ring', 'Arc', 'Tag', 'Path', 'RegularPolygon', 'Arrow', 'Shape', 'Transformer'];
var components = {
  Stage: Stage
};

KONVA_NODES.forEach(function (nodeName) {
  components[nodeName] = KonvaNode();
});

var VueKonva = src_extends({}, components, {
  install: function install(Vue) {
    return Object.keys(components).forEach(function (k) {
      Vue.component('' + componentPrefix + k, components[k]);
    });
  }
});

/* harmony default export */ var src = __webpack_exports__["default"] = (VueKonva);

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueKonva);
}

/***/ })
/******/ ])["default"];
});