// 首页数据
import React from 'react'
import classNames from 'classnames'
import  MainRouter from './mainRouter'
import  * as type  from  '../common/actionTypes'
import { connect } from 'react-redux'
import mqtt from "mqtt";
import config from '../utils/propUtil'
import ReceiveState   from '../common/constants'





type Props = {
  connections: Array<ConnectionT>,
  route: RouteT,
  children: React.Node,
  dispatch: Dispatch,
  icon: ''
}

class mainPage extends React.Component<props> {
    constructor(props) {
      super(props);
      this.state = {
          client: null,
          connectStatus: "Connect",
          connected:false,
          messages: [],
          topic:'',
          receiveMessages:[] 
      };
  }

  onchangeState=(bool)=>{
      this.setState({
          connected:bool
      })
  }

  initialMQTT=()=>{
    //console.log('initialMQTT');
    //console.log(config);
    this.handleConnect(config.url,config.options);
  }

  handleConnect=(host, mqttOptions)=>{
    //console.log('handleConnect');
    this.setState({ 
      connectStatus: "Connecting"
    });
    //console.log('init....');
    this.client = mqtt.connect(host, mqttOptions);
    //console.log(this.client);  
    // this.setState({
    //     client:client,
    //     messages:[
    //       {"topic":"1",message:"4:0123123123"},
    //       {"topic":"1",message:"4:111111111"},
    //       {"topic":"1",message:"4:222222222"}]
    // })
    // this.props.dispatch({   
    //   type:type.RECEIVERMESSAGE_INFO,
    //   receiveMessages:[
    //           {"topic":"1",message:"4:0123123123"},
    //           {"topic":"1",message:"4:111111111"},
    //           {"topic":"1",message:"4:222222222"}]
    // })

    //messages:['4:123123123',"4:123123123"]
    if (this.client) {
        this.client.on("connect", () => {
            //console.log("connect");
            this.setState({ connectStatus: "Connected" });
        });
        this.client.on("error", (err) => {
            //console.error("Connection error: ", err);
            this.client.end();
        });
        this.client.on("reconnect", () => {
            this.setState({ connectStatus: "Reconnecting" });
        });
        this.client.on("message", (topic, message) => {
            //console.log('message is receive:');
            //console.log(message);
            //重新转换一下数据 
            let content=message.toString();
            const payload = { 
              topic, 
              msg:content.split(":")[1],
              from:content.split(":")[0],
              to:topic,
              gmtTime:new Date().getTime().toString()  
            };
            const { messages } = this.state;
            if (payload.topic) {
                const changedMessages = messages.concat([payload]);
                //this.setState({ receiveMessages: changedMessages }); 
                // console.log('123123111');
                //console.log(changedMessages);
                this.props.dispatch({  
                  type:type.RECEIVERMESSAGE_INFO,
                  receiveMessages:changedMessages
                })
            }
        });
    }
    };


    handleDisconnect=()=>{
      //console.log('handleDisconnect');
      // const client=this.state.client;
      // console.log(client); 
      if (this.client) {
          this.client.end(() => {
              this.setState({ connectStatus: "Connect" });
              this.setState({ client: null });
          });
      }
    };



      
    
    handleSubscribe=(topic, qos)=>{
      // console.log(topic);
      // console.log(qos);
      // console.log('handleSubscribe');
      // console.log(this.client);  
     // const client=this.state.client; 
      if (this.client) {
          this.client.subscribe(topic, { qos }, (error) => {
              if (error) {
                  //console.log("Subscribe to topics error", error);
                  return;
              }
              this.setState({ isSubed: true, topic:topic}); 
          });
      }
  };


  
    handleUnsub=(topic)=>{
        //console.log('handleUnsub');
        //const client=this.state.client;
        //console.log(this.client); 
        if (this.client) {
            this.client.unsubscribe(topic, (error) => {
                if (error) {
                    //console.log("Unsubscribe error", error);
                    return;
                }
                this.setState({ isSubed: false });
            });
        }
    };
    
