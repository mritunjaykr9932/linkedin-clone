import { createStore,applyMiddleware } from "redux";
import rootReducer from '../Reducers';
import thunkMiddelware from 'redux-thunk';

const store = createStore(rootReducer,applyMiddleware(thunkMiddelware));

export default store;