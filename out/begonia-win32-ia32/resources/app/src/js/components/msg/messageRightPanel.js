// main page 右边位置
import { throws } from 'assert'
import  React  from 'react'
import { connect } from 'react-redux'
import {MessageState}  from  '../../common/constants' 

import {sendMsg} from '../../utils/https'

import {uuid} from '../../utils/uuid'



type props={
    route: RouteT,
    dispatch: Dispatch,
    credentials:credentials,
    messagesEnd:false,
    receiveMessages:[]
}


class  MessageRightPanel extends  React.Component<props,MessageState>{
    constructor(props) {
        super(props)
        this.state = {
            showScroll: false,
            msg:'',
            messages:[],
            notAllowEmpty:false,
            hover:false,
            initialEmojiWindow:false,
            initialHistoryWindow:false
        }
    }



    btn_sendMsg(props){
        // private  String  reqId; //请求ID
        // private  String  groupId; //组id
        // private  String  from; //从哪里来
        // private  String  to;  // 去哪里
        // private  Object  msg; // 发送的消息
        // private  String    gmtTime; //发送的时间
            
        let requestMsg={
            reqId:uuid(),
            groupId:'',
            from:this.props.route.from,
            to:this.props.route.to,
            msg:this.state.msg,
            gmtTime:new Date().getTime().toString()
        }

        sendMsg(requestMsg).then((res)=>{
            if(res.code=200){
                //**清空数据 写入列表 */
                let msgArr=this.state.messages;
                msgArr.push(requestMsg);
                this.setState({
                    msg:'',
                    message:msgArr
                })
                this.scrollToBottom(); 
            }else {
                console.log(res.msg);
            }
        }); 
    }  

    scrollToBottom() {
        if (this.messagesEnd) {
            const scrollHeight = this.messagesEnd.scrollHeight;//里面div的实际高度  2000px
            const height = this.messagesEnd.clientHeight;  //网页可见高度  200px
            const maxScrollTop = scrollHeight - height; 
            this.setState({
                showScroll: true
            })
            this.messagesEnd.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0 ;  
          //如果实际高度大于可见高度，说明是有滚动条的，则直接把网页被卷去的高度设置为两个div的高度差，实际效果就是滚动到底部了。
        } 
    }


    staticsDate(receiveMessages,historyMessage,credentials){
        let msg=[];
        const mobile=this.props.route.mobile;
        let  arr=new Array();
        if(historyMessage != undefined ){
            for(let i=0;i<historyMessage.length;i++){
                arr.push(historyMessage[i]);
            }
        }
        if(receiveMessages != undefined ){
            receiveMessages.map((index,item)=>{
                arr.push(item);
            })
        }
        this.setState({
            messages:arr
        })
        setTimeout(() => {
            this.scrollToBottom(); 
        }, 100);
    }

    updateDate(receiveMessages,credentials){
        let msg=[];
        let arr=this.state.messages;
        if(receiveMessages != undefined ){
            receiveMessages.map((item,index)=>{
                arr.push(item);
            })
        }
        this.setState({
            messages:arr
        })
        setTimeout(() => {
            this.scrollToBottom(); 
        }, 100);
    }

    //子组件更新数据 
    componentWillReceiveProps(nextProps){
        let receiveMessages=[];
        if(this.props.route.historyMessages !=undefined){
            if(this.props.route.historyMessages.length>0){
                if(this.props.receiveMessages.length==0){
                    let historyMessage=nextProps.route.historyMessages;
                    this.staticsDate(receiveMessages,historyMessage,this.props.credentials);
                }else {
                    let correntNew=nextProps.receiveMessages[0];
                    let oldNew=this.props.receiveMessages[0];

                    if(oldNew.gmtTime === correntNew.gmtTime){ 
                        receiveMessages=this.props.receiveMessages;
                        let historyMessage=nextProps.route.historyMessages;
                        let sendMessage=this.props.route.sendMessage;
                        this.staticsDate(receiveMessages,historyMessage,this.props.credentials);
                    }else {
                        receiveMessages=nextProps.receiveMessages;
                        this.updateDate(receiveMessages,this.props.credentials);
                    }
                }
            }
        }
        document.addEventListener('keydown',this.onkeydown);
    }

    initialEmojiWindow=()=>{
        console.log('initialWindow');
        const {BrowserWindow} = require('electron').remote
        const newWindowBtn = document.getElementById('renderer_emoji')
        console.log(newWindowBtn); 
        if(newWindowBtn!=null){
            const path = require('path')
            console.log(newWindowBtn.offsetTop);
            console.log(newWindowBtn.offsetLeft);
            newWindowBtn.addEventListener('click', (event) => {
                const modalPath = path.join('file://', __dirname, '../../windows/model/modal.html')
                console.log(event);
                let win = new BrowserWindow({ 
                    frame: false,
                    width:480,
                    height:280,
                    x:event.screenX-120, 
                    y:event.screenY-300,
                    resizable:false,
                    movable:false
                })
                win.on('close', () => { win = null })
                win.loadURL(modalPath)
                win.show()
            })
        }
    }

