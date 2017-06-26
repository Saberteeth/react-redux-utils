import React from 'react';

import {ListView,iHandler} from './index';

const items = [];
for(let i=0;i<100000;i+=1){
  items[i] = i;
}

function listCreate(handler){
  const li = [];
  for(let i=0;i<handler.getSize();i+=1){
    const item = handler.getItem(i);
    const itemView = handler.getView(item);
    const view = (
       <div
          key={i}
          className="item"
          style={{
            width: "100%",
            height: item.height + "px"
          }}
        >
          {itemView}
      </div>
    )
    li.push(view);
  }
  return li;
}

class Handler extends iHandler{
  getView(item){
    let color = "white";
    let bg = "black";

    if(item.data%2 == 1)
      color = "black";

    if(item.data%2 == 1)
      bg = "white";
    
    return (
      <div style={{borderBottom:"1px solid black",background:color,width:"100%",height:"100%",color:bg}}>
        <img height={item.height} src="/images/24404591.jpeg"/>
        {item.data}
      </div>
    )
  }
  getItem(index){
    let h = 100;
    h += index % 10 * 10
    return {height:h, data:items[index]};
  }
  getSize(){
    return items.length;
  }

}
let height = 600;
const handler = new Handler();
const tools = {
  onScroll:null,
  verify:null
}
export default class Demo extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      height: 600
    }
  }
  changeHeight(){
    let h = this.state.height == 600?400:600;
    this.setState({height:h});
    tools.verify();  
  }
  render(){
    return (
      <div>
        <button onClick={e=>{this.changeHeight()}}>Height Change</button>   
        <button onClick={e=>tools.onScroll(0)}>0%</button> 
        <button onClick={e=>tools.onScroll(.5)}>50%</button>
        <button onClick={e=>tools.onScroll(1)}>100%</button>  
        <ListView tools={tools} width={300} height={this.state.height} handler={handler}/>
        {/*<div style={{height:'550px',width:"300px",overflow:'auto'}}>
          {listCreate(handler)}
        </div>*/}
      </div>
    )
  }
}