    handlePublish=(pubRecord)=>{
        // console.log('handlePublish');
        // const client=this.state.client;
        // console.log(this.client);  
        if (this.client) {
            const { topic, qos, payload } = pubRecord;
            this.client.publish(topic, payload, { qos }, (error) => {
                if (error) {
                    console.log("Publish error: ", error);
                }
            });
        }
    };
    

  //   componentWillUnmount(){
  //     this.handleDisconnect();
  //     this.setState = (state, callback) => {
  //         return;
  //     }
  // }


    componentDidMount(){
      // console.log(this.props);
      // console.log(this.state);
    
      //第一次初始化执行连接
      if(!this.state.connected){
        this.initialMQTT();//连接MQTT
        this.onchangeState(true);
      }
      if(!this.state.isSubed){
        this.handleSubscribe(this.props.credential.mobile,0);
      }
    }

  render() {
    const { route, connections, children, dispatch } = this.props
   
    return (
      <React.Fragment>
        <div className="connection-tabs">
          <ul >
            <Pic >

            </Pic>

            <Tab credential={route.credential}  connected={this.state.connected} isSubed={this.state.isSubed}
                subscribe={this.handleSubscribe}
                onchangeState={this.onchangeState}
                connect={this.initialMQTT}
                disconnect={this.handleDisconnect}
                onClick={(props) => {
                  dispatch(props)
                }}
            >
            </Tab>
            <li
              className="tab tab-settings-link"
              style={{ background: 'transparent' }}
            >
              <button
                className="icon-btn"
                onClick={(e) => {
                  dispatch({  
                    type:type.SETTINGMANAGER_INFO
                  })
                  e.stopPropagation()
                }}
                style={{ padding: 4 }}
              >
                <GearIcon color="#AAABAE" />
              </button>
            </li>
          </ul>
        </div>
        <div className="connection-view">
              {/* 窗口主体 */}
              <MainRouter 
                subscribe={this.handleSubscribe}
                unsubscribe={this.handleUnsub}
                // publisher={this.handlePublish}
                state={this.state}
                />
        </div>
      </React.Fragment>
    )
  }
}

const  UserIcon = (props)=>(
  <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="20.000000pt" height="20.000000pt" viewBox="0 0 512.000000 512.000000"
 preserveAspectRatio="xMidYMid meet">

<g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
fill="#000000" stroke="none">
<path d="M3301 4465 c-178 -39 -348 -172 -429 -336 -95 -193 -95 -385 0 -578
82 -166 251 -297 434 -336 451 -96 855 308 759 759 -72 342 -420 565 -764 491z"/>
<path d="M1541 4145 c-178 -39 -348 -172 -429 -336 -95 -193 -95 -385 0 -578
82 -166 251 -297 434 -336 451 -96 855 308 759 759 -72 342 -420 565 -764 491z"/>
<path d="M3300 3034 c-277 -35 -527 -151 -723 -336 l-79 -73 95 -78 c354 -290
569 -755 603 -1304 l7 -111 116 -7 c417 -27 896 80 1365 303 l118 56 -6 91
c-54 749 -468 1296 -1086 1436 -83 19 -331 33 -410 23z"/>
<path d="M1540 2714 c-619 -79 -1076 -558 -1189 -1245 -11 -68 -23 -163 -27
-211 l-6 -87 59 -29 c330 -167 778 -300 1123 -333 426 -41 937 67 1424 299
l118 56 -6 91 c-54 749 -468 1296 -1086 1436 -83 19 -331 33 -410 23z"/>
</g>
</svg>
)