    initialHistoryWindow=()=>{
        console.log('initialWindow');
        const {BrowserWindow} = require('electron').remote
        const newWindowBtn = document.getElementById('renderer_history')
        console.log(newWindowBtn); 
        if(newWindowBtn!=null){
            const path = require('path')
            console.log(newWindowBtn.offsetTop);
            console.log(newWindowBtn.offsetLeft);
            newWindowBtn.addEventListener('click', (event) => {
                const modalPath = path.join('file://', __dirname, '../../windows/model/modal.html')
                console.log(event);
                let win = new BrowserWindow({
                    width:480,
                    height:280,
                    x:event.screenX-120, 
                    y:event.screenY-300,
                    backgroundColor: '#2e2c29',
                    title:'3号',
                    titleBarStyle: 'hiddenInset',
                    autoHideMenuBar:true
                    //frame: false
                //     icon:'1',
                //     autoHideMenuBar:true,
                //     modal:true, 
                //    titleBarStyle: 'hidden'
                })
                win.on('close', () => { win = null })
                win.loadURL(modalPath)

                win.once('ready-to-show', () => {
                    win.show()
                })
                //win.show()
            })
        }
    }

    
    
    componentDidUpdate(){
        const newWindowBtn = document.getElementById('renderer_emoji');
        if(!this.state.initialWindow && newWindowBtn!=null){ 
            this.initialEmojiWindow();
            this.setState({
                initialWindow:true
            })
        }
        if(!this.state.initialHistoryWindow && newWindowBtn!=null){ 
            this.initialHistoryWindow();
            this.setState({
                initialHistoryWindow:true
            })
        }

        
    }
 
    onkeydown=(e)=>{
        if (e.keyCode === 13) {
			this.btn_sendMsg(this.props);
		}
    }
    
