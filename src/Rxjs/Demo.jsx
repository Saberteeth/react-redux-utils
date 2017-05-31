import React from 'react';
import Active from './Active'

export default () => {
  const active = new Active((subject)=>{
    subject
    .throttleTime(1000)
    .map(event=>{
      return {x:event.clientX, y: event.clientY}
    })
    .subscribe({
      next: event => console.log(event)
    });
  })

  const click = (event) => {
    active.next(event);
  }
  
  return (
    <div>
      Please open log to see result. U can't submit a lot time in a second.
      <br/>
      <button onClick={click}>submit</button>
    </div>
  )
}