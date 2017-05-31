import Rx from 'rxjs';

export class Active {
  constructor(rule){
    this.init(rule);
  }

  init(rule){
    this._subject = new Rx.Subject();
    rule(this._subject);
  }
  
  next(e){
    return this._subject.next(e);
  }
}

export default Active;