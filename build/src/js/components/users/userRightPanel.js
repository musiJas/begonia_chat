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
    console.log("right ->>>>info");
    console.log(this.props);
    console.log(this.state);
    const {
      route
    } = this.props;
    console.log(route);

    switch (route.type) {
      case 'DEFAULTUSER_INFO':
        return /*#__PURE__*/_react.default.createElement(DefaultPage, null);

      case 'USERMANAGER_INFO':
        return /*#__PURE__*/_react.default.createElement(MainPage, null);

      default:
        return /*#__PURE__*/_react.default.createElement(DefaultPage, null);
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

const DefaultPage = () => /*#__PURE__*/_react.default.createElement("div", {
  className: "main_defaultPage"
}, /*#__PURE__*/_react.default.createElement("span", {
  className: "main_defaultSpan"
}, "welcome.user info default page  "));

const MainPage = prop => /*#__PURE__*/_react.default.createElement("div", null, "userInfos....");

var _default = (0, _reactRedux.connect)((state, ownProps) => {
  return {
    route: state.userModule
  };
})(MessageRightPanel);

exports.default = _default;