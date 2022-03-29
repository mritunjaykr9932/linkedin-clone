import { combineReducers } from "redux";
import userReducer from "./userReducer";
import articleReducer from "./articlereducers";



const rootreducer = combineReducers({

    userstate: userReducer,
    articleState: articleReducer,
});

export default rootreducer;