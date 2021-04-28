// main page 右边位置
import  React  from 'react'
import { connect } from 'react-redux'
import {UserState}  from  '../../common/constants' 
import * as types from '../../common/actionTypes'


type props={
    route: RouteT,
    dispatch: Dispatch,
}


class  MessageRightPanel extends  React.Component<props,UserState>{
    constructor(props) {
        super(props)
        this.state = {
            showScroll: false
        }
    }


    checkPreSendMessage(){
        const { route } = this.props;
        this.props.dispatch({
            type:types.PRECHECKMESSAGE_ONLINE,
            to:route.item.mobile,
            userName:route.item.userName,
            mobile:route.item.mobile
        })
    }


    renderContents() {
        const { route } = this.props
        switch (route.type) { 
            case 'DEFAULTUSER_INFO':
                return <DefaultPage item={route.item} />
            case 'USERMANAGER_INFO':
                return <MainPage item={route.item}  onClick={this.checkPreSendMessage.bind(this)}  />
            default:
                return <DefaultPage />

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


const DefaultPage=()=>(
    <div className="main_defaultPage" >
        <span className="main_defaultSpan">welcome.user info default page  </span>
    </div>  

)



const  MainPage=(prop)=>(
    <React.Fragment>
        <div className='mainPage_top'>
            <div className='mainPage_topLeft'>
                <span className='mainPage_topSpan'>
                    {prop.item.userName}
                </span>
            </div>
            <div className='mainPage_topRight'>
                <img className='mainPage_info' src='http://www.begonia.com/demo/file/static/cherry.png'></img>
            </div>
        </div>
        <hr className='mainPage_hr'/>
        <div className='mainPage_middle' >
            <ul>
                <li>
                    <span>
                        {prop.item.userName}
                    </span>
                    <span>
                        {prop.item.userName}
                    </span>
                </li>
                <li>
                    <span>
                        {prop.item.userName}
                    </span>
                    <span>
                        {prop.item.userName}
                    </span>
                </li>
                <li>
                    <span>
                        {prop.item.userName}
                    </span>
                    <span>
                        {prop.item.userName}
                    </span>
                </li>
            </ul>
        </div>
        <hr className='mainPage_hr'/>
        <div className='mainPage_footer'>
            <button className='mainPage_footerbtn' onClick={prop.onClick} >send message</button>
        </div>
    </React.Fragment>
)



export default connect((state: UserState, ownProps): $Shape<Props> => {
    return {
        route: state.userModule
    }
    })(MessageRightPanel)