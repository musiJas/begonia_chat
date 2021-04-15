// main page 右边位置
import  React  from 'react'
import { connect } from 'react-redux'
import {MessageState}  from  '../../common/constants' 

type props={
    route: RouteT,
    dispatch: Dispatch,
}


class  MessageRightPanel extends  React.Component<props,MessageState>{
    constructor(props) {
        super(props)
        this.state = {
            showScroll: false
        }
      }


    renderContents() {
        console.log(this.props);
        console.log(this.state);
        const { route } = this.props
        console.log(route);
        switch (route.type) { 
            case 'DEFAULTMESSAGE_ONLINE':
                return <DefaultMainPage />
            case 'PRECHECKMESSAGE_ONLINE':
                return <MainPage  state={this.state}
                        onMouseEnter={(props,e) => {
                            console.log(props);
                            this.setState({
                                showScroll:props.showScroll
                            })

                        }}
                        onMouseLeave={(props) => {
                            this.setState({
                                showScroll:props.showScroll
                            })
                        }} />
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
  

const  MainPage=(prop)=>(
    <React.Fragment>
        <MainTop state={prop.state}  onMouseEnter={(props) => {
                           console.log(props);
                        prop.onMouseEnter(props)
                        // e.stopPropagation()
                    }}  
                    onMouseLeave={(props) => {
                        prop.onMouseLeave(props)
                        // e.stopPropagation()
                    }} />
        <MainButtom/>
    </React.Fragment>
)

const  MainTop=(props)=>(
    <div className={`message-main-top  ${props.state.showScroll?"show_scroll":''}`} 
         onMouseEnter={(e)=>{
                console.log("enter:>>>>");
                console.log(props.state);
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
        <div>test 试卷阿松大阿萨大苏打</div>
        <div>test 试卷阿松大阿萨大苏打</div>
        <div>test 试卷阿松大阿萨大苏打</div>
        <div>test 试卷阿松大阿萨大苏打</div>
        <div>test 试卷阿松大阿萨大苏打</div>
        <div>test 试卷阿松大阿萨大苏打</div>
        <div>test 试卷阿松大阿萨大苏打</div>
        <div>test 试卷阿松大阿萨大苏打</div>
        <div>test 试卷阿松大阿萨大苏打</div>
        <div>test 试卷阿松大阿萨大苏打</div>
        <div>test 试卷阿松大阿萨大苏打</div>
        <div>test 试卷阿松大阿萨大苏打</div>
        <div>test 试卷阿松大阿萨大苏打</div>
        <div>test 试卷阿松大阿萨大苏打</div>
        <div>test 试卷阿松大阿萨大苏打</div>
        <div>test 试卷阿松大阿萨大苏打</div>
        <div>test 试卷阿松大阿萨大苏打</div>
        <div>test 试卷阿松大阿萨大苏打</div>
        <div>test 试卷阿松大阿萨大苏打</div>
        <div>test 试卷阿松大阿萨大苏打</div>
        <div>test 试卷阿松大阿萨大苏打</div>
        <div>test 试卷阿松大阿萨大苏打</div>
        <div>test 试卷阿松大阿萨大苏打</div>
        <div>test 试卷阿松大阿萨大苏打</div>
        <div>test 试卷阿松大阿萨大苏打</div>
        <div>test 试卷阿松大阿萨大苏打</div>
        <div>test 试卷阿松大阿萨大苏打</div>
        <div>test 试卷阿松大阿萨大苏打</div>
        <div>test 试卷阿松大阿萨大苏打</div>
        <div>test 试卷阿松大阿萨大苏打</div>
        <div>test 试卷阿松大阿萨大苏打</div>
        <div>test 试卷阿松大阿萨大苏打</div>
        <div>test 试卷阿松大阿萨大苏打</div>
        <div>test 试卷阿松大阿萨大苏打</div>
        <div>test 试卷阿松大阿萨大苏打</div>
        <div>test 试卷阿松大阿萨大苏打</div>
        <div>test 试卷阿松大阿萨大苏打</div>
        <div>test 试卷阿松大阿萨大苏打</div>
        <div>test 试卷阿松大阿萨大苏打</div>
        <div>test 试卷阿松大阿萨大苏打</div>
        <div>test 试卷阿松大阿萨大苏打</div>
        <div>test 试卷阿松大阿萨大苏打</div>
        <div>test 试卷阿松大阿萨大苏打</div>
        <div>test 试卷阿松大阿萨大苏打</div>
        <div>test 试卷阿松大阿萨大苏打</div>
        <div>test 试卷阿松大阿萨大苏打</div>
        <div>test 试卷阿松大阿萨大苏打</div>
        <div>test 试卷阿松大阿萨大苏打</div>
        <div>test 试卷阿松大阿萨大苏打</div>

    </div>
)
 
const  MainButtom=(props)=>(
    <div className="message-main-buttom">
        <div>
            <button>
                bt1
            </button>
        </div>
        <div>
            <textarea></textarea>
        </div>
        <div>
            <button>
                send
            </button>
        </div>
    </div>
)

export default connect((state: MessageState, ownProps): $Shape<Props> => {
    return {
      route: state.messageModule
    }
  })(MessageRightPanel)