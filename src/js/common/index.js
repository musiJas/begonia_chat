// common redux

import type {
    Store as ReduxStore
    // Dispatch as ReduxDispatch
  } from 'redux'


  export type RouteT =
  | { view: 'MAIN_MESSAGE_PAGE' }
  | { view: 'MAIN_PERSON_PAGE'}
  | { view: 'SETTINGS' }
  // split
  | {view:'LOGIN_SCCUESS',user:''}
  | {view:'LOGIN_FAILED',error:''}

/** 创建函数 */
export function loginSccuess(text){
  return {type:ADD_TODO,text}
} 






  export type IrcState = {
    route: RouteT,
    ui: {
      visible: boolean
    },
    settings: {
      isDark: boolean,
      quitMessage: string
    }
  }