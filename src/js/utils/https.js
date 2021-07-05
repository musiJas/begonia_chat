//http client 
import { credentialsToId } from '../common/credetails'
import type { Thunk, CredentialsT,Result,LoginUser } from '../common/constants'
import {loginFailed, loginSccuess, sendFail, sendSuccess} from '../common/actions';
import { LOGIN_FAILED } from '../common/actionTypes';
import { connect } from 'react-redux' 
import { stat } from 'fs';
import * as  httpClient from './httpClient'

/**
 * 请求地址管理
 */
const base = {
    joinUp:"/joinApp",
}


// 登录
export const  toLogin =(
    credential: CredentialsT,
    remember: boolean,
):Thunk => {
    const { realName, mobile, server, port,password } = credential
    return (dispatch, getState) => {
        let user ={
            mobile:mobile,
            password:password,
            userName:realName,
            gender:'M'
        }
        sessionStorage.setItem("server", server);
        sessionStorage.setItem("port", port);
        const  res=httpClient.post(requestJoinUpUrl("/login"),user).then(function(res){
            dispatch(res.code==200?loginSccuess(res.obj):loginFailed(res.msg));
        }); 
    }
}    

// 获取用户
export const  getUsers=(mobile)=>{
    let res=httpClient.post(requestJoinUpUrl("/users"),{mobile});
    return res;
}

// 获取用户
export const  onLineUser=(mobile)=>{
    let res=httpClient.post(requestJoinUpUrl("/onLineUser"),{mobile});
    return res;
}



export  const sendMsg=(requestMsg)=>{
    let res=httpClient.post(requestJoinUpUrl("/sendMsg"),requestMsg);
    return res;
}

export const listMessage=(requestMsg)=>{
    let res=httpClient.post(requestJoinUpUrl("/list/messages"),requestMsg);
    return res;
}

export const emojiList=()=>{
    let res=httpClient.post(requestJoinUpUrl("/emoji/list"),{});
    return res;
}


export const postFile=(requestMsg)=>{
    let res=httpClient.postFile(requestJoinUpUrl("/sendFileMsg"),requestMsg);
    return res;
}

// // 获取send message 
// export const  sendMsg=(
//     requestMsg:requestMsg
// ):Thunk=>{
//     return (dispatch, getState) => {
//         const  res=httpClient.post(requestJoinUpUrl(getState(),"/msg/sendMsg"),requestMsg).then(function(res){ 
//             console.log(res.msg); 
//             dispatch(res.code==200?sendSuccess(res.obj):sendFail(res.msg));
//         }); 
//     }
// }




























export function  requestJoinUpUrl(url){
    const domain=sessionStorage.getItem("server");
    const port = sessionStorage.getItem("port");
    if(port =='80' || port =='443'){
        return domain+base.joinUp+url;
    }else {
        return domain+":"+port+base.joinUp+url;
    }
}



