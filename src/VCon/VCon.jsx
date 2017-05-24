import React from 'react';
import icons from './svg/index';

export function createVCon(name, className="", id=""){
  return (
    <span className={"vcon-svg " + className } id={id} dangerouslySetInnerHTML={{__html: icons[name]}} />
  )
}

const VCons = {};
(()=>{
  for(const name in icons){
     VCons[name] = (props) => createVCon(name, props.className, props.id);
  }
})()
export default VCons;