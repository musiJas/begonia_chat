"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = require("fs");

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var types = _interopRequireWildcard(require("../../common/actionTypes"));

var _constants = require("../../common/constants");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// users left panel 
class UserLeftPanel extends _react.default.Component {
  constructor(props) {
    super(props);
    this.state = {
      showScroll: false,
      index: '1'
    };
  }

  funCheck(index, to) {
    console.log(this.props);
    this.setState({
      index: index,
      to: to
    });
    this.props.dispatch({
      type: types.USERSMANAGER_INFO,
      to: to
    });
  }

  render() {
    const showScroll = this.state.showScroll;
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "main_leftPanel_div"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "main_leftPanel_search"
    }, " search"), /*#__PURE__*/_react.default.createElement("ul", {
      className: `main_leftPanel_ul  ${showScroll ? "show_scroll" : ''}`,
      onMouseEnter: e => {
        this.setState({
          showScroll: true
        });
      },
      onMouseLeave: e => {
        this.setState({
          showScroll: false
        });
      }
    }, /*#__PURE__*/_react.default.createElement("li", {
      index: '1',
      onClick: this.funCheck.bind(this, '1', "3"),
      className: `main_leftPanel_li  ${this.state.index == '1' ? "main_left_li" : ''} `
    }, "user\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '2',
      onClick: this.funCheck.bind(this, '2', "3"),
      className: `main_leftPanel_li  ${this.state.index == '2' ? "main_left_li" : ''} `
    }, "user\u6D4B\u8BD52"), /*#__PURE__*/_react.default.createElement("li", {
      index: '3',
      onClick: this.funCheck.bind(this, '3', "3"),
      className: `main_leftPanel_li  ${this.state.index == '3' ? "main_left_li" : ''} `
    }, "user\u6D4B\u8BD53"), /*#__PURE__*/_react.default.createElement("li", {
      index: '4',
      onClick: this.funCheck.bind(this, '4', "3"),
      className: `main_leftPanel_li  ${this.state.index == '4' ? "main_left_li" : ''} `
    }, "user\u6D4B\u8BD54"), /*#__PURE__*/_react.default.createElement("li", {
      index: '5',
      onClick: this.funCheck.bind(this, '5', "3"),
      className: `main_leftPanel_li  ${this.state.index == '5' ? "main_left_li" : ''} `
    }, "user\u6D4B\u8BD55"), /*#__PURE__*/_react.default.createElement("li", {
      index: '6',
      className: `main_leftPanel_li  ${this.state.index == '6' ? "main_left_li" : ''} `
    }, "user\u6D4B\u8BD56"), /*#__PURE__*/_react.default.createElement("li", {
      index: '7',
      className: `main_leftPanel_li  ${this.state.index == '7' ? "main_left_li" : ''} `
    }, "user\u6D4B\u8BD57"), /*#__PURE__*/_react.default.createElement("li", {
      index: '8',
      className: `main_leftPanel_li  ${this.state.index == '8' ? "main_left_li" : ''} `
    }, "user\u6D4B\u8BD58"), /*#__PURE__*/_react.default.createElement("li", {
      index: '9',
      className: `main_leftPanel_li  ${this.state.index == '9' ? "main_left_li" : ''} `
    }, "user\u6D4B\u8BD59"), /*#__PURE__*/_react.default.createElement("li", {
      index: '10',
      className: `main_leftPanel_li  ${this.state.index == '10' ? "main_left_li" : ''} `
    }, "user\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '11',
      className: `main_leftPanel_li  ${this.state.index == '11' ? "main_left_li" : ''} `
    }, "user\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '12',
      className: `main_leftPanel_li  ${this.state.index == '12' ? "main_left_li" : ''} `
    }, "user\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '13',
      className: `main_leftPanel_li  ${this.state.index == '13' ? "main_left_li" : ''} `
    }, "user\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '14',
      className: `main_leftPanel_li  ${this.state.index == '14' ? "main_left_li" : ''} `
    }, "user\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '15',
      className: `main_leftPanel_li  ${this.state.index == '15' ? "main_left_li" : ''} `
    }, "user\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '16',
      className: `main_leftPanel_li  ${this.state.index == '16' ? "main_left_li" : ''} `
    }, "user\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '17',
      className: `main_leftPanel_li  ${this.state.index == '17' ? "main_left_li" : ''} `
    }, "user\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '18',
      className: `main_leftPanel_li  ${this.state.index == '18' ? "main_left_li" : ''} `
    }, "user\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '19',
      className: `main_leftPanel_li  ${this.state.index == '19' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '20',
      className: `main_leftPanel_li  ${this.state.index == '20' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '21',
      className: `main_leftPanel_li  ${this.state.index == '21' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '22',
      className: `main_leftPanel_li  ${this.state.index == '22' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '23',
      className: `main_leftPanel_li  ${this.state.index == '23' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '10',
      className: `main_leftPanel_li  ${this.state.index == '10' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '11',
      className: `main_leftPanel_li  ${this.state.index == '11' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '12',
      className: `main_leftPanel_li  ${this.state.index == '12' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '13',
      className: `main_leftPanel_li  ${this.state.index == '13' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '14',
      className: `main_leftPanel_li  ${this.state.index == '14' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '15',
      className: `main_leftPanel_li  ${this.state.index == '15' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '16',
      className: `main_leftPanel_li  ${this.state.index == '16' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '17',
      className: `main_leftPanel_li  ${this.state.index == '17' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '18',
      className: `main_leftPanel_li  ${this.state.index == '18' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '19',
      className: `main_leftPanel_li  ${this.state.index == '19' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '20',
      className: `main_leftPanel_li  ${this.state.index == '20' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '21',
      className: `main_leftPanel_li  ${this.state.index == '21' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '22',
      className: `main_leftPanel_li  ${this.state.index == '22' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '23',
      className: `main_leftPanel_li  ${this.state.index == '23' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '10',
      className: `main_leftPanel_li  ${this.state.index == '10' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '11',
      className: `main_leftPanel_li  ${this.state.index == '11' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '12',
      className: `main_leftPanel_li  ${this.state.index == '12' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '13',
      className: `main_leftPanel_li  ${this.state.index == '13' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '14',
      className: `main_leftPanel_li  ${this.state.index == '14' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '15',
      className: `main_leftPanel_li  ${this.state.index == '15' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '16',
      className: `main_leftPanel_li  ${this.state.index == '16' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '17',
      className: `main_leftPanel_li  ${this.state.index == '17' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '18',
      className: `main_leftPanel_li  ${this.state.index == '18' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '19',
      className: `main_leftPanel_li  ${this.state.index == '19' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '20',
      className: `main_leftPanel_li  ${this.state.index == '20' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '21',
      className: `main_leftPanel_li  ${this.state.index == '21' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '22',
      className: `main_leftPanel_li  ${this.state.index == '22' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '23',
      className: `main_leftPanel_li  ${this.state.index == '23' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '10',
      className: `main_leftPanel_li  ${this.state.index == '10' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '11',
      className: `main_leftPanel_li  ${this.state.index == '11' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '12',
      className: `main_leftPanel_li  ${this.state.index == '12' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '13',
      className: `main_leftPanel_li  ${this.state.index == '13' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '14',
      className: `main_leftPanel_li  ${this.state.index == '14' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '15',
      className: `main_leftPanel_li  ${this.state.index == '15' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '16',
      className: `main_leftPanel_li  ${this.state.index == '16' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '17',
      className: `main_leftPanel_li  ${this.state.index == '17' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '18',
      className: `main_leftPanel_li  ${this.state.index == '18' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '19',
      className: `main_leftPanel_li  ${this.state.index == '19' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '20',
      className: `main_leftPanel_li  ${this.state.index == '20' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '21',
      className: `main_leftPanel_li  ${this.state.index == '21' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '22',
      className: `main_leftPanel_li  ${this.state.index == '22' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '23',
      className: `main_leftPanel_li  ${this.state.index == '23' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '10',
      className: `main_leftPanel_li  ${this.state.index == '10' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '11',
      className: `main_leftPanel_li  ${this.state.index == '11' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '12',
      className: `main_leftPanel_li  ${this.state.index == '12' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '13',
      className: `main_leftPanel_li  ${this.state.index == '13' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '14',
      className: `main_leftPanel_li  ${this.state.index == '14' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '15',
      className: `main_leftPanel_li  ${this.state.index == '15' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '16',
      className: `main_leftPanel_li  ${this.state.index == '16' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '17',
      className: `main_leftPanel_li  ${this.state.index == '17' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '18',
      className: `main_leftPanel_li  ${this.state.index == '18' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '19',
      className: `main_leftPanel_li  ${this.state.index == '19' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '20',
      className: `main_leftPanel_li  ${this.state.index == '20' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '21',
      className: `main_leftPanel_li  ${this.state.index == '21' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '22',
      className: `main_leftPanel_li  ${this.state.index == '22' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '23',
      className: `main_leftPanel_li  ${this.state.index == '23' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '10',
      className: `main_leftPanel_li  ${this.state.index == '10' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '11',
      className: `main_leftPanel_li  ${this.state.index == '11' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '12',
      className: `main_leftPanel_li  ${this.state.index == '12' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '13',
      className: `main_leftPanel_li  ${this.state.index == '13' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '14',
      className: `main_leftPanel_li  ${this.state.index == '14' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '15',
      className: `main_leftPanel_li  ${this.state.index == '15' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '16',
      className: `main_leftPanel_li  ${this.state.index == '16' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '17',
      className: `main_leftPanel_li  ${this.state.index == '17' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '18',
      className: `main_leftPanel_li  ${this.state.index == '18' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '19',
      className: `main_leftPanel_li  ${this.state.index == '19' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '20',
      className: `main_leftPanel_li  ${this.state.index == '20' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '21',
      className: `main_leftPanel_li  ${this.state.index == '21' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '22',
      className: `main_leftPanel_li  ${this.state.index == '22' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '23',
      className: `main_leftPanel_li  ${this.state.index == '23' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '10',
      className: `main_leftPanel_li  ${this.state.index == '10' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '11',
      className: `main_leftPanel_li  ${this.state.index == '11' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '12',
      className: `main_leftPanel_li  ${this.state.index == '12' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '13',
      className: `main_leftPanel_li  ${this.state.index == '13' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '14',
      className: `main_leftPanel_li  ${this.state.index == '14' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '15',
      className: `main_leftPanel_li  ${this.state.index == '15' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '16',
      className: `main_leftPanel_li  ${this.state.index == '16' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '17',
      className: `main_leftPanel_li  ${this.state.index == '17' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '18',
      className: `main_leftPanel_li  ${this.state.index == '18' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '19',
      className: `main_leftPanel_li  ${this.state.index == '19' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '20',
      className: `main_leftPanel_li  ${this.state.index == '20' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '21',
      className: `main_leftPanel_li  ${this.state.index == '21' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '22',
      className: `main_leftPanel_li  ${this.state.index == '22' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '23',
      className: `main_leftPanel_li  ${this.state.index == '23' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '10',
      className: `main_leftPanel_li  ${this.state.index == '10' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '11',
      className: `main_leftPanel_li  ${this.state.index == '11' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '12',
      className: `main_leftPanel_li  ${this.state.index == '12' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '13',
      className: `main_leftPanel_li  ${this.state.index == '13' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '14',
      className: `main_leftPanel_li  ${this.state.index == '14' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '15',
      className: `main_leftPanel_li  ${this.state.index == '15' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '16',
      className: `main_leftPanel_li  ${this.state.index == '16' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '17',
      className: `main_leftPanel_li  ${this.state.index == '17' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '18',
      className: `main_leftPanel_li  ${this.state.index == '18' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '19',
      className: `main_leftPanel_li  ${this.state.index == '19' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '20',
      className: `main_leftPanel_li  ${this.state.index == '20' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '21',
      className: `main_leftPanel_li  ${this.state.index == '21' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '22',
      className: `main_leftPanel_li  ${this.state.index == '22' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51"), /*#__PURE__*/_react.default.createElement("li", {
      index: '23',
      className: `main_leftPanel_li  ${this.state.index == '23' ? "main_left_li" : ''} `
    }, "\u6D4B\u8BD51")));
  }

}

var _default = (0, _reactRedux.connect)((state, ownProps) => {
  return {
    route: state.userModule
  };
})(UserLeftPanel);

exports.default = _default;