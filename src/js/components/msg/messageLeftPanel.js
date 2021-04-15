// main page left左边位置
import  React  from 'react'
import { connect } from 'react-redux' 
import * as types from '../../common/actionTypes'

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
            index:'1'
        }
      }
 
    
    funCheck(index,to){
        this.setState({
            index:index,
            to:to
        })
        this.props.dispatch({
                type:types.PRECHECKMESSAGE_ONLINE,
                to:to
            }
        )
    }  


    render (){
        const  showScroll=this.state.showScroll;
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
                    <li index={'1'} onClick={this.funCheck.bind(this,'1',"3")}  className={`main_leftPanel_li  ${this.state.index =='1'?"main_left_li":''} `} >测试1</li>
                    <li index={'2'} onClick={this.funCheck.bind(this,'2',"3")} className={`main_leftPanel_li  ${this.state.index =='2'?"main_left_li":''} `} >测试2</li>
                    <li index={'3'} onClick={this.funCheck.bind(this,'3',"3")} className={`main_leftPanel_li  ${this.state.index =='3'?"main_left_li":''} `} >测试3</li>
                    <li index={'4'} onClick={this.funCheck.bind(this,'4',"3")} className={`main_leftPanel_li  ${this.state.index =='4'?"main_left_li":''} `} >测试4</li>
                    <li index={'5'} onClick={this.funCheck.bind(this,'5',"3")} className={`main_leftPanel_li  ${this.state.index =='5'?"main_left_li":''} `} >测试5</li>
                    <li index={'6'} className={`main_leftPanel_li  ${this.state.index =='6'?"main_left_li":''} `} >测试6</li>
                    <li index={'7'} className={`main_leftPanel_li  ${this.state.index =='7'?"main_left_li":''} `} >测试7</li>
                    <li index={'8'} className={`main_leftPanel_li  ${this.state.index =='8'?"main_left_li":''} `} >测试8</li>
                    <li index={'9'} className={`main_leftPanel_li  ${this.state.index =='9'?"main_left_li":''} `} >测试9</li>
                    <li index={'10'} className={`main_leftPanel_li  ${this.state.index =='10'?"main_left_li":''} `} >测试1</li>
                    <li index={'11'} className={`main_leftPanel_li  ${this.state.index =='11'?"main_left_li":''} `} >测试1</li>
                    <li index={'12'} className={`main_leftPanel_li  ${this.state.index =='12'?"main_left_li":''} `} >测试1</li>
                    <li index={'13'} className={`main_leftPanel_li  ${this.state.index =='13'?"main_left_li":''} `} >测试1</li>
                    <li index={'14'} className={`main_leftPanel_li  ${this.state.index =='14'?"main_left_li":''} `} >测试1</li>
                    <li index={'15'} className={`main_leftPanel_li  ${this.state.index =='15'?"main_left_li":''} `} >测试1</li>
                    <li index={'16'} className={`main_leftPanel_li  ${this.state.index =='16'?"main_left_li":''} `} >测试1</li>
                    <li index={'17'} className={`main_leftPanel_li  ${this.state.index =='17'?"main_left_li":''} `} >测试1</li>
                    <li index={'18'} className={`main_leftPanel_li  ${this.state.index =='18'?"main_left_li":''} `} >测试1</li>
                    <li index={'19'} className={`main_leftPanel_li  ${this.state.index =='19'?"main_left_li":''} `} >测试1</li>
                    <li index={'20'} className={`main_leftPanel_li  ${this.state.index =='20'?"main_left_li":''} `} >测试1</li>
                    <li index={'21'} className={`main_leftPanel_li  ${this.state.index =='21'?"main_left_li":''} `} >测试1</li>
                    <li index={'22'} className={`main_leftPanel_li  ${this.state.index =='22'?"main_left_li":''} `} >测试1</li>
                    <li index={'23'} className={`main_leftPanel_li  ${this.state.index =='23'?"main_left_li":''} `} >测试1</li>
                    <li index={'10'} className={`main_leftPanel_li  ${this.state.index =='10'?"main_left_li":''} `} >测试1</li>
                    <li index={'11'} className={`main_leftPanel_li  ${this.state.index =='11'?"main_left_li":''} `} >测试1</li>
                    <li index={'12'} className={`main_leftPanel_li  ${this.state.index =='12'?"main_left_li":''} `} >测试1</li>
                    <li index={'13'} className={`main_leftPanel_li  ${this.state.index =='13'?"main_left_li":''} `} >测试1</li>
                    <li index={'14'} className={`main_leftPanel_li  ${this.state.index =='14'?"main_left_li":''} `} >测试1</li>
                    <li index={'15'} className={`main_leftPanel_li  ${this.state.index =='15'?"main_left_li":''} `} >测试1</li>
                    <li index={'16'} className={`main_leftPanel_li  ${this.state.index =='16'?"main_left_li":''} `} >测试1</li>
                    <li index={'17'} className={`main_leftPanel_li  ${this.state.index =='17'?"main_left_li":''} `} >测试1</li>
                    <li index={'18'} className={`main_leftPanel_li  ${this.state.index =='18'?"main_left_li":''} `} >测试1</li>
                    <li index={'19'} className={`main_leftPanel_li  ${this.state.index =='19'?"main_left_li":''} `} >测试1</li>
                    <li index={'20'} className={`main_leftPanel_li  ${this.state.index =='20'?"main_left_li":''} `} >测试1</li>
                    <li index={'21'} className={`main_leftPanel_li  ${this.state.index =='21'?"main_left_li":''} `} >测试1</li>
                    <li index={'22'} className={`main_leftPanel_li  ${this.state.index =='22'?"main_left_li":''} `} >测试1</li>
                    <li index={'23'} className={`main_leftPanel_li  ${this.state.index =='23'?"main_left_li":''} `} >测试1</li>
                    <li index={'10'} className={`main_leftPanel_li  ${this.state.index =='10'?"main_left_li":''} `} >测试1</li>
                    <li index={'11'} className={`main_leftPanel_li  ${this.state.index =='11'?"main_left_li":''} `} >测试1</li>
                    <li index={'12'} className={`main_leftPanel_li  ${this.state.index =='12'?"main_left_li":''} `} >测试1</li>
                    <li index={'13'} className={`main_leftPanel_li  ${this.state.index =='13'?"main_left_li":''} `} >测试1</li>
                    <li index={'14'} className={`main_leftPanel_li  ${this.state.index =='14'?"main_left_li":''} `} >测试1</li>
                    <li index={'15'} className={`main_leftPanel_li  ${this.state.index =='15'?"main_left_li":''} `} >测试1</li>
                    <li index={'16'} className={`main_leftPanel_li  ${this.state.index =='16'?"main_left_li":''} `} >测试1</li>
                    <li index={'17'} className={`main_leftPanel_li  ${this.state.index =='17'?"main_left_li":''} `} >测试1</li>
                    <li index={'18'} className={`main_leftPanel_li  ${this.state.index =='18'?"main_left_li":''} `} >测试1</li>
                    <li index={'19'} className={`main_leftPanel_li  ${this.state.index =='19'?"main_left_li":''} `} >测试1</li>
                    <li index={'20'} className={`main_leftPanel_li  ${this.state.index =='20'?"main_left_li":''} `} >测试1</li>
                    <li index={'21'} className={`main_leftPanel_li  ${this.state.index =='21'?"main_left_li":''} `} >测试1</li>
                    <li index={'22'} className={`main_leftPanel_li  ${this.state.index =='22'?"main_left_li":''} `} >测试1</li>
                    <li index={'23'} className={`main_leftPanel_li  ${this.state.index =='23'?"main_left_li":''} `} >测试1</li>
                    <li index={'10'} className={`main_leftPanel_li  ${this.state.index =='10'?"main_left_li":''} `} >测试1</li>
                    <li index={'11'} className={`main_leftPanel_li  ${this.state.index =='11'?"main_left_li":''} `} >测试1</li>
                    <li index={'12'} className={`main_leftPanel_li  ${this.state.index =='12'?"main_left_li":''} `} >测试1</li>
                    <li index={'13'} className={`main_leftPanel_li  ${this.state.index =='13'?"main_left_li":''} `} >测试1</li>
                    <li index={'14'} className={`main_leftPanel_li  ${this.state.index =='14'?"main_left_li":''} `} >测试1</li>
                    <li index={'15'} className={`main_leftPanel_li  ${this.state.index =='15'?"main_left_li":''} `} >测试1</li>
                    <li index={'16'} className={`main_leftPanel_li  ${this.state.index =='16'?"main_left_li":''} `} >测试1</li>
                    <li index={'17'} className={`main_leftPanel_li  ${this.state.index =='17'?"main_left_li":''} `} >测试1</li>
                    <li index={'18'} className={`main_leftPanel_li  ${this.state.index =='18'?"main_left_li":''} `} >测试1</li>
                    <li index={'19'} className={`main_leftPanel_li  ${this.state.index =='19'?"main_left_li":''} `} >测试1</li>
                    <li index={'20'} className={`main_leftPanel_li  ${this.state.index =='20'?"main_left_li":''} `} >测试1</li>
                    <li index={'21'} className={`main_leftPanel_li  ${this.state.index =='21'?"main_left_li":''} `} >测试1</li>
                    <li index={'22'} className={`main_leftPanel_li  ${this.state.index =='22'?"main_left_li":''} `} >测试1</li>
                    <li index={'23'} className={`main_leftPanel_li  ${this.state.index =='23'?"main_left_li":''} `} >测试1</li>
                    <li index={'10'} className={`main_leftPanel_li  ${this.state.index =='10'?"main_left_li":''} `} >测试1</li>
                    <li index={'11'} className={`main_leftPanel_li  ${this.state.index =='11'?"main_left_li":''} `} >测试1</li>
                    <li index={'12'} className={`main_leftPanel_li  ${this.state.index =='12'?"main_left_li":''} `} >测试1</li>
                    <li index={'13'} className={`main_leftPanel_li  ${this.state.index =='13'?"main_left_li":''} `} >测试1</li>
                    <li index={'14'} className={`main_leftPanel_li  ${this.state.index =='14'?"main_left_li":''} `} >测试1</li>
                    <li index={'15'} className={`main_leftPanel_li  ${this.state.index =='15'?"main_left_li":''} `} >测试1</li>
                    <li index={'16'} className={`main_leftPanel_li  ${this.state.index =='16'?"main_left_li":''} `} >测试1</li>
                    <li index={'17'} className={`main_leftPanel_li  ${this.state.index =='17'?"main_left_li":''} `} >测试1</li>
                    <li index={'18'} className={`main_leftPanel_li  ${this.state.index =='18'?"main_left_li":''} `} >测试1</li>
                    <li index={'19'} className={`main_leftPanel_li  ${this.state.index =='19'?"main_left_li":''} `} >测试1</li>
                    <li index={'20'} className={`main_leftPanel_li  ${this.state.index =='20'?"main_left_li":''} `} >测试1</li>
                    <li index={'21'} className={`main_leftPanel_li  ${this.state.index =='21'?"main_left_li":''} `} >测试1</li>
                    <li index={'22'} className={`main_leftPanel_li  ${this.state.index =='22'?"main_left_li":''} `} >测试1</li>
                    <li index={'23'} className={`main_leftPanel_li  ${this.state.index =='23'?"main_left_li":''} `} >测试1</li>
                    <li index={'10'} className={`main_leftPanel_li  ${this.state.index =='10'?"main_left_li":''} `} >测试1</li>
                    <li index={'11'} className={`main_leftPanel_li  ${this.state.index =='11'?"main_left_li":''} `} >测试1</li>
                    <li index={'12'} className={`main_leftPanel_li  ${this.state.index =='12'?"main_left_li":''} `} >测试1</li>
                    <li index={'13'} className={`main_leftPanel_li  ${this.state.index =='13'?"main_left_li":''} `} >测试1</li>
                    <li index={'14'} className={`main_leftPanel_li  ${this.state.index =='14'?"main_left_li":''} `} >测试1</li>
                    <li index={'15'} className={`main_leftPanel_li  ${this.state.index =='15'?"main_left_li":''} `} >测试1</li>
                    <li index={'16'} className={`main_leftPanel_li  ${this.state.index =='16'?"main_left_li":''} `} >测试1</li>
                    <li index={'17'} className={`main_leftPanel_li  ${this.state.index =='17'?"main_left_li":''} `} >测试1</li>
                    <li index={'18'} className={`main_leftPanel_li  ${this.state.index =='18'?"main_left_li":''} `} >测试1</li>
                    <li index={'19'} className={`main_leftPanel_li  ${this.state.index =='19'?"main_left_li":''} `} >测试1</li>
                    <li index={'20'} className={`main_leftPanel_li  ${this.state.index =='20'?"main_left_li":''} `} >测试1</li>
                    <li index={'21'} className={`main_leftPanel_li  ${this.state.index =='21'?"main_left_li":''} `} >测试1</li>
                    <li index={'22'} className={`main_leftPanel_li  ${this.state.index =='22'?"main_left_li":''} `} >测试1</li>
                    <li index={'23'} className={`main_leftPanel_li  ${this.state.index =='23'?"main_left_li":''} `} >测试1</li>
                    <li index={'10'} className={`main_leftPanel_li  ${this.state.index =='10'?"main_left_li":''} `} >测试1</li>
                    <li index={'11'} className={`main_leftPanel_li  ${this.state.index =='11'?"main_left_li":''} `} >测试1</li>
                    <li index={'12'} className={`main_leftPanel_li  ${this.state.index =='12'?"main_left_li":''} `} >测试1</li>
                    <li index={'13'} className={`main_leftPanel_li  ${this.state.index =='13'?"main_left_li":''} `} >测试1</li>
                    <li index={'14'} className={`main_leftPanel_li  ${this.state.index =='14'?"main_left_li":''} `} >测试1</li>
                    <li index={'15'} className={`main_leftPanel_li  ${this.state.index =='15'?"main_left_li":''} `} >测试1</li>
                    <li index={'16'} className={`main_leftPanel_li  ${this.state.index =='16'?"main_left_li":''} `} >测试1</li>
                    <li index={'17'} className={`main_leftPanel_li  ${this.state.index =='17'?"main_left_li":''} `} >测试1</li>
                    <li index={'18'} className={`main_leftPanel_li  ${this.state.index =='18'?"main_left_li":''} `} >测试1</li>
                    <li index={'19'} className={`main_leftPanel_li  ${this.state.index =='19'?"main_left_li":''} `} >测试1</li>
                    <li index={'20'} className={`main_leftPanel_li  ${this.state.index =='20'?"main_left_li":''} `} >测试1</li>
                    <li index={'21'} className={`main_leftPanel_li  ${this.state.index =='21'?"main_left_li":''} `} >测试1</li>
                    <li index={'22'} className={`main_leftPanel_li  ${this.state.index =='22'?"main_left_li":''} `} >测试1</li>
                    <li index={'23'} className={`main_leftPanel_li  ${this.state.index =='23'?"main_left_li":''} `} >测试1</li>
                    <li index={'10'} className={`main_leftPanel_li  ${this.state.index =='10'?"main_left_li":''} `} >测试1</li>
                    <li index={'11'} className={`main_leftPanel_li  ${this.state.index =='11'?"main_left_li":''} `} >测试1</li>
                    <li index={'12'} className={`main_leftPanel_li  ${this.state.index =='12'?"main_left_li":''} `} >测试1</li>
                    <li index={'13'} className={`main_leftPanel_li  ${this.state.index =='13'?"main_left_li":''} `} >测试1</li>
                    <li index={'14'} className={`main_leftPanel_li  ${this.state.index =='14'?"main_left_li":''} `} >测试1</li>
                    <li index={'15'} className={`main_leftPanel_li  ${this.state.index =='15'?"main_left_li":''} `} >测试1</li>
                    <li index={'16'} className={`main_leftPanel_li  ${this.state.index =='16'?"main_left_li":''} `} >测试1</li>
                    <li index={'17'} className={`main_leftPanel_li  ${this.state.index =='17'?"main_left_li":''} `} >测试1</li>
                    <li index={'18'} className={`main_leftPanel_li  ${this.state.index =='18'?"main_left_li":''} `} >测试1</li>
                    <li index={'19'} className={`main_leftPanel_li  ${this.state.index =='19'?"main_left_li":''} `} >测试1</li>
                    <li index={'20'} className={`main_leftPanel_li  ${this.state.index =='20'?"main_left_li":''} `} >测试1</li>
                    <li index={'21'} className={`main_leftPanel_li  ${this.state.index =='21'?"main_left_li":''} `} >测试1</li>
                    <li index={'22'} className={`main_leftPanel_li  ${this.state.index =='22'?"main_left_li":''} `} >测试1</li>
                    <li index={'23'} className={`main_leftPanel_li  ${this.state.index =='23'?"main_left_li":''} `} >测试1</li>
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