const Icon = (props) => (
  <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
  width="20.000000pt" height="20.000000pt" viewBox="0 0 512.000000 512.000000"
  preserveAspectRatio="xMidYMid meet">
 
 <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
 fill="#000000" stroke="none">
 <path d="M2538 4509 c-1008 -106 -1800 -749 -1923 -1559 -39 -254 -3 -550 94
 -782 l28 -67 -283 -397 c-199 -278 -284 -405 -284 -423 0 -15 7 -36 15 -48 33
 -48 37 -47 591 74 l521 113 113 -75 c284 -190 648 -324 1035 -382 182 -27 581
 -24 770 5 725 113 1318 487 1620 1022 146 258 203 497 192 802 -9 240 -49 396
 -157 613 -79 157 -170 283 -303 422 -178 184 -348 307 -588 427 -280 140 -567
 221 -899 256 -111 11 -431 11 -542 -1z m652 -184 c252 -39 479 -109 695 -215
 237 -116 401 -234 567 -409 190 -200 312 -416 376 -668 25 -101 27 -121 26
 -308 -1 -184 -3 -208 -27 -300 -73 -272 -195 -481 -402 -691 -315 -319 -739
 -522 -1255 -601 -162 -25 -549 -25 -710 0 -367 57 -689 177 -959 359 -68 46
 -134 90 -146 98 -21 13 -61 6 -457 -81 -238 -53 -434 -95 -436 -93 -2 1 101
 147 227 324 173 242 231 330 231 352 0 16 -11 50 -24 76 -35 70 -81 205 -102
 302 -26 120 -26 400 0 520 154 710 860 1252 1756 1349 126 14 516 6 640 -14z"/>
 <path d="M1901 3554 c-29 -37 -27 -85 5 -115 l26 -24 866 -3 c477 -1 877 0
 890 3 62 15 85 100 39 143 l-23 22 -891 0 -892 0 -20 -26z"/>
 <path d="M1905 2875 c-25 -24 -32 -65 -19 -100 17 -43 40 -45 504 -45 452 0
 468 1 497 39 21 27 15 79 -12 106 l-24 25 -461 0 -461 0 -24 -25z"/>
 <path d="M1925 2208 c-52 -28 -62 -92 -20 -133 l24 -25 631 0 631 0 24 25 c25
 24 32 65 19 100 -17 44 -28 45 -676 45 -424 -1 -619 -4 -633 -12z"/>
 </g>
 </svg>
)

const Pic=(props) => (
  <li style={{ background: 'transparent' }}
      className={classNames('tab', { selected: props.selected || false })}
      onClick={(e)=>{
        console.log('....');
      }}>
    <img className="userPic" src="http://www.begonia.com/demo/file/static/userPic.png"/>
  </li>
)

const Tab = (props) => (
    <li  
        style={{ background: 'transparent' }}
        className={classNames('tab', { selected: props.selected || false })}>
        <button 
            className={classNames('tab', { selected: props.selected || false })}
            className="icon-btn"
            onClick={(e) => {
              //console.log("111");
              //console.log(props);
              //判断是否需要进行重新连接
              if(!props.connected){
                props.connect();//连接MQTT
                props.onchangeState(true);
              }

              if(!props.isSubed){
                props.subscribe(props.credential.mobile,0);
              }
              props.onClick({
                type:type.MESSAGE_ONLINE,
                credential:props.credential
              })
            e.stopPropagation()
            //dispatch({ type: 'REDIRECT', route: { view: 'SETTINGS' } })
        }}
        >
        <Icon color="#AAABAE" />
        </button>
        <button
            className="icon-btn"
            onClick={(e) => {
              if(props.connected){
                props.disconnect();
                props.onchangeState(false);
              }
              props.onClick({
                type:type.USERMANAGER_ONLINE
              })
            e.stopPropagation() 
        }}
        >
          <UserIcon color="#AAABAE" />
        </button>
    </li>
)

