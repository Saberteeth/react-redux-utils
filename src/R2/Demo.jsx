import React from 'react';
import R2Factory from './R2Factory';
import {actions} from './action';


const timer = null;
function Demo(props) {
  const phone = props
    .getState()
    .phone;
  const msg = props.getState().msg;

  return (
    <div>
      Phone:
      <input
        value={phone||""}
        onChange={props.inputChange}
        style={{
        width: '210px'
      }}
        type="tel"
        placeholder="Tell me your phone number, please."/>
      <div style={{color:'red'}}>
        {msg}
      </div>
    </div>
  )
}

const R2View = R2Factory.connect(Demo, (state) => state.r2, actions);
export default R2View;