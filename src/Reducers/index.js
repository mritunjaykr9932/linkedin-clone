import { combineReducers } from "redux";
import userReducer from "./userReducer";

const rootreducer = combineReducers({

    userstate: userReducer,
});

export default rootreducer;