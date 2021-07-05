import React from 'react'
import Router from './components/router'
import Login  from './login/login'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import type { Store as ReduxStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { rootReducer }   from  './common/combineRoot'
import { LOGIN_FAILED } from './common/actions'
import {beforeLoad} from './common/actions';
import { LOGIN_SCCUESS, LOGIN_TODO } from './common/actionTypes'
const inProduction = process.env.NODE_ENV === 'dev'

const  mainDiv=document.getElementById("main");
const initialState = {};
const {dialog,ipcMain,ipcRenderer} = require('electron').remote

// , notifMiddleware, storeChannelsMiddleware
const middleware = [thunkMiddleware]
const composeEnhancers = inProduction
  ? compose
  : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  // if (!inProduction) middleware.push(require('redux-logger').default)


const store: ReduxStore = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware.apply(null, middleware))
) 


  let state=store.getState();
  console.log("initial state->");
  console.log(state);
  console.log(dialog);
  console.log(ipcMain);

//返回监听的数据
const  unSubSciption=store.subscribe(()=>{
  console.log(store.getState())
})

// window.addEventListener('beforeunload', () => {
//     const state: IrcState = store.getState()
//     state.connections.list.map((conn) => {
//         conn.stream.quit(state.settings.quitMessage)
//     })
//   })



if(mainDiv){
    render(
         <Provider  store={store}>
            <Router />
         </Provider>,
        mainDiv
      )
}else {
    console.error("root main element is not  exist.....");
}
