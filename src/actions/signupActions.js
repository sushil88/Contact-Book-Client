import axios from 'axios';
import {API_URL} from "../config";

export function userSignupRequest(userData) {
  return dispatch => {
    return axios.post(API_URL+'/register', userData);
  }
}

export function isUserExists(identifier) {
  return dispatch => {
    return axios.get(API_URL+`/user/${identifier}`);
  }
}