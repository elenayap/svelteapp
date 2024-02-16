<script>
    import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
    import SvelteMarkdown from 'svelte-markdown';
    import humanize from 'humanize-plus';
    import { goto } from '$app/navigation';
    import { getUserId, getTokenFromLocalStorage } from '../../../utils/auth.js'

    let clicked = false;
//this export let data is link to src/+page.js
   export let data;
// edit job brings to jobs page with specific user id update page
   function editJob() {
    goto(`/jobs/${data.job.id}/update`); 
}
// to check is data and getuserId tally or not
// console.log("data:", data);
// console.log('user ID:', getUserId());
    function deletedJob() {
     goto(`/`);
}

async function deleteUserJob(){
    const getToken = getTokenFromLocalStorage();
    clicked = true;

const resp = await fetch(PUBLIC_BACKEND_BASE_URL + `/api/collections/jobs/records/${data.job.id}`, {
        method:'DELETE',
        mode: 'cors', //cross-origin resource sharing
        headers: {
          'Content-Type': 'application/json',
          'Authorization': getToken//must add 'Authorization': getToken to confirm job id and token authorized
        }, 
      });

      if (resp.status == 204) {
        deletedJob();
       
      } else {
        const res = await resp.json();
        // console.log(res)
        formErrors = res.message;
        clicked = false;

      }
}


</script>

<div class="mt-10">
    <div class="flex">
        <div class="flex-1">
            <h1 class="text-3xl font-extrabold">{data.job.title}</h1>
            <p class="text-xl">{data.job.employer}</p>
        </div>
    </div>

    <div class="flex flex-row w-full mt-8">
        <div class="basis-2/3 prose max-w-none w-full">
            <h2 class="text-xl font-thin">Description</h2>
            <SvelteMarkdown source={data.job.description} />
            <div class="mt-6" />
            <h2 class="text-xl font-thin">Requirements</h2>
            <SvelteMarkdown source={data.job.requirements} />
            <div class="mt-6" />
            <h2 class="text-xl font-thin">How to Apply?</h2>
            <p>{data.job.applicationInstructions}</p>
        </div>
        <div class="basis-1/3 ml-4">
            <h2 class="text-xl font-thin">Location</h2>
            <p>{data.job.location}</p>
            <div class="mt-6" />
            <h2 class="text-xl font-thin">Salary Range</h2>
            <p>
                USD {humanize.formatNumber(data.job.minAnnualCompensation)} - USD {humanize.formatNumber(
                    data.job.maxAnnualCompensation
                )}
            </p>
            <!-- to make only user who create the job can see edit button -->
            <div class="space-x-6">
            {#if data.job.user == getUserId() }
            <button on:click={editJob} class="btn btn-outline btn-secondary btn btn-md mt-20">EDIT</button>
            {/if}

            <!-- to make only user who create the job can see delete button -->
            {#if data.job.user == getUserId() }
            <button on:click={deleteUserJob} class="btn btn-outline btn-secondary btn btn-md mt-20">DELETE</button>
            {/if}
        </div>
        </div>
    </div>
</div>