"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _redux = require("redux");

var _electronUtil = require("electron-util");

var _persister = _interopRequireDefault(require("../components/persister"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const init = {
  isDark: _electronUtil.darkMode.isEnabled,
  quitMessage: 'test'
};

function isDark(state = init.isDark, action) {
  switch (action.type) {
    case 'TOGGLE_THEME':
      return !state;

    default:
      return state;
  }
}

function quitMessage(state = init.quitMessage, action) {
  switch (action.type) {
    case 'SET_QUIT_MSG':
      return action.message;

    default:
      return state;
  }
}

const persist = new _persister.default('irc-settings', init);

var _default = persist.wrap((0, _redux.combineReducers)({
  isDark,
  quitMessage
}));

exports.default = _default;