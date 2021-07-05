// main page 右边位置
import { throws } from 'assert'
import  React  from 'react'
import { connect } from 'react-redux'
import {MessageState}  from  '../../common/constants' 
import {sendMsg,requestJoinUpUrl,emojiList,postFile, listMessage} from '../../utils/https'
import {uuid} from '../../utils/uuid'
import qs from 'querystring'
import { format,basename } from 'path'
import * as types from '../../common/actionTypes'
const {shell} = require('electron')
//引入node模块
const fs=require('fs');



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
            initialHistoryWindow:false,
            initialFileWindow:false,
            initialCutWindow:false,
            emojiList:[],
            showEmojiScroll:false,
            showEmojiBackScroll:false,
            indexBack:false,
            initialBindDomUpdate:false,
            clipboard:'',
            upgrade:false,
            availEmoji:false,
            onSelectDirectory:false
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
            msg:this.state.clipboard,
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
                localStorage.setItem("tpl",""); 
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
        if(!nextProps.route.showScroll){
            this.setState({
                availEmoji:false
            })
        }
        //绑定打开本地文件
        let list=nextProps.route.historyMessages;
        if(list !=undefined && list.length>0){
            list.map((item,index)=>{
                if(item.msgType=='3'){
                    let obj=document.getElementById(item.reqId);
                    if(obj!=null && obj!=undefined){
                        obj.addEventListener('dblclick',(event) => {
                            shell.openExternal(item.local);
                        })
                    }
                }
            })
        }
    }

    initialEmojiWindow=()=>{
        console.log('initialEmojiWindow');
        const {BrowserWindow} = require('electron').remote
        const ipcRenderer = require('electron').ipcRenderer
        const newWindowBtn = document.getElementById('renderer_emoji')
        if(newWindowBtn!=null){
            newWindowBtn.addEventListener('click', (event) => {
                emojiList().then((res)=>{
                    this.setState({
                        availEmoji:true,
                        emojiList:res.obj
                    })
                });
            })
        }
    }

    initialHistoryWindow=()=>{
        console.log('initialWindow');
        const {BrowserWindow} = require('electron').remote
        const ipcRenderer = require('electron').ipcRenderer
        const newWindowBtn = document.getElementById('renderer_history')
        if(newWindowBtn!=null){
            const path = require('path')
            newWindowBtn.addEventListener('click', (event) => {
                const windowID = BrowserWindow.getFocusedWindow().id
                const modalPath = path.join('file://', __dirname, '../../windows/model/modal.html')
                let win = new BrowserWindow({
                    webPreferences :{
                        devTools:true,
                        nodeIntegration:true
                    },
                    width:window.screen.availWidth-(window.screen.availWidth/3)-(window.screen.availWidth/3),
                    height:window.screen.availHeight-(window.screen.availHeight/6),
                    x:window.screen.width/3, 
                    y:window.screen.width/10,
                    minWidth:window.screen.width/3,
                    backgroundColor: '#2e2c29',
                    titleBarStyle:'hidden', 
                    autoHideMenuBar:true,
                    maximizable:false,
                    acceptFirstMouse:true,
                    fullscreen:false,
                    frame: false
                })
                win.webContents.openDevTools();//打开控制台
                win.on('close', () => { win = null })

                let requestMessage={
                    msgType:"all",
                    to:this.props.route.mobile,
                    from:this.props.credentials.mobile
                }

                win.loadURL(modalPath);
                win.show();
                let json={};

                win.webContents.on('did-finish-load', () => {
                    win.webContents.send('initial-complete', JSON.stringify(json), windowID);
                })
                win.on('resize',()=>{ 
                    win.webContents.send('content-resized',windowID);
                })


                ipcRenderer.on('minimize', (event) => {
                    win.minimize();
                })
            
            })
        }
    }

    initialFileWindow=()=>{
        //初始化文件选择
        console.log('initialFileWindow');
        const {BrowserWindow} = require('electron').remote
        const ipcRenderer = require('electron').ipcRenderer
        const newWindowBtn = document.getElementById('renderer_file')
        newWindowBtn.addEventListener('click', (event) => {
            ipcRenderer.send('open-file-dialog');
            if(!this.state.onSelectDirectory){
                ipcRenderer.on('selected-directory', (event, path) => {
                    //document.getElementById('selected-file').innerHTML = `你已选择: ${path}`
                    //显示文件 
                    // //发送消息,直接调用sendFileMsg
                    const formData = new FormData();
                    formData.append('reqId',uuid());
                    formData.append('groupId','');
                    formData.append('from',this.props.route.from);
                    formData.append('to',this.props.route.to);
                    formData.append('msg',this.state.clipboard);
                    formData.append('gmtTime',new Date().getTime().toString());
                    formData.append('local',path[0]);
                    var content=fs.readFileSync(path[0],'utf-8');
                    let  data = new Buffer(content).toString('base64')
                    //将字符串 转换成 Blob 对象
                    var blob = new Blob([content], {
                        type: 'text/plain'
                    });
                    formData.append('file',blob,basename(path[0]));
                    postFile(formData).then((res)=>{
                        //console.log('res'); // 改变历史记录
                        var requestMsg={
                            to:this.props.route.from,
                            from:this.props.route.to
                        }
                        listMessage(requestMsg).then((res)=>{
                            let result=listMessage(requestMsg).then((result)=>{
                                this.props.dispatch({
                                    type:types.PRECHECKMESSAGE_ONLINE,
                                    to:this.props.route.to,
                                    userName:this.props.route.userName,
                                    historyMessages:result.obj
                                })
                            });
    
                        })
    
                    })
                    // let msg={
                    //     type:"file",
                    //     content:path
                    // }
                    // this.setState({
                    //     msg:msg,
                    //     clipboard:this.state.clipboard,
                    //     upgrade:true
                    // })
                })
                this.setState({
                    onSelectDirectory:true
                })
            }

          
        })


    }

    initialCutPicWindow=()=>{



    }

    moveSelectionEnd=()=>{
          // 将获得焦点的光标移动到最后的输入位置
        let range = document.createRange();
        range.selectNodeContents(document.getElementById('message_input'));
        range.collapse(false);
        let sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    }

    addKeyCodeListener=()=>{
        var div = document.getElementById('message_input');
        let msg={};
        let preContent=this.state.clipboard; 
        let html=div.innerHTML;
        msg.type="html";
        msg.content=html;
        let clipboard="";
        //translate html to text used submit
        let arrs=div.childNodes;
        for(let i=0;i<arrs.length;i++){
            if(arrs[i].data==undefined){
                clipboard =clipboard+arrs[i].getAttribute("classic");
            }else {
                clipboard=clipboard+arrs[i].data;
            }
        }
        this.setState({
            msg:msg,
            clipboard:clipboard,
            upgrade:true
        })
    }

    initialBindDomUpdate=()=>{
        const newWindowBtn = document.getElementById('message_input');
        let div=newWindowBtn.innerHTML;
            let timer;
            newWindowBtn.addEventListener("focus",(event)=>{
                timer=setInterval(() => {
                    var divNew = document.getElementById('message_input');
                    if(div != divNew.innerHTML) {
                        div = divNew;
                        //clearInterval (timer);
                        //     //先判断输入的是否是对象
                        let msg={};
                        let preContent=this.state.clipboard; 
                        let html=divNew.innerHTML;
                        msg.type="html";
                        msg.content=html;
                        let clipboard="";
                        //translate html to text used submit
                        let arrs=divNew.childNodes;
                        for(let i=0;i<arrs.length;i++){
                            if(arrs[i].data==undefined){
                                clipboard =clipboard+arrs[i].getAttribute("classic");
                            }else {
                                clipboard=clipboard+arrs[i].data;
                            }
                        }
                        this.setState({
                            msg:msg,
                            clipboard:clipboard,
                            upgrade:true
                        })
                    }
                }, 1000); 
            })
            newWindowBtn.addEventListener("blur",(event)=>{
                clearInterval (timer);
            })

            newWindowBtn.addEventListener('DOMSubtreeModified', (event) => {
                this.moveSelectionEnd();
            })
            // newWindowBtn.addEventListener('DOMSubtreeModified', (event) => {
            // })
    }


    
    componentDidUpdate(){
        let emojiBtn=document.getElementById('renderer_emoji');
        if(!this.state.initialEmojiWindow && emojiBtn !=null){ 
            this.initialEmojiWindow();
            this.setState({
                initialEmojiWindow:true
            })
        }
        let historyBtn=document.getElementById('renderer_history');
        if(!this.state.initialHistoryWindow && historyBtn != null ){ 
            this.initialHistoryWindow();
            this.setState({
                initialHistoryWindow:true
            })
        }
        let fileBtn=document.getElementById('renderer_file');
        if(!this.state.initialFileWindow && fileBtn != null){ 
            this.initialFileWindow();
            this.setState({
                initialFileWindow:true
            })
        }
        let cutBtn=document.getElementById('renderer_cut');
        if(!this.state.initialCutPicWindow && cutBtn != null){ 
            this.initialCutPicWindow();
            this.setState({
                initialCutPicWindow:true
            })
        }
        let bindDom=document.getElementById('message_input');
        if(!this.state.initialBindDomUpdate && bindDom != null){ 
            this.initialBindDomUpdate();
            this.setState({
                initialBindDomUpdate:true
            })
        }
        if(this.state.upgrade){
            this.setState({
                upgrade:false
            })
        }
    }

  


    onkeydown=(e)=>{
        if (e.keyCode === 13) { //回车
			this.btn_sendMsg(this.props);
        }
        if(e.keyCode ===8){ //删除
            this.addKeyCodeListener();
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
                                    showScroll:props.showScroll,
                                    showEmojiScroll:props.showEmojiScroll,
                                    showEmojiBackScroll:props.showEmojiBackScroll,
                                    indexBack:props.indexBack,
                                    upgrade:false
                                })
                            }}
                            onMouseLeave={(props) => {
                                this.setState({
                                    showScroll:props.showScroll,
                                    showEmojiScroll:props.showEmojiScroll,
                                    showEmojiBackScroll:props.showEmojiBackScroll,
                                    indexBack:props.indexBack,
                                    upgrade:false
                                })
                            }}
                            // onClick={this.btn_sendMsg.bind(this)}
                            onSubmit={()=>{
                                    let type=this.state.msg.type;
                                    let content=this.state.msg.content;

                                    if(this.state.clipboard.trim()=='' || this.state.clipboard==null){
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
                                        hover:true,
                                        upgrade:false
                                    })
                                }
                            }
                            mouseLeave={(props)=>{
                                    this.setState({
                                        hover:false,
                                        upgrade:false
                                    })
                                }
                            }
                            onChange={(props)=>{
                                let html=props.msg;
                                this.setState({
                                    msg:html, 
                                    availEmoji:props.availEmoji,
                                    upgrade:props.upgrade
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
                        }}
                        />
            <MainButtom  state={prop.state}      
                onChange={(props)=>{
                    prop.onChange(props)
                }}
                onSubmit={prop.onSubmit}
                onHover={prop.onHover}
                mouseLeave={prop.mouseLeave}
                initialWindow={prop.initlalWindow}
                onMouseEnter={(props) => { 
                    prop.onMouseEnter(props)
                    // e.stopPropagation()
                }}  
                onMouseLeave={(props) => {
                    prop.onMouseLeave(props)
                    // e.stopPropagation()
                }} 
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
                                        if(item.msgType=='3'){
                                            let file=JSON.parse(item.msg);
                                            return <BubbleFileLeft  id={item.reqId} key={index}  size={file.size} name={file.fileName}  ></BubbleFileLeft>
                                        }else {
                                            return <BubbleLeft key={index} content={item.msg} ></BubbleLeft>
                                        }
                                    }else{
                                        if(item.msgType=='3'){
                                            let file=JSON.parse(item.msg);
                                            return <BubbleFileRight id={item.reqId}     key={index}  size={file.size} name={file.fileName} ></BubbleFileRight>
                                        }else {
                                            return  <BubbleRight key={index} content={item.msg} ></BubbleRight>
                                        }
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

const BubbleFileLeft=(props)=>( //key={props.key}
    <div className="bubble_sender bubble_file_receiver" >
        <div>
            <img align="absmiddle" src="http://www.begonia.com/demo/file/static/cherry.png"></img>
        </div>
        <div  id={props.id}>
            <div className="bubble_left_triangle bubble_file_left_triangle"></div>
            <div className="bubble_left_span bubble_file_right_span" > 
                <span>
                    <span className='bubble_file_name'>{props.name}</span>
                    <span className="bubble_file_size">{props.size}</span>
                </span>
                <img className='bubble_file_img' src="http://www.begonia.com/demo/file/static/file.png"></img>
            </div>
        </div>
    </div>
)

const BubbleFileRight=(props)=>( //key={props.key}
    <div className="bubble_receiver bubble_file_receiver">
        <div>
            <img align="absmiddle" src="http://www.begonia.com/demo/file/static/userPic.png"></img>
        </div>
        <div className='bubble_file_receiver_child'  id={props.id}>
            <div className="bubble_right_triangle"></div>
            <div className="bubble_right_span bubble_file_right_span" >
                <span>
                    <span className='bubble_file_name'>{props.name}</span>
                    <span className="bubble_file_size">{props.size}</span>
                </span>
                <img className='bubble_file_img' src="http://www.begonia.com/demo/file/static/file.png"></img>
            </div>
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
    let html="";  
    var tpl=localStorage.getItem("tpl");
    if(tpl==undefined || tpl=='undefined'){
        tpl="";
    }
    if(props.state.upgrade){
        if(props.state.msg.type =='pic'){
            var content=props.state.emojiList[props.state.msg.index]; 
            content=JSON.parse(content);
            //html='<div class="emoji_span" align="center"><img title='+content.title+' class="emoji_image" index='+content.index+' align="absmiddle" src='+content.url+'></div>';
            //获得之前的内容
            let precontent=document.getElementById('message_input').innerHTML;
            //html+=precontent;
            html ='<img  class="emoji_image" classic='+content.emoji+' title='+content.title+' class="emoji_image" index='+content.order+' align="absmiddle" src='+content.url+'/>';
            html=tpl+html;
            localStorage.setItem("tpl",html);
        } else if(props.state.msg.type =='emoji'){
            var content=props.state.emojiList[props.state.msg.index];
            content=JSON.parse(content);
            //html='<div class="emoji_span" align="center"><img title='+content.title+' class="emoji_image" index='+content.index+' align="absmiddle" src='+content.url+'></div>';
            //获得之前的内容
            //let precontent=document.getElementById('message_input').innerHTML;
            //html+=precontent;
            html ='<img  class="emoji_image" classic='+content.emoji+' title='+content.title+' class="emoji_image" index='+content.order+' align="absmiddle" src='+content.url+'/>';
            // let subDocument=html;
            // html='<div class="text_span" classic="container" align="center">'+subDocument+'</div>';
            html=tpl+html;
            localStorage.setItem("tpl",html);
        }else if(props.state.msg.type =='html') {
            html=props.state.msg.content;
            localStorage.setItem("tpl",html);
        }else if(props.state.msg.type=='file'){
            let arrs=props.state.msg.content;
            for(var key in arrs){
                let fileName=basename(key);

            }
             // var blob = new Blob([content], {
                //     type: 'text/plain'
                // });
            //文件展示 
            html ='<div><span>12312.txt</span><span>12M</span><span><img src="http://www.begonia.com/demo/file/static/file.png"></img></span></div>';       
            localStorage.setItem("tpl",html);
        }
    }else {
        html=localStorage.getItem("tpl");
    }
    return (
    <div className="message-main-buttom">
        <div className={`emoji_model_hide ${props.state.availEmoji?'emoji_model':''}`} >
            <div className={`emoji_contents ${props.state.showEmojiScroll?'show_scroll':''}`} 
                onMouseEnter={(e)=>{
                    props.onMouseEnter({
                        showEmojiScroll:true,
                        upgrade:false
                    })
                    //e.stopPropagation()
                }} 
                onMouseLeave={(e)=>{
                    props.onMouseLeave({
                        showEmojiScroll:false,
                        upgrade:false
                    })
                    //e.stopPropagation()
                }}  >
                {
                    //console.log(props);
                    props.state.emojiList.map((item,index)=>{
                        if(item != undefined){
                            let json = JSON.parse(item);
                            return  <div className={`emoji_span ${props.state.showEmojiBackScroll && index==props.state.indexBack?'emoji_div':''}`}  align="center" key={index}  >
                                        <img title={json.title} className="emoji_image" classic={json.emoji} key={json.emoji} index={index}  align="absmiddle" src={json.url}
                                            onMouseEnter={(e)=>{
                                                let index=e.target.getAttribute('index');
                                                props.onMouseEnter({
                                                    showEmojiScroll:true,
                                                    showEmojiBackScroll:true,
                                                    indexBack:index,
                                                    upgrade:false
                                                })
                                                //e.stopPropagation()
                                            }} 
                                            onMouseLeave={(e)=>{
                                                props.onMouseLeave({
                                                    showEmojiScroll:true,
                                                    showEmojiBackScroll:false,
                                                    upgrade:false
                                                })
                                               // e.stopPropagation()
                                            }}
                                            onClick={(e)=>{
                                                let clipboard=props.state.clipboard;
                                                var msg={
                                                    type:'emoji',
                                                    content:clipboard+e.target.getAttribute('classic').replace(":","/"),
                                                    index:e.target.getAttribute("index")
                                                }
                                                props.onChange({
                                                    msg:msg, 
                                                    clipboard:clipboard+msg.content,
                                                    availEmoji:false,
                                                    upgrade:true
                                                })
                                            }}
                                            />
                                    </div>
                        }
                    })
                }
                <span></span>
            </div>
            <div className="emoji_tabs"></div>
        </div>
        <div className='message_btn_group'>
            <ul>
                <li id="renderer_emoji" className="message_li" >
                    <Face />
                </li>
                <li id="renderer_file" className="message_li">
                    <Folder/>
                </li>
                <li id="renderer_cut" className="message_li">
                    <Cut/>
                </li>
                <li id="renderer_history"  className="message_li">
                    <Hitory/>
                </li>
            </ul>
        </div>

        <div>
            {/* <input className='message_input'></input> */}
            {/* <textarea  value={props.state.msg}
                onChange={(e)=>{
                    props.onChange({
                        msg:e.target.value
                    })
                    e.stopPropagation()
                }} 
                className='message_textarea'>
            </textarea> */}
            <div id="message_input"  dangerouslySetInnerHTML={{__html: html}}   contentEditable={true}  suppressContentEditableWarning={true}
                onChange={(e)=>{
                    props.onChange({
                        msg:e.target.text
                    })
                    e.stopPropagation()
                }} 
                className='message_textarea'>
            </div>
        </div>
        <div className='message_buttom_btn'>
            <div className={`message_button_div_tips ${props.state.notAllowEmpty?'message_div_tips_show':'message_div_tips_hide'}`}>
                <span className='message_button_tips'>不能发送空白消息</span>
                <div className='tips_bottom_triangle'></div>
            </div>
            <button title="按ENTER发送,按CTRL+ENTER换行" className={`message_buttom_btn_inner ${props.state.hover?'message_button_change':''} `}
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