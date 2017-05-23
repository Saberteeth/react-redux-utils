import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers/index';

//applyMiddleware来自redux可以包装 store 的 dispatch
//thunk作用是使action创建函数可以返回一个function代替一个action对象
const createStoreWithMiddleware = applyMiddleware(
  thunk
)(createStore)

export default function configureStore(initState = {}) {
  const store = createStoreWithMiddleware(rootReducer,initState);

  //热替换选项
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextReducer = require('./reducers/index').default;
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
