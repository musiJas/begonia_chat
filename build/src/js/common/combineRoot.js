"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rootReducer = void 0;

var _redux = require("redux");

var _router = _interopRequireDefault(require("../components/router"));

var _settings = _interopRequireDefault(require("../reducer/settings"));

var _creator = _interopRequireDefault(require("../reducer/creator"));

var _credentials = _interopRequireDefault(require("../reducer/credentials"));

var _loginReducer = _interopRequireDefault(require("../reducer/loginReducer"));

var _messageReduce = _interopRequireDefault(require("../reducer/messageReduce"));

var _userReducer = _interopRequireDefault(require("../reducer/userReducer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import connections from './connections'
// import creator from './creator'
// import credentials from './credentials'
// function visibilityFilter(state = SHOW_ALL, action) {
//     switch (action.type) {
//       case SET_VISIBILITY_FILTER:
//         return action.filter
//       default:
//         return state
//     }
//   }
const rootReducer = (0, _redux.combineReducers)({
  //   connections,
  //  creator,
  loginModule: _loginReducer.default,
  messageModule: _messageReduce.default,
  userModule: _userReducer.default,
  //credentials,
  //  route,
  settings: _settings.default //   ui

});
exports.rootReducer = rootReducer;