// main page 右边位置
import  React  from 'react'
import { connect } from 'react-redux'
import {UserState}  from  '../../common/constants' 

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

    renderContents() {
        console.log("right ->>>>info");
        console.log(this.props);
        console.log(this.state);
        const { route } = this.props
        console.log(route);
        switch (route.type) { 
            case 'DEFAULTUSER_INFO':
                return <DefaultPage />
            case 'USERMANAGER_INFO':
                return <MainPage  />
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
    <div >
        userInfos....
    </div>
)



export default connect((state: UserState, ownProps): $Shape<Props> => {
    return {
        route: state.userModule
    }
    })(MessageRightPanel)