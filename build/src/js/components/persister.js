"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const {
  localStorage
} = window;

class Persistor {
  constructor(key, def) {
    this.key = key;
    this.default = def;
  }

  init() {
    if (this.key in localStorage) {
      try {
        return JSON.parse(localStorage[this.key]);
      } catch (e) {
        if (e instanceof SyntaxError) {
          localStorage.removeItem(this.key);
          return this.default;
        } else {
          throw e;
        }
      }
    } else {
      return this.default;
    }
  }

  wrap(reducer) {
    return (state, action) => {
      const after = reducer(state || this.init(), action);

      if (typeof after !== 'undefined' && state !== after) {
        localStorage.setItem(this.key, JSON.stringify(after));
      }

      return after;
    };
  }

}

exports.default = Persistor;