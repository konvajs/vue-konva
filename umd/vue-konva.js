/*!
 * vue-konva v2.0.2 - https://github.com/konvajs/vue-konva#readme
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
})(window, function(__WEBPACK_EXTERNAL_MODULE__1__, __WEBPACK_EXTERNAL_MODULE__3__) {
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

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__1__;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(4);


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__3__;

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external {"root":"Vue","commonjs2":"vue","commonjs":"vue","amd":"vue"}
var external_root_Vue_commonjs2_vue_commonjs_vue_amd_vue_ = __webpack_require__(1);
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
    updatePicture(instance);
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
// CONCATENATED MODULE: ./src/utils/index.js



var componentPrefix = 'v';

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


// CONCATENATED MODULE: ./src/components/Stage.js
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var EventEmitter = __webpack_require__(0);

var Stage_StageEmitter = function (_EventEmitter) {
  _inherits(StageEmitter, _EventEmitter);

  function StageEmitter() {
    _classCallCheck(this, StageEmitter);

    return _possibleConstructorReturn(this, _EventEmitter.apply(this, arguments));
  }

  return StageEmitter;
}(EventEmitter);

var cacheConfig = {};

/* harmony default export */ var Stage = (external_root_Vue_commonjs2_vue_commonjs_vue_amd_vue_default.a.component('v-stage', {
  render: function render(createElement) {
    return createElement('div', [this.config, this.$slots.default]);
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
  data: function data() {
    return {
      _stage: {}
    };
  },
  created: function created() {
    this.StageEmitter = new Stage_StageEmitter();
    this.StageEmitter.setMaxListeners(0);
    this._stage = {};
  },
  mounted: function mounted() {
    this._stage = new window.Konva.Stage({
      width: this.config.width,
      height: this.config.height,
      container: this.$el
    });
    this.StageEmitter.emit('mounted', this._stage);
    this.uploadKonva();
  },
  updated: function updated() {
    this.uploadKonva();
  },
  beforeDestroy: function beforeDestroy() {
    this._stage.destroy();
  },

  methods: {
    getNode: function getNode() {
      return this._stage;
    },
    getStage: function getStage() {
      return this._stage;
    },
    uploadKonva: function uploadKonva() {
      var props = _extends({}, this.config, createListener(this.$listeners));
      applyNodeProps(this, props, cacheConfig);
      cacheConfig = props;
    }
  }
}));
// CONCATENATED MODULE: ./src/components/KonvaNode.js
var KonvaNode_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function KonvaNode_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function KonvaNode_possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function KonvaNode_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var KonvaNode_EventEmitter = __webpack_require__(0);

var KonvaNode_EVENTS_NAMESPACE = '.vue-konva-event';

/* harmony default export */ var KonvaNode = (function () {
  var StageEmitter = function (_EventEmitter) {
    KonvaNode_inherits(StageEmitter, _EventEmitter);

    function StageEmitter() {
      KonvaNode_classCallCheck(this, StageEmitter);

      return KonvaNode_possibleConstructorReturn(this, _EventEmitter.apply(this, arguments));
    }

    return StageEmitter;
  }(KonvaNode_EventEmitter);

  return {
    render: function render(createElement) {
      return createElement('div', [this.config, this.$slots.default]);
    },

    watch: {
      // $attrs: {
      //   handler(val) {
      //     this.uploadKonva();
      //   },
      //   deep: true
      // },
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
      this.StageEmitter = new StageEmitter();
      this.StageEmitter.setMaxListeners(0);
      this._stage = {};
      this._parentStage = {};
      this.name = this.$options._componentTag;
    },
    mounted: function mounted() {
      var _this2 = this;

      var parentKonva = findParentKonva(this);
      var _parentStage = parentKonva._stage;

      if (_parentStage && Object.keys(_parentStage).length) {
        this.initKonva(_parentStage);
      }
      parentKonva.StageEmitter.on('mounted', function (parentStage) {
        _this2.initKonva(parentStage);
      });
    },
    updated: function updated() {
      var _this3 = this;

      this.uploadKonva();
      // check indexes
      // somehow this.$children are not ordered correctly
      // so we have to dive-in into componentOptions of vnode
      var needRedraw = false;
      this.$children.forEach(function (component) {
        var vnode = component.$vnode;
        var index = _this3.$vnode.componentOptions.children.indexOf(vnode);
        var konvaNode = findKonvaNode(component);
        if (konvaNode.getZIndex() !== index) {
          konvaNode.setZIndex(index);
          needRedraw = true;
        }
      });
      if (needRedraw) {
        updatePicture(this._stage);
      }
    },
    destroyed: function destroyed() {
      updatePicture(this._stage);
      this._stage.destroy();
      this._stage.off(KonvaNode_EVENTS_NAMESPACE);
    },

    methods: {
      getNode: function getNode() {
        return this._stage;
      },
      getStage: function getStage() {
        return this._stage;
      },
      initKonva: function initKonva(parentStage) {
        var vm = this;
        var tagName = this.name;
        var nameNode = getName(tagName);
        var NodeClass = window.Konva[nameNode];

        if (!NodeClass) {
          console.error('vue-konva error: Can not find node ' + nameNode);
          return;
        }

        this._stage = new NodeClass();
        this._stage.VueComponent = this;
        var animationStage = this._stage.to.bind(this._stage);

        this._stage.to = function (newConfig) {
          animationStage(newConfig);
          setTimeout(function () {
            Object.keys(vm._stage.attrs).forEach(function (key) {
              if (typeof vm._stage.attrs[key] !== 'function') {
                vm.config[key] = vm._stage.attrs[key];
              }
            });
          }, 200);
        };

        this.uploadKonva();
        this.StageEmitter.emit('mounted', this._stage);
        // const index = this.$parent.$children.indexOf(this);
        parentStage.add(this._stage);
        // this._stage.setZIndex(index);
        updatePicture(parentStage);
      },
      uploadKonva: function uploadKonva() {
        var oldProps = this.oldProps || {};
        var props = KonvaNode_extends({}, this.$attrs, this.config, createListener(this.$listeners));
        applyNodeProps(this, props, oldProps);
        this.oldProps = props;
      }
    }
  };
});
// CONCATENATED MODULE: ./src/index.js
var src_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };





if (typeof window !== 'undefined' && !window.Konva) {
  __webpack_require__(3);
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