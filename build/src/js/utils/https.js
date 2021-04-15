"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.put = exports.get = exports.post = exports.toLogin = void 0;

var _credetails = require("../common/credetails");

var _actions = require("../common/actions");

var _axios = _interopRequireDefault(require("axios"));

var _actionTypes = require("../common/actionTypes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//http client 
// import qs from 'Qs'
const applicationUrl = "/joinApp";

const toLogin = (credential, remember) => {
  console;
  const {
    realName,
    mobile,
    server,
    port,
    password
  } = credential;
  return (dispatch, getState) => {
    const baseUrl = (0, _credetails.credentialsToId)(credential);
    let requestUrl = baseUrl + applicationUrl;
    const user = {
      mobile: mobile,
      password: password,
      userName: realName,
      gender: 'M'
    };
    const res = post(requestUrl + "/login", user).then(function (res) {
      console.log(res.msg);
      dispatch(res.code == 200 ? (0, _actions.loginSccuess)(res.obj) : (0, _actions.loginFailed)(res.msg));
    });
  };
};

exports.toLogin = toLogin;

const checkStatus = res => {
  if (200 >= res.status < 300) {
    return res;
  }

  message.error(`网络请求失败,${res.status}`);
  const error = new Error(res.statusText);
  error.response = response;
  throw error;
};
/**
 * 捕获成功登录过期状态码等
 * @param res
 * @returns {*}
 */


const judgeOkState = async res => {
  const cloneRes = await res.clone().json(); //TODO:可以在这里管控全局请求

  if (cloneRes.code !== 200) {
    console.error(`${cloneRes.msg}${cloneRes.code}`); //message.error();
  }

  return res;
};
/**
 * 捕获失败
 * @param error
 */


const handleError = error => {
  if (error instanceof TypeError) {
    console.error(`网络请求失败啦！${error}`); //message.error(`网络请求失败啦！${error}`);
  }

  return {
    //防止页面崩溃，因为每个接口都有判断res.code以及data
    code: -1,
    data: false
  };
};

class http {
  /**
  *静态的fetch请求通用方法
  * @param url
  * @param options
  * @returns {Promise<unknown>}
  */
  static async staticFetch(url = '', options = {}) {
    const defaultOptions = {
      /*允许携带cookies*/
      credentials: 'include',

      /*允许跨域**/
      mode: 'cors',
      headers: {
        token: null,
        Authorization: null // 当请求方法是POST，如果不指定content-type是其他类型的话，默认为如下↓，要求参数传递样式为 key1=value1&key2=value2，但实际场景以json为多
        // 'content-type': 'application/x-www-form-urlencoded',

      }
    };

    if (options.method === 'POST' || 'PUT') {
      defaultOptions.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8';
    }

    const newOptions = { ...defaultOptions,
      ...options
    };
    let data = newOptions.body;
    var form = new FormData();

    for (let obj of data.entries()) {
      var value = String(obj[1]);
      form.append(obj[0], value);
    }

    console.log('form:' + form);
    _axios.default.defaults.timeout = 10000;
    return _axios.default.post(url, form).then(res => {
      console.log(res);
      return Promise.resolve(res.data); //return  res.data;
    }).catch(err => {
      console.log(err);
      return Promise.resolve({
        isLogin: false,
        error: err.msg
      });
    });
  }
  /**
  *post请求方式
  * @param url
  * @returns {Promise<unknown>}
  */


  post(url, paramsArgs = {}, option = {}) {
    const options = Object.assign({
      method: 'POST'
    }, option); //一般我们常用场景用的是json，所以需要在headers加Content-Type类型

    console.log('formData:' + JSON.stringify(paramsArgs));
    let data = new FormData();

    for (let key in paramsArgs) {
      data.append(key, paramsArgs[key]);
    }

    options.body = data; // //可以是上传键值对形式，也可以是文件，使用append创造键值对数据
    // if (options.type === 'FormData' && options.body !== 'undefined') {
    //     console.log('form')
    //     let params = new FormData();
    //     for (let key of Object.keys(options.body)) {
    //         params.append(key, options.body[key]);
    //     }
    //     options.body = params;
    // }else{
    //     options.body = JSON.stringify(params);
    // }

    return http.staticFetch(url, options); //类的静态方法只能通过类本身调用
  }
  /**
  * put方法
  * @param url
  * @returns {Promise<unknown>}
  */


  put(url, params = {}, option = {}) {
    const options = Object.assign({
      method: 'PUT'
    }, option);
    options.body = JSON.stringify(params);
    return http.staticFetch(url, options); //类的静态方法只能通过类本身调用
  }
  /**
  * get请求方式
  * @param url
  * @param option
  */


  get(url, option = {}) {
    const options = Object.assign({
      method: 'GET'
    }, option);
    return http.staticFetch(url, options);
  }

}

const requestFun = new http(); //new生成实例

const {
  post,
  get,
  put
} = requestFun;
exports.put = put;
exports.get = get;
exports.post = post;
var _default = requestFun;
exports.default = _default;