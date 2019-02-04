import axios from 'axios';
import {API_URL} from "../config";

export function search(s) {
  return dispatch => {
    return axios.get(API_URL+`/contacts?query=${s.query ? s.query : "" }&page=${s.page ? s.page : 1}`);
  }
}

export function deleteContact(id) {
  return dispatch => {
    return axios.delete(API_URL+`/contact/${id}`);
  }
}

export function createContact(userDate) {
  return dispatch => {
    return axios.post(API_URL+`/contact`, userDate);
  }
}

export function updateContact(userDate) {
  return dispatch => {
    return axios.put(API_URL+`/contact`, userDate);
  }
}

export function getContact(id) {
  return dispatch => {
    return axios.get(API_URL+`/contact/${id}`);
  }
}