import {createStore, combineReducers} from "redux";

import {loginReducer} from "./reducer.js";

const rootReducer = combineReducers({
    auth: loginReducer
})


export const store = createStore(rootReducer);