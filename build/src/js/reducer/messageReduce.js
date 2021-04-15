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

const defaultProps = {
  userName: '',
  mobile: '',
  to: ''
};

function init() {
  let state = {
    type: actionTypes.MESSAGE_ONLINE,
    userName: '',
    mobile: '',
    to: ''
  };
  return state;
}

function messageState(state = init(), action) {
  console.log(action);

  switch (action.type) {
    case actionTypes.MESSAGE_ONLINE:
      {
        return Object.assign({}, state, {
          userName: state.userName,
          mobile: '',
          to: '',
          type: actionTypes.MESSAGE_ONLINE
        });
      }

    case actionTypes.USERMANAGER_ONLINE:
      return Object.assign({}, state, {
        userName: state.userName,
        mobile: '',
        to: '',
        type: actionTypes.USERMANAGER_ONLINE
      });

    case actionTypes.PRECHECKMESSAGE_ONLINE:
      {
        return Object.assign({}, state, {
          userName: state.userName,
          mobile: state.mobile,
          to: action.to,
          type: actionTypes.PRECHECKMESSAGE_ONLINE
        });
      }

    case actionTypes.SENDMESSAGE_ONLINE:
      {
        return Object.assign({}, state, {
          userName: state.userName,
          mobile: state.mobile,
          to: state.to,
          type: actionTypes.SENDMESSAGE_ONLINE
        });
      }

    case actionTypes.PUSHMESSAGE_MQTT:
      {
        return Object.assign({}, state, {
          userName: state.userName,
          mobile: state.mobile,
          to: state.to,
          type: actionTypes.PUSHMESSAGE_MQTT
        });
      }

    case actionTypes.SETTINGMANAGER_INFO:
      {
        return Object.assign({}, state, {
          desc: action.desc,
          type: actionTypes.SETTINGMANAGER_INFO
        });
      }

    default:
      return state;
  }
}

var _default = messageState;
exports.default = _default;