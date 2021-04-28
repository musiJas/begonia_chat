import React, { createContext }  from 'react'
import { connect } from 'react-redux' 
import MessageLeftPanel  from './messageLeftPanel'
import MessageMiddlePanel  from './messageMiddlePanel'
import MessageRightPanel  from './messageRightPanel'
import mqtt from "mqtt";
import config from '../../utils/propUtil'

type Props = {
    route: RouteT,
    dispatch: Dispatch,
}

const qosOption = [
    {
        label: "0",
        value: 0,
    },
    {
        label: "1",
        value: 1,
    },
    {
        label: "2",
        value: 2,
    },
];
export const QosOption = createContext([]);


class MessageOnlinePage extends    React.Component<props>{
    constructor(props) {
        super(props);
        this.state = {
            client: null,
            connectStatus: "Connect",
            isSubed: false,
            messages: [],
            topic:'' 
        };
    }


  

  
    
    render() {
        console.log('>>>>>>>>>>>>>>>>>>>>>>>111111');
        console.log(this.state);
        console.log(this.props);
        console.log(this);
        
        // this.setState({
        //     client:this.props.state.client
        // })
        return (
            <div className="container">
                <div className="left-panel main_leftPanel">
                    <MessageLeftPanel  
                        subscribe={this.props.subscribe}
                        unsub={this.props.unsub}
                    />
                </div>
                <div className="right-panel">
                    <MessageRightPanel 
                        publisher={this.publisher}
                        state={this.props.state}/>
                </div>
            </div>
        )
        
    }

}


export default connect((state: MessageState, ownProps): $Shape<Props> => {
    console.log(state); 
    return {
      route: state.messageModule
    }
  })(MessageOnlinePage)