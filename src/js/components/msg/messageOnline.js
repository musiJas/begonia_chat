import React from 'react'
import { connect } from 'react-redux' 
import MessageLeftPanel  from './messageLeftPanel'
import MessageMiddlePanel  from './messageMiddlePanel'
import MessageRightPanel  from './messageRightPanel'


type Props = {
    route: RouteT,
    dispatch: Dispatch,
}


class MessageOnlinePage extends    React.Component<props>{




    render() {

        return (
            <div className="container">
                <div className="left-panel main_leftPanel">
                    <MessageLeftPanel/>
                </div>
                <div className="right-panel">
                    <MessageRightPanel/>
                </div>
            </div>
        )
        
    }

}


export default connect((state: MessageState, ownProps): $Shape<Props> => {
    return {
      route: state.messageModule
    }
  })(MessageOnlinePage)