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
    to:'',
    from:''
}

export function  init():MessageState{
    let state:MessageState = {
        type:actionTypes.MESSAGE_ONLINE,
        userName:'',
        mobile:'',
        from:'',
        to:'',
        mqtt:{}
    } 
    return  state;
}

function messageState(state: MessageState = init(), action: Action): MessageState {
    // console.log("messagestate");
    switch (action.type) { 
      // case actionTypes.MESSAGE_ONLINE: { 
      //   return Object.assign({}, state, {
      //     userName:action.credential.realName,
      //     mobile:action.credential.mobile,
      //     to:'',
      //     from:action.credential.mobile,
      //     type:actionTypes.MESSAGE_ONLINE
      //   })
      // } 
      case actionTypes.MESSAGE_ONLINE: { 
        let credential=action.credential;
        //module test...
        credential={
          realName: "1号",
          mobile: "1",
          server: "http://www.begonia.com",
          port: "80",
          password: "1"
        }
        return Object.assign({}, state, {
          userName:credential.realName,
          mobile:credential.mobile,
          to:'',
          from:credential.mobile,
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
          userName:action.userName,
          mobile:action.to,
          to:action.to,
          type:actionTypes.PRECHECKMESSAGE_ONLINE,
          historyMessages:action.historyMessages
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
      // send message 
      case actionTypes.SENDMESSAGE_SUCCESS:{
        return Object.assign({}, state, {
          sendStatus:true,
          date:action.date,
          type:actionTypes.SENDMESSAGE_SUCCESS
        })
      }
      case actionTypes.SENDMESSAGE_FAILED:{
        return Object.assign({}, state, {
          sendStatus:false,
          date:action.date,
          msg:action.msg,
          type:actionTypes.SENDMESSAGE_FAILED
        })
      }
      case actionTypes.ACTIVEONLINE_USER:{
        return Object.assign({}, state, {
          activeOnline:action.activeOnline,
          type:actionTypes.ACTIVEONLINE_USER
        })
      }
      default:
        return state
    }
  }

export  default   messageState;