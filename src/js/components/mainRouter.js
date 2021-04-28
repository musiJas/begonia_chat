import * as React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'

import  MessageOnline from  '../components/msg/messageOnline'
import  UserManagerOnline from  '../components/users/userManagerOnline'
import  SettingManagerInfo from '../components/setting/settingManagerInfo'
import  MessageState  from  '../common/constants'


type props={
    mainRouter: loginModule,
    children: React.Node,
    dispatch: Dispatch
}


class  MainRouterComponent extends React.PureComponent<props>{
    renderContents() {
        const { mainRouter } = this.props
        console.log(this.props);
        //route.type
        switch (mainRouter.type) { 
            case 'MESSAGE_ONLINE':
                return <MessageOnline state={this.props.state} 
                        subscribe={this.props.subscribe}
                        unsub={this.props.unsubscribe}
                        publisher={this.props.publisher}/>
            case 'USERMANAGER_ONLINE':
                return <UserManagerOnline  />
            case 'SETTINGMANAGER_INFO':
                return <SettingManagerInfo/>    
            default:
                return <MessageOnline />

        }
    }


    render() {
        const { route, connections, children, dispatch } = this.props
            return (
                <React.Fragment>
                    {this.renderContents()}
                </React.Fragment>
            )
        }
    }


export default connect(
    (state: MessageState, ownProps): $Shape<Props> => {
    return {
        mainRouter: state.messageModule
    }
})(MainRouterComponent)  
