import { writable } from 'svelte/store';

// create 3 stores to store each scenario
export const alertMessage = writable ("");
export const successAlert = writable (flase);
export const failedAlert = writable (flase);

// create each alerts function:

//successful sign up:
export function signUpAlert() {
    successAlert.set(true);
    alertMessage.set("Sign up successful!")
}
//successful login:
export function logInAlert() {
    successAlert.set(true);
    alertMessage.set("Log in successful! Welcome back")
}

//successful create job:
export function createJobSuccessAlert() {
    successAlert.set(true);
    alertMessage.set("Job created!")
}

//successful post job:
export function postJobSuccessAlert() {
    successAlert.set(true);
    alertMessage.set("Job posted!")
}

//successful edit job:
export function editJobSuccessAlert() {
    successAlert.set(true);
    alertMessage.set("Job posted!")
}

//post job without log in:
export function nologInAlert() {
    failedAlert.set(true);
    alertMessage.set("Please log in first")
}

//unable to login:
export function showLogInAlert() {
    failedAlert.set(true);
    alertMessage.set("Please check your username/password!")
}

//unable to edit job:
export function editJobFailedAlert() {
    failedAlert.set(true);
    alertMessage.set("Failed to edit job!")
}

//unable to create job:
export function createJobfailedAlert() {
    failedAlert.set(true);
    alertMessage.set("Failed to create job!")
}