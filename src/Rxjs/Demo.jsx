import React from 'react';
import {Event, Active} from './Active'

const event = new Event((observer)=>{
  observer.next(1);
  throw new Error(1);
});

export default() => {
  const click = event.getAction((observable)=>{
    return observable.map(e=>{
      return {event:e.nextEvent}
    });
  },{
    next: x => console.log('got value ',x),
    error: err => console.error('something wrong occurred: 404',err),
    complete: () => console.log('done'),
  });

  return (
    <div>
      Please open log to see result. U can't submit a lot time in a second.
      <br/>
      <button onClick={click}>submit</button>
    </div>
  )
}