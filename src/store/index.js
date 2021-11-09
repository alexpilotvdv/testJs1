import { applyMiddleware, createStore } from "redux";
import rootReducer from '../reducers/index'
import thunkMiddlewr from 'redux-thunk'
export default store = createStore(rootReducer,applyMiddleware(thunkMiddlewr))