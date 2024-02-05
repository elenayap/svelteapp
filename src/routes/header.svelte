<script>
import { isLoggedIn, logOut,setLogIn } from '../utils/auth.js';
import {goto} from '$app/navigation';
</script>

<div class = "navbar bg-base-100">
    <div class = "flex-1"> 
        <button class = "btn btn-ghost normal-case text-x1"><a href = "/"> NEXT Jobs DB</a></button>
    </div>


 <!-- if log in click post a job button link to job form -->
{#if $setLogIn}   
    <ul class= "menu menu-horizontal px-1">
        <button on:click={()=> goto("/jobs/new")}>Post a Job</button>
    </ul>  
    {:else} 
    <!-- no log in click post a job form link to create account -->
    <ul class = "menu menu-horizontal px-1">
        <li>
            <button on:click={()=> goto("/users/new")}>Post a Job</button>
        </li>     
    </ul>
{/if}

<div class = "flex-none"> 
<!-- write a condition statement for login/logout button -->
 <!-- call the store name in the condition, use $ sign to refer to store-->
 <!-- using conditional rendering with {#if ... :else ...}, 
the condition is implicitly checking if the value is truthy. -->
    {#if $setLogIn} <!-- This block is rendered when $logIn is truthy (i.e., true) -->  
<!-- step1:if user log in = true (mean logged in) will triggle the button "log out" -->
    <ul class = "menu menu-horizontal px-1">
        <li>
            <button on:click={logOut}><a href= "/">Log Out</a></button>
        </li>   
    </ul>
    <!-- step2: else if the user log in = false (mean no log in) then the log in button shows -->
    {:else} <!-- This block is rendered when $setLogIn is falsy (i.e., false) -->
    <ul class = "menu menu-horizontal px-1">
        <li>
            <button> <a href= "/login">Log In</a></button>          
        </li>     
    </ul>
    {/if}

    {#if !$setLogIn}
    <button class = "menu menu-horizontal px-1">
            <a href= "/users/new">Create Account</a></button> 
    {/if}
</div>
</div>

