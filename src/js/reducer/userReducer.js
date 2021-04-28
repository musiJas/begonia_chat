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
        item:''
    } 
    return  state;
}

function userState(state: UserState = init(), action: Action): UserState {
    switch (action.type) { 
        case actionTypes.MESSAGE_ONLINE: { 
            return Object.assign({}, state, {
                userName:'1号',
                mobile:'1',
                to:'',
                from:'1',
                type:actionTypes.MESSAGE_ONLINE
            })
        } 
        case actionTypes.USERSMANAGER_INFO:{
            return Object.assign({}, state, { 
                item:action.item,
                type:actionTypes.USERSMANAGER_INFO
            }) 
        }

        default:
            return state
    }
  }

export  default   userState;