"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SettingManagerInfo extends _react.default.Component {
  render() {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "container"
    }, "setting....");
  }

}

var _default = (0, _reactRedux.connect)((state, ownProps) => {
  return {
    route: state.loginModule
  };
})(SettingManagerInfo);

exports.default = _default;