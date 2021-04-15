import React from 'react'
import { connect } from 'react-redux'
import UserLeftPanel  from './userLeftPanel' 
import UserRightPanel from './userRightPanel'

type props={
    route: RouteT,
    dispatch: Dispatch,
}


class UserManagerOnlinePage extends React.Component<props>{

    render() {
        return (
            <div className="container">
                <div className="left-panel main_leftPanel">
                    <UserLeftPanel/>
                </div>
                <div className="right-panel">
                    <UserRightPanel/>
                </div>
            </div>
        )

    }
}


export default connect((state: UserState, ownProps): $Shape<Props> => {
    return {
      route: state.userModule
    }
  })(UserManagerOnlinePage)