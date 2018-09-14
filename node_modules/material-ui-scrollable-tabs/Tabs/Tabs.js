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

var _reactEventListener = require('react-event-listener');

var _reactEventListener2 = _interopRequireDefault(_reactEventListener);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _scroll = require('scroll');

var _scroll2 = _interopRequireDefault(_scroll);

var _reactScrollbarSize = require('react-scrollbar-size');

var _reactScrollbarSize2 = _interopRequireDefault(_reactScrollbarSize);

var _withWidth = require('material-ui/utils/withWidth');

var _withWidth2 = _interopRequireDefault(_withWidth);

var _TabTemplate = require('./TabTemplate');

var _TabTemplate2 = _interopRequireDefault(_TabTemplate);

var _InkBar = require('./InkBar');

var _InkBar2 = _interopRequireDefault(_InkBar);

var _ScrollButton = require('./ScrollButton');

var _ScrollButton2 = _interopRequireDefault(_ScrollButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getStyles = function getStyles(props, context, state) {
  var tabType = props.tabType;
  var tabs = context.muiTheme.tabs;
  var offsetY = state.offsetY;


  return {
    root: {
      overflow: 'hidden',
      backgroundColor: tabs.backgroundColor
    },
    tabItemContainer: {
      flex: '1 1 auto',
      width: tabType === 'fixed' ? '100%' : 'auto',
      whiteSpace: 'nowrap',
      display: 'inline-block',
      overflowX: tabType === 'fixed' ? 'hidden' : 'scroll',
      marginBottom: offsetY
    }
  };
};

var Tabs = function (_Component) {
  (0, _inherits3.default)(Tabs, _Component);

  function Tabs() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Tabs);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Tabs.__proto__ || (0, _getPrototypeOf2.default)(Tabs)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      offsetY: 0,
      selectedIndex: 0,
      showLeftScroll: false,
      showRightScroll: false
    }, _this.tabComponentList = [], _this.handleLeftScrollClick = function () {
      _this.moveTabsScroll(-_this.tabItemContainerNode.clientWidth);
    }, _this.handleRightScrollClick = function () {
      _this.moveTabsScroll(_this.tabItemContainerNode.clientWidth);
    }, _this.handleContainerScroll = function () {
      _this.setScrollButtonState();
    }, _this.handleWindowResize = function () {
      _this.setScrollButtonState();
    }, _this.handleScrollbarSizeChange = function (_ref2) {
      var scrollbarHeight = _ref2.scrollbarHeight;

      _this.setState({
        offsetY: -scrollbarHeight
      });
    }, _this.handleTabClick = function (tab) {
      var _tab$props = tab.props,
          index = _tab$props.index,
          onActive = _tab$props.onActive;


      if (onActive) {
        onActive(tab);
      }

      _this.scrollSelectedIntoView(index);

      if (index !== _this.state.selectedIndex) {
        _this.setState({
          selectedIndex: index
        });
      }
    }, _this.getContainerMeasurements = function () {
      if (_this.tabItemContainerNode instanceof Element) {
        var boundingClientRect = _this.tabItemContainerNode.getBoundingClientRect();
        return {
          top: boundingClientRect.top,
          bottom: boundingClientRect.bottom,
          left: boundingClientRect.left,
          right: boundingClientRect.right,
          height: boundingClientRect.height,
          width: boundingClientRect.width,
          scrollLeft: _this.tabItemContainerNode.scrollLeft,
          scrollWidth: _this.tabItemContainerNode.scrollWidth,
          clientWidth: _this.tabItemContainerNode.clientWidth
        };
      } else return {};
    }, _this.moveTabsScroll = function (delta) {
      var container = _this.getContainerMeasurements();

      var nextScrollLeft = container.scrollLeft + delta;
      _scroll2.default.left(_this.tabItemContainerNode, nextScrollLeft);
      _this.setScrollButtonState();
    }, _this.scrollSelectedIntoView = function (index) {
      if (_this.props.tabType !== 'fixed') {
        var tab = _this.tabComponentList[index];
        var selectedButton = tab.getMeasurements();

        var container = _this.getContainerMeasurements();

        if (selectedButton.left < container.left) {
          // left side of button is out of view
          var nextScrollLeft = container.scrollLeft + (selectedButton.left - container.left);
          _scroll2.default.left(_this.tabItemContainerNode, nextScrollLeft);
        } else if (selectedButton.right > container.right) {
          // right side of button is out of view
          var _nextScrollLeft = container.scrollLeft + (selectedButton.right - container.right);
          _scroll2.default.left(_this.tabItemContainerNode, _nextScrollLeft);
        }
      }
    }, _this.setScrollButtonState = function () {
      var container = _this.getContainerMeasurements();

      var showLeftScroll = container.scrollLeft > 0;
      var showRightScroll = container.scrollWidth > container.clientWidth + container.scrollLeft;

      if (showLeftScroll !== _this.state.showLeftScroll || showRightScroll !== _this.state.showRightScroll) {
        _this.setState({
          showLeftScroll: showLeftScroll,
          showRightScroll: showRightScroll
        });
      }
    }, _this.updateSelectedIndexState = function (index) {
      _this.setState({
        selectedIndex: index < _this.getTabCount() ? index : 0
      });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Tabs, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var initialSelectedIndex = this.props.initialSelectedIndex;

      if (initialSelectedIndex) {
        this.updateSelectedIndexState(initialSelectedIndex);
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      /**
       * The size and position of the indicator is tied to the size and position of the selected tab. The
       * selected tab's size and position cannot be determined until it has been rendered.  Therefore, after
       * mounting the tabs container (and therefore mounting the selected tab) we will force an update of
       * the tabs container to cause another render of the indicator with the appropriate size and width.
       */
      this.forceUpdate();
      /**
       * Now that the tab strip has been fully rendered, determine if the scroll buttons should be shown.
       */
      this.setScrollButtonState();
      /**
       * Now that everything is sized correctly, make sure the selected tab is scrolled into view
       */
      this.scrollSelectedIntoView(this.state.selectedIndex);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(_ref3) {
      var initialSelectedIndex = _ref3.initialSelectedIndex;

      if (initialSelectedIndex !== this.props.initialSelectedIndex) {
        this.updateSelectedIndexState(initialSelectedIndex);
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      /**
       * If the withWidth decorator changes the viewport size then it's likely the selected tab changed size as well.
       * This means the indicator will not be the appropriate size any longer.  Force another update to ensure the
       * indicator renders at the proper size.
       */
      if (this.props.width !== prevProps.width) {
        this.forceUpdate();
      }
    }
  }, {
    key: 'getSelected',
    value: function getSelected(tab, index) {
      return this.state.selectedIndex === index;
    }
  }, {
    key: 'getTabs',
    value: function getTabs() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

      var tabs = [];

      _react.Children.forEach(props.children, function (tab) {
        if ((0, _react.isValidElement)(tab)) {
          tabs.push(tab);
        }
      });

      return tabs;
    }
  }, {
    key: 'getTabCount',
    value: function getTabCount() {
      return this.getTabs().length;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          contentContainerClassName = _props.contentContainerClassName,
          contentContainerStyle = _props.contentContainerStyle,
          initialSelectedIndex = _props.initialSelectedIndex,
          inkBarStyle = _props.inkBarStyle,
          style = _props.style,
          tabItemContainerStyle = _props.tabItemContainerStyle,
          tabTemplate = _props.tabTemplate,
          tabTemplateStyle = _props.tabTemplateStyle,
          tabType = _props.tabType,
          width = _props.width,
          other = (0, _objectWithoutProperties3.default)(_props, ['contentContainerClassName', 'contentContainerStyle', 'initialSelectedIndex', 'inkBarStyle', 'style', 'tabItemContainerStyle', 'tabTemplate', 'tabTemplateStyle', 'tabType', 'width']);
      var prepareStyles = this.context.muiTheme.prepareStyles;

      var styles = getStyles(this.props, this.context, this.state);
      var tabContent = [];
      var fixedWidth = 100 / this.getTabCount();

      var tabHeight = this.getTabs().some(function (tab) {
        return tab.props.label && tab.props.icon;
      }) ? '72px' : '48px';

      var tabs = this.getTabs().map(function (tab, index) {
        process.env.NODE_ENV !== "production" ? (0, _warning2.default)(tab.type && tab.type.muiName === 'Tab', 'Material-UI: Tabs only accepts Tab Components as children.\n        Found ' + (tab.type.muiName || tab.type) + ' as child number ' + (index + 1) + ' of Tabs') : void 0;

        tabContent.push(tab.props.children ? _react2.default.createElement(tabTemplate || _TabTemplate2.default, {
          key: index,
          selected: _this2.getSelected(tab, index),
          style: tabTemplateStyle
        }, tab.props.children) : undefined);

        return (0, _react.cloneElement)(tab, {
          key: index,
          index: index,
          selected: _this2.getSelected(tab, index),
          height: tab.props.height || tabHeight,
          width: tabType === 'fixed' ? fixedWidth + '%' : 'auto',
          onClick: _this2.handleTabClick,
          isLargeView: width === _withWidth.LARGE,
          ref: function ref(tabComponent) {
            _this2.tabComponentList[index] = tabComponent;
          }
        });
      });

      var inkBarContainerWidth = tabItemContainerStyle ? tabItemContainerStyle.width : '100%';

      var inkBarLeft = 0;
      var inkBarWidth = 0;
      if (this.state.selectedIndex !== -1) {
        var tab = this.tabComponentList[this.state.selectedIndex];

        if (tab instanceof _react.Component) {
          var tabMeasurements = tab.getMeasurements();
          var container = this.getContainerMeasurements();
          inkBarLeft = tabMeasurements.left + container.scrollLeft - container.left;
          inkBarWidth = tabMeasurements.width;
        }
      }

      var inkBar = _react2.default.createElement(
        'div',
        { style: { width: inkBarContainerWidth } },
        _react2.default.createElement(_InkBar2.default, {
          left: inkBarLeft + 'px',
          width: inkBarWidth + 'px',
          style: inkBarStyle
        })
      );

      var scrollButtonLeft = tabType === 'scrollable-buttons' ? _react2.default.createElement(_ScrollButton2.default, {
        direction: 'left',
        height: tabHeight,
        onClick: this.handleLeftScrollClick,
        visible: this.state.showLeftScroll
      }) : null;

      var scrollButtonRight = tabType === 'scrollable-buttons' ? _react2.default.createElement(_ScrollButton2.default, {
        direction: 'right',
        height: tabHeight,
        onClick: this.handleRightScrollClick,
        visible: this.state.showRightScroll
      }) : null;

      var containerScrollListener = this.tabItemContainerNode && _react2.default.createElement(_reactEventListener2.default, {
        target: this.tabItemContainerNode,
        onScroll: this.handleContainerScroll
      });

      var scrollbarSizeListener = tabType !== 'fixed' ? _react2.default.createElement(_reactScrollbarSize2.default, {
        onLoad: this.handleScrollbarSizeChange,
        onChange: this.handleScrollbarSizeChange
      }) : null;

      var windowResizeListener = tabType === 'scrollable-buttons' ? _react2.default.createElement(_reactEventListener2.default, {
        target: 'window',
        onResize: this.handleWindowResize
      }) : null;

      return _react2.default.createElement(
        'div',
        (0, _extends3.default)({ style: prepareStyles((0, _simpleAssign2.default)({}, style)) }, other),
        windowResizeListener,
        containerScrollListener,
        scrollbarSizeListener,
        _react2.default.createElement(
          'div',
          { style: prepareStyles((0, _simpleAssign2.default)({}, styles.root)) },
          _react2.default.createElement(
            'div',
            { style: { display: 'flex' } },
            scrollButtonLeft,
            _react2.default.createElement(
              'div',
              {
                style: prepareStyles((0, _simpleAssign2.default)(styles.tabItemContainer, tabItemContainerStyle)),
                ref: function ref(node) {
                  _this2.tabItemContainerNode = node;
                }
              },
              tabs,
              inkBar
            ),
            scrollButtonRight
          )
        ),
        _react2.default.createElement(
          'div',
          {
            style: prepareStyles((0, _simpleAssign2.default)({}, contentContainerStyle)),
            className: contentContainerClassName
          },
          tabContent
        )
      );
    }
  }]);
  return Tabs;
}(_react.Component);

