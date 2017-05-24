import React from 'react';
import VCons from './VCon'

const { Add, Point, Firm, Rightarrow, Camera, Setting } = VCons;

export default ()=>{
  
  return (
    <div id="vcons">
      <h1>VCons</h1>
      <ul>
        <li>
          <Add />
        </li>
        <li>
          <Point />
        </li>
        <li>
          <Firm />
        </li>
        <li>
          <Rightarrow />
        </li>
        <li>
          <Camera />
        </li>
        <li>
          <Setting />
        </li>
      </ul>
    </div>
  )
}
