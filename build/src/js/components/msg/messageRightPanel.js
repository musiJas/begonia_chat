"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _constants = require("../../common/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// main page 右边位置
class MessageRightPanel extends _react.default.Component {
  constructor(props) {
    super(props);
    this.state = {
      showScroll: false
    };
  }

  renderContents() {
    console.log(this.props);
    console.log(this.state);
    const {
      route
    } = this.props;
    console.log(route);

    switch (route.type) {
      case 'DEFAULTMESSAGE_ONLINE':
        return /*#__PURE__*/_react.default.createElement(DefaultMainPage, null);

      case 'PRECHECKMESSAGE_ONLINE':
        return /*#__PURE__*/_react.default.createElement(MainPage, {
          state: this.state,
          onMouseEnter: (props, e) => {
            console.log(props);
            this.setState({
              showScroll: props.showScroll
            });
          },
          onMouseLeave: props => {
            this.setState({
              showScroll: props.showScroll
            });
          }
        });

      default:
        return /*#__PURE__*/_react.default.createElement(DefaultMainPage, null);
    }
  }

  render() {
    const {
      route,
      connections,
      children,
      dispatch
    } = this.props;
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, this.renderContents());
  }

}

const DefaultMainPage = props => /*#__PURE__*/_react.default.createElement("div", {
  className: "main_defaultPage"
}, /*#__PURE__*/_react.default.createElement("span", {
  className: "main_defaultSpan"
}, "welcome.default page  "));

const MainPage = prop => /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(MainTop, {
  state: prop.state,
  onMouseEnter: props => {
    console.log(props);
    prop.onMouseEnter(props); // e.stopPropagation()
  },
  onMouseLeave: props => {
    prop.onMouseLeave(props); // e.stopPropagation()
  }
}), /*#__PURE__*/_react.default.createElement(MainButtom, null));

