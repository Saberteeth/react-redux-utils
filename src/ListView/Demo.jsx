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
      <div style={{background:color,width:"100%",height:"100%",color:bg}}>
        <img height={item.height} src="/images/24404591.jpeg"/>
        {item.data}
      </div>
    )
  }
  getItem(index){
    let h = 100;

    if(index%5 == 0)h = 200;
      
    return {height:h, data:items[index]};
  }
  getSize(){
    return items.length;
  }

}
const handler = new Handler();
const tools = {
  onScroll:null
}
export default class Demo extends React.Component{
  
  render(){
    return (
      <div>
      <button onClick={e=>tools.onScroll(0)}>0%</button> 
      <button onClick={e=>tools.onScroll(.5)}>50%</button>
      <button onClick={e=>tools.onScroll(1)}>100%</button>  
      <ListView tools={tools} width={300} height={600} handler={handler}/>
        {/*<div style={{height:'550px',width:"300px",overflow:'auto'}}>
          {listCreate(handler)}
        </div>*/}
      </div>
    )
  }
}

