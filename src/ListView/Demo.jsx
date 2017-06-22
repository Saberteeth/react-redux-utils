import React from 'react';

import {ListView,iHandler} from './index';

const items = [1,2,3,4,5,6,7,8];
class Handler extends iHandler{
  getView(item){
    return (
      <div>{item.data}</div>
    )
  }
  getItem(index){
    return {height:100, data:items[index]};
  }
  getSize(){
    return items.length;
  }

  

}
const handler = new Handler();

export default class Demo extends React.Component{
  render(){
    return (
     <div>null</div>
    )
  }
}