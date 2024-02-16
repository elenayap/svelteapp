<script>
  import humanize from 'humanize-plus';

    //this export let data is link to src/+page.js
  export let data;
</script>

<!-- <h1 class="text-center text-xl font-bold">Find Your Next Job</h1> -->
<div class="banner relative bg-cover bg-center py-40">
    <img src="https://images.pexels.com/photos/4126743/pexels-photo-4126743.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Banner Image" class="absolute inset-0 w-full h-full object-cover opacity-50" />
    <h1 class="text-center text-3xl font-bold relative z-10">Find Your Next Job</h1>
  </div>


<!-- <div class="overflow-x-auto w-full">
  {#each data.jobs as job}
      <div class="flex flex-col mt-10 ml-10">
          <div>
              <a class="font-bold text-2xl" href="/jobs/{job.id}">{job.title}</a>
              <div class="text-sm mt-1">
                  {job.employer} . {job.location} .
                  <span class="text-sm">USD {humanize.formatNumber(job.minAnnualCompensation)} - USD {humanize.formatNumber(job.maxAnnualCompensation)}</span>
              </div>
              <div class="italic text-xs opacity-50 mt-2"
                  >posted {new Date(job.created).toLocaleDateString(undefined, {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                  })}</div
              >
          </div>

          <div class="mt-4 ">
              {job.description.slice(0, 240)}...
          </div>
      </div>
  {/each}
</div>
</div> -->


<!-- Test out card feature... -->
<div class="overflow-x-auto w-full" style="padding: 50px;">
  <div class="flex flex-wrap justify-center">
    {#each data.jobs as job}
    <div class="flex justify-center">
      <div class="card w-96 md:w-80 lg:w-80 bg-base-100 bg-secondary text-secondary-content shadow-xl" style="height: 400px; padding: 10px; margin: 20px;">
<!-- title -->
        <div class="card-body">
          <h2 class="card-title">{job.title}</h2>
<!-- employer & location -->
          <div class="text-sm mt-1">
            <p class="text-sm mt-1">{job.employer} . {job.location} .</p>
<!-- salary -->
            <span class="text-sm">USD {humanize.formatNumber(job.minAnnualCompensation)} - USD {humanize.formatNumber(job.maxAnnualCompensation)}</span>
          </div>
<!-- date -->
          <div class="italic text-xs opacity-50 mt-2">
            posted {new Date(job.created).toLocaleDateString(undefined, {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
          </div>
<!-- description -->
          <div class="mt-4 text-xs opacity-70">
            {job.description.slice(0, 240)}...
          </div>
<!-- button -->
          <div class="absolute bottom-4 right-4">
            <!-- Change button to anchor tag -->
            <a class="btn btn-ghost" href="/jobs/{job.id}">Read More</a>
          </div>
        </div>
      </div>
    </div>
    {/each}
  </div>
</div>