"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _userLeftPanel = _interopRequireDefault(require("./userLeftPanel"));

var _userRightPanel = _interopRequireDefault(require("./userRightPanel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UserManagerOnlinePage extends _react.default.Component {
  render() {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "container"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "left-panel main_leftPanel"
    }, /*#__PURE__*/_react.default.createElement(_userLeftPanel.default, null)), /*#__PURE__*/_react.default.createElement("div", {
      className: "right-panel"
    }, /*#__PURE__*/_react.default.createElement(_userRightPanel.default, null)));
  }

}

var _default = (0, _reactRedux.connect)((state, ownProps) => {
  return {
    route: state.userModule
  };
})(UserManagerOnlinePage);

exports.default = _default;