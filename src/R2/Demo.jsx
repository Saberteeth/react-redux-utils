import React from 'react';
import R2Factory from './R2Factory';
import {actions} from './action';


const timer = null;
function Demo(props) {
  const phone = props
    .getState()
    .phone;
  const msg = props.getState().msg;
  const tableStyle = {border:"5px solid darkblue",padding:"20px",width:"300px",borderRadius:"10px"};
  const divStyle = {border:"1px solid darkblue",padding:"6px",borderRadius:"6px",float:'left',marginRight:"10px"}
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
        <div style={divStyle}>
          <table style={tableStyle}>
            <tr>
              <td style={{width:"24%",textAlign:"right"}}>
                Name:
              </td>
              <td>
                Demmo
              </td>
            </tr>
            <tr>
              <td style={{textAlign:"right"}}>Phone:</td>
              <td>
                {phone}
              </td>
            </tr>
          </table>
        </div>
      <div style={{color:'red'}}>
        {msg}
      </div>
    </div>
  )
}

const R2View = R2Factory.connect(Demo, (state) => state.r2, actions);
export default R2View;