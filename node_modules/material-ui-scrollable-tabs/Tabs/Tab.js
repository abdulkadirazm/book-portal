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

var _simpleAssign = require('simple-assign');

var _simpleAssign2 = _interopRequireDefault(_simpleAssign);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _EnhancedButton = require('material-ui/internal/EnhancedButton');

var _EnhancedButton2 = _interopRequireDefault(_EnhancedButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getStyles(props, context) {
  var icon = props.icon,
      isLargeView = props.isLargeView,
      isMultiLine = props.isMultiLine,
      height = props.height,
      width = props.width;
  var tabs = context.muiTheme.tabs;


  return {
    root: {
      color: props.selected ? tabs.selectedTextColor : tabs.textColor,
      minWidth: isLargeView ? '160px' : '72px',
      maxWidth: '264px',
      width: width,
      padding: 0,
      border: 0,
      verticalAlign: 'top'
    },
    button: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      paddingLeft: isLargeView ? '24px' : '12px',
      paddingRight: isLargeView ? '24px' : '12px',
      height: height
    },
    label: {
      textOverflow: 'ellipsis',
      textTransform: 'uppercase',
      whiteSpace: 'normal',
      fontWeight: 500,
      fontSize: isMultiLine && !icon ? '12px' : '14px',
      overflow: 'hidden',
      display: '-webkit-box',
      WebkitLineClamp: isMultiLine && !icon ? 2 : 1,
      WebkitBoxOrient: 'vertical'
    }
  };
}

var Tab = function (_Component) {
  (0, _inherits3.default)(Tab, _Component);

  function Tab() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Tab);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Tab.__proto__ || (0, _getPrototypeOf2.default)(Tab)).call.apply(_ref, [this].concat(args))), _this), _this.getMeasurements = function () {
      if (_this.buttonComponent.button instanceof Element) {
        var boundingClientRect = _this.buttonComponent.button.getBoundingClientRect();
        return {
          top: boundingClientRect.top,
          bottom: boundingClientRect.bottom,
          left: boundingClientRect.left,
          right: boundingClientRect.right,
          height: boundingClientRect.height,
          width: boundingClientRect.width
        };
      } else return {};
    }, _this.handleClick = function (event) {
      if (_this.props.onClick) {
        _this.onClickTarget = event.currentTarget;
        _this.props.onClick(_this);
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Tab, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          icon = _props.icon,
          index = _props.index,
          onActive = _props.onActive,
          onClick = _props.onClick,
          selected = _props.selected,
          label = _props.label,
          buttonStyle = _props.buttonStyle,
          isLargeView = _props.isLargeView,
          isMultiLine = _props.isMultiLine,
          style = _props.style,
          height = _props.height,
          width = _props.width,
          other = (0, _objectWithoutProperties3.default)(_props, ['icon', 'index', 'onActive', 'onClick', 'selected', 'label', 'buttonStyle', 'isLargeView', 'isMultiLine', 'style', 'height', 'width']);


      var styles = getStyles(this.props, this.context);

      var iconElement = void 0;
      if (icon && _react2.default.isValidElement(icon)) {
        var iconProps = {
          style: {
            fontSize: 24,
            color: styles.root.color,
            paddingBottom: label ? '10px' : '0px',
            flexShrink: 0
          }
        };
        // If it's svg icon set color via props
        if (icon.type.muiName !== 'FontIcon') {
          iconProps.color = styles.root.color;
        }
        iconElement = _react2.default.cloneElement(icon, iconProps);
      }

      var rippleOpacity = 0.3;
      var rippleColor = this.context.muiTheme.tabs.selectedTextColor;

      return _react2.default.createElement(
        _EnhancedButton2.default,
        (0, _extends3.default)({}, other, {
          style: (0, _simpleAssign2.default)(styles.root, style),
          focusRippleColor: rippleColor,
          touchRippleColor: rippleColor,
          focusRippleOpacity: rippleOpacity,
          touchRippleOpacity: rippleOpacity,
          onClick: this.handleClick,
          ref: function ref(buttonComponent) {
            _this2.buttonComponent = buttonComponent;
          }
        }),
        _react2.default.createElement(
          'div',
          { style: (0, _simpleAssign2.default)(styles.button, buttonStyle) },
          iconElement,
          label ? _react2.default.createElement(
            'span',
            { style: styles.label },
            label
          ) : null
        )
      );
    }
  }]);
  return Tab;
}(_react.Component);

Tab.muiName = 'Tab';
Tab.defaultProps = {
  isLargeView: false,
  isMultiLine: false
};
Tab.contextTypes = {
  muiTheme: _propTypes2.default.object.isRequired
};
process.env.NODE_ENV !== "production" ? Tab.propTypes = {
  /**
   * Override the inline-styles of the button element.
   */
  buttonStyle: _propTypes2.default.object,
  /**
   * The css class name of the root element.
   */
  className: _propTypes2.default.string,
  /**
   * @ignore
   */
  height: _propTypes2.default.string,
  /**
   * Sets the icon of the tab, you can pass `FontIcon` or `SvgIcon` elements.
   */
  icon: _propTypes2.default.node,
  /**
   * @ignore
   */
  index: _propTypes2.default.any,
  /**
   * @ignore
   */
  isLargeView: _propTypes2.default.bool,
  /**
   * Indicates that the tab should render with the mutliple lines of text styling.
   */
  isMultiLine: _propTypes2.default.bool,
  /**
   * Sets the text value of the tab item to the string specified.
   */
  label: _propTypes2.default.node,
  /**
   * Fired when the active tab changes by touch or tap.
   * Use this event to specify any functionality when an active tab changes.
   * For example - we are using this to route to home when the third tab becomes active.
   * This function will always recieve the active tab as it\'s first argument.
   */
  onActive: _propTypes2.default.func,
  /**
   * @ignore
   * This property is overriden by the Tabs component.
   */
  onClick: _propTypes2.default.func,
  /**
   * @ignore
   * Defines if the current tab is selected or not.
   * The Tabs component is responsible for setting this property.
   */
  selected: _propTypes2.default.bool,
  /**
   * Override the inline-styles of the root element.
   */
  style: _propTypes2.default.object,
  /**
   * @ignore
   * This property is overriden by the Tabs component.
   */
  width: _propTypes2.default.string
} : void 0;
exports.default = Tab;