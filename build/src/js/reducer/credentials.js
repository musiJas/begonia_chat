"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.credentialsToId = credentialsToId;
exports.default = void 0;

var _persister = _interopRequireDefault(require("../components/persister"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function credentialsToId({
  realName,
  server,
  port
}) {
  return `${realName}@${server}:${port}`;
}

function list(state, action) {
  switch (action.type) {
    case 'WORKING_CREDENTIALS':
      {
        if (action.remember) {
          const id = credentialsToId(action.credentials);
          const update = [action.credentials].concat(state.filter(cred => credentialsToId(cred) !== id));
          return update;
        } else {
          return state;
        }
      }

    case 'FORGET_CREDENTIALS':
      {
        const {
          id
        } = action;
        return state.filter(cred => credentialsToId(cred) !== id);
      }

    default:
      return state;
  }
}

const persist = new _persister.default('past-credentials', []);

var _default = persist.wrap(list);

exports.default = _default;