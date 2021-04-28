// main page 右边位置
import  React  from 'react'
import { connect } from 'react-redux'
import {MessageState}  from  '../../common/constants' 

import {sendMsg} from '../../utils/https'

import {uuid} from '../../utils/uuid'

type props={
    route: RouteT,
    dispatch: Dispatch,
    credentials:credentials
}


class  MessageRightPanel extends  React.Component<props,MessageState>{
    constructor(props) {
        super(props)
        this.state = {
            showScroll: false,
            msg:''
        }
      }

 

    btn_sendMsg(props){
        // private  String  reqId; //请求ID
        // private  String  groupId; //组id
        // private  String  from; //从哪里来
        // private  String  to;  // 去哪里
        // private  Object  msg; // 发送的消息
        // private  String    gmtTime; //发送的时间
        console.log(this.state);
        console.log(this.props);

        let requestMsg={
            reqId:uuid(),
            groupId:'',
            from:this.props.route.from,
            to:this.props.route.to,
            msg:this.state.msg,
            gmtTime:new Date().toGMTString()
        }
        console.log(requestMsg);
        let res=sendMsg(requestMsg); 
        if(res.code=200){
            //**清空数据 写入列表 */
            this.setState({
                msg:''
            })
        }else {
            console.log(res.msg);
        }
    }  
    

    staticsDate(historyMessage,credentials){
        const mobile=this.props.route.mobile;
        console.log(credentials);
        let  arr=new Array();
        for(let i=0;i<historyMessage.length;i++){
            let json=historyMessage[historyMessage.length-(i+1)];
            let obj=JSON.parse(json);
            if(obj.from.indexOf(mobile)!=-1 || obj.from.indexOf(credentials.from)!= -1){
                arr.push(obj)
            }
        }
        return arr;
    }



    renderContents() {
        const { route } = this.props
        const mobile=this.props.route.mobile;
        console.log(">>>>>");
        console.log(this.props);
        const receiveMessages=this.props.route.receiveMessages;
        const historyMessage=this.props.route.historyMessages;
        const sendMessage=this.props.route.sendMessage;
        console.log(receiveMessages);
        let msg=[];
        if(historyMessage != undefined ){
            msg=this.staticsDate(historyMessage,this.props.credentials);
        }
        //let msg=[];
        if(receiveMessages != undefined ){
            receiveMessages.filter((item,index)=>{
                if(item.message.indexOf(mobile)!=-1){
                    //return  item;
                    let json=item.message.split(":");
                    let requestMsg={
                        to:item.topic,
                        from:json[0],
                        content:json[1]
                    }
                    msg.push(requestMsg);
                }
            })
        }




        switch (route.type) { 
            case 'DEFAULTMESSAGE_ONLINE':
                return <DefaultMainPage />
            case 'PRECHECKMESSAGE_ONLINE':
                return  <MainPage state={this.state}   route={route}  messages={msg}
                            onMouseEnter={(props,e) => {
                                this.setState({
                                    showScroll:props.showScroll
                                })
                            }}
                            onMouseLeave={(props) => {
                                this.setState({
                                    showScroll:props.showScroll
                                })
                            }}
                            // onClick={this.btn_sendMsg.bind(this)}
                            onSubmit={()=>{
                                this.btn_sendMsg(this.props)                            
                                //console.log('12312')
                                } 
                            }
                            onChange={(props)=>{
                                this.setState({
                                    msg:props.msg
                                })
                            }}
                        />
            default:
                return <DefaultMainPage />

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

const DefaultMainPage=(props) => (
    <div className="main_defaultPage" >
        <span className="main_defaultSpan">welcome.default page  </span>
    </div>
  )
  

const  MainPage=(prop)=>{
    return (
        <React.Fragment>
            <MainTop state={prop.state} messages={prop.messages}  route={prop.route}  onMouseEnter={(props) => { 
                            prop.onMouseEnter(props)
                            // e.stopPropagation()
                        }}  
                        onMouseLeave={(props) => {
                            prop.onMouseLeave(props)
                            // e.stopPropagation()
                        }} />
            <MainButtom  state={prop.state}      
                onChange={(props)=>{
                    prop.onChange(props)
                }}
                onSubmit={prop.onSubmit}
                />
        </React.Fragment>
    )
}

const  MainTop=(props)=>{
    return (
            <div className='message_main'>
            <div className='message_top'>
                    <span>{props.route.userName}</span>
                    <span className='message_topRight'>...</span>
            </div> 
            <hr className='message_hr'/>
            <div className={`message-main-top ${props.state.showScroll?"show_scroll":'' }`}   
                onMouseEnter={(e)=>{
                        props.onMouseEnter({
                            showScroll:true
                        })
                        e.stopPropagation()
                    }} 
                onMouseLeave={(e)=>{
                    props.onMouseLeave({
                        showScroll:false
                    })
                    e.stopPropagation()
                }} >
                    {
                        props.messages.map((item,index)=>{
                            if(item != undefined){
                                // console.log(item);
                                //let obj=JSON.parse(item);
                                return  <BubbleMessage key={index} content={item.content} myself={item.from==props.route.mobile?false:true}></BubbleMessage>
                            }
                        })
                    }
            </div>
            <hr className='message_hr_top'/>
            </div>
    )
}

const BubbleMessage=(props)=>(
    <li className={props.myself?"bubbleRight":"bubbleLeft"} key={props.key} >{props.content}</li>
)

const  MainButtom=(props)=>(
    <div className="message-main-buttom">
        <div className='message_btn_group'>
            <button className='message_btn'>
                bt1
            </button>
            <button>
                bt1
            </button>
        </div>

        <div>
            {/* <input className='message_input'></input> */}
            <textarea  value={props.state.msg}
            onChange={(e)=>{
                props.onChange({
                    msg:e.target.value
                })
                e.stopPropagation()
            }} 
            className='message_textarea'>

            </textarea>
        </div>
        <div className='message_buttom_btn'>
            <button className='message_buttom_btn_inner'
                onClick={props.onSubmit} 
                >
                send
            </button>
        </div>
    </div>
)

export default connect((state: MessageState, ownProps): $Shape<Props> => {
    return {
      route: state.messageModule,
      credentials:state.userModule
    }
  })(MessageRightPanel)