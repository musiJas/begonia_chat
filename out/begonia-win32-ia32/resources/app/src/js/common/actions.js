import  * as types from  './actionTypes'
/***
 * action 说明了处理的细节
 * reducer 真正更新state中的内容
 */
// export const visibilityFilters={
//     LOGIN_SCCUESS:"LOGIN_SCCUESS",
//     LOGIN_FAILED:"LOGIN_FAILED",
//     LOGIN_TODO:"LOGIN_TODO",
//     MAIN_SETTINGS:"MAIN_SETTINGS",
//     MAIN_SEND:"MAIN_SEND",
//     MAIN_USERS:"MAIN_USERS"

// }
export type Action =
// begonia.chen add  
  | { type: 'LOGIN_SCCUESS'}
  | { type: 'LOGIN_TODO'}




export  const  loginSccuess = user =>(
  {
    type:types.LOGIN_SCCUESS,
    user:user,
    credential:user,
    isLogin:true
})
export  const  loginTODO = () =>({
    type:types.LOGIN_TODO,
    isLogin:false
})

export  const  loginFailed = (text) =>({
  type:types.LOGIN_FAILED,
  isLogin:false,
  error:text
})

export const sendSuccess= (date)=>({
  type:types.SENDMESSAGE_SUCCESS,
  data:date,
})

export const sendFail= (msg)=>({
  type:types.SENDMESSAGE_FAILED,
  msg:msg
})