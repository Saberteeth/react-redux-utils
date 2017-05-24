export function outimeVerify(time,timEndFun){
  if(this.timer){
    clearTimeout(this.timer);
  }

  this.timer = setTimeout(()=>{
    timEndFun();
    this.timer = null;
  }, time);
}

export default {
  outimeVerify
}