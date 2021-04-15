"use strict";

var _react = _interopRequireDefault(require("react"));

var _router = _interopRequireDefault(require("./components/router"));

var _login = _interopRequireDefault(require("./login/login"));

var _reactDom = require("react-dom");

var _reactRedux = require("react-redux");

var _redux = require("redux");

var _reduxThunk = _interopRequireDefault(require("redux-thunk"));

var _combineRoot = require("./common/combineRoot");

var _actions = require("./common/actions");

var _actionTypes = require("./common/actionTypes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const inProduction = false;
const mainDiv = document.getElementById("main");
const initialState = {}; // , notifMiddleware, storeChannelsMiddleware

const middleware = [_reduxThunk.default];
const composeEnhancers = inProduction ? _redux.compose : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || _redux.compose; // if (!inProduction) middleware.push(require('redux-logger').default)

const store = (0, _redux.createStore)(_combineRoot.rootReducer, initialState, composeEnhancers(_redux.applyMiddleware.apply(null, middleware)));
let state = store.getState();
console.log("initial state->");
console.log(state); //返回监听的数据

const unSubSciption = store.subscribe(() => {
  console.log(store.getState());
}); // window.addEventListener('beforeunload', () => {
//     const state: IrcState = store.getState()
//     state.connections.list.map((conn) => {
//         conn.stream.quit(state.settings.quitMessage)
//     })
//   })

if (mainDiv) {
  (0, _reactDom.render)( /*#__PURE__*/_react.default.createElement(_reactRedux.Provider, {
    store: store
  }, /*#__PURE__*/_react.default.createElement(_router.default, null)), mainDiv);
} else {
  console.error("root main element is not  exist.....");
}