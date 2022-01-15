
import {LOGIN_LOADING, LOGIN_SUCCESS, LOGIN_ERROR} from "./actionTypes";
import axios from "axios";

async function loadData(key) {
    try {
        var data = localStorage.getItem(key);
        data = JSON.parse(data);
        return data;
    } catch (err) {
        return undefined;
    }
}
const initState = loadData("token") || {isAuth : false, token: "", loading : true}

const saveData = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
}


export const loginReducer = (state = initState, {type, payload}) => {
    switch(type) {
        
        case LOGIN_SUCCESS : 
        // console.log(payload);

            saveData("token", payload)
            return {
                ...state,
                loading: false,
                isAuth : true,
                token : payload
            }
        default : 
            return {
                ...state
            }
    }
}