<script>
    import "../app.css";
    import Navigatebar from './header.svelte'; 
    import NewAlert from './alert.svelte'; // import this so the component can use in every pages
  </script>
  
  
<Navigatebar />
<NewAlert />
<slot />