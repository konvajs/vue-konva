"use strict";

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function () {
  var StageEmitter = function (_EventEmitter) {
    _inherits(StageEmitter, _EventEmitter);

    function StageEmitter() {
      _classCallCheck(this, StageEmitter);

      return _possibleConstructorReturn(this, _EventEmitter.apply(this, arguments));
    }

    return StageEmitter;
  }(EventEmitter);

  var cacheConfig = {};
  return {
    // template: '<div>{{this.config}}<slot></slot></div>',
    render: function render(createElement) {
      return createElement('div', [this.config, this.$slots.default]);
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

      var parentKonva = (0, _utils.findParentKonva)(this);
      var _parentStage = parentKonva._stage;

      if (_parentStage && Object.keys(_parentStage).length) {
        this.initKonva(_parentStage);
      }
      parentKonva.StageEmitter.on("mounted", function (parentStage) {
        _this2.initKonva(parentStage);
      });
    },
    updated: function updated() {
      // this._stage.moveToTop();
      this.uploadKonva();
    },
    destroyed: function destroyed() {
      this._stage.destroy();
    },

    methods: {
      getStage: function getStage() {
        return this._stage;
      },
      initKonva: function initKonva(parentStage) {
        var vm = this;
        var tagName = this.name;
        this._parentStage = this.parentStage;
        var nameNode = (0, _utils.getName)(tagName);
        var NodeClass = window.Konva[nameNode];

        this._stage = new NodeClass();
        this._stage.VueComponent = this;
        var animationStage = this._stage.to.bind(this._stage);

        this._stage.to = function (newConfig) {
          animationStage(newConfig);
          setTimeout(function () {
            Object.keys(vm._stage.attrs).forEach(function (key) {
              if (typeof vm._stage.attrs[key] !== "function") {
                vm.config[key] = vm._stage.attrs[key];
              }
            });
          }, 200);
        };

        this.uploadKonva();
        this.StageEmitter.emit("mounted", this._stage);
        parentStage.add(this._stage);
        (0, _utils.updatePicture)(parentStage);
      },
      uploadKonva: function uploadKonva() {
        var props = _extends({}, this.config, (0, _utils.createListener)(this.$listeners));
        (0, _utils.applyNodeProps)(this, props, cacheConfig);
        cacheConfig = props;
      }
    }
  };
};

var _utils = require("../utils");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EventEmitter = require("events");

module.exports = exports["default"];