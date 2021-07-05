import React from 'react'
import { connect } from 'react-redux'

type props={
    route: RouteT,
    dispatch: Dispatch,
}


class  SettingManagerInfo extends React.Component<props>{

    render() {
        return (
            <div className="container">
                setting.... 
            </div>
        )

    }
}


export default connect((state: SettingState, ownProps): $Shape<Props> => {
    return {
      route: state.loginModule
    }
  })(SettingManagerInfo)