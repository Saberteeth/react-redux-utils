import { createAction } from '../utils/R2Factory';
export const actionType = {
  TYPE:'R2_DEMO',
  INPUTCHANGE:'INPUTCHANGE'
}

function inputChange(e){
  const value = e.target.value;
  return (dispatch)=>{
    const data = {phone:value}
    dispatch(createAction({who:actionType.TYPE, active:actionType.INPUTCHANGE},data));
  }
}

export const actions = {
  inputChange:inputChange
}