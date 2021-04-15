"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _classnames = _interopRequireDefault(require("classnames"));

var _messageOnline = _interopRequireDefault(require("../components/msg/messageOnline"));

var _userManagerOnline = _interopRequireDefault(require("../components/users/userManagerOnline"));

var _settingManagerInfo = _interopRequireDefault(require("../components/setting/settingManagerInfo"));

var _constants = _interopRequireDefault(require("../common/constants"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

class MainRouterComponent extends React.PureComponent {
  renderContents() {
    console.log(this.props);
    const {
      mainRouter
    } = this.props; //route.type

    console.log("mainRouter");
    console.log(mainRouter);

    switch (mainRouter.type) {
      case 'MESSAGE_ONLINE':
        return /*#__PURE__*/React.createElement(_messageOnline.default, null);

      case 'USERMANAGER_ONLINE':
        return /*#__PURE__*/React.createElement(_userManagerOnline.default, null);

      case 'SETTINGMANAGER_INFO':
        return /*#__PURE__*/React.createElement(_settingManagerInfo.default, null);

      default:
        return /*#__PURE__*/React.createElement(_messageOnline.default, null);
    }
  }

  render() {
    const {
      route,
      connections,
      children,
      dispatch
    } = this.props;
    return /*#__PURE__*/React.createElement(React.Fragment, null, this.renderContents());
  }

}

var _default = (0, _reactRedux.connect)((state, ownProps) => {
  return {
    mainRouter: state.messageModule
  };
})(MainRouterComponent);

exports.default = _default;