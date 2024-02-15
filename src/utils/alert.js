import { writable } from 'svelte/store';

// create 3 stores to store each scenario
export const alertMessage = writable ("");
export const successAlert = writable (false);
export const failedAlert = writable (false);

//create timeout to hide alert
let timeoutId;

function resetTimeout() {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
        const variable = [failedAlert, successAlert]
        variable.forEach((index) => index.set(false));
    },3000);
}

// create each alerts function:

//successful sign up: DONE
export function signUpAlert() {
    successAlert.set(true);
    alertMessage.set("Sign up successful!")
    resetTimeout()
}
//successful login: DONE
export function logInAlert() {
    successAlert.set(true);
    alertMessage.set("Log in successful! Welcome back")
    resetTimeout()
}

//successful create job: DONE
export function createJobSuccessAlert() {
    successAlert.set(true);
    alertMessage.set("Job created!")
    resetTimeout()
}


//successful edit job: DONE
export function editJobSuccessAlert() {
    successAlert.set(true);
    alertMessage.set("Job edited!")
    resetTimeout()
}

//failed actions:
//post job without log in: DONE
export function nologInAlert() {
    failedAlert.set(true);
    alertMessage.set("Please log in first")
    resetTimeout()
}

//unable to login: DONE
export function failedLogInAlert() {
    failedAlert.set(true);
    alertMessage.set("Please check your username/password!")
    resetTimeout()
}

//unable to edit job: DONE
export function editJobFailedAlert() {
    failedAlert.set(true);
    alertMessage.set("Failed to edit job!")
    resetTimeout()
}






