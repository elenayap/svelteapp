<script>
import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
import { goto } from '$app/navigation';
import { getUserId,getTokenFromLocalStorage } from '../../../../utils/auth.js';
import { editJobSuccessAlert, editJobFailedAlert } from '../../../../utils/alert.js';

export let data;
let clicked = false;

let formErrors = {};
// if user click update job button redirect to jobs page that the specific user created
async function updatedJob() {
    goto(`/jobs/${data.job.id}`);
}


// Function to handle update job form 
async function updateJob(evt) {
    // console.log(data.job.id)
    evt.preventDefault();
    const localStorage = getUserId();
    const getToken = getTokenFromLocalStorage();
    clicked = true;


const jobDetails = {
    user: localStorage,
    title: evt.target['title'].value,
    minAnnualCompensation: evt.target['minAnnualCompensation'].value,
    maxAnnualCompensation: evt.target['maxAnnualCompensation'].value,
    description: evt.target['description'].value,
    requirements: evt.target['requirements'].value,
    applicationInstructions: evt.target['applicationInstructions'].value,
    location: evt.target['location'].value,
    employer: evt.target['employer'].value
  };

const resp = await fetch(PUBLIC_BACKEND_BASE_URL + `/api/collections/jobs/records/${data.job.id}`, {
        method: 'PATCH',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': getToken //must add 'Authorization': getToken to confirm job id and token authorized
        },
        body: JSON.stringify(jobDetails)
      });

      if (resp.status == 200) {
        updatedJob();
        editJobSuccessAlert();
      } else {
        const res = await resp.json();
        // console.log(res)
        formErrors = res.message;
        clicked = false;
        editJobFailedAlert();

      }
  }


</script>
    
<div class="container mx-auto px-2 lg:px-0 ">
        <form on:submit={updateJob}>
        <div class="form-control w-full">
        <label class= "label" for="title">
            <span class="label-text">Job Title</span>
        </label>
        <input value={data.job.title} type="text" name="title" placeholder="Software Enginner" class="input input-bordered w-full">
        {#if 'title' in formErrors}
                  <label class="label" for="title">
                      <span class="label-text-alt text-red-500">{formErrors['title'].message}</span>
                  </label>
              {/if}
        </div>

        <div class="form-control w-full">
            <label class= "label" for="minAnnualCompensation"> 
                <span class="label-text">Min Annual Compesation</span>
            </label>
            <input value={data.job.minAnnualCompensation} type="text" name="minAnnualCompensation" placeholder="40000" class="input input-bordered w-full">
            <label class= "label" for="salary"> 
                <span class="label-text-alt">USD</span>
                <span class="label-text-alt">per annum</span>
            </label>
        {#if 'minAnnualCompensation' in formErrors}
                  <label class="label" for="minAnnualCompensation">
                      <span class="label-text-alt text-red-500">{formErrors['minAnnualCompensation'].message}</span>
                  </label>
              {/if}
        </div>

        <div class="form-control w-full">
            <label class= "label" for="maxAnnualCompensation"> 
                <span class="label-text">Max Annual Compesation</span>
            </label>
            <input value={data.job.maxAnnualCompensation} type="text" name="maxAnnualCompensation" placeholder="250000" class="input input-bordered w-full">
            <label class= "label" for="salary"> 
                <span class="label-text-alt">USD</span>
                <span class="label-text-alt">per annum</span>
            </label>
            {#if 'maxAnnualCompensation' in formErrors}
                  <label class="label" for="maxAnnualCompensation">
                      <span class="label-text-alt text-red-500">{formErrors['maxAnnualCompensation'].message}</span>
                  </label>
              {/if}
        </div>

        <div class="form-control w-full">
            <label class= "label" for="employer"> 
                <span class="label-text">Company Name</span>
            </label>
            <input value={data.job.employer} type="text" name="employer" placeholder="e.g. Facebook" class="input input-bordered w-full">
            {#if 'employer' in formErrors}
                  <label class="label" for="employer">
                      <span class="label-text-alt text-red-500">{formErrors['employer'].message}</span>
                  </label>
              {/if} 
        </div>   
        
        <div class="form-control w-full">
            <label class= "label" for="location"> 
                <span class="label-text">Job Location</span>
            </label>
            <input value={data.job.location} type="text" name="location" placeholder="e.g. Singapore" class="input input-bordered w-full">
            {#if 'location' in formErrors}
                  <label class="label" for="location">
                      <span class="label-text-alt text-red-500">{formErrors['location'].message}</span>
                  </label>
              {/if} 
        </div>   

        <div class="form-control">
            <label class= "label" for="description"> 
                <span class="label-text">Description</span>
            </label>
            <textarea value={data.job.description} class="textarea textarea-bordered h-64" name="description" placeholder></textarea>
            {#if 'description' in formErrors}
                  <label class="label" for="description">
                      <span class="label-text-alt text-red-500">{formErrors['description'].message}</span>
                  </label>
              {/if}
        </div>

        <div class="form-control">
            <label class= "label" for="requirements"> 
                <span class="label-text">Requirements</span>
            </label>
            <textarea value={data.job.requirements} class="textarea textarea-bordered h-64" name="requirements" placeholder></textarea>
            {#if 'requirements' in formErrors}
            <label class="label" for="requirements">
            <span class="label-text-alt text-red-500">{formErrors['requirements'].message}</span>
            </label>
            {/if} 
        </div>

        <div class="form-control">
            <label class= "label" for="applicationInstructions"> 
                <span class="label-text">Application Instruction</span>
            </label>
            <textarea value={data.job.applicationInstructions} class="textarea textarea-bordered h-24" name="applicationInstructions" placeholder></textarea>
            {#if 'applicationInstructions' in formErrors}
            <label class="label" for="applicationInstructions">
            <span class="label-text-alt text-red-500">{formErrors['applicationInstructions'].message}</span>
            </label>
             {/if} 
        </div>

        <div class="form-control w-full mt-8">
            {#if clicked}
            <button class="btn btn-active btn-primary" type="submit">
              <span class="loading loading-spinner hover:btn-accent"></span>
              Update Job
            </button>
            {:else}
                <button class="btn btn-primary hover:btn-accent" type="submit">Update Job</button>
            {/if}
        </div>
    </form>
</div>
<div class="mt-28"></div>