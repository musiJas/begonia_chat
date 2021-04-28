// @flow
import type { visibilityFilters, loginSccuess } from '../common/actions'
import type { LoginState,CredentialsT} from '../common/constants'
import type {Action} from  '../common/actions'
import  * as actionTypes from  '../common/actionTypes'
import { types } from '@babel/core';

const defaultCreds = {
  realName: '',
  nickname: '',
  server: 'http://www.begonia.com',
  port: 80,
  password: '',
  mobile:''
}

export function  init():LoginState{
    let state:LoginState = {
        isLogin:false,
        type:"LOGIN_TODO",
        error:null,
        credential: defaultCreds,
        disabled:false,
        credentials:[]
    } 
    return  state;
}

function loginState(state: LoginState = init(), action: Action): LoginState {
    console.log(action);
    switch (action.type) { 
      case actionTypes.LOGIN_SCCUESS: { 
        return Object.assign({}, state, {
          userName:state.userName,
          isLogin:true,
          type:actionTypes.LOGIN_SCCUESS
        })
      } 
      case actionTypes.LOGIN_TODO:
        return Object.assign({}, state, { 
          isLogin:false,
          type:"LOGIN_TODO",
          credentials: state.credentials
        })
      case actionTypes.LOGIN_FAILED:
        return Object.assign({}, action, {
          isLogin:false,
          error:action.error,
          type:"LOGIN_FAILED",
          credentials:state.credentials,
          credential:state.credential
        })
      case actionTypes.CREDENTIALS_UPDATE:
       let  stats= Object.assign({},action,{
          isLogin:false,
          type:actionTypes.CREDENTIALS_UPDATE,
          credentials:state.credentials,
          credential:Object.assign({}, state.credential,  action.update )
        })

        return stats
        
      default:
        return state
    }
  }

export  default   loginState;