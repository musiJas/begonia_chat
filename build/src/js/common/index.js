"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loginSccuess = loginSccuess;

// common redux

/** 创建函数 */
function loginSccuess(text) {
  return {
    type: ADD_TODO,
    text
  };
}