// @flow
import type { visibilityFilters, loginSccuess } from '../common/actions'
import type { ReceiverState,CredentialsT} from '../common/constants'
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

export function  init():ReceiverState{
    let state:ReceiverState = {
        receiveMessages:[]
    } 
    return  state;
}

function receiverState(state: ReceiverState = init(), action: Action): ReceiverState {
    switch (action.type) { 
      case actionTypes.RECEIVERMESSAGE_INFO:{
        return Object.assign({}, state, {
          receiveMessages:action.receiveMessages,
          type:actionTypes.RECEIVERMESSAGE_INFO
        })
      }
      case actionTypes.HISTORYMESSAGE_INFO:{
        return Object.assign({}, state, {
          historyMessages:action.historyMessages,
          type:actionTypes.HISTORYMESSAGE_INFO
        })
      }
      case actionTypes.HISTORYGROUPMESSAGE_INFO:{
        return Object.assign({}, state, {
          historyGroupMessages:action.historyGroupMessages,
          type:actionTypes.HISTORYGROUPMESSAGE_INFO
        })
      }
      default:
        return state
    }
  }

export  default   receiverState;