<script>
    import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
    import { goto } from '$app/navigation';
    import { getUserId } from './../../../utils/auth.js';

  
    let formErrors = "";
// if logged in user click post job redirect to homepage
async function postedJob() {
    goto('/');
}

// Function to handle form submission 
async function postJob(evt) {
    evt.preventDefault();
    const localStorage = getUserId();

// If user is logged in, proceed with form submission
const jobData = {
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



    const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/api/collections/jobs/records', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(jobData)
      });

      if (resp.status == 200) {
        postedJob()
      } else {
        const res = await resp.json();
        formErrors = res.data
      }
    
  }
</script>
      

    
<div class="container mx-auto px-2 lg:px-0 ">
        <form on:submit={postJob}>
        <div class="form-control w-full">
        <label class= "label" for="title">
            <span class="label-text">Job Title</span>
        </label>
        <input type="text" name="title" placeholder="Software Enginner" class="input input-bordered w-full">
        </div>

        <div class="form-control w-full">
            <label class= "label" for="minAnnualCompensation"> 
                <span class="label-text">Min Annual Compesation</span>
            </label>
            <input type="text" name="minAnnualCompensation" placeholder="40000" class="input input-bordered w-full">
            <label class= "label" for="salary"> 
                <span class="label-text-alt">USD</span>
                <span class="label-text-alt">per annum</span>
            </label>
        </div>

        <div class="form-control w-full">
            <label class= "label" for="maxAnnualCompensation"> 
                <span class="label-text">Max Annual Compesation</span>
            </label>
            <input type="text" name="maxAnnualCompensation" placeholder="250000" class="input input-bordered w-full">
            <label class= "label" for="salary"> 
                <span class="label-text-alt">USD</span>
                <span class="label-text-alt">per annum</span>
            </label>
        </div>

        <div class="form-control w-full">
            <label class= "label" for="employer"> 
                <span class="label-text">Company Name</span>
            </label>
            <input type="text" name="employer" placeholder="e.g. Facebook" class="input input-bordered w-full">
        </div>   
        
        <div class="form-control w-full">
            <label class= "label" for="location"> 
                <span class="label-text">Job Location</span>
            </label>
            <input type="text" name="location" placeholder="e.g. Singapore" class="input input-bordered w-full">
        </div>   

        <div class="form-control">
            <label class= "label" for="description"> 
                <span class="label-text">Description</span>
            </label>
            <textarea class="textarea textarea-bordered h-64" name="description" placeholder></textarea>
        </div>

        <div class="form-control">
            <label class= "label" for="requirements"> 
                <span class="label-text">Requirements</span>
            </label>
            <textarea class="textarea textarea-bordered h-64" name="requirements" placeholder></textarea>
        </div>

        <div class="form-control">
            <label class= "label" for="applicationInstructions"> 
                <span class="label-text">Application Instruction</span>
            </label>
            <textarea class="textarea textarea-bordered h-24" name="applicationInstructions" placeholder></textarea>
        </div>

        <div class="form-control w-full mt-8">
            <button class="btn btn-md" type="submit">
                POST JOB
            </button>
        </div>
    </form>
</div>
<div class="mt-28"></div>
