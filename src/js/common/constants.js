// @flow
import type {
  Store as ReduxStore
  // Dispatch as ReduxDispatch
} from 'redux'

type IrcConnectionStream = {
  join: (string) => void,
  nick: (string) => void,
  send: (to: string, msg: string) => void,
  notice: (string, string) => void,
  action: (target: string, msg: string) => void,
  part: (channel: Array<string>) => void,
  quit: (msg: string) => void
}

export type PersonT = {
  name: string,
  mode: string
}

//join
export  type  LoginUser = {
  mobile:string,
  password:string,
  userName:string,
  gender:string
}
//join 
export  type  Result = {
  code:BigInt,
  msg:string,
  obj:obj
}
 

type MessageType =
  | 'notice'
  | 'priv'
  | 'action'
  | 'motd'
  | 'welcome'
  | 'topic'
  | 'flow'
  | 'join'
  | 'away'
  | 'part'
  | 'quit'
  | 'error'

export type MessageT = {
  id: string,
  type: MessageType,
  text: string,
  from: string,
  to: string,
  when: Date
}

export type ConversationType = 'CHANNEL' | 'DIRECT' | 'CONNECTION'

export type ConversationT = {
  type: ConversationType,
  name: string,
  messages: Array<MessageT>,
  people: Array<PersonT>,
  receivedJoin: boolean,
  unreadCount: number
}

export type ConnectionT = {
  id: string,
  isConnected: boolean,
  isWelcome: boolean,
  nickname: string,
  realName: string,
  server: string,
  port: number,
  stream: IrcConnectionStream,
  error: ?string,
  //conversations: ?SelectList<ConversationT>
}

export type CredentialsT = {
  realName: string,
  mobile: string,
  server: string,
  port: number,
  password: string
}

export type chatMessage={
  topic:string,
  content:string,
  receiveGmt:string,
  from:string,
  to:string
}


export type  requestMsg = {
  reqId:string,
  groupId:string,
  msg:string,
  to:string,
  from:string,
  gmtTime:string
}




export type CreatorState = {
  isConnecting: boolean,
  credentials: CredentialsT,
  connection: ?ConnectionT,
  error: ?string
}

export type LoginState ={
  isLogin:Boolean,
  userName:string,
  password:string,
  validTime:BigInt,
  type:?string,
  error:?string,
  rememberCredentials: boolean,
  serverClass:String,
  useDefaultConfig:boolean,
  credentials:Array<CredentialsT>
}

export  type  MessageState={
  userName:string,
  mobile:string,
  to:string,
  showScroll:Boolean,
  msg:string,
  messages:Array<chatMessage>
}

export  type SettingState={
  desc:string

}


export  type  UserState={
  mobile:string,
  from:string
}



export type RouteT =
  | { view: 'CONNECTION_CREATOR' }
  | { view: 'CONNECTION', connectionId: string }
  | { view: 'SETTINGS' }
  | { view: 'LOGIN_SCCUESS'}
  | { view: 'LOGIN_TODO'}

export type IrcState = {
  creator: CreatorState,
  connections: {
    list: Array<ConnectionT>
  },
  route: RouteT,
  ui: {
    visible: boolean
  },
  settings: {
    isDark: boolean,
    quitMessage: string
  }
}

export type Action =
// begonia.chen add  
  | { type: 'LOGIN_SCCUESS',route:RouteT}

export type Store = ReduxStore<IrcState, Action>
export type GetState = () => IrcState
// export type Dispatch = ReduxDispatch<Action>;
/* eslint-disable no-use-before-define */
export type Dispatch = (action: Dispatchable) => any
export type Thunk = (dispatch: Dispatch, getState: GetState) => void
export type Dispatchable = Action | Thunk | Array<Action>