// Gear by Thak Ka from the Noun Project
// https://thenounproject.com/search/?q=gear&i=3524099
const GearIcon = (props) => (
  <svg
    viewBox="0 0 24 24" 
    stroke="transparent"
    fill={props.color}
    style={{ display: 'block' }}
  >
    <path d="M11.998 7.591c-2.43 0-4.406 1.978-4.406 4.408s1.977 4.408 4.406 4.408c2.432 0 4.408-1.978 4.408-4.408s-1.976-4.408-4.408-4.408zm0 7.816c-1.879 0-3.406-1.529-3.406-3.408s1.527-3.408 3.406-3.408 3.408 1.529 3.408 3.408-1.529 3.408-3.408 3.408z" />
    <path d="M21.504 10.053l-1.307-.28a8.514 8.514 0 00-.828-1.995l.725-1.12c.311-.475.238-1.164-.164-1.57l-1.021-1.024c-.395-.386-1.105-.46-1.564-.161l-1.125.728a8.352 8.352 0 00-1.994-.827l-.277-1.307a1.295 1.295 0 00-1.227-.99h-1.443c-.57 0-1.107.436-1.227.991l-.279 1.304a8.444 8.444 0 00-1.996.828l-1.121-.727c-.465-.302-1.18-.227-1.568.164L4.066 5.089a1.294 1.294 0 00-.164 1.567l.727 1.122a8.452 8.452 0 00-.828 1.996l-1.305.278a1.29 1.29 0 00-.992 1.226l-.002 1.445c.004.568.439 1.105.994 1.223l1.305.279c.191.699.469 1.368.83 1.995l-.727 1.12c-.311.474-.24 1.162.162 1.57l1.023 1.023c.395.388 1.104.462 1.564.162l1.123-.728c.631.361 1.299.64 1.996.828l.279 1.303c.115.555.652.991 1.225.995h1.447a1.298 1.298 0 001.223-.992l.279-1.307a8.465 8.465 0 001.994-.828l1.119.726c.195.127.428.194.674.194.34 0 .666-.129.896-.357l1.025-1.022a1.3 1.3 0 00.16-1.565l-.727-1.123a8.48 8.48 0 00.828-1.995l1.303-.278c.555-.117.992-.654.994-1.226l.002-1.45a1.291 1.291 0 00-.989-1.217zm-.01 2.665c0 .101-.104.229-.201.25l-1.609.344a.5.5 0 00-.383.377 7.438 7.438 0 01-.945 2.275.501.501 0 00.004.537l.896 1.386c.055.083.037.247-.031.317l-1.018 1.018c-.068.066-.242.085-.322.034l-1.383-.896a.5.5 0 00-.535-.005 7.428 7.428 0 01-2.277.944.504.504 0 00-.377.383l-.344 1.611c-.021.097-.148.2-.25.201h-1.438c-.1 0-.23-.105-.25-.201l-.344-1.61a.502.502 0 00-.377-.383 7.426 7.426 0 01-2.277-.944.502.502 0 00-.537.004l-1.385.896c-.08.05-.252.031-.316-.032l-1.018-1.019c-.072-.072-.09-.235-.035-.319l.896-1.384a.501.501 0 00.004-.537 7.477 7.477 0 01-.945-2.276.5.5 0 00-.383-.376l-1.609-.346c-.098-.02-.201-.148-.203-.246l.002-1.443c0-.1.104-.227.201-.248l1.609-.344a.505.505 0 00.383-.376 7.45 7.45 0 01.945-2.277.495.495 0 00-.004-.536l-.896-1.386c-.054-.083-.037-.246.031-.315l1.021-1.021c.068-.065.238-.082.316-.031l1.385.896a.498.498 0 00.535.004 7.473 7.473 0 012.277-.944.504.504 0 00.377-.383l.344-1.611c.021-.098.148-.199.248-.199h1.443c.1 0 .227.104.248.2l.344 1.61a.504.504 0 00.377.383 7.45 7.45 0 012.275.943.494.494 0 00.535-.004l1.389-.896c.072-.05.252-.029.314.031l1.018 1.02c.072.072.09.236.033.32l-.895 1.383a.505.505 0 00-.004.537 7.48 7.48 0 01.945 2.276.497.497 0 00.383.376l1.611.346c.098.021.201.15.201.246l.001 1.44z" />
  </svg>
)

export default connect((state:ReceiveState, ownProps): $Shape<Props> => {
  return {
    route: state.loginModule
  }
})(mainPage)
