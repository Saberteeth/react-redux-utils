import React from 'react';
import R2Factory from './R2Factory';
import {actions} from './action';

function Demo(props) {
  const phone = props
    .getState()
    .phone;
  let msg = "";

  if (phone && !(/^1[34578]\d{9}$/.test(phone))) {
    msg = "Failing number in China."
  }

  return (
    <div>
      Phone:
      <input
        value={phone}
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