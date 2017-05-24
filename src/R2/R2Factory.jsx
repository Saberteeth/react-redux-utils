import {connect} from 'react-redux'

export function createAction({
  who,
  active = "DEFAULT"
}, ...datas) {
  return {
    type: who,
    data: {
      type: active,
      ...datas
    }
  }
}

/**
 * Create a connect for your view with redux.
 * @param {Object} view
 * Your widget view.
 * @param {function} luncher
 * A luncher u can use it to manage your state.
 */
export function connectActionFactory(view, luncher, actions = {}) {
  const obj = {
    state: null,
    buildState: (topState) => Object.assign({}, topState, obj.state)
  }
  const mapStateToProps = (state) => {
    obj.state = luncher(state);
    return {
      /**
       * get state for youself.
       */
      getState: () => obj.state,
      oldState: state
    }
  };
  actions.sendAction = function ({
    who,
    active
  }, ...datas) {
    return (dispatch) => {
      const type = who;
      const data = {
        "type": active,
        "buildState": obj.buildState,
        ...datas
      }
      dispatch({"type": type, "data": data});
    }
  };
  return connect(mapStateToProps, actions)(view);
}

/**
 * Return allthing about R2Factory.
 */
export default {
  connect : connectActionFactory
}
