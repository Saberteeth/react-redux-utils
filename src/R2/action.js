import {createAction} from './R2Factory';
import {outimeVerify} from '../utils/iUtils'
export const actionType = {
  TYPE: 'R2_DEMO',
  INPUTCHANGE: 'INPUTCHANGE'
}

const timeVerify = outimeVerify.bind({timer: null});
function inputChange(e) {
  const value = e.target.value;
  const data = {
    msg: null
  };
  const char = value[value.length - 1];
  if (!value || (/[0-9]/.test(char) && value.length <= 11)) {
    data.phone = value;
  }

  return (dispatch) => {
    timeVerify(1500, () => {
        if (value && !(/^1[34578]\d{9}$/.test(value))) {
          const data = {
            msg: "Failing number in China."
          };
          dispatch(createAction({
            who: actionType.TYPE,
            active: actionType.INPUTCHANGE
          }, data));
        }
    })
    dispatch(createAction({
      who: actionType.TYPE,
      active: actionType.INPUTCHANGE
    }, data));
  }
}

export const actions = {
  inputChange: inputChange
}