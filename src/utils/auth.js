import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
import { writable } from 'svelte/store';

//false mean no log in
export const setLogIn = writable(false);

//make an empty authentication object("token",userId) with empty values to hold the info token and userid
const emptyAuth = {
  "token": "",
  "userId": ""
}
// create a logout function for scenario when log out the localstorage "auth" 
//set the empty authentication object in browser's localstorage
export function logOut() {
  localStorage.setItem("auth", JSON.stringify(emptyAuth));
  //when user in logged out = false
  setLogIn.set(false)
  return true
}
// create getUserId function for scenario when user log in retrive the user ID from localstorage
// if auth has authentication object (userId) it will return the userId;otherwise return "null"
export function getUserId() {
  const auth = localStorage.getItem("auth")
  if (auth) {
    return JSON.parse(auth)["userId"]
  }
  return null
}
// create getUserId function for scenario when user log in retrive the token from localstorage
// if auth has authentication object ("token") it will return the userId;otherwise return "null"
export function getTokenFromLocalStorage() {
  const auth = localStorage.getItem("auth")
  if (auth) {
    return JSON.parse(auth)["token"]
  }
  return null
}

//create isLoggIn function to check if a user logged in by sending POST request 
//to refresh the authentication getTokenFromLocalStorage()
export async function isLoggedIn() {
// first checks if there is a token in localStorage. If not, it returns false
  if (!getTokenFromLocalStorage()) {
    return false
  }
//if a token is present, will refresh the token by sending a request to the /api/collections/users/auth-refresh endpoint.
//This endpoint returns a new auth response (token and record data) for an already authenticated record.
  try {
    const resp = await fetch(
      PUBLIC_BACKEND_BASE_URL + '/api/collections/users/auth-refresh',
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': getTokenFromLocalStorage()
        },
      }
    );
//if the request for refresh successful, it will update the authentication object ("token",userId)
//in localStorage with the new token and user ID and returns "true"
    const res = await resp.json()
    if (resp.status == 200) {

      localStorage.setItem("auth", JSON.stringify({
        "token": res.token,
        "userId": res.record.id
      }));

      setLogIn.set(true); //log in is true now
      return true
    }
   // if the request fails or encounters an error, it returns false
    return false
  } catch {
    return false
  }
}

//create authenticateUser function to send POST request to /api/collections/users/auth-with-password' endpoint
// this endpoint Returns new auth token and account data by a combination of username/email and password.
//body:JSON.stringify include identity "username" &"password" to verify each user log in 
export async function authenticateUser(username, password) {
  const resp = await fetch(
    PUBLIC_BACKEND_BASE_URL + '/api/collections/users/auth-with-password',
    {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        identity: username,
        password
      })
    }
  );

  const res = await resp.json();
// if verify authentication success, return an object with success:true 
//and the response data which is the res.token & res.record.id
  if (resp.status == 200) {
    localStorage.setItem("auth", JSON.stringify({
      "token": res.token,
      "userId": res.record.id
    }));
//from the writable stores, when user in logged in = true
    setLogIn.set(true)
    return {
      success: true,
      res: res
    }
  }
//if authentication failed, return object with success:false and the respond data. 
//the response data would typically contain information about why the authentication failed
  return {
    success: false,
    res: res
  }
}