const MainTop = props => /*#__PURE__*/_react.default.createElement("div", {
  className: `message-main-top  ${props.state.showScroll ? "show_scroll" : ''}`,
  onMouseEnter: e => {
    console.log("enter:>>>>");
    console.log(props.state);
    props.onMouseEnter({
      showScroll: true
    });
    e.stopPropagation();
  },
  onMouseLeave: e => {
    props.onMouseLeave({
      showScroll: false
    });
    e.stopPropagation();
  }
}, /*#__PURE__*/_react.default.createElement("div", null, "test \u8BD5\u5377\u963F\u677E\u5927\u963F\u8428\u5927\u82CF\u6253"), /*#__PURE__*/_react.default.createElement("div", null, "test \u8BD5\u5377\u963F\u677E\u5927\u963F\u8428\u5927\u82CF\u6253"), /*#__PURE__*/_react.default.createElement("div", null, "test \u8BD5\u5377\u963F\u677E\u5927\u963F\u8428\u5927\u82CF\u6253"), /*#__PURE__*/_react.default.createElement("div", null, "test \u8BD5\u5377\u963F\u677E\u5927\u963F\u8428\u5927\u82CF\u6253"), /*#__PURE__*/_react.default.createElement("div", null, "test \u8BD5\u5377\u963F\u677E\u5927\u963F\u8428\u5927\u82CF\u6253"), /*#__PURE__*/_react.default.createElement("div", null, "test \u8BD5\u5377\u963F\u677E\u5927\u963F\u8428\u5927\u82CF\u6253"), /*#__PURE__*/_react.default.createElement("div", null, "test \u8BD5\u5377\u963F\u677E\u5927\u963F\u8428\u5927\u82CF\u6253"), /*#__PURE__*/_react.default.createElement("div", null, "test \u8BD5\u5377\u963F\u677E\u5927\u963F\u8428\u5927\u82CF\u6253"), /*#__PURE__*/_react.default.createElement("div", null, "test \u8BD5\u5377\u963F\u677E\u5927\u963F\u8428\u5927\u82CF\u6253"), /*#__PURE__*/_react.default.createElement("div", null, "test \u8BD5\u5377\u963F\u677E\u5927\u963F\u8428\u5927\u82CF\u6253"), /*#__PURE__*/_react.default.createElement("div", null, "test \u8BD5\u5377\u963F\u677E\u5927\u963F\u8428\u5927\u82CF\u6253"), /*#__PURE__*/_react.default.createElement("div", null, "test \u8BD5\u5377\u963F\u677E\u5927\u963F\u8428\u5927\u82CF\u6253"), /*#__PURE__*/_react.default.createElement("div", null, "test \u8BD5\u5377\u963F\u677E\u5927\u963F\u8428\u5927\u82CF\u6253"), /*#__PURE__*/_react.default.createElement("div", null, "test \u8BD5\u5377\u963F\u677E\u5927\u963F\u8428\u5927\u82CF\u6253"), /*#__PURE__*/_react.default.createElement("div", null, "test \u8BD5\u5377\u963F\u677E\u5927\u963F\u8428\u5927\u82CF\u6253"), /*#__PURE__*/_react.default.createElement("div", null, "test \u8BD5\u5377\u963F\u677E\u5927\u963F\u8428\u5927\u82CF\u6253"), /*#__PURE__*/_react.default.createElement("div", null, "test \u8BD5\u5377\u963F\u677E\u5927\u963F\u8428\u5927\u82CF\u6253"), /*#__PURE__*/_react.default.createElement("div", null, "test \u8BD5\u5377\u963F\u677E\u5927\u963F\u8428\u5927\u82CF\u6253"), /*#__PURE__*/_react.default.createElement("div", null, "test \u8BD5\u5377\u963F\u677E\u5927\u963F\u8428\u5927\u82CF\u6253"), /*#__PURE__*/_react.default.createElement("div", null, "test \u8BD5\u5377\u963F\u677E\u5927\u963F\u8428\u5927\u82CF\u6253"), /*#__PURE__*/_react.default.createElement("div", null, "test \u8BD5\u5377\u963F\u677E\u5927\u963F\u8428\u5927\u82CF\u6253"), /*#__PURE__*/_react.default.createElement("div", null, "test \u8BD5\u5377\u963F\u677E\u5927\u963F\u8428\u5927\u82CF\u6253"), /*#__PURE__*/_react.default.createElement("div", null, "test \u8BD5\u5377\u963F\u677E\u5927\u963F\u8428\u5927\u82CF\u6253"), /*#__PURE__*/_react.default.createElement("div", null, "test \u8BD5\u5377\u963F\u677E\u5927\u963F\u8428\u5927\u82CF\u6253"), /*#__PURE__*/_react.default.createElement("div", null, "test \u8BD5\u5377\u963F\u677E\u5927\u963F\u8428\u5927\u82CF\u6253"), /*#__PURE__*/_react.default.createElement("div", null, "test \u8BD5\u5377\u963F\u677E\u5927\u963F\u8428\u5927\u82CF\u6253"), /*#__PURE__*/_react.default.createElement("div", null, "test \u8BD5\u5377\u963F\u677E\u5927\u963F\u8428\u5927\u82CF\u6253"), /*#__PURE__*/_react.default.createElement("div", null, "test \u8BD5\u5377\u963F\u677E\u5927\u963F\u8428\u5927\u82CF\u6253"), /*#__PURE__*/_react.default.createElement("div", null, "test \u8BD5\u5377\u963F\u677E\u5927\u963F\u8428\u5927\u82CF\u6253"), /*#__PURE__*/_react.default.createElement("div", null, "test \u8BD5\u5377\u963F\u677E\u5927\u963F\u8428\u5927\u82CF\u6253"), /*#__PURE__*/_react.default.createElement("div", null, "test \u8BD5\u5377\u963F\u677E\u5927\u963F\u8428\u5927\u82CF\u6253"), /*#__PURE__*/_react.default.createElement("div", null, "test \u8BD5\u5377\u963F\u677E\u5927\u963F\u8428\u5927\u82CF\u6253"), /*#__PURE__*/_react.default.createElement("div", null, "test \u8BD5\u5377\u963F\u677E\u5927\u963F\u8428\u5927\u82CF\u6253"), /*#__PURE__*/_react.default.createElement("div", null, "test \u8BD5\u5377\u963F\u677E\u5927\u963F\u8428\u5927\u82CF\u6253"), /*#__PURE__*/_react.default.createElement("div", null, "test \u8BD5\u5377\u963F\u677E\u5927\u963F\u8428\u5927\u82CF\u6253"), /*#__PURE__*/_react.default.createElement("div", null, "test \u8BD5\u5377\u963F\u677E\u5927\u963F\u8428\u5927\u82CF\u6253"), /*#__PURE__*/_react.default.createElement("div", null, "test \u8BD5\u5377\u963F\u677E\u5927\u963F\u8428\u5927\u82CF\u6253"), /*#__PURE__*/_react.default.createElement("div", null, "test \u8BD5\u5377\u963F\u677E\u5927\u963F\u8428\u5927\u82CF\u6253"), /*#__PURE__*/_react.default.createElement("div", null, "test \u8BD5\u5377\u963F\u677E\u5927\u963F\u8428\u5927\u82CF\u6253"), /*#__PURE__*/_react.default.createElement("div", null, "test \u8BD5\u5377\u963F\u677E\u5927\u963F\u8428\u5927\u82CF\u6253"), /*#__PURE__*/_react.default.createElement("div", null, "test \u8BD5\u5377\u963F\u677E\u5927\u963F\u8428\u5927\u82CF\u6253"), /*#__PURE__*/_react.default.createElement("div", null, "test \u8BD5\u5377\u963F\u677E\u5927\u963F\u8428\u5927\u82CF\u6253"), /*#__PURE__*/_react.default.createElement("div", null, "test \u8BD5\u5377\u963F\u677E\u5927\u963F\u8428\u5927\u82CF\u6253"), /*#__PURE__*/_react.default.createElement("div", null, "test \u8BD5\u5377\u963F\u677E\u5927\u963F\u8428\u5927\u82CF\u6253"), /*#__PURE__*/_react.default.createElement("div", null, "test \u8BD5\u5377\u963F\u677E\u5927\u963F\u8428\u5927\u82CF\u6253"), /*#__PURE__*/_react.default.createElement("div", null, "test \u8BD5\u5377\u963F\u677E\u5927\u963F\u8428\u5927\u82CF\u6253"), /*#__PURE__*/_react.default.createElement("div", null, "test \u8BD5\u5377\u963F\u677E\u5927\u963F\u8428\u5927\u82CF\u6253"), /*#__PURE__*/_react.default.createElement("div", null, "test \u8BD5\u5377\u963F\u677E\u5927\u963F\u8428\u5927\u82CF\u6253"), /*#__PURE__*/_react.default.createElement("div", null, "test \u8BD5\u5377\u963F\u677E\u5927\u963F\u8428\u5927\u82CF\u6253"));

const MainButtom = props => /*#__PURE__*/_react.default.createElement("div", {
  className: "message-main-buttom"
}, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("button", null, "bt1")), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("textarea", null)), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("button", null, "send")));

var _default = (0, _reactRedux.connect)((state, ownProps) => {
  return {
    route: state.messageModule
  };
})(MessageRightPanel);

exports.default = _default;