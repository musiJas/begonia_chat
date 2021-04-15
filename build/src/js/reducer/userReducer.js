"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = init;
exports.default = void 0;

var actionTypes = _interopRequireWildcard(require("../common/actionTypes"));

var _core = require("@babel/core");

var _fs = require("fs");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function init() {
  let state = {
    type: actionTypes.DEFAULTUSER_INFO
  };
  return state;
}

function userState(state = init(), action) {
  switch (action.type) {
    case actionTypes.USERSMANAGER_INFO:
      {
        return Object.assign({}, state, {
          userName: state.userName,
          mobile: state.mobile,
          to: state.to,
          type: actionTypes.USERSMANAGER_INFO
        });
      }

    default:
      return state;
  }
}

var _default = userState;
exports.default = _default;