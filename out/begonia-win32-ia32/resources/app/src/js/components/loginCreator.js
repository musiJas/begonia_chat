import React,{createRef}  from 'react'
import { connect } from 'react-redux'
// import { toLogin } from '../utils/httpClient'
import loginModule from  '../reducer/loginReducer'
import { credentialsToId } from '../common/credetails'
import { toLogin } from '../utils/https'
import type { Dispatch, CreatorState, CredentialsT,LoginState } from '../common/constants'

type Props = LoginState & {
  dispatch: Dispatch,
  savedCreds: CredentialsT[],
}

class LoginCreator extends React.Component<Props> {
  render() {
    const {
      isConnecting,
      credential,
      error,
      savedCreds,
      dispatch
    } = this.props
    
   
    const listItems = savedCreds.map((cred) => (
      <li
        className="saved-credentials"
        key={credentialsToId(cred)}
        onClick={() => {
          dispatch({
            type: 'CREDENTIALS_UPDATE',
            update: cred
          })
        }}
      >
        <p className="mobile">{cred.mobile}</p>
        <small>
          {cred.server}:{cred.port}
        </small>
        <button
          className="forget"
          onClick={(e) => {
            e.stopPropagation()
            dispatch({
              type: 'FORGET_CREDENTIALS',
              id: credentialsToId(cred)
            })
          }}
        >
          x
        </button>
      </li>
    ))
    return (
      <div className="container connection-creator">
        <Panels secondary={savedCreds.length ? <ul>{listItems}</ul> : null}>
          {error && (
            <div className="connection-error">
              <p>{error}</p>
            </div>
          )}l
          <Login
            credential ={credential}
            disabled={false}
            onSubmit={(creds, remember) => {
              dispatch(toLogin(creds, remember))
            }}
            onChange={(name, value) => {
              dispatch({
                type: 'CREDENTIALS_UPDATE',
                update: {
                  [name]: value
                }
              })
            }}
          />
        </Panels>
      </div>
    )
  }
}

export default connect((state) => {
  return Object.assign({}, state.loginModule, { savedCreds: state.loginModule.credentials })
}
)(LoginCreator)

const Panels = (props) => {
  if (props.secondary) {
    return (
      <React.Fragment>
        <div className="left-panel">{props.secondary}</div>
        <div className="right-panel">{props.children}</div>
      </React.Fragment>
    )
  } else {
    return <div className="full-panel">{props.children}</div>
  }
}

type LoginProps = {
  disabled: boolean,
  credential: CredentialsT,
  onChange: (name: string, value: string) => void,
  onSubmit: (CredentialsT, boolean) => void 
}

class Login extends React.Component<LoginProps, LoginState> {
  constructor(props) {
    super(props)
    this.state = {
      rememberCredentials: false,
      serverClass:"none",
      useDefaultConfig:true,
      disabled:false,
    }
  }

  handleChange(event) {
    const { name, value } = event.target
    this.props.onChange(name, value)
  }

  componentDidMount (){

  }


  render() {
    const { disabled, credential, onSubmit } = this.props
    const { realName, mobile, password, server, port } = this.props.credential
    const { rememberCredentials,serverClass,useDefaultConfig } = this.state
    const inputGroupClass = 'input-group'
    
    return (
      <form
        className="login-form"
        onSubmit={(event) => {
          event.preventDefault()
          onSubmit(credential, rememberCredentials)
        }}
      >
        <div className={inputGroupClass}>
          <label>Real Name</label>
          <input
            type="text" 
            autoFocus
            required
            name="realName"  
            value={realName || ''}
            disabled={disabled}
            onChange={this.handleChange.bind(this)}
          />
        </div>
        <div className={inputGroupClass}>
          <label>Mobile</label>
          <input
            type="text"
            required
            name="mobile"
            value={mobile || ''}
            disabled={disabled}
            onChange={this.handleChange.bind(this)}
          />
        </div>
        <div className={inputGroupClass}>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password || ''}
            disabled={disabled}
            onChange={this.handleChange.bind(this)}
          />
        </div>
        <div style={{display:serverClass}} className={inputGroupClass}>
          <label>Server</label>
          <input
            type="text"
            name="server"
            value={server}
            disabled={disabled}
            onChange={this.handleChange.bind(this)}
          />
        </div>
        <div style={{display:serverClass}} className={inputGroupClass}>
          <label>Port</label>
          <input
            type="number"
            required
            name="port"
            value={port}
            disabled={disabled}
            onChange={this.handleChange.bind(this)}
          />
        </div>
        <div className="login-div" >
          <label className="checkbox-label login-config-label">
            <input
              type="checkbox"
              name="rememberCredentials"
              checked={rememberCredentials}
              onClick={(e) => {
                this.setState({
                  rememberCredentials: e.target.checked
                })
              }}
              onChange={(e)=>{
                  console.log('login in onchange....');
              }}
            />{' '}
            remember credentials?
          </label>
          <label className="checkbox-label login-config-label">
            <input
              type="checkbox"
              name="defaultServer"
              checked={useDefaultConfig}
              onClick={(e) => {
                if(useDefaultConfig){
                  this.setState({
                    serverClass:"inline-block",
                    useDefaultConfig: e.target.checked
                  })
                }else{
                  this.setState({
                    serverClass:"none",
                    useDefaultConfig: e.target.checked
                  })
                }
              }}
              onChange={(e)=>{
                console.log('login in onchange....');
              }}
            />{' '}
            used default config?
          </label>
        </div>
        <div className={inputGroupClass}>
          <input type="submit" disabled={disabled} value="Log In" />
        </div>
      </form>
    )
  }
}
