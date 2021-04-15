"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = init;
exports.default = void 0;
const defaultCreds = {
  realName: '',
  nickname: '',
  server: 'http://www.begonia.com',
  port: 80,
  password: ''
}; // TODO: call this LoginState

function init() {
  const state = {
    isConnecting: false,
    credentials: defaultCreds,
    connection: null,
    error: null
  };
  return state;
}

function creator(state = init(), action) {
  switch (action.type) {
    case 'CREDENTIALS_UPDATE':
      {
        return Object.assign({}, state, {
          credentials: Object.assign({}, state.credentials, action.update)
        });
      }

    case 'REQUEST_CONNECTION_PENDING':
      {
        return Object.assign({}, state, {
          isConnecting: true,
          error: null,
          connection: action.connection
        });
      }

    case 'REQUEST_CONNECTION_SUCCESS':
      {
        return Object.assign({}, state, {
          isConnecting: false,
          connection: null,
          error: null,
          credentials: defaultCreds
        });
      }

    case 'REQUEST_CONNECTION_ERROR':
      {
        return Object.assign({}, state, {
          isConnecting: false,
          error: action.error
        });
      }

    case 'CONNECTION_CLOSED':
      {
        if (state.connection && action.connectionId === state.connection.id) {
          return Object.assign({}, state, {
            connection: Object.assign({}, state.connection, {
              isConnected: false
            })
          });
        } else {
          return state;
        }
      }

    default:
      return state;
  }
}

var _default = creator;
exports.default = _default;