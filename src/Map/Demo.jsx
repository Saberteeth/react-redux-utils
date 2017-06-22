import React from 'react';
import PropTypes from 'prop-types';
import XMap,{SearchBar} from './index';

function ISearch({ctrl, __map__, __ele__},{demo}){
  return (
    <div style={{marginLeft:"100px"}}>
      Search:
      <SearchBar ctrl={ctrl} __map__={__map__} />
      <button onClick={e=>{
        demo.setState({isShowSearch:false});
      }}>隐藏</button>
    </div>
  )
}
ISearch.contextTypes = {
  demo: PropTypes.object.isRequired
};


class Demo extends React.Component{
  constructor(props){
    super(props);
    this.utils = {line:null};
    this.state = {
      isShowSearch: true
    }
  }
  getChildContext() {
    return {demo: this}
  }
  render(){

    const tools = this.state.isShowSearch?[ISearch]:[];
    const click = e => {
      this.utils.line([[106.948098, 27.702801], [116.321188, 39.893333],[120.106809,29.333854]]);
    }
    return (
      <div>
        <XMap utils={this.utils} onMarkClick={e=>console.log(e)} xtools={tools} style={{width:'100%',height:"400px"}}/>
        {this.state.isShowSearch?null:<button onClick={e=>{this.setState({isShowSearch:true})}}>Show</button>}
        <button onClick={click}>line</button>
      </div>
    )
  }
}
Demo.childContextTypes = {
  demo: PropTypes.object.isRequired
};

export default Demo;