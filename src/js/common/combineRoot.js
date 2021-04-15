// @flow
import { combineReducers } from 'redux'
// import connections from './connections'
// import creator from './creator'
// import credentials from './credentials'
import route from '../components/router'
import settings from '../reducer/settings'
import creator from '../reducer/creator'
import credentials from '../reducer/credentials'
// import ui from './ui'
import type { IrcState, Action } from './constants'

import  loginModule from  '../reducer/loginReducer'
import  messageModule  from '../reducer/messageReduce'
import  userModule  from '../reducer/userReducer'


type Root = (IrcState, Action) => IrcState

// function visibilityFilter(state = SHOW_ALL, action) {
//     switch (action.type) {
//       case SET_VISIBILITY_FILTER:
//         return action.filter
//       default:
//         return state
//     }
//   }
  



export const rootReducer: Root = combineReducers({
//   connections,
  //  creator,
    loginModule,
    messageModule,
    userModule,
    //credentials,
    //  route,
    settings
//   ui
})
