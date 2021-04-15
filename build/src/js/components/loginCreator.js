"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _https = require("../utils/https");

var _loginReducer = _interopRequireDefault(require("../reducer/loginReducer"));

var _credetails = require("../common/credetails");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

class LoginCreator extends _react.default.Component {
  render() {
    const {
      isConnecting,
      credential,
      error,
      savedCreds,
      dispatch
    } = this.props;
    console.log(this.props);
    const listItems = savedCreds.map(cred => /*#__PURE__*/_react.default.createElement("li", {
      className: "saved-credentials",
      key: (0, _credetails.credentialsToId)(cred),
      onClick: () => {
        dispatch({
          type: 'CREDENTIALS_UPDATE',
          update: cred
        });
      }
    }, /*#__PURE__*/_react.default.createElement("p", {
      className: "mobile"
    }, cred.mobile), /*#__PURE__*/_react.default.createElement("small", null, cred.server, ":", cred.port), /*#__PURE__*/_react.default.createElement("button", {
      className: "forget",
      onClick: e => {
        e.stopPropagation();
        dispatch({
          type: 'FORGET_CREDENTIALS',
          id: (0, _credetails.credentialsToId)(cred)
        });
      }
    }, "x")));
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "container connection-creator"
    }, /*#__PURE__*/_react.default.createElement(Panels, {
      secondary: savedCreds.length ? /*#__PURE__*/_react.default.createElement("ul", null, listItems) : null
    }, error && /*#__PURE__*/_react.default.createElement("div", {
      className: "connection-error"
    }, /*#__PURE__*/_react.default.createElement("p", null, error)), /*#__PURE__*/_react.default.createElement(Login, {
      credential: credential,
      disabled: false,
      onSubmit: (creds, remember) => {
        console.log(creds);
        dispatch((0, _https.toLogin)(creds, remember));
      },
      onChange: (name, value) => {
        dispatch({
          type: 'CREDENTIALS_UPDATE',
          update: {
            [name]: value
          }
        });
      }
    })));
  }

}

var _default = (0, _reactRedux.connect)(state => {
  console.log('1231');
  console.log(state.loginModule);
  return Object.assign({}, state.loginModule, {
    savedCreds: state.loginModule.credentials
  });
})(LoginCreator);

exports.default = _default;

const Panels = props => {
  if (props.secondary) {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
      className: "left-panel"
    }, props.secondary), /*#__PURE__*/_react.default.createElement("div", {
      className: "right-panel"
    }, props.children));
  } else {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "full-panel"
    }, props.children);
  }
};

class Login extends _react.default.Component {
  constructor(props) {
    super(props);
    this.state = {
      rememberCredentials: false,
      serverClass: "none",
      useDefaultConfig: true,
      disabled: false
    };
  }

  handleChange(event) {
    const {
      name,
      value
    } = event.target;
    console.log(name);
    console.log(value);
    this.props.onChange(name, value);
  }

  componentDidMount() {}

  render() {
    const {
      disabled,
      credential,
      onSubmit
    } = this.props;
    const {
      realName,
      mobile,
      password,
      server,
      port
    } = this.props.credential;
    const {
      rememberCredentials,
      serverClass,
      useDefaultConfig
    } = this.state;
    const inputGroupClass = 'input-group';
    console.log('001');
    console.log(disabled);
    console.log(this.props.credential);
    return /*#__PURE__*/_react.default.createElement("form", {
      className: "login-form",
      onSubmit: event => {
        event.preventDefault();
        onSubmit(credential, rememberCredentials);
      }
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: inputGroupClass
    }, /*#__PURE__*/_react.default.createElement("label", null, "Real Name"), /*#__PURE__*/_react.default.createElement("input", {
      type: "text",
      autoFocus: true,
      required: true,
      name: "realName",
      value: realName || '',
      disabled: disabled,
      onChange: this.handleChange.bind(this)
    })), /*#__PURE__*/_react.default.createElement("div", {
      className: inputGroupClass
    }, /*#__PURE__*/_react.default.createElement("label", null, "Mobile"), /*#__PURE__*/_react.default.createElement("input", {
      type: "text",
      required: true,
      name: "mobile",
      value: mobile || '',
      disabled: disabled,
      onChange: this.handleChange.bind(this)
    })), /*#__PURE__*/_react.default.createElement("div", {
      className: inputGroupClass
    }, /*#__PURE__*/_react.default.createElement("label", null, "Password"), /*#__PURE__*/_react.default.createElement("input", {
      type: "password",
      name: "password",
      value: password || '',
      disabled: disabled,
      onChange: this.handleChange.bind(this)
    })), /*#__PURE__*/_react.default.createElement("div", {
      style: {
        display: serverClass
      },
      className: inputGroupClass
    }, /*#__PURE__*/_react.default.createElement("label", null, "Server"), /*#__PURE__*/_react.default.createElement("input", {
      type: "text",
      name: "server",
      value: server,
      disabled: disabled,
      onChange: this.handleChange.bind(this)
    })), /*#__PURE__*/_react.default.createElement("div", {
      style: {
        display: serverClass
      },
      className: inputGroupClass
    }, /*#__PURE__*/_react.default.createElement("label", null, "Port"), /*#__PURE__*/_react.default.createElement("input", {
      type: "number",
      required: true,
      name: "port",
      value: port,
      disabled: disabled,
      onChange: this.handleChange.bind(this)
    })), /*#__PURE__*/_react.default.createElement("div", {
      className: "login-div"
    }, /*#__PURE__*/_react.default.createElement("label", {
      className: "checkbox-label login-config-label"
    }, /*#__PURE__*/_react.default.createElement("input", {
      type: "checkbox",
      name: "rememberCredentials",
      checked: rememberCredentials,
      onClick: e => {
        this.setState({
          rememberCredentials: e.target.checked
        });
      },
      onChange: e => {
        console.log('login in onchange....');
      }
    }), ' ', "remember credentials?"), /*#__PURE__*/_react.default.createElement("label", {
      className: "checkbox-label login-config-label"
    }, /*#__PURE__*/_react.default.createElement("input", {
      type: "checkbox",
      name: "defaultServer",
      checked: useDefaultConfig,
      onClick: e => {
        if (useDefaultConfig) {
          this.setState({
            serverClass: "inline-block",
            useDefaultConfig: e.target.checked
          });
        } else {
          this.setState({
            serverClass: "none",
            useDefaultConfig: e.target.checked
          });
        }
      },
      onChange: e => {
        console.log('login in onchange....');
      }
    }), ' ', "used default config?")), /*#__PURE__*/_react.default.createElement("div", {
      className: inputGroupClass
    }, /*#__PURE__*/_react.default.createElement("input", {
      type: "submit",
      disabled: disabled,
      value: "Log In"
    })));
  }

}