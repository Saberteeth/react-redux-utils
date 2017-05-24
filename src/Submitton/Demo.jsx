import React from 'react';
import Submit from './index';
export default ()=>{
  const executor = (resolve, reject) =>{
    setTimeout(()=>{
      resolve(1);
    },1000);
  }
  return (
    <div>
      <div>Timeout:1s</div>
      <Submit executor={executor}/>
    </div>
    
  )
}