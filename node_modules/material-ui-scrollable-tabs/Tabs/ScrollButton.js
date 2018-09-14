'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _EnhancedButton = require('material-ui/internal/EnhancedButton');

var _EnhancedButton2 = _interopRequireDefault(_EnhancedButton);

var _keyboardArrowLeft = require('material-ui/svg-icons/hardware/keyboard-arrow-left');

var _keyboardArrowLeft2 = _interopRequireDefault(_keyboardArrowLeft);

var _keyboardArrowRight = require('material-ui/svg-icons/hardware/keyboard-arrow-right');

var _keyboardArrowRight2 = _interopRequireDefault(_keyboardArrowRight);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getStyles = function getStyles(props, context) {
  var height = props.height;
  var tabs = context.muiTheme.tabs;


  return {
    root: {
      padding: 0,
      border: 0,
      verticalAlign: 'top',
      flex: '0 0 56px'
    },
    button: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: height
    },
    icon: {
      color: tabs.selectedTextColor,
      fontSize: 24
    }
  };
};

var ScrollButton = function (_Component) {
  (0, _inherits3.default)(ScrollButton, _Component);

  function ScrollButton() {
    (0, _classCallCheck3.default)(this, ScrollButton);
    return (0, _possibleConstructorReturn3.default)(this, (ScrollButton.__proto__ || (0, _getPrototypeOf2.default)(ScrollButton)).apply(this, arguments));
  }

  (0, _createClass3.default)(ScrollButton, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          direction = _props.direction,
          height = _props.height,
          onClick = _props.onClick,
          visible = _props.visible,
          other = (0, _objectWithoutProperties3.default)(_props, ['direction', 'height', 'onClick', 'visible']);


      var styles = getStyles(this.props, this.context, this.state);

      var rippleOpacity = 0.3;
      var rippleColor = this.context.muiTheme.tabs.selectedTextColor;
      if (visible) {
        return _react2.default.createElement(
          _EnhancedButton2.default,
          (0, _extends3.default)({}, other, {
            style: styles.root,
            focusRippleColor: rippleColor,
            touchRippleColor: rippleColor,
            focusRippleOpacity: rippleOpacity,
            touchRippleOpacity: rippleOpacity,
            onClick: onClick
          }),
          _react2.default.createElement(
            'div',
            {
              style: styles.button
            },
            direction === 'left' ? _react2.default.createElement(_keyboardArrowLeft2.default, {
              style: styles.icon
            }) : _react2.default.createElement(_keyboardArrowRight2.default, {
              style: styles.icon
            })
          )
        );
      } else {
        return _react2.default.createElement('div', { style: styles.root });
      }
    }
  }]);
  return ScrollButton;
}(_react.Component);

ScrollButton.defaultProps = {
  direction: 'left',
  height: '48px',
  visible: false
};
ScrollButton.contextTypes = {
  muiTheme: _propTypes2.default.object.isRequired
};
process.env.NODE_ENV !== "production" ? ScrollButton.propTypes = {
  /**
   * Which direction should the button indicate?
   */
  direction: _propTypes2.default.oneOf(['left', 'right']),
  /**
   * Sets the height of the scroll button; calculated by the Tabs component as the largest of all tab items
   */
  height: _propTypes2.default.string,
  /**
   * Callback to execute for button press
   */
  onClick: _propTypes2.default.func,
  /**
   * Should the button be present or just consume space
   */
  visible: _propTypes2.default.bool
} : void 0;
exports.default = ScrollButton;