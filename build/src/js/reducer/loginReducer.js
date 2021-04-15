"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = init;
exports.default = void 0;

var actionTypes = _interopRequireWildcard(require("../common/actionTypes"));

var _core = require("@babel/core");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const defaultCreds = {
  realName: '',
  nickname: '',
  server: 'http://www.begonia.com',
  port: 80,
  password: '',
  mobile: ''
};

function init() {
  let state = {
    isLogin: false,
    type: "LOGIN_TODO",
    error: null,
    credential: defaultCreds,
    disabled: false,
    credentials: []
  };
  return state;
}

function loginState(state = init(), action) {
  switch (action.type) {
    case actionTypes.LOGIN_SCCUESS:
      {
        return Object.assign({}, state, {
          userName: state.userName,
          isLogin: true,
          type: actionTypes.LOGIN_SCCUESS
        });
      }

    case actionTypes.LOGIN_TODO:
      return Object.assign({}, state, {
        isLogin: false,
        type: "LOGIN_TODO",
        credentials: state.credentials
      });

    case actionTypes.LOGIN_FAILED:
      return Object.assign({}, action, {
        isLogin: false,
        error: action.error,
        type: "LOGIN_FAILED",
        credentials: state.credentials,
        credential: state.credential
      });

    case actionTypes.CREDENTIALS_UPDATE:
      let stats = Object.assign({}, action, {
        isLogin: false,
        type: actionTypes.CREDENTIALS_UPDATE,
        credentials: state.credentials,
        credential: Object.assign({}, state.credential, action.update)
      });
      return stats;

    default:
      return state;
  }
}

var _default = loginState;
exports.default = _default;