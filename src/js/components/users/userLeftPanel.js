// users left panel 
import { stat } from 'fs'
import  React  from 'react'
import { connect } from 'react-redux' 
import * as types from '../../common/actionTypes'
import {UsersState} from '../../common/constants'
import { getUsers } from '../../utils/https'

type props={
    route: RouteT,
    dispatch: Dispatch
}


class UserLeftPanel extends React.Component<props>{
    
    constructor(props) {
        super(props)
        this.state = {
            showScroll: false,
            index:'1',
            users:[]
        }
    }

    componentDidMount(){
        this.loadUsers();
    }


    
    funCheck(index,item){
        this.setState({
            index:index,
            item:item
        })
       
        this.props.dispatch({
                type:types.USERSMANAGER_INFO,
                item:item
            }
        )
    }  

    loadUsers(){
        getUsers(this.props.route.mobile).then((res)=>{
            this.setState({
                users:res.obj
            })
        });  
    }



    render (){
        const  showScroll=this.state.showScroll; 
        // console.log(this.props);
        // console.log(this.state);
        return (
            <div className="main_leftPanel_div" >
                <div className="main_leftPanel_search">
                    <SearchPanel></SearchPanel>    
                </div>   
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
                                    <div className='user_newLeftIcon'><img className='user-lefticon' src="http://www.begonia.com/demo/file/static/cherry.png"></img> </div>
                                    <div className='user_newRightSpan'>
                                        <div> {item.userName}</div>
                                    </div>
                                </div>
                            </li> 
                    })} 
                    
                </ul>
            </div>
        )
    }

}


const  SearchPanel=(props)=>(
    <React.Fragment>
        <div className='user_searchdiv'>
            <input className='user_search' placeholder='搜索'></input>
        </div>
        <div className='user_searchbtn'>
            <button className='user_searchRightBtn'>+</button>
        </div>
    </React.Fragment>
)

export default connect((state: UserState, ownProps): $Shape<Props> => {
    return {
        route: state.userModule
    }
})(UserLeftPanel)