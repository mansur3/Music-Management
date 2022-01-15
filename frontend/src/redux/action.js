

import {LOGIN_LOADING, LOGIN_SUCCESS, LOGIN_ERROR} from "./actionTypes.js";


export const loginLoading = () => ({type : LOGIN_LOADING});
export const loginSuccess = (data) => ({type : LOGIN_SUCCESS, payload: data});
export const loginError = (data) => ({type : LOGIN_ERROR, payload: data});



