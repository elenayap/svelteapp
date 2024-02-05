<script>
import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
import { authenticateUser } from '../../utils/auth.js';
import { goto } from '$app/navigation';

let formErrors = "";

async function postLogIn() {
      goto('/');
    }

async function logIn(evt) {
    evt.preventDefault()

      const userLogIn =  {
        username: evt.target['username'].value,
        password: evt.target['password'].value
      }

    //await authenticateUser function to Returns new auth token and account data 
    //by a combination of username and password.
      const resp = await authenticateUser(userLogIn.username, userLogIn.password);

        if (resp.success) {
            postLogIn();
        }  else {
        // console.log(res.res.message)
        //this res.res.message. the first res is res = await authenticateUser. 
        //the second res.message is belong to authenticateUser function res
        formErrors = resp.res.message;
       
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
              <button class="btn btn-md">LOG IN</button>
        </div>
    </form>
    </div>       












