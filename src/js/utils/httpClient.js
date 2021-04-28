//http client 
import { credentialsToId } from '../common/credetails'
import type { Thunk, CredentialsT,Result,LoginUser } from '../common/constants'
import {loginFailed, loginSccuess} from '../common/actions';
import { LOGIN_FAILED } from '../common/actionTypes';
import qs from 'querystring'
// import qs from 'Qs'

import api from  './https'

const  applicationUrl="/joinApp"

// export const  toLogin =(
//     credential: CredentialsT,
//     remember: boolean,
// ):Thunk => {
    
//     const { realName, mobile, server, port,password } = credential
  
//     return (dispatch, getState) => {
//       const baseUrl = credentialsToId(credential)
//       let requestUrl=baseUrl+applicationUrl;
//         let user ={
//             mobile:mobile,
//             password:password,
//             userName:realName,
//             gender:'M'
//         }
//         const  res=post(requestUrl+"/login",user).then(function(res){ 
//             dispatch(res.code==200?loginSccuess(res.obj):loginFailed(res.msg));
//         }); 
//     }
// }    

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
    const cloneRes = await res.clone().json();
    //TODO:可以在这里管控全局请求
    if (cloneRes.code !== 200) {
        console.error(`${cloneRes.msg}${cloneRes.code}`);
        //message.error();
    }
    return res;
   };
   
   /**
    * 捕获失败
    * @param error
    */
   const handleError = error => {
    if (error instanceof TypeError) {
        console.error(`网络请求失败啦！${error}`);
        //message.error(`网络请求失败啦！${error}`);
    }
    return { //防止页面崩溃，因为每个接口都有判断res.code以及data
        code: -1,
        data: false,
    };
   };


class httpClient {
    /**
    *静态的fetch请求通用方法
    * @param url
    * @param options
    * @returns {Promise<unknown>}
    */
    static async staticFetch(url = '', options = {}):Promise {
        const defaultOptions = {
        /*允许携带cookies*/
        credentials: 'include',
        /*允许跨域**/
        mode: 'cors',
        headers: {
            token: null,
            Authorization: null,
            // 当请求方法是POST，如果不指定content-type是其他类型的话，默认为如下↓，要求参数传递样式为 key1=value1&key2=value2，但实际场景以json为多
            // 'content-type': 'application/x-www-form-urlencoded',
            },
        };
        if (options.method === 'POST' || 'PUT') {
            defaultOptions.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8';
        }
        const newOptions = { ...defaultOptions, ...options };
            let data=newOptions.body;
            return fetch(url,newOptions)
                .then((res) => { 
                    return Promise.resolve(res.json())
                }).catch((err) => {
                    return Promise.resolve({
                        isLogin:false,
                        error:err.msg
                    })
                })

    }
   
    /**
    *post请求方式
    * @param url
    * @returns {Promise<unknown>}
    */
    post(url, paramsArgs = {}, option = {}) {
        const options = Object.assign({ method: 'POST' }, option);
        //一般我们常用场景用的是json，所以需要在headers加Content-Type类型

        // for(let key of Object.keys(paramsArgs)){
        // }
        console.log(paramsArgs); 
        options.body = qs.stringify(paramsArgs);
        return httpClient.staticFetch(url, options); //类的静态方法只能通过类本身调用
    }
   
    /**
    * put方法
    * @param url
    * @returns {Promise<unknown>}
    */
    put(url, params = {}, option = {}) {
    const options = Object.assign({ method: 'PUT' }, option);
    options.body = JSON.stringify(params);
    return http.staticFetch(url, options); //类的静态方法只能通过类本身调用
    }
   
    /**
    * get请求方式
    * @param url
    * @param option
    */
    get(url, option = {}) {
    const options = Object.assign({ method: 'GET' }, option);
    return http.staticFetch(url, options);
    }
}

   const requestFun = new httpClient(); //new生成实例
export const { post, get, put } = requestFun;
export default requestFun;