    renderContents() {
        const { route } = this.props;
        const {receiverMessage}=this.props.receiveMessages;

        switch (route.type) { 
            case 'DEFAULTMESSAGE_ONLINE':
                return <DefaultMainPage />
            case 'PRECHECKMESSAGE_ONLINE':
                return  <MainPage 
                            state={this.state} 
                            that={this}  
                            route={route}  
                            messages={this.state.messages}
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
                                    if(this.state.msg.trim()=='' || this.state.msg==null){
                                        this.setState({
                                            notAllowEmpty:true
                                        })
                                        window.setTimeout(()=>{
                                            this.setState({
                                                notAllowEmpty:false
                                            })
                                        },2000)
                                        return ;
                                    }else {
                                        this.btn_sendMsg(this.props) 
                                    }
                                } 
                            }
                            initlalWindow={()=>{
                                this.initialWindow();
                            }}
                            onHover={(props)=>{
                                    this.setState({
                                        hover:true
                                    })
                                }
                            }
                            mouseLeave={(props)=>{
                                    this.setState({
                                        hover:false
                                    })
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
        const { route, connections, children, dispatch } = this.props;
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
            <MainTop state={prop.state} messages={prop.messages} that={prop.that} route={prop.route} prop  onMouseEnter={(props) => { 
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
                onHover={prop.onHover}
                mouseLeave={prop.mouseLeave}
                initialWindow={prop.initlalWindow}
                />
        </React.Fragment>
    )
}

const  MainTop=(props)=>{
    
    return (
            <div className='message_main'
                >  
                <div className='message_top'>
                        <span>{props.route.userName}</span>
                        <span className='message_topRight'>...</span>
                </div> 
                <hr className='message_hr'/>
                <div 
                    className={`message-main-top ${props.state.showScroll?"show_scroll":'' }`} 
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
                    }} 
                    ref={(el) => {  
                        props.that.messagesEnd = el; 
                    }} >
                        {
                            props.messages.map((item,index)=>{
                                if(item != undefined){
                                    if(item.from == props.route.mobile){
                                        return  <BubbleLeft key={index} content={item.msg} ></BubbleLeft>
                                    }else{
                                        return  <BubbleRight key={index} content={item.msg} ></BubbleRight>
                                    }
                                }
                            })
                        }
                        {/* {
                            
                            this.state.map((item,index)=>{
                                if(item != undefined){
                                    if(item.from == props.route.mobile){
                                        return  <BubbleLeft key={index} content={item.msg} ></BubbleLeft>
                                    }else{
                                        return  <BubbleRight key={index} content={item.msg} ></BubbleRight>
                                    }
                                }

                            })
                        } */}
                </div>
                <hr className='message_hr_top'/>
            </div>
    ) 
}

const BubbleLeft=(props)=>( //key={props.key}
    <div className="bubble_sender">
        <div>
            <img align="absmiddle" src="http://www.begonia.com/demo/file/static/cherry.png"></img>
        </div>
        <div>
            <div className="bubble_left_triangle"></div>
            <span className="bubble_left_span"> {props.content} </span>
        </div>
    </div>
)

const BubbleRight=(props)=>( //key={props.key}
    <div className="bubble_receiver">
        <div>
            <img align="absmiddle" src="http://www.begonia.com/demo/file/static/userPic.png"></img>
        </div>
        <div>
            <div className="bubble_right_triangle"></div>
            <span className="bubble_right_span"> {props.content} </span>
        </div>
    </div> 
)


const  MainButtom=(props)=>{
    return (
    <div className="message-main-buttom">
        <div className='message_btn_group'>
            <ul>
                <li id="renderer_emoji" className="message_li" >
                    <Face />
                </li>
                <li className="message_li">
                    <Folder/>
                </li>
                <li className="message_li">
                    <Cut/>
                </li>
                <li id="renderer_history"  className="message_li">
                    <Hitory/>
                </li>
            </ul>
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
            <div className={`message_button_div_tips ${props.state.notAllowEmpty?'message_div_tips_show':'message_div_tips_hide'}`}>
                <span className='message_button_tips'>不能发送空白消息</span>
                <div className='tips_bottom_triangle'></div>
            </div>
            <button className={`message_buttom_btn_inner ${props.state.hover?'message_button_change':''} `}
                onClick={props.onSubmit} 
                onMouseOver={props.onHover}
                onMouseLeave={props.mouseLeave}
                >
                发送(S)
            </button>
            {/* <span>按Enter键发送,按Ctrl+Enter键换行</span> */}
        </div>
    </div>
    )
}

const Face = (props) => (
    <svg 
        role="img" 
        xmlns="http://www.w3.org/2000/svg" 
        width="20px" height="20px" 
        viewBox="0 0 24 24" 
        aria-labelledby="happyFaceIconTitle" 
        stroke="#9e9e9e" 
        strokeWidth="1.8461538461538463"
        //stroke-width="1.8461538461538463" 
        //stroke-linecap="square"
        strokeLinecap="square" 
        //stroke-linejoin="miter" 
        strokeLinejoin="miter"
        fill="none" 
        color="#9e9e9e"> 
        <title id="happyFaceIconTitle">表情</title> 
        <path d="M7.3010863,14.0011479 C8.0734404,15.7578367 9.98813711,17 11.9995889,17 C14.0024928,17 15.913479,15.7546194 16.6925307,14.0055328"/> 
        <line strokeLinecap="round" x1="9" y1="9" x2="9" y2="9"/> 
        <line strokeLinecap="round" x1="15" y1="9" x2="15" y2="9"/> 
        <circle cx="12" cy="12" r="10"/>
    </svg>
)
const Cut= (props) =>(
    <svg 
        role="img" 
        xmlns="http://www.w3.org/2000/svg" 
        width="20px" height="20px" 
        viewBox="0 0 24 24" 
        aria-labelledby="cutIconTitle" 
        stroke="#9e9e9e" 
        strokeWidth="1.8461538461538463"
        //stroke-width="1.8461538461538463" 
        //stroke-linecap="square"
        strokeLinecap="square" 
        //stroke-linejoin="miter" 
        strokeLinejoin="miter" 
        fill="none" 
        color="#9e9e9e"> 
        <title id="cutIconTitle">截图(Alt+k)</title> 
        <path d="M3 18L15 9M15 15L3 6"/> 
        <circle cx="18" cy="7" r="3"/> 
        <circle cx="18" cy="17" r="3"/> 
    </svg>
)
const Folder = (props)=>(
    <svg 
        width="20px" height="20px" 
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg" 
        aria-labelledby="folderAddIconTitle" 
        stroke="#9e9e9e" 
        strokeWidth="1.8461538461538463"
        //stroke-width="1.8461538461538463" 
         //stroke-linecap="square"
        strokeLinecap="square" 
         //stroke-linejoin="miter" 
        strokeLinejoin="miter"
        fill="none" color="#9e9e9e"> 
        <title id="folderAddIconTitle">发送文件</title> 
        <path d="M3 5H9L10 7H21V19H3V5Z"/> 
        <path d="M15 13H9"/> 
        <path d="M12 10V16"/> 
    </svg>
)
const Hitory = (props)=>(
    <svg 
        role="img" 
        xmlns="http://www.w3.org/2000/svg"
        width="20px" height="20px" 
        viewBox="0 0 24 24" 
        aria-labelledby="historyIconTitle" 
        stroke="#9e9e9e" 
        strokeWidth="1.8461538461538463"
        //stroke-width="1.8461538461538463" 
        //stroke-linecap="square"
        strokeLinecap="square" 
        //stroke-linejoin="miter" 
        strokeLinejoin="miter"
        fill="none" 
        color="#9e9e9e"> 
        <title id="historyIconTitle">聊天记录</title> 
        <polyline points="1 12 3 14 5 12"/> 
        <polyline points="12 7 12 12 15 15"/> 
        <path d="M12,21 C16.9705627,21 21,16.9705627 21,12 C21,7.02943725 16.9705627,3 12,3 C7.02943725,3 3,7.02943725 3,12 C3,11.975305 3,12.3086383 3,13"/> 
    </svg>
)


export default connect((state: MessageState, ownProps): $Shape<Props> => {
    return {
        route: state.messageModule,
        credentials:state.userModule
        
    }
})(MessageRightPanel)