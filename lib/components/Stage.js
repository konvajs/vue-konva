'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EventEmitter = require('events');

var StageEmitter = function (_EventEmitter) {
  _inherits(StageEmitter, _EventEmitter);

  function StageEmitter() {
    _classCallCheck(this, StageEmitter);

    return _possibleConstructorReturn(this, _EventEmitter.apply(this, arguments));
  }

  return StageEmitter;
}(EventEmitter);

var cacheConfig = {};

exports.default = _vue2.default.component('v-stage', {
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
  data: function data() {
    return {
      _stage: {}
    };
  },
  created: function created() {
    this.StageEmitter = new StageEmitter();
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
      var props = _extends({}, this.config, (0, _utils.createListener)(this.$listeners));
      (0, _utils.applyNodeProps)(this, props, cacheConfig);
      cacheConfig = props;
    }
  }
});
module.exports = exports['default'];