Tabs.defaultProps = {
  initialSelectedIndex: 0,
  tabType: 'fixed'
};
Tabs.contextTypes = {
  muiTheme: _propTypes2.default.object.isRequired
};
process.env.NODE_ENV !== "production" ? Tabs.propTypes = {
  /**
   * Should be used to pass `Tab` components.
   */
  children: _propTypes2.default.node,
  /**
   * The css class name of the root element.
   */
  className: _propTypes2.default.string,
  /**
   * The css class name of the content's container.
   */
  contentContainerClassName: _propTypes2.default.string,
  /**
   * Override the inline-styles of the content's container.
   */
  contentContainerStyle: _propTypes2.default.object,
  /**
   * Specify initial visible tab index.
   * If `initialSelectedIndex` is set but larger than the total amount of specified tabs,
   * `initialSelectedIndex` will revert back to default.
   * If `initialSelectedIndex` is set to any negative value, no tab will be selected intially.
   */
  initialSelectedIndex: _propTypes2.default.number,
  /**
   * Override the inline-styles of the InkBar.
   */
  inkBarStyle: _propTypes2.default.object,
  /**
   * Override the inline-styles of the root element.
   */
  style: _propTypes2.default.object,
  /**
   * Override the inline-styles of the tab-labels container.
   */
  tabItemContainerStyle: _propTypes2.default.object,
  /**
   * Override the default tab template used to wrap the content of each tab element.
   */
  tabTemplate: _propTypes2.default.func,
  /**
   * Override the inline-styles of the tab template.
   */
  tabTemplateStyle: _propTypes2.default.object,
  /**
   * The type of tab component:
   *
   * `fixed` will fill the container and each tab will be the same size.
   *
   * `scrollable` will invoke scrolling properties and allow for horizontally scrolling (or swiping) the tab bar.
   *
   * `scrollable-buttons` adds clickable buttons to a scrollable tab bar.
   */
  tabType: _propTypes2.default.oneOf(['fixed', 'scrollable', 'scrollable-buttons']),
  /**
   * @ignore
   * passed by withWidth decorator
   */
  width: _propTypes2.default.number.isRequired
} : void 0;
exports.default = (0, _withWidth2.default)()(Tabs);