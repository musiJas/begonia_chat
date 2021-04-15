"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const darkClass = 'theme-dark';

class GlobalStyle extends React.PureComponent {
  componentDidMount() {
    document.body && document.body.classList.toggle(darkClass, this.props.isDark);
  }

  componentWillReceiveProps(nextProps) {
    document.body && document.body.classList.toggle(darkClass, nextProps.isDark);
  }

  componentWillUnmount() {
    document.body && document.body.classList.remove(darkClass);
  }

  render() {
    return this.props.children;
  }

}

var _default = (0, _reactRedux.connect)((state, ownProps) => {
  return {
    isDark: state.settings.isDark
  };
})(GlobalStyle);

exports.default = _default;