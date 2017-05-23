import {actionType} from './action';

function init(){
  return {
    phone: null,
  }
}

const reducer = (state = init(), action) => {
  switch(action.type){
    case actionType.TYPE:
      return Object.assign({},state,action.data[0]);
    default:
      return state;
  }
}

export default reducer;
