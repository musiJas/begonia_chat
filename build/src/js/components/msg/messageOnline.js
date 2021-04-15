"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _messageLeftPanel = _interopRequireDefault(require("./messageLeftPanel"));

var _messageMiddlePanel = _interopRequireDefault(require("./messageMiddlePanel"));

var _messageRightPanel = _interopRequireDefault(require("./messageRightPanel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class MessageOnlinePage extends _react.default.Component {
  render() {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "container"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "left-panel main_leftPanel"
    }, /*#__PURE__*/_react.default.createElement(_messageLeftPanel.default, null)), /*#__PURE__*/_react.default.createElement("div", {
      className: "right-panel"
    }, /*#__PURE__*/_react.default.createElement(_messageRightPanel.default, null)));
  }

}

var _default = (0, _reactRedux.connect)((state, ownProps) => {
  return {
    route: state.messageModule
  };
})(MessageOnlinePage);

exports.default = _default;