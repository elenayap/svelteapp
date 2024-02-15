<script>
import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
import { authenticateUser } from '../../utils/auth.js';
import { goto } from '$app/navigation';
import { logInAlert, failedLogInAlert } from '../../utils/alert.js';

let formErrors = "";
//set a variable "clicked" to "false" initially, so when clicked is true, trigged different action
let clicked = false; 

async function postLogIn() {
      goto('/');
    }

async function logIn(evt) {
    evt.preventDefault()
    clicked = true; //set clicked to true when log in 

      const userLogIn =  {
        username: evt.target['username'].value,
        password: evt.target['password'].value
      }

    //await authenticateUser function to Returns new auth token and account data 
    //by a combination of username and password.
      const resp = await authenticateUser(userLogIn.username, userLogIn.password);

        if (resp.success) {
            postLogIn();
            logInAlert();
        }  else {
        //this res.res.message. the first res is res = await authenticateUser. 
        //the second res.message is belong to authenticateUser function res
        formErrors = resp.res.message;
        clicked = false; //set clicked to false when cant log in
        failedLogInAlert();
      }
    }

</script>
<h1 class="text-center text-xl">Log In</h1>

<div class="flex justify-center items-center mt-8">
    <form on:submit={logIn} class="w-1/3">
        <div class="form-control w-full">
            <label class="label" for="username">
                <span class="label-text">Username</span>
            </label>
            <input
                type="text"
                name="username"
                placeholder="johndoe"
                class="input input-bordered w-full"
            />
            {#if formErrors}
              <div class="text-red-500 text-center mt-2">{formErrors}</div>
            {/if}
        </div>

        <div class="form-control w-full">
            <label class="label" for="password">
                <span class="label-text">Password</span>
            </label>
            <input
                type="password"
                name="password"
                placeholder=""
                class="input input-bordered w-full"
                required
            />
            {#if formErrors}
              <div class="text-red-500 text-center mt-2">{formErrors}</div>
            {/if}
        </div>
        <div class="form-control w-full mt-4">
            {#if clicked}
            <button class="btn btn-active btn-primary">
              <span class="loading loading-spinner hover:btn-accent"></span>
              LOG IN
            </button>
            {:else}
                <button class="btn btn-primary hover:btn-accent">LOG IN</button>
            {/if}
    </div>
    </form>
    </div>       












