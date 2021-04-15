// @flow
import type { visibilityFilters, loginSccuess } from '../common/actions'
import type { LoginState,CredentialsT} from '../common/constants'
import type {Action} from  '../common/actions'
import  * as actionTypes from  '../common/actionTypes'
import { types } from '@babel/core';
import { stat } from 'fs';

const defaultProps = {
    userName:'',
    mobile:'',
    to:''
}

export function  init():MessageState{
    let state:MessageState = {
        type:actionTypes.MESSAGE_ONLINE,
        userName:'',
        mobile:'',
        to:''
    } 
    return  state;
}

function messageState(state: MessageState = init(), action: Action): MessageState {
    console.log(action);
    switch (action.type) { 
      case actionTypes.MESSAGE_ONLINE: { 
        return Object.assign({}, state, {
          userName:state.userName,
          mobile:'',
          to:'',
          type:actionTypes.MESSAGE_ONLINE
        })
      } 
      case actionTypes.USERMANAGER_ONLINE:
        return Object.assign({}, state, { 
            userName:state.userName,
            mobile:'',
            to:'',
            type:actionTypes.USERMANAGER_ONLINE
        })
      case actionTypes.PRECHECKMESSAGE_ONLINE:{
        return Object.assign({}, state, { 
          userName:state.userName,
          mobile:state.mobile,
          to:action.to,
          type:actionTypes.PRECHECKMESSAGE_ONLINE
        })
      }
      case actionTypes.SENDMESSAGE_ONLINE:{
        return Object.assign({}, state, { 
          userName:state.userName,
          mobile:state.mobile,
          to:state.to,
          type:actionTypes.SENDMESSAGE_ONLINE
        })
      }
      case actionTypes.PUSHMESSAGE_MQTT:{
        return Object.assign({}, state, { 
          userName:state.userName,
          mobile:state.mobile,
          to:state.to,
          type:actionTypes.PUSHMESSAGE_MQTT
        })
      }
      case actionTypes.SETTINGMANAGER_INFO: { 
        return Object.assign({}, state, {
          desc:action.desc,
          type:actionTypes.SETTINGMANAGER_INFO
        })
      }
      default:
        return state
    }
  }

export  default   messageState;