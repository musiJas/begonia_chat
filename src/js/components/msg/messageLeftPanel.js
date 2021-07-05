// main page left左边位置
import  React  from 'react'
import { connect } from 'react-redux' 
import * as types from '../../common/actionTypes'

import { onLineUser } from '../../utils/https'
import type MQTTClient from '../../utils/mqtt/MQTTClient'
import {listMessage} from '../../utils/https'


type props={
    route: RouteT,
    dispatch: Dispatch,
    showScroll:false
}

class  MessageLeftPanel extends   React.Component<props>{
    constructor(props) {
        super(props)
        this.state = {
            showScroll: false,
            index:'1',
            users:[]
        }
    }

  

    componentDidMount(){
        this.loadOnline();
        //监听数据
        
        let users=this.state.users;
        // users.map(function(index,item){
        //     this.props.subscribe(item.from,0);
        // })   

        // 此处应该是订阅自己
        // console.log(this.state);
        // console.log(this.props);
        // this.props.subscribe(this.props.route.mobile,0);
        // console.log();
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
    
    funCheck(index,item){
        this.setState({
            index:index,
            to:item.mobile,
            userName:item.userName
        })
        //此处还要初始化自己的发送的消息
        // 切换的时候是加载历史信息
        // var requestMsg={
        //     to:item.mobile,
        //     from:this.props.route.from
        // }
        
        this.loadMessage(item.mobile,item.userName);

        //初始化storeage数据
        localStorage.setItem("tpl","");
        this.moveSelectionEnd();
        // let result=listMessage(requestMsg).then((result)=>{
        //     //console.log("json:"+JSON.stringify(result));
        //     // this.props.dispatch({   
        //     // type:types.HISTORYMESSAGE_INFO,
        //     // })
        //     this.props.dispatch({
        //         type:types.PRECHECKMESSAGE_ONLINE,
        //         to:item.mobile,
        //         userName:item.userName,
        //         historyMessages:result.obj
        //     })
        // });
    }  


    loadOnline(){
        onLineUser(this.props.route.mobile).then((res)=>{
            this.setState({
                users:res.obj
            })
            this.props.dispatch({
                type:types.ACTIVEONLINE_USER,
                activeOnline:res.obj[0]
            })
            if(res.obj.length>0){
                this.loadMessage(res.obj[0].mobile,res.obj[0].userName);
            }
        });  
    }


    loadMessage=(mobile,userName)=>{
        var requestMsg={
            to:mobile,
            from:this.props.route.from
        }
        let result=listMessage(requestMsg).then((result)=>{
            //console.log("json:"+JSON.stringify(result));
            // this.props.dispatch({   
            // type:types.HISTORYMESSAGE_INFO,
            // })
            this.props.dispatch({
                type:types.PRECHECKMESSAGE_ONLINE,
                to:mobile,
                userName:userName,
                historyMessages:result.obj
            })
        });
    }



    render (){
        //this.props.initial();
        
        // console.log(this.props);
        const  showScroll=this.state.showScroll;
        const  mobile=this.props.route.mobile;
        return (
            <div className="main_leftPanel_div" >
                <div className="main_leftPanel_search"> search</div>   
                <ul className={`main_leftPanel_ul  ${showScroll?"show_scroll":''}`}    
                    onMouseEnter={(e)=>{
                            this.setState({
                                showScroll:true   
                            })
                        } 
                    } 
                    onMouseLeave={(e)=>{
                        this.setState({
                            showScroll:false
                        })
                    }}
                    >
                    {  this.state.users.map((item,index)=>{
                        return <li key={index} index={index} onClick={this.funCheck.bind(this,index,item)}  className={`main_leftPanel_li  ${this.state.index ==index?"main_left_li":''} `} >
                                <div>
                                    <div className='users-lefticon'><img className='user-lefticon' src="http://www.begonia.com/demo/file/static/cherry.png"></img> </div>
                                    <div className='users-rightSpan'>
                                        <div> {item.userName}</div>
                                        <div className='users-span'> 模拟测试数据123123</div>
                                    </div>
                                </div>
                            </li> 
                    })} 
                </ul>
            </div>
        )
    }

}


export default connect((state: MessageState, ownProps): $Shape<Props> => {
    return {
        route: state.messageModule
    }
})(MessageLeftPanel)