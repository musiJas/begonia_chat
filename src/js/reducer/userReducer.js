// @flow
import type { visibilityFilters, loginSccuess } from '../common/actions'
import type { UserState,CredentialsT} from '../common/constants'
import type {Action} from  '../common/actions'
import  * as actionTypes from  '../common/actionTypes'
import { types } from '@babel/core';
import { stat } from 'fs';


export function  init():UserState{
    let state:UserState = {
        type:actionTypes.DEFAULTUSER_INFO,
    } 
    return  state;
}

function userState(state: UserState = init(), action: Action): UserState {
    
    switch (action.type) { 
        case actionTypes.USERSMANAGER_INFO:{
            return Object.assign({}, state, { 
              userName:state.userName,
              mobile:state.mobile,
              to:state.to,
              type:actionTypes.USERSMANAGER_INFO
            }) 
        }
        default:
            return state
    }
  }

export  default   userState;