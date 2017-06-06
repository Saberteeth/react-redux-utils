import React from 'react';
import {Event, Active} from './Active'

const Type = {
  LOADING:0,
  LOADEND:1,
  LOADERR:2
}


class Demo extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      status: 3,
      value: 0  
    }
    const thas = this;
    this._event = new Event((observer)=>{
      observer.next({status:Type.LOADING});
      setTimeout(function() {
        try{
          const value = ++thas.state.value;
          if(value > 1){
            throw new Error('bad data!');
          }
          observer.next({status:Type.LOADEND,value:value});
        }catch(err){
          observer.next({status:Type.LOADERR});  
        }finally{
          observer.complete();
        }
      }, 2000);
    });
    this.initEvent();
  }

  initEvent(){
    this.click = this._event.getAction((observable)=>{
      return observable.map(e=>{
        return {...e.nextEvent};
      });
    },{
      next: x => {
        this.setState(Object.assign({},this.state,x));
      },
      error: err => {
        this.setState({status:Type.LOADERR});
      },
      complete: () => {
        console.log('end.')
      }
    });
  }

  render(){
    const str = ["Loading...",
    "Load data is " + this.state.value,
    "T_T! 404, Can't find anything.",
    "Click button."];
    return (
      <div>
        {str[this.state.status]}
        <br/>
        <button onClick={this.click}>submit</button>
      </div>
    )
  }
}

export default Demo;