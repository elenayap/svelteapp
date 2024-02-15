<script>
import { isLoggedIn, logOut,setLogIn } from '../utils/auth.js';
import {goto} from '$app/navigation';
import { nologInAlert } from '../utils/alert.js';

function logIn() {
    nologInAlert();
    goto("/users/new")
}

</script>

<div class = "navbar bg-base-100">
    <div class = "flex-1"> 
        <button class = "btn btn-outline btn-primary normal-case text-x1"><a href = "/"> NEXT Jobs DB</a></button>
    </div>


 <!-- if log in click post a job button link to job form -->
{#if $setLogIn}   
        <button class="btn btn-outline btn-primary" on:click={()=> goto("/jobs/new")}>Post a Job</button>
    {:else} 
            <button class="btn btn-outline btn-primary" on:click={logIn}>Post a Job</button>
           
{/if}

<div class = "flex-none"> 
<!-- write a condition statement for login/logout button -->
 <!-- call the store name in the condition, use $ sign to refer to store-->
 <!-- using conditional rendering with {#if ... :else ...}, 
the condition is implicitly checking if the value is truthy. -->
    {#if $setLogIn} <!-- This block is rendered when $logIn is truthy (i.e., true) -->  
<!-- step1:if user log in = true (mean logged in) will triggle the button "log out" -->
    <ul class="btn btn-outline btn-primary ml-4">
        <li>
            <button on:click={logOut}><a href= "/">Log Out</a></button>
        </li>   
    </ul>
    <!-- step2: else if the user log in = false (mean no log in) then the log in button shows -->
    {:else} <!-- This block is rendered when $setLogIn is falsy (i.e., false) -->
    <ul class="btn btn-outline btn-primary ml-4">
        <li>
            <button> <a href= "/login">Log In</a></button>          
        </li>     
    </ul>
    {/if}

    {#if !$setLogIn}
    <button class="btn btn-outline btn-primary ml-4">
            <a href= "/users/new">Create Account</a></button> 
    {/if}

    <!-- Theme toggle button -->
    <label class="flex cursor-pointer gap-2 ml-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>
        <input type="checkbox" value="dracula" class="toggle theme-controller"/>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
      </label>

</div>
</